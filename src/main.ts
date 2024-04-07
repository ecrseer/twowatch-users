import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port =
    process.env.PORT || process.env.NODE_ENV === 'production' ? 3000 : 3046;
  console.log('🚀 ~ bootstrapd ~PORT:', port);
  app.enableCors();
  await app.listen(port);
}

bootstrap();
