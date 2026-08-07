import {
  Controller,
  Get,
  ServiceUnavailableException,
} from "@nestjs/common";
import { Public } from "@/common/decorators";
import {
  HealthService,
  type HealthStatus,
  type ReadinessStatus,
} from "./health.service";

@Controller("health")
export class HealthController {
  constructor(private readonly health: HealthService) {}

  /** Liveness probe — point the EC2 target group at this. */
  @Public()
  @Get()
  check(): HealthStatus {
    return this.health.check();
  }

  /**
   * Readiness probe. Answers 503 when the database is unreachable so a load
   * balancer drains the instance rather than routing traffic to it.
   */
  @Public()
  @Get("ready")
  async ready(): Promise<ReadinessStatus> {
    const readiness = await this.health.ready();

    if (readiness.status !== "ready") {
      throw new ServiceUnavailableException("Database unreachable");
    }

    return readiness;
  }
}
