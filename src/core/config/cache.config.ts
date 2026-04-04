import { CacheModuleOptions } from "@nestjs/cache-manager";

export class Cache {
  public static get config(): CacheModuleOptions {
    return {
      isGlobal: true,
    }
  }
}
