import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResultInterceptor } from './shared/interceptors/result.interceptor';
import { Validation } from './core/config/validation.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new ResultInterceptor());
  app.setGlobalPrefix('/api/v1');

  app.enableCors({
    origin: [
      "http://localhost:3000",
      "https://hopp.goruts.com",
      "https://admin-hopp.goruts.com",
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  app.useGlobalPipes(Validation.config)

  await app.listen(process.env.SERVER_PORT ?? 3000, "0.0.0.0");
}
bootstrap();
