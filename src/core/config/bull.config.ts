import { SharedBullAsyncConfiguration } from "@nestjs/bullmq";
import { ConfigModule, ConfigService } from "@nestjs/config";

export class Bull {
  public static get config(): SharedBullAsyncConfiguration {
    return {
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const REDIS_HOST = configService.get<string>("REDIS_HOST") ?? "localhost";
        const REDIS_PORT = configService.get<number>("REDIS_PORT") ?? 6379;
        const REDIS_PASSWORD = configService.get<string>("REDIS_PASSWORD") ?? "default";
        return {
          connection: {
            host: REDIS_HOST,
            port: REDIS_PORT,
            password: REDIS_PASSWORD,
          }
        }
      }
    }
  }
}
