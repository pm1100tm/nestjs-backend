import { Module } from '@nestjs/common';

import { AuthController } from './controllers/AuthController';

@Module({
  controllers: [AuthController],
})
export class AuthModule {}
