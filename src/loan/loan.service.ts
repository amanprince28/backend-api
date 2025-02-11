import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { UpdateLoanDto } from './dto/update-loan.dto';
import { addDays, addWeeks, addMonths, addYears, format } from 'date-fns';
import { pickBy } from 'lodash';

@Injectable()
export class LoanService {
  constructor(private prisma: PrismaService) {}

  
  generateUniqueAlphanumeric(length: number): string {
    const generatedStrings = new Set<string>();
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let uniqueString: string;

    do {
      uniqueString = Array.from({ length }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
    } while (generatedStrings.has(uniqueString));

    generatedStrings.add(uniqueString);
    return uniqueString;
  }

  async findOne(id: string) {
    return this.prisma.loan.findFirst({
      where: { generate_id: id },
    })
  }

  async findAll(page: number, limit: number, filter: any) {
    const skip = (page - 1) * limit;
    // const where = {
    //   status: filter?.status,
    //   customer_id: filter?.customer_id,
    // };

    const loans = await this.prisma.loan.findMany({
      // where: pickBy(where),
      skip,
      take: limit,
      include: { customer: true, installment: true, loan_share: true },
    });

    const totalCount = await this.prisma.loan.count();

    return {
      data: loans,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
      limit,
    };
    // return this.prisma.loan.findMany({
    //   include: {
    //     customer: true,
    //   }
    // });
  }

  async create(createLoanDto) {
    const generateId = this.generateUniqueAlphanumeric(8);
    const calculateRepaymentDates = await this.calculateRepaymentDates(createLoanDto.repayment_date, createLoanDto.repayment_term, createLoanDto.unit_of_date);
    
    const loadData = await this.prisma.loan.create({
      data: {
        generate_id: generateId,
        customer: { connect: { id: createLoanDto.customer_id } },
        supervisor: createLoanDto.supervisor,
        principal_amount: createLoanDto.principal_amount.toString(),
        deposit_amount: createLoanDto.deposit_amount.toString(),
        application_fee: createLoanDto.application_fee.toString(),
        payment_up_front: createLoanDto.payment_up_front.toString(),
        unit_of_date: createLoanDto.unit_of_date.toString(),
        date_period: createLoanDto.date_period.toString(),
        repayment_term: createLoanDto.repayment_term.toString(),
        interest: createLoanDto.interest.toString(),
        repayment_date: createLoanDto.repayment_date.toString(),
        loan_remark: createLoanDto.loan_remark.toString(),
        status: createLoanDto.status,
      },
    });

    const installmentData = await Promise.all(calculateRepaymentDates.map(async (date, index) => {
      const generateId = this.generateUniqueAlphanumeric(8);
      await this.prisma.installment.create({
        data: {
          generate_id: generateId,
          installment_date: format(date, 'yyyy-MM-dd'),
          loan: { connect: { id: loadData.id } },
        }
      });
    }));
    return loadData;
  }

  async update(id: string, updateLoanDto: UpdateLoanDto) {
    return this.prisma.loan.update({
      where: { id },
      data: updateLoanDto,
    });
  }

  async delete(id: string) {
    return this.prisma.loan.delete({
      where: { id },
    });
  }

  createInstallmentDates() {

    const unitPeriods = ['day', 'week', 'month', 'year'] as const;
    type UnitPeriod = (typeof unitPeriods)[number];

    const repaymentDate = new Date('2025-02-01'); // Starting repayment date
    const repaymentTerm = 5; // Number of repayments
    const unitPeriod: UnitPeriod = 'day'; // Change this to 'day', 'week', 'month', or 'year'

    function calculateRepaymentDates(startDate: Date, term: number, unit: UnitPeriod): Date[] {
      const dates: Date[] = [];
      let currentDate = startDate;

      for (let i = 0; i < term; i++) {
        switch (unit) {
          case 'day':
            currentDate = addDays(currentDate, 1);
            break;
          case 'week':
            currentDate = addWeeks(currentDate, 1);
            break;
          case 'month':
            currentDate = addMonths(currentDate, 1);
            break;
          case 'year':
            currentDate = addYears(currentDate, 1);
            break;
        }
        dates.push(new Date(currentDate));
      }

      return dates;
    }

    const repaymentDates = calculateRepaymentDates(repaymentDate, repaymentTerm, unitPeriod);
    console.log(repaymentDates.map(date => date.toDateString()));


  }
  
  calculateRepaymentDates(startDate: Date, term: number, unit: any): Date[] {
    const dates: Date[] = [];
    let currentDate: any = startDate;

    for (let i = 0; i < term; i++) {
      switch (unit) {
        case 'day':
          currentDate = addDays(currentDate, 1);
          break;
        case 'week':
          currentDate = addWeeks(currentDate, 1);
          break;
        case 'month':
          currentDate = addMonths(currentDate, 1);
          break;
        case 'year':
          currentDate = addYears(currentDate, 1);
          break;
      }
      dates.push(new Date(currentDate));
    }

    return dates;
  }
  
}
