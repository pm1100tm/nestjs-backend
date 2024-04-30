import {
  Controller,
  HttpCode,
  HttpStatus,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
  ForbiddenException,
  UseInterceptors,
} from '@nestjs/common';

import { AccessTokenGuard } from 'auth/guards/accessToken.gurad';
import { GetCurrentUser } from 'auth/decorators/get-current-user.decorator';

import { UserService } from 'user/services/user.service';

import { CreateUserInDto } from 'user/dtos/req/create-user-in.dto';
import { UserOutDto } from 'user/dtos/res/user.out';

import { CurrentUser } from 'auth/auth.types';
import { TransformInterceptor } from 'interceptors/transform.interceptor';

@UseInterceptors(TransformInterceptor)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() createUserInDto: CreateUserInDto) {
    return this.userService.create(createUserInDto);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AccessTokenGuard)
  @Get(':id')
  findOne(
    @GetCurrentUser() currentUser: CurrentUser,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserOutDto> {
    // TODO: Add permissoin Guard
    if (id !== currentUser.userId) throw new ForbiddenException();
    return this.userService.findOne({ id });
  }
}
