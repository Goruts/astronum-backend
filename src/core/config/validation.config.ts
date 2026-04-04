import { ValidationPipe } from "@nestjs/common";

export class Validation {
  public static get config(): ValidationPipe {
    return new ValidationPipe({
      always: true,
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true
      }
    });
  }
}
