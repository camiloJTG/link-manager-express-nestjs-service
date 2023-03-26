import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  const swagger = new DocumentBuilder()
    .setTitle('link-manager-rest-service')
    .setDescription('Rest api for link manager project')
    .setVersion(config.get<string>('SWAGGER_VERSION'))
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swagger);
  SwaggerModule.setup('documentation', app, document);

  app.enableCors({ origin: config.get<string>('CORS_ORIGIN').split(',') });
  app.use(helmet());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(config.get<number>('PORT'));
}
bootstrap();
