import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { SignInProvider } from 'user/user.enums';

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsEnum(SignInProvider)
  signInProvider: SignInProvider;

  @IsOptional()
  @IsString()
  password = '';

  @IsOptional()
  @IsString()
  nickname = '';

  @IsOptional()
  @IsString()
  refreshToken = '';
}
