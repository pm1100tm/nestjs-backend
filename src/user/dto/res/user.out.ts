import { RoleEnum, SignInProvider } from 'user/user.enums';

export class UserOutDto {
  id: number;
  email: string;
  signInProvider: SignInProvider | string;
  role: RoleEnum | string;
  isRemoved: boolean;
  createdAt: Date;
  updatedAt: Date;
}
