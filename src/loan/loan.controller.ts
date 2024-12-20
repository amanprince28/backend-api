import { Body, Controller, Param, Post, Put, UseGuards } from '@nestjs/common';
import { LoanService } from './loan.service';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('loan')
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  // @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createLoanDto: CreateLoanDto) {
    return this.loanService.create(createLoanDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateLoanDto: UpdateLoanDto) {
    return this.loanService.update(id, updateLoanDto);
  }
}
