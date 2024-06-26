import {
  Controller,
  Body,
  HttpCode,
  HttpStatus,
  Res,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiTags, ApiBody } from '@nestjs/swagger';

import { TransformInterceptor } from 'interceptors/transform.interceptor';

import { AuthService } from 'auth/services/auth.service';

import { AccessTokenGuard } from 'auth/guards/accessToken.gurad';
import { RefreshTokenGuard } from 'auth/guards/refreshToken.gurad';

import { GetCurrentUser } from 'auth/decorators/get-current-user.decorator';

import { SignInInDto } from 'auth/dtos/signin-in.dto';
import { UserOutDto } from 'user/dto/res/user.out';

import { CurrentUser, Tokens } from 'auth/auth.types';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/signin')
  @ApiBody({
    type: SignInInDto,
  })
  async signin(
    @Body() signInInDto: SignInInDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Tokens> {
    const token = await this.authService.signin(signInInDto);
    const tokenString: string = JSON.stringify(token);

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
  @UseGuards(AccessTokenGuard)
  @Post('/signout')
  async signout(
    @GetCurrentUser() currentUser: CurrentUser,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    res.cookie('auth-cookie', '', {
      httpOnly: true,
    });

    return this.authService.signout({ userId: currentUser.userId });
  }

  @Post('/refresh')
  @UseGuards(RefreshTokenGuard)
  refresh(@GetCurrentUser() currentUser: CurrentUser): Promise<Tokens> {
    return this.authService.refresh(currentUser);
  }

  @UseInterceptors(TransformInterceptor)
  @HttpCode(HttpStatus.OK)
  @UseGuards(AccessTokenGuard)
  @Get('/current')
  current(@GetCurrentUser() currentUser: CurrentUser): Promise<UserOutDto> {
    return this.authService.current({ id: currentUser.userId });
  }
}
