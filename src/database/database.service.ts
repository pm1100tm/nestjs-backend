import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Injectable()
export class DatabaseService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get<string>('DB_HOST'),
      port: this.configService.get<number>('DB_PORT'),
      username: this.configService.get<string>('DB_USERNAME'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get<string>('DB_NAME'),
      namingStrategy: new SnakeNamingStrategy(),
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
      migrations: ['dist/migrations/*{.ts,.js}'],
      synchronize: false,
      logging: false,
      autoLoadEntities: true, // default false
      retryAttempts: 3, // default 10
      retryDelay: 3000, // default 3000
    };
  }
}
