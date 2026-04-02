import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResultInterceptor } from './shared/interceptors/result.interceptor';
import { AccountModule } from './modules/account/account.module';
import { ModuleConfig } from './core/config/module-config.config';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Database } from './core/config/database.config';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot(ModuleConfig.setup),
    TypeOrmModule.forRootAsync(Database.config),
    AccountModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: ResultInterceptor }
  ],
})
export class AppModule { }
