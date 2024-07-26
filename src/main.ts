import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = new Logger('App');

  const config = new DocumentBuilder()
    .setTitle('RESTFull API with NestJS')
    .setDescription('The RESTFull API documentation with NestJS')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);

  logger.log(`Server is running on: ${process.env.HOST}:${process.env.PORT}`);
  logger.log(`Documentation: ${process.env.HOST}:${process.env.PORT}/api/docs`);
}
bootstrap();
