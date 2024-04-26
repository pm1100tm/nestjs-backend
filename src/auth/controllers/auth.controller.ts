import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

import { AuthService } from 'auth/services/auth.service';

import { SignInInDto } from 'auth/dtos/req/signin-in.dto';
import { Tokens } from 'auth/auth.types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/signin')
  async signin(
    @Body() signInInDto: SignInInDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Tokens> {
    const token = await this.authService.signin(signInInDto);
    const tokenString = JSON.stringify(token);

    res.setHeader(
      'Authorization',
      'Bearer ' + [token.accessToken, token.refreshToken],
    );
    res.cookie('auth-cookie', tokenString, {
      httpOnly: true,
    });

    return token;
  }

  @HttpCode(HttpStatus.OK)
  @Post('/signout')
  async signout() {}

  @Post('/refresh')
  refresh() {}

  @HttpCode(HttpStatus.OK)
  @Get('/current')
  current() {}
}
