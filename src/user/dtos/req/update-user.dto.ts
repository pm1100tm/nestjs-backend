import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { SocialProvider } from 'user/user.enums';

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsEnum(SocialProvider)
  socialProvider: SocialProvider.EMAIL;

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
