import { Logger, Module, NestModule } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from 'nestjs-config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { HttpExceptionFilter } from './shared/filters/http-exception.filter';
import { LoggingInterceptor } from './shared/interceptors/logging.interceptor';
import { OperatorModule } from './operator/operator.module';
import { UserModule } from './user/user.module';
import { SharedModule } from './shared/shared.module';

import * as path from 'path';
import * as fs from 'fs';

// import { ConfigService } from 'nestjs-config';
import 'dotenv/config';

const port = +process.env.DB_PORT || 5432;
const host = process.env.DB_HOST || 'localhost';
const username = process.env.DB_USERNAME || 'nestjs';
const password = process.env.DB_PASSWORD || 'nestjs';
const database = process.env.DB_DATABASE || 'nestjs';
const synchronize = process.env.DB_SYNCHRONIZE ? process.env.DB_SYNCHRONIZE === 'true' : true;
const logging = process.env.DB_LOGGING ? process.env.DB_LOGGING === 'true' : true;

@Module({
  imports: [
    ConfigModule.load(
      path.resolve(__dirname, 'config/**/*.{ts,js}'),
    ),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: process.env.JWT_SECRET || 'jwtsecret12345!',
      signOptions: {
        expiresIn: process.env.JWT_EXPIRES || '30m'
      },
    }),
    SharedModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host,
      port,
      username,
      password,
      database,
      entities: [ __dirname + '/**/*.entity{.ts,.js}' ],
      synchronize,
      logging,
    }),
    OperatorModule,
    UserModule,
  ],
  controllers: [ AppController ],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    }
  ],
})
// export class AppModule implements NestModule {
export class AppModule {
  static host: string;
  static port: number;
  static prefix: string;
  static authEnabled: boolean;
  static environment: string;
  static isDev: boolean;

  constructor() {
    const logger = new Logger('AppModule');
    const dotenv = path.resolve(__dirname, '..', '.env');

    AppModule.host = process.env.API_HOST || 'localhost';
    AppModule.port = +process.env.API_PORT || 3000;
    AppModule.prefix = process.env.API_PREFIX || 'api/v1';
    AppModule.authEnabled = process.env.API_AUTH ? process.env.API_AUTH === 'true' : true;
    AppModule.environment = process.env.NODE_ENV || 'development';
    AppModule.isDev = AppModule.environment === 'development';

    logger.log(`API => ${JSON.stringify({
      host: AppModule.host,
      port: AppModule.port,
      prefix: AppModule.prefix,
      auth: AppModule.authEnabled,
      environment: AppModule.environment,
      isDev: AppModule.isDev,
    })}`);

    if (fs.existsSync(dotenv)) {
      logger.log(`Found .env at ${dotenv}`);
    } else {
      logger.warn(`WARNING: Cannot find .env at ${dotenv}`);
    }

    logger.log(`Database => ${JSON.stringify({ port, host, username, database, synchronize, logging })}`);

  }

  // configure(consumer: MiddlewareConsumer): void {
  //   consumer
  //     .apply(CorsMiddleware)
  //     .forRoutes( { path: '*', method: RequestMethod.ALL });
  // }
}
