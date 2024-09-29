import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateCustomerDto, UpdateCustomerDto } from './customer.dto';
import { pickBy } from 'lodash';

@Injectable()
export class CustomerService {
    constructor(private prisma: PrismaService) {}

  async create(data: any) {
    const { customer_relation, customer_address, ...customerData } = data;
    console.log('customerData', {
      address_lines: customer_address.address_lines,
      country_id: customer_address.country_id,
      state_id: customer_address.state_id,
      city_id: customer_address.city_id,
      postal_code: customer_address.postal_code || null,
      remark: customer_address.remark || null,
      staying_since: customer_address.staying_since || null,
      is_permanent: customer_address.is_permanent || false,
    });
    return this.prisma.customer.create({
      data: pickBy({
        ...customerData,
        customer_relation: customer_relation ? { create: customer_relation } : undefined,
        customer_address: customer_address ? { create: {
          address_lines: customer_address.address_lines,
          country_id: customer_address.country_id,
          state_id: customer_address.state_id,
          city_id: customer_address.city_id,
          postal_code: customer_address.postal_code || null,
          remark: customer_address.remark || null,
          staying_since: customer_address.staying_since || null,
          is_permanent: customer_address.is_permanent || false,
        }} : undefined,
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
      include: {
        customer_address: true,
      },
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
