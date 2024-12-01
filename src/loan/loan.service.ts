import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';

@Injectable()
export class LoanService {
  constructor(private prisma: PrismaService) {}

  async create(createLoanDto) {
    return this.prisma.loan.create({
      data: createLoanDto,
    });
  }

  async update(id: string, updateLoanDto: UpdateLoanDto) {
    return this.prisma.loan.update({
      where: { id },
      data: updateLoanDto,
    });
  }
}
