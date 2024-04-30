import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { TransformInterceptor } from 'interceptors/transform.interceptor';

@UseInterceptors(TransformInterceptor)
@Controller('customers')
export class CustomerController {
  constructor() {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  create() {}

  @Get(':id')
  findOne() {}
}
