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
import { ApiTags } from '@nestjs/swagger';

import { TransformInterceptor } from 'interceptors/transform.interceptor';

import { AccessTokenGuard } from 'auth/guards/accessToken.gurad';
import { GetCurrentUser } from 'auth/decorators/get-current-user.decorator';

import { UserService } from 'user/services/user.service';

import { CreateUserInDto } from 'user/dto/req/create-user-in.dto';
import { UserOutDto } from 'user/dto/res/user.out';
import { CreateUserOutDto } from 'user/dto/res/create-user-out.dto';

import { CurrentUser } from 'auth/auth.types';

@UseInterceptors(TransformInterceptor)
@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() createUserInDto: CreateUserInDto): Promise<CreateUserOutDto> {
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
