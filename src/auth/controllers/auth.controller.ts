import { Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from 'auth/services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/signin')
  async signin() {}

  @HttpCode(HttpStatus.OK)
  @Post('/signout')
  async signout() {}

  @Post('/refresh')
  refresh() {}

  @HttpCode(HttpStatus.OK)
  @Get('/current')
  current() {}
}
