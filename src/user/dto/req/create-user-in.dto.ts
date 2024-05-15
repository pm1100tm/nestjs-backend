import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { RoleEnum, SignInProvider } from 'user/user.enums';

export class CreateUserInDto {
  @IsNotEmpty({ message: 'email should be set' })
  @Length(3, 64)
  @IsEmail()
  @ApiProperty({
    example: 'testuser001@test.com',
  })
  email: string;

  @IsNotEmpty()
  @IsEnum(SignInProvider)
  signInProvider: SignInProvider;

  @IsEnum(RoleEnum)
  @ApiProperty({
    description: '유저 역할',
  })
  role: RoleEnum;

  @IsOptional()
  @IsString()
  @Length(3, 16)
  password: string;
}
