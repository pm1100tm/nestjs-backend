import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { SignInProvider } from 'user/user.enums';

export class SignInInDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsEnum(SignInProvider)
  signInProvider: string;

  @IsOptional()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  password: string;
}
