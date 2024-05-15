import { ApiProperty } from '@nestjs/swagger';
import { RoleEnum, SignInProvider } from 'user/user.enums';

export class UserOutDto {
  @ApiProperty({
    description: '아이디',
  })
  id: number;

  @ApiProperty({
    description: '이메일',
  })
  email: string;

  @ApiProperty({
    description: '회원가입 수단',
  })
  signInProvider: SignInProvider | string;

  @ApiProperty({
    description: '유저 역할',
  })
  role: RoleEnum | string;

  @ApiProperty({
    description: '탈퇴 여부',
  })
  isRemoved: boolean;

  @ApiProperty({
    description: '생성일',
  })
  createdAt: Date;

  @ApiProperty({
    description: '수정일',
  })
  updatedAt: Date;
}
