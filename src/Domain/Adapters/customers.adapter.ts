import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../Infrastructure/Apis/prisma.service';
import { Customers } from '../Interfaces/customer';
import { CustomersRepository } from '../Repositories/customersRepository';
import { removeMaskCpf } from '../Utils/removeMaskCpf';

@Injectable()
export class CustomersAdapter implements CustomersRepository {
  constructor(private prisma: PrismaService) {}

  async getCustomerById(id: number): Promise<Customers | null> {
    try {
      return await this.prisma.customer.findUnique({ where: { id } });
    } catch (error) {
      const message = error?.meta?.target || error?.meta?.details;
      throw new Error(message);
    }
  }

  async getCustomerByCpf(cpf: string): Promise<Customers | null> {
    try {
      let newCpf = cpf;
      if (newCpf) {
        newCpf = removeMaskCpf(cpf);
        if (newCpf.length > 11) {
          throw new Error('cpf invalido');
        }
      } else {
        throw new Error('cpf invalido');
      }

      return await this.prisma.customer.findUnique({
        where: { cpf: newCpf },
      });
    } catch (error) {
      const message =
        error?.message || error?.meta?.target || error?.meta?.details;
      throw new Error(message);
    }
  }

  async getCheckIsAdmin(id: number): Promise<boolean> {
    try {
      const customer = await this.prisma.customer.findUnique({
        where: { id },
      });

      return Boolean(customer?.isAdmin);
    } catch (error) {
      const message = error?.meta?.target || error?.meta?.details;
      throw new Error(message);
    }
  }

  async saveCustomer(customer: Customers): Promise<Customers> {
    try {
      let customerData = customer;
      if (customer?.cpf) {
        const newCpf = removeMaskCpf(customer?.cpf);
        if (newCpf.length > 11) {
          throw new Error('cpf invalido');
        }

        customerData = { ...customerData, cpf: newCpf };
      }

      return await this.prisma.customer.create({ data: customerData });
    } catch (error) {
      const message =
        error?.message || error?.meta?.target || error?.meta?.details;
      throw new Error(message);
    }
  }

  async updateCustomer(customer: Customers): Promise<Customers> {
    try {
      return await this.prisma.customer.update({
        where: {
          id: customer.id,
        },
        data: customer,
      });
    } catch (error) {
      const message = error?.meta?.target || error?.meta?.details;
      throw new Error(message);
    }
  }

  async deleteCustomerById(id: number): Promise<Customers> {
    try {
      return await this.prisma.customer.delete({ where: { id } });
    } catch (error) {
      const message = error?.meta?.target || error?.meta?.details;
      throw new Error(message);
    }
  }
}
