import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResultInterceptor } from './shared/interceptors/result.interceptor';
import { AccountModule } from './modules/account/account.module';
import { ModuleConfig } from './core/config/module-config.config';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Database } from './core/config/database.config';
import { AppController } from './app.controller';
import { CacheModule } from "@nestjs/cache-manager"
import { Cache } from './core/config/cache.config';
import { BullModule } from '@nestjs/bullmq';
import { Bull } from './core/config/bull.config';
import { MailerModule } from './modules/mailer/mailer.module';

@Module({
  imports: [
    CacheModule.register(Cache.config),
    BullModule.forRootAsync(Bull.config),
    ConfigModule.forRoot(ModuleConfig.setup),
    TypeOrmModule.forRootAsync(Database.config),
    AccountModule,
    MailerModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: ResultInterceptor }
  ],
})
export class AppModule { }
