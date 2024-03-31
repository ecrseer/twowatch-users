import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log('🚀 ~ bootstrap ~PORT:', 3046);
  await app.listen(3046);
}
bootstrap();
