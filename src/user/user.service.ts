import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'nestjs-prisma';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({ data: createUserDto });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(email: string): Promise<any> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({ where: { id }, data: updateUserDto });
  }

  async remove(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async createUser(payload): Promise<any> {
    const hashedPassword = await bcrypt.hash(payload.password, 10);
    return this.prisma.user.create({
      data: {
        name: payload.name,
        email: payload.email,
        password: hashedPassword,
        role: payload.role ? payload.role : 'AGENT',
        supervisor: payload.supervisor
      },
    });
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.findByEmail(email);
    if (user && user.password) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        const { password, ...result } = user;
        return result; // Exclude password before returning
      }
    }
    return null;
  }
}