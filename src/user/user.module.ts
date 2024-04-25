import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './controllers/user.controller';
import { CustomerController } from './controllers/customer.controller';
import { UserService } from './services/user.service';
import { CustomerService } from './services/customer.service';

import { User } from './entities/user.entity';
import { Customer } from './entities/customer.entity';
import { UserRepository } from './repositories/user.repository';
import { CustomerRepository } from './repositories/customer.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User, Customer])],
  controllers: [UserController, CustomerController],
  providers: [UserService, CustomerService, UserRepository, CustomerRepository],
})
export class UserModule {}
