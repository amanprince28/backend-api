import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';

@Injectable()
export class LoanService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.loan.findMany();
  }

  async create(createLoanDto) {
    return this.prisma.loan.create({
      data: {
        customer: { connect: { id: createLoanDto.customerId } },
        supervisor: createLoanDto.supervisor,
        
        application_fee: createLoanDto.applicationFee.toString(),
        date_period: createLoanDto.datePeriod.toString(),
        deposit_amount: createLoanDto.depositAmount.toString(),
        interest: createLoanDto.interest.toString(),
        loan_remark: createLoanDto.loanRemark.toString(),
        payment_up_front: createLoanDto.paymentUpfront.toString(),
        principal_amount: createLoanDto.principalAmount.toString(),
        repayment_date: createLoanDto.repaymentDate.toString(),
        unit_of_date: createLoanDto.unitofDate.toString(),
        amount_given:createLoanDto.amountGiven.toString(),
        interest_amount:createLoanDto.interestAmount.toString(),
        payment_per_term:createLoanDto.paymentPerTerm.toString(),
      },
    });
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
}
