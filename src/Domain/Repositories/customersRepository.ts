import { Customers } from '../Interfaces/customer';

export abstract class CustomersRepository {
  abstract getCustomerById(id: number): Promise<Customers | null>;
  abstract getCheckIsAdmin(id: number): Promise<boolean>;
  abstract getCustomerByCpf(cpf: string): Promise<Customers | null>;
  abstract saveCustomer(customer: Customers): Promise<Customers>;
  abstract updateCustomer(customer: Customers): Promise<Customers>;
  abstract deleteCustomerById(id: number): Promise<Customers>;
}
