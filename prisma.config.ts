import path from "node:path";
import { config as loadEnv } from "dotenv";
import { defineConfig } from "prisma/config";

// The database credentials belong to the API, so read that app's env file
// rather than introducing a second copy at the repo root.
loadEnv({ path: path.join(__dirname, "apps/api/.env") });

// `prisma generate` needs no database, and it runs on postinstall — including on
// a fresh clone that has no .env yet. Reading process.env directly (rather than
// Prisma's `env()` helper, which throws on a missing key) keeps generate working
// while still failing loudly for commands that do need to connect.
const UNSET = "postgresql://unset";

const url = process.env.DATABASE_URL ?? UNSET;
const directUrl = process.env.DIRECT_URL ?? process.env.DATABASE_URL ?? UNSET;

if (url === UNSET && process.argv.some((arg) => arg !== "generate")) {
  console.warn(
    "[prisma] DATABASE_URL is not set — copy apps/api/.env.example to " +
      "apps/api/.env before running migrations.",
  );
}

export default defineConfig({
  schema: path.join(__dirname, "prisma/schema.prisma"),

  migrations: {
    path: path.join(__dirname, "prisma/migrations"),
    seed: "tsx prisma/seed.ts",
  },

  datasource: {
    // Runtime queries go through Supabase's Supavisor pooler (port 6543).
    url,
    // Migrations need a session-mode connection, so they bypass the pooler and
    // talk to Postgres directly (port 5432). Without this, `migrate` fails
    // against Supabase because the advisory locks it takes do not survive
    // transaction pooling.
    directUrl,
  },
});
