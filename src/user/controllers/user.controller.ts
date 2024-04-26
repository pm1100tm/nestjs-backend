import {
  Controller,
  HttpCode,
  HttpStatus,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';

import { UserService } from 'user/services/user.service';

import { CreateUserInDto } from 'user/dtos/req/create-user-in.dto';
import { UserOutDto } from 'user/dtos/res/user.out';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() createUserInDto: CreateUserInDto) {
    return this.userService.create(createUserInDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<UserOutDto> {
    return this.userService.findOne({ id });
  }
}
