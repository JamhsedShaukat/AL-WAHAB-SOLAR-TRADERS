import { Module } from "@nestjs/common";
import { SettingsController } from "./settings.controller";
import { SettingsService } from "./settings.service";

/**
 * Business settings, rate cards, pricing constants and site content.
 *
 * Only the whitelisted public contact endpoint exists so far; admin read/write
 * lands with the auth module behind @RequirePermissions("settings.read" | "settings.write").
 */
@Module({
  controllers: [SettingsController],
  providers: [SettingsService],
  exports: [SettingsService],
})
export class SettingsModule {}
