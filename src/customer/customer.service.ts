import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateCustomerDto, UpdateCustomerDto } from './customer.dto';
import { pickBy } from 'lodash';

@Injectable()
export class CustomerService {
    constructor(private prisma: PrismaService) {}

  async create(data: any) {
    const { customer_relation, address, ...customerData } = data;
    return this.prisma.customer.create({
      data: pickBy({
        ...customerData,
        customer_relation: customer_relation ? { create: customer_relation } : undefined,
        address: address ? { create: address } : undefined,
      }),
    });
  }

  async findAll(skip: number, take: number, filter: any) {
    const where = pickBy(filter);
    const [customers, total] = await Promise.all([
      this.prisma.customer.findMany({
        skip,
        take,
        where,
      }),
      this.prisma.customer.count({
        where,
      }),
    ]);

    return {
      data: customers,
      total,
      skip,
      take,
    };
  }

  async findOne(id: string) {
    return this.prisma.customer.findUnique({
      where: { id },
    });
  }

  async update(id: string, data: any) {
    return this.prisma.customer.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.customer.delete({
      where: { id },
    });
  }
}
