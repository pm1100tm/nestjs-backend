import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { RoleEnum, SocialProvider } from 'user/user.enums';

export class CreateUserInDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsEnum(SocialProvider)
  socialProvider: SocialProvider;

  @IsEnum(RoleEnum)
  role: RoleEnum;

  @IsOptional()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  password: string;
}
