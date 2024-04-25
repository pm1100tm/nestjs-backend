import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { CustomerController } from './controllers/customer.controller';
import { UserService } from './services/user.service';
import { CustomerService } from './services/customer.service';

@Module({
  controllers: [UserController, CustomerController],
  providers: [UserService, CustomerService],
})
export class UserModule {}
