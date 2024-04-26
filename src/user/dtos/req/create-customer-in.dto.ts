import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCustomerInDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
