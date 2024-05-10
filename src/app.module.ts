import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { LoggingInterceptor } from 'interceptors/logging.interceptor';

import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      ignoreEnvFile: false,
      envFilePath: `./src/configs/.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService,
      ): Promise<TypeOrmModuleOptions> => {
        return {
          type: 'postgres',
          host: configService.get<string>('DB_HOST'),
          port: Number(configService.get<number>('DB_PORT')),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_NAME'),
          namingStrategy: new SnakeNamingStrategy(),
          synchronize: false,
          logging: true,
          retryAttempts: 3, // default 10
          retryDelay: 3000, // default 3000
          entities: [__dirname + '/../**/*.entity.{js,ts}'],
          migrations: [__dirname + './migrations/*{.ts,.js}'],
          extra: {
            charset: 'utf8mb4_unicode_ci',
          },
        };
      },
      dataSourceFactory: async (options) => {
        if (!options) {
          throw new Error('Invalid options passed');
        }
        return addTransactionalDataSource(new DataSource(options));
      },
    }),
    UserModule,
    AuthModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    AppService,
  ],
})
export class AppModule {}
