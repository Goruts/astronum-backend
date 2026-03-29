import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResultInterceptor } from './shared/interceptors/result.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new ResultInterceptor());
  app.setGlobalPrefix('/api/v1');

  await app.listen(process.env.SERVER_PORT ?? 3000, "0.0.0.0");
}
bootstrap();
