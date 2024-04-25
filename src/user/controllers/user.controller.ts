import { Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { UserService } from '../services/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  create() {}

  @Get(':id')
  findOne() {}
}
