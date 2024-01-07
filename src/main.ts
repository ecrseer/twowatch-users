import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log('🚀 ~ bootstrap ~PORT:', 3042);
  await app.listen(3042);
}
bootstrap();
