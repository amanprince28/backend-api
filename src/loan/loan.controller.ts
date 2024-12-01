import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { LoanService } from './loan.service';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';

@Controller('loan')
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  @Post()
  create(@Body() createLoanDto: CreateLoanDto) {
    return this.loanService.create(createLoanDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateLoanDto: UpdateLoanDto) {
    return this.loanService.update(id, updateLoanDto);
  }
}
