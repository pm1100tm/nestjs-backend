import {
  Inject,
  Injectable,
  forwardRef,
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { UserService } from 'user/services/user.service';
import { EncryptUtil } from 'common/encrypt.util';
import { UserRepository } from 'user/repositories/user.repository';

import { SignInInDto } from 'auth/dtos/signin-in.dto';
import { UserOutDto } from 'user/dto/res/user.out';
import { CurrentUser, JwtPayload, Tokens } from 'auth/auth.types';
import { SignInProvider } from 'user/user.enums';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly encryptUtil: EncryptUtil,
    private readonly userRepository: UserRepository,
  ) {}

  private issueAccessToken(jwtPayload: JwtPayload): { accessToken: string } {
    const accessToken = this.jwtService.sign(jwtPayload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: Number(this.configService.get<number>('JWT_EXPIRED_IN')),
    });

    return { accessToken };
  }

  issueRefreshToken(jwtPayload: JwtPayload): { refreshToken: string } {
    const refreshToken = this.jwtService.sign(jwtPayload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: Number(
        this.configService.get<number>('JWT_EXPIRED_IN_FOR_REFRESH'),
      ),
    });

    return { refreshToken };
  }

  issueTokens(jwtPayload: JwtPayload): Tokens {
    const { accessToken } = this.issueAccessToken(jwtPayload);
    const { refreshToken } = this.issueRefreshToken(jwtPayload);
    return { accessToken, refreshToken };
  }

  async signin(signInInDto: SignInInDto): Promise<Tokens> {
    const { email, signInProvider, password } = signInInDto;

    const user = await this.userRepository.selectUnique({ email });
    if (!user) throw new NotFoundException();

    if (SignInProvider.EMAIL !== signInProvider) {
      if (password) throw new BadRequestException('Password not needed');
      if (email !== user.email)
        throw new BadRequestException('Email not matched');
    } else {
      if (!password) throw new BadRequestException('Password not set');
      if (!(await this.encryptUtil.compare(password, user.password))) {
        throw new BadRequestException('Password invalid');
      }
    }

    const tokenPayload = { userId: user.id };
    const { accessToken } = this.issueAccessToken(tokenPayload);
    let refreshToken = '';

    if (user.refreshToken) {
      refreshToken = user.refreshToken;
    } else {
      const { refreshToken: token } = this.issueRefreshToken(tokenPayload);
      refreshToken = token;

      const affected = await this.userRepository.updateRefreshToken(user.id, {
        refreshToken,
      });

      if (!affected) {
        throw new InternalServerErrorException();
      }
    }

    return { accessToken, refreshToken };
  }

  async signout({ userId }: { userId: number }): Promise<void> {
    const affected = await this.userRepository.updateRefreshToken(userId, {
      refreshToken: '',
    });

    if (!affected) {
      throw new InternalServerErrorException();
    }
  }

  async refresh(currentUser: CurrentUser): Promise<Tokens> {
    const { userId, refreshToken } = currentUser;
    const user = await this.userRepository.selectUnique({ id: userId });

    if (!user) throw new NotFoundException();
    if (user.refreshToken !== refreshToken) throw new BadRequestException('');

    const tokenPayload = { userId };

    const { accessToken } = this.issueAccessToken(tokenPayload);

    return { accessToken, refreshToken };
  }

  async current({ id }: { id: number }): Promise<UserOutDto> {
    return this.userService.findOne({ id });
  }
}
