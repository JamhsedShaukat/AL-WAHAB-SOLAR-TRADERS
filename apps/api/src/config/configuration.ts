import type { EnvVars } from "./env.validation";

export interface AppConfig {
  nodeEnv: string;
  isProduction: boolean;
  port: number;
  corsOrigins: string[];
  database: {
    url: string;
  };
  jwt: {
    secret: string;
    expiry: string;
    refreshExpiry: string;
  };
  rateLimit: {
    max: number;
    ttlSeconds: number;
  };
}

/** Shapes the validated environment into the config object services consume. */
export function configuration(env: EnvVars): AppConfig {
  return {
    nodeEnv: env.NODE_ENV,
    isProduction: env.NODE_ENV === "production",
    port: env.PORT,
    corsOrigins: env.CORS_ORIGIN.split(",")
      .map((origin) => origin.trim())
      .filter(Boolean),
    database: {
      url: env.DATABASE_URL,
    },
    jwt: {
      secret: env.JWT_SECRET,
      expiry: env.JWT_EXPIRY,
      refreshExpiry: env.JWT_REFRESH_EXPIRY,
    },
    rateLimit: {
      max: env.RATE_LIMIT_MAX,
      ttlSeconds: env.RATE_LIMIT_TTL,
    },
  };
}

/** Injection token / config namespace key. */
export const APP_CONFIG = "app";
