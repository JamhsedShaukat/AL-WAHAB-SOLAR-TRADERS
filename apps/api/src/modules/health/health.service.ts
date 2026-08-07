import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { APP_CONFIG, type AppConfig } from "@/config";
import { PrismaService } from "@/database";

export interface HealthStatus {
  status: "ok";
  environment: string;
  uptimeSeconds: number;
  timestamp: string;
}

export interface ReadinessStatus {
  status: "ready" | "degraded";
  checks: {
    database: "up" | "down";
  };
  timestamp: string;
}

@Injectable()
export class HealthService {
  constructor(
    private readonly config: ConfigService,
    private readonly prisma: PrismaService,
  ) {}

  /** Liveness: is the process up? Deliberately has no dependencies. */
  check(): HealthStatus {
    const app = this.config.getOrThrow<AppConfig>(APP_CONFIG);

    return {
      status: "ok",
      environment: app.nodeEnv,
      uptimeSeconds: Math.floor(process.uptime()),
      timestamp: new Date().toISOString(),
    };
  }

  /** Readiness: can the process actually serve traffic? Checks the database. */
  async ready(): Promise<ReadinessStatus> {
    const databaseUp = await this.prisma.isHealthy();

    return {
      status: databaseUp ? "ready" : "degraded",
      checks: { database: databaseUp ? "up" : "down" },
      timestamp: new Date().toISOString(),
    };
  }
}
