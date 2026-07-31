import "reflect-metadata";

import { Logger, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import helmet from "helmet";
import { AppModule } from "./app.module";
import { AllExceptionsFilter } from "@/common/filters/all-exceptions.filter";
import { ResponseInterceptor } from "@/common/interceptors/response.interceptor";
import { APP_CONFIG, type AppConfig } from "@/config";

const API_PREFIX = "api";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const config = app.get(ConfigService).getOrThrow<AppConfig>(APP_CONFIG);

  app.setGlobalPrefix(API_PREFIX);

  app.use(helmet());

  app.enableCors({
    origin: config.corsOrigins,
    credentials: true,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      // Strip unknown properties and reject requests that send them.
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: false },
    }),
  );

  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());

  app.enableShutdownHooks();

  await app.listen(config.port);

  new Logger("Bootstrap").log(
    `API listening on http://localhost:${config.port}/${API_PREFIX} (${config.nodeEnv})`,
  );
}

void bootstrap();
