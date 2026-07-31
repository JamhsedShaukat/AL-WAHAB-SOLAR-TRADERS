import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { APP_CONFIG, type AppConfig } from "@/config";

export interface HealthStatus {
  status: "ok";
  environment: string;
  uptimeSeconds: number;
  timestamp: string;
}

@Injectable()
export class HealthService {
  constructor(private readonly config: ConfigService) {}

  check(): HealthStatus {
    const app = this.config.getOrThrow<AppConfig>(APP_CONFIG);

    return {
      status: "ok",
      environment: app.nodeEnv,
      uptimeSeconds: Math.floor(process.uptime()),
      timestamp: new Date().toISOString(),
    };
  }
}
