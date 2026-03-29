import { ConfigModuleOptions } from '@nestjs/config';
import { cwd } from 'process';

export class ModuleConfig {
  public static get setup(): ConfigModuleOptions {
    return {
      isGlobal: true,
      envFilePath: cwd() + '/.env',
    };
  }
}
