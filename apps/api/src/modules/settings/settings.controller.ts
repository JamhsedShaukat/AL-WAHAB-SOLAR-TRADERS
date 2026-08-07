import { Controller, Get } from "@nestjs/common";
import { Public } from "@/common/decorators";
import { SettingsService, type PublicContactSettings } from "./settings.service";

@Controller("settings")
export class SettingsController {
  constructor(private readonly settings: SettingsService) {}

  /**
   * Contact details the public site needs to render its CTAs. Deliberately a
   * narrow, whitelisted endpoint rather than a general settings reader.
   */
  @Public()
  @Get("contact")
  getContact(): Promise<PublicContactSettings> {
    return this.settings.getPublicContact();
  }
}
