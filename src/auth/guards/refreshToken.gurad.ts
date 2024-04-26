import { Request as Req } from 'express';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload, Tokens } from 'auth/auth.types';

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { refreshToken } = this.extractTokenFromHeader(request);
    if (!refreshToken) {
      throw new UnauthorizedException();
    }

    try {
      const payload: JwtPayload = await this.jwtService.verifyAsync(
        refreshToken,
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        },
      );

      request.user = {
        ...payload,
        refreshToken,
      };
    } catch (e) {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Req): { refreshToken: string } {
    const cookies = request.headers?.cookie || '';
    const encodedJson = cookies.split('auth-cookie=')[1];
    if (!encodedJson.length) {
      throw new UnauthorizedException("There's no user auth to refresh");
    }

    const decodedJson = decodeURIComponent(encodedJson);
    const token: Tokens = JSON.parse(decodedJson);

    return { refreshToken: token.refreshToken };
  }
}
