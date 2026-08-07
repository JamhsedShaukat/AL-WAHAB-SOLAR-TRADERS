import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { APP_GUARD } from "@nestjs/core";
import { ConfigModule } from "@/config";
import { APP_CONFIG, type AppConfig } from "@/config/configuration";
import { DatabaseModule } from "@/database";
import { AnalyticsModule } from "@/modules/analytics/analytics.module";
import { AuthModule } from "@/modules/auth/auth.module";
import { CatalogModule } from "@/modules/catalog/catalog.module";
import { DashboardModule } from "@/modules/dashboard/dashboard.module";
import { EstimatesModule } from "@/modules/estimates/estimates.module";
import { HealthModule } from "@/modules/health/health.module";
import { ProjectsModule } from "@/modules/projects/projects.module";
import { SettingsModule } from "@/modules/settings/settings.module";
import { UsersModule } from "@/modules/users/users.module";

@Module({
  imports: [
    ConfigModule,
    ThrottlerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const app = config.getOrThrow<AppConfig>(APP_CONFIG);
        return {
          throttlers: [
            {
              ttl: app.rateLimit.ttlSeconds * 1000,
              limit: app.rateLimit.max,
            },
          ],
        };
      },
    }),

    DatabaseModule,
    HealthModule,

    // Domain modules — one per bounded concept.
    AuthModule,
    UsersModule,
    CatalogModule,
    EstimatesModule,
    ProjectsModule,
    DashboardModule,
    AnalyticsModule,
    SettingsModule,
  ],
  providers: [
    // Rate limiting applies to every route by default.
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
})
export class AppModule {}
