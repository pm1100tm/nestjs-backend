import { PartialType } from '@nestjs/mapped-types';
import { UserOutDto } from './user.out';

export class CreateUserOutDto extends PartialType(UserOutDto) {
  customerId?: number;
}
