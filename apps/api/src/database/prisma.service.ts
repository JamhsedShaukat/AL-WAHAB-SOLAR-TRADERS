import {
  Injectable,
  Logger,
  type OnModuleDestroy,
  type OnModuleInit,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";
import { APP_CONFIG, type AppConfig } from "@/config";

/**
 * Best-effort single-line description of a driver or Prisma error.
 *
 * Prisma spreads its message over several lines and, for connection failures,
 * the message is only a preamble ("Invalid `prisma.$queryRaw()` invocation:")
 * while the actionable part sits in `code` (ECONNREFUSED, ENOTFOUND, …). Lead
 * with the code so a misconfigured connection string is obvious in the log.
 */
function describeError(error: unknown): string {
  if (!(error instanceof Error)) return String(error);

  const code = (error as { code?: string }).code;
  const message = error.message.replace(/\s+/g, " ").trim();

  if (code && message) return `[${code}] ${message}`;
  return code ?? message ?? error.name;
}

/**
 * The single PrismaClient for this process. Prisma 7 connects through a driver
 * adapter rather than a bundled engine, so the pg pool is configured here.
 */
@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);
  private readonly isProduction: boolean;

  constructor(config: ConfigService) {
    const app = config.getOrThrow<AppConfig>(APP_CONFIG);

    super({
      adapter: new PrismaPg({
        connectionString: app.database.url,
        max: app.database.poolMax,
        // Hand idle connections back to Supavisor instead of holding a slot
        // for the life of the process — Supabase counts every open connection
        // against the project pool.
        idleTimeoutMillis: 30_000,
        // Fail fast on a bad host or a saturated pooler rather than hanging.
        connectionTimeoutMillis: 10_000,
      }),
      log: app.isProduction
        ? ["warn", "error"]
        : ["query", "info", "warn", "error"],
    });

    this.isProduction = app.isProduction;
  }

  async onModuleInit(): Promise<void> {
    try {
      await this.$connect();
      // $connect() only prepares the pool — with a driver adapter it resolves
      // even against an unreachable host. Issue a real query so a bad
      // connection string is caught at boot rather than on first request.
      await this.$queryRaw`SELECT 1`;
      this.logger.log("Database connected");
    } catch (error) {
      // Driver errors often carry an empty `message` and put the useful part in
      // `code` (e.g. ENOTFOUND, ECONNREFUSED), so fall back through both.
      const message = describeError(error);

      // In production an unreachable database is fatal — fail the deploy rather
      // than serve 500s. In development it is usually just unconfigured
      // credentials, so warn and let the app boot.
      if (this.isProduction) throw error;

      this.logger.warn(
        `Database unavailable, continuing without it: ${message}`,
      );
    }
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }

  /** Readiness probe: true when the database answers a trivial query. */
  async isHealthy(): Promise<boolean> {
    try {
      await this.$queryRaw`SELECT 1`;
      return true;
    } catch {
      return false;
    }
  }
}
