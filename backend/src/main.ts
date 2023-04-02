import { VersioningType } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { json, urlencoded } from 'express';
import helmet from 'helmet';
import { AppModule } from './app.module';
import EnvKey from './common/configs/env';
import { BEARER } from './common/constants';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService: ConfigService = app.get(ConfigService);

  // Common middlewares
  app.use(helmet());
  app.use(cookieParser());

  // Limit request size
  app.use(json({ limit: configService.get(EnvKey.MAX_REQUEST_SIZE) }));
  app.use(
    urlencoded({
      limit: configService.get(EnvKey.MAX_REQUEST_SIZE),
      extended: true,
    }),
  );

  // Setup prefix of all routes
  app.setGlobalPrefix(configService.get(EnvKey.BASE_PATH));

  // Setup cors
  const corsOptions: CorsOptions = {
    origin: configService.get(EnvKey.CORS_WHITE_LIST),
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'accept-language',
      'X-Timezone',
      'X-Timezone-Name',
      'X-Total-Count',
    ],
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
    exposedHeaders: ['X-Total-Count'],
  };
  app.enableCors(corsOptions);

  // Enable versioning
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: ['1'],
  });

  // Setup Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Document')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      BEARER,
    )
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(
    configService.get(EnvKey.SWAGGER_PATH),
    app,
    swaggerDocument,
  );

  // Listen
  await app.listen(configService.get(EnvKey.PORT));
}

bootstrap();
