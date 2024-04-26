import { Injectable } from '@nestjs/common';

import { CustomerRepository } from 'user/repositories/customer.repository';

import { Customer } from 'user/entities/customer.entity';

import { CreateCustomerInDto } from 'user/dtos/req/create-customer-in.dto';
import { CreateCustomerOutDto } from 'user/dtos/res/create-customer.out.dto';

@Injectable()
export class CustomerService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async create(
    createCustomerInDto: CreateCustomerInDto,
  ): Promise<CreateCustomerOutDto> {
    const customerEntity = new Customer();
    customerEntity.userId = createCustomerInDto.userId;
    const customer = await this.customerRepository.insert(customerEntity);

    const createCustomerOutDto = new CreateCustomerOutDto();
    createCustomerOutDto.id = customer.id;
    createCustomerOutDto.userId = customer.userId;

    return createCustomerOutDto;
  }
}
