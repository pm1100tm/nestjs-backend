import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';

import { UserService } from 'user/services/user.service';
import { CreateUserInDto } from 'user/dtos/req/create-user-in.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() createUserInDto: CreateUserInDto) {
    return this.userService.create(createUserInDto);
  }

  @Get(':id')
  findOne() {}
}
