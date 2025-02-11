import { Body, Controller, Param, Post, Put, UseGuards ,Get, Delete} from '@nestjs/common';
import { LoanService } from './loan.service';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('loan')
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  @Get()
  async findAll() {
    return this.loanService.findAll();
  }

  // @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createLoanDto: CreateLoanDto) {
    return this.loanService.create(createLoanDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateLoanDto: UpdateLoanDto) {
    return this.loanService.update(id, updateLoanDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.loanService.delete(id);
  }

  @Get('createInstallmentDates')
  createInstallmentDates() {
    return this.loanService.createInstallmentDates();
  }
}
