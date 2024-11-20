import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateCustomerDto, UpdateCustomerDto } from './customer.dto';
import { pickBy } from 'lodash';

@Injectable()
export class CustomerService {
    constructor(private prisma: PrismaService) {}

  async create(data: any) {
    // console.log(data);
    const { customer_relation, customer_address, company, bankDetails, ...customerData } = data;
    const createOrUpdateRelations = (relations) => {
      return relations.map(relation => ({
        ...relation,
        address: relation.address ? { create: relation.address } : undefined
      }));
    };
  
    if (customerData.id) {
      const id = customerData.id;
      delete customerData.id;
      await this.prisma.customer.update({
        where: { id },
        data: pickBy({
          ...customerData,
          customer_relation: customer_relation ? { 
            create: createOrUpdateRelations(customer_relation.filter(relation => !relation.id)) 
          } : undefined,
          customer_address: customer_address && !customer_address.id ? { create: customer_address } : undefined,
          company: company && !company.id ? { create: company } : undefined,
          bank: bankDetails && !bankDetails.id ? { create: bankDetails } : undefined
        }),
      });
    } else {
      return this.prisma.customer.create({
        data: pickBy({
          ...customerData,
          customer_relation: customer_relation ? { 
            create: createOrUpdateRelations(customer_relation.filter(relation => !relation.id)) 
          } : undefined,
          customer_address: customer_address && !customer_address.id ? { create: customer_address } : undefined,
          company: company && !company.id ? { create: company } : undefined,
          bank: bankDetails && !bankDetails.id ? { create: bankDetails } : undefined
        })
      });
    }
  
  }

  async findAll(skip: number, take: number, filter: any) {
    const where = pickBy(filter);
    where.deleted_at = null;
    const [customers, total] = await Promise.all([
      this.prisma.customer.findMany({
        include: {
          customer_relation: {
            include: {
              address: true,
            }
          },
          customer_address: true,
          company: true,
        },
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
        customer_relation: {
          include: {
            address: true,
          }
        },
        customer_address: true,
        company: true,
      },
    });
  }

  async update(id: string, data: any) {
    const { customer_relation, customer_address, company, bankDetails, ...customerData } = data;
    return this.prisma.customer.update({
      where: { id },
      data: pickBy({
        ...customerData,
        customer_relation: customer_relation ? { create: customer_relation.map(relation => ({
          ...relation,
          address: relation.address ? { create: relation.address } : undefined
        })) } : undefined,
        customer_address: customer_address ? { create: customer_address } : undefined,
        company: company ? { create: company } : undefined,
        bank: bankDetails ? { create: bankDetails } : undefined
      }),
    });
  }

  async delete(id: string) {
    return this.prisma.customer.update({
      data: { deleted_at: new Date() },
      where: { id },
    });
  }

  async getCustomerRelation(customerId: string) {
    return this.prisma.customer_relation.findMany({
      where: { 
        customer: {
          id: customerId,
        },
      }
    });
  }

  async addDocument(data: any) {
    return this.prisma.document.create({
      data: {
        name: data.name,
        path: data.path,
        customer_id: data.customer_id,
      }
    });
  }
}
