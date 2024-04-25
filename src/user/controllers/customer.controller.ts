import { Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';

@Controller('customers')
export class CustomerController {
  constructor() {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  create() {}

  @Get(':id')
  findOne() {}
}
