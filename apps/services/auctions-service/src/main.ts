import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3001, '0.0.0.0');
  console.log(`Auctions service is running on: ${await app.getUrl()}`);
}
bootstrap();
