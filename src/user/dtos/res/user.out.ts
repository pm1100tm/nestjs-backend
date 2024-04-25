import { RoleEnum, SocialProvider } from 'user/user.enums';

export class UserOutDto {
  id: number;
  email: string;
  socialProvider: SocialProvider;
  role: RoleEnum;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
