import { Type, plainToInstance } from "class-transformer";
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
  MinLength,
  validateSync,
} from "class-validator";

export enum NodeEnv {
  Development = "development",
  Test = "test",
  Production = "production",
}

/**
 * Every environment variable the API reads, validated once at boot. A missing
 * or malformed value fails startup rather than surfacing as a runtime error.
 *
 * Numeric fields carry an explicit `@Type(() => Number)`: environment values
 * always arrive as strings, and inferred property types emit `design:type` of
 * `Object`, so class-transformer cannot coerce them on its own.
 */
export class EnvVars {
  @IsEnum(NodeEnv)
  @IsOptional()
  NODE_ENV: NodeEnv = NodeEnv.Development;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(65535)
  @IsOptional()
  PORT: number = 3001;

  /** Supabase pooler, transaction mode (port 6543) — used for every query. */
  @IsString()
  @IsNotEmpty()
  DATABASE_URL!: string;

  /** Supabase pooler, session mode (port 5432) — used only by migrations. */
  @IsString()
  @IsNotEmpty()
  DIRECT_URL!: string;

  /**
   * Connections this process opens to the pooler. Keep it low: Supabase counts
   * every client against the project's pool, and an EC2 autoscaling group
   * multiplies whatever is set here by the number of instances.
   */
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  @IsOptional()
  DATABASE_POOL_MAX: number = 10;

  @IsString()
  @MinLength(32, {
    message: "JWT_SECRET must be at least 32 characters long",
  })
  JWT_SECRET!: string;

  @IsString()
  @IsOptional()
  JWT_EXPIRY: string = "15m";

  @IsString()
  @IsOptional()
  JWT_REFRESH_EXPIRY: string = "7d";

  /** Comma-separated list of allowed browser origins. */
  @IsString()
  @IsOptional()
  CORS_ORIGIN: string = "http://localhost:3000";

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  RATE_LIMIT_MAX: number = 100;

  /** Rate-limit window in seconds. */
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  RATE_LIMIT_TTL: number = 60;
}

export function validateEnv(raw: Record<string, unknown>): EnvVars {
  const parsed = plainToInstance(EnvVars, raw, {
    exposeDefaultValues: true,
    // Only the keys declared above matter; the process env carries hundreds.
    excludeExtraneousValues: false,
  });

  const errors = validateSync(parsed, { skipMissingProperties: false });

  if (errors.length > 0) {
    const details = errors
      .map(
        (e) =>
          `  - ${e.property}: ${Object.values(e.constraints ?? {}).join(", ")}`,
      )
      .join("\n");
    throw new Error(`Invalid environment configuration:\n${details}`);
  }

  return parsed;
}
