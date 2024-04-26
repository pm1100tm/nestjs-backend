import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { SocialProvider } from 'user/user.enums';

export class SignInInDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsEnum(SocialProvider)
  socialProvider: string;

  @IsOptional()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  password: string;
}
