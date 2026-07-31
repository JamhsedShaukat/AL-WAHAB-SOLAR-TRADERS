import { Module } from "@nestjs/common";
import { ConfigModule as NestConfigModule } from "@nestjs/config";
import { APP_CONFIG, configuration } from "./configuration";
import { validateEnv } from "./env.validation";

/**
 * Loads `.env`, validates it, and exposes the result under the `app` namespace
 * so services read typed config rather than `process.env` directly.
 */
@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: [".env.local", ".env"],
      validate: validateEnv,
      load: [
        () => ({ [APP_CONFIG]: configuration(validateEnv(process.env)) }),
      ],
    }),
  ],
})
export class ConfigModule {}
