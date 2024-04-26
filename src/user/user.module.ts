import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from 'auth/auth.module';

import { UserController } from './controllers/user.controller';
import { CustomerController } from './controllers/customer.controller';
import { UserService } from './services/user.service';
import { CustomerService } from './services/customer.service';
import { UserRepository } from './repositories/user.repository';
import { CustomerRepository } from './repositories/customer.repository';

import { User } from './entities/user.entity';
import { Customer } from './entities/customer.entity';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([User, Customer]),
  ],
  controllers: [UserController, CustomerController],
  providers: [UserService, CustomerService, UserRepository, CustomerRepository],
  exports: [UserService, UserRepository],
})
export class UserModule {}
