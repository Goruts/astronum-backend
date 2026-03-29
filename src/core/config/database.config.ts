import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

export class Database {
  public static get config(): TypeOrmModuleAsyncOptions {
    return {
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'postgres',
          host: config.get<string>('DB_HOST') ?? 'localhost',
          username: config.get<string>('DB_USER') ?? 'astronum',
          database: config.get<string>('DB_NAME') ?? 'astronum',
          password: config.get<string>('DB_PASSWORD') ?? 'astronum_password',
          port: config.get<number>('DB_PORT') ?? 3000,
          autoLoadEntities: true,
          synchronize: config.get<string>('NODE_ENV') === 'development',
        };
      },
    };
  }
}
