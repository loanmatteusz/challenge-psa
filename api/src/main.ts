import helmet from 'helmet';
import fastifyCookie from '@fastify/cookie';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { AllExceptionsFilter } from './modules/app-config/filters/all-exceptions.filter';
import { ValidationPipe } from '@nestjs/common';
import { configureAndBuildSwagger } from './modules/app-config/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  await app.register(fastifyCookie);

  app.use(helmet());
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.enableShutdownHooks();

  configureAndBuildSwagger(app);

  app.enableCors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3001, '0.0.0.0');
}
bootstrap();
