import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { RoleEnum, SocialProvider } from 'user/user.enums';

export class CreateUserInDto {
  @IsNotEmpty({ message: 'email should be set' })
  @Length(3, 64)
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsEnum(SocialProvider)
  socialProvider: SocialProvider;

  @IsEnum(RoleEnum)
  role: RoleEnum;

  @IsOptional()
  @IsString()
  @Length(3, 16)
  password: string;
}
