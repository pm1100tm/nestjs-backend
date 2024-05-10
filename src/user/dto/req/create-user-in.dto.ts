import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { RoleEnum, SignInProvider } from 'user/user.enums';

export class CreateUserInDto {
  @IsNotEmpty({ message: 'email should be set' })
  @Length(3, 64)
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsEnum(SignInProvider)
  signInProvider: SignInProvider;

  @IsEnum(RoleEnum)
  role: RoleEnum;

  @IsOptional()
  @IsString()
  @Length(3, 16)
  password: string;
}
