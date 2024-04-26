import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from 'user/entities/customer.entity';

@Injectable()
export class CustomerRepository {
  constructor(
    @InjectRepository(Customer) private repository: Repository<Customer>,
  ) {}

  async insert(customer: Customer): Promise<Customer> {
    return await this.repository.save(customer);
  }

  async selectUnique({ id }: { id: number }): Promise<Customer | null> {
    const customer = await this.repository.findOne({
      where: {
        id,
      },
    });

    return customer;
  }
}
