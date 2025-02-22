import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateCustomerDto, UpdateCustomerDto } from './customer.dto';
import { pickBy } from 'lodash';
import { count } from 'console';

@Injectable()
export class CustomerService {
    constructor(private prisma: PrismaService) {}

  async create(data: any) {
    // console.log(data);
    const { bankDetails, ...customerData } = data;
    if(customerData.id) {
      return this.updateCustomer(customerData, customerData.id);
    } else {
      return this.addCustomer(customerData);
    }
  }

  async findAll(skip: number, take: number, filter: any) {
    let where = {
      deleted_at: null
    }
    if (filter) {
      where = pickBy({
        OR: [
          {
            name: {
              contains: filter,
              mode: "insensitive"
            }
          },
          {
            email: {
              contains: filter,
              mode: "insensitive"
            }
          },
          {
            passport: {
              contains: filter,
              mode: "insensitive"
            }
          },
          {
            ic: {
              contains: filter,
              mode: "insensitive"
            }
          }
        ]
      });
    }
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
      // include: {
      //   customer_relation: {
      //     include: {
      //       address: true,
      //     }
      //   },
      //   customer_address: true,
      //   company: true,
      // },
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

  async addDocument(data: { id: string; filesData: any[] }) {
    const { id, filesData } = data;
  
    const promises = filesData.map(async (file) => {
      return this.prisma.document.create({
        data: {
          name: file.fileName,
          path: file.fileName,
          customer_id: id, 
          description: file.fileDescription,
          size: file.fileSize.toString(),
        },
      });
    });
  
    return Promise.all(promises);
  }
  

  async addCustomer(data) {
    if (data.customer_address) {
      data.customer_address = JSON.parse(JSON.stringify(data.customer_address));
    }
    if (data.relations) {
      data.relations = JSON.parse(JSON.stringify(data.relations));
    }
    if (data.employment) {
      data.employment = JSON.parse(JSON.stringify(data.employment));
    }
    if (data.bank_details) {
      data.bank_details = JSON.parse(JSON.stringify(data.bank_details));
    }
    return this.prisma.customer.create({
      data: data,
    });
  }

  async updateCustomer(data, id) {
    if (data.customer_address) {
      data.customer_address = JSON.parse(JSON.stringify(data.customer_address));
    }
    if (data.relations) {
      data.relations = JSON.parse(JSON.stringify(data.relations));
    }
    if (data.employment) {
      data.employment = JSON.parse(JSON.stringify(data.employment));
    }
    if (data.bank_details) {
      data.bank_details = JSON.parse(JSON.stringify(data.bank_details));
    }
    return this.prisma.customer.update({
      where: { id },
      data: data,
    });
  }

  getCustomer(key: string) {
    return this.prisma.customer.findMany({
      where: pickBy({
        OR: [
          {
            name: {
              contains: key,
              mode: "insensitive"
            }
          },
          {
            email: {
              contains: key,
              mode: "insensitive"
            }
          },
          {
            passport: {
              contains: key,
              mode: "insensitive"
            }
          },
          {
            ic: {
              contains: key,
              mode: "insensitive"
            }
          }
        ]
      }),
    });
  }

  getDocument(key: string) {
    return this.prisma.document.findMany({
      where: { customer_id:key },
    });
  }
  
}
