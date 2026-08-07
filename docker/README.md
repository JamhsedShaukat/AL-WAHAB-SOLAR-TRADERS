# Docker

Dockerfiles and docker-compose configuration. Not yet configured — Phase 6.

Planned services: `api` (apps/api) and `web` (apps/web).

**No `postgres` service.** The database is Supabase-managed in every
environment, including local development, so there is no local Postgres
container to run. Containers take `DATABASE_URL` and `DIRECT_URL` from the
environment.

Note for whoever writes these: both apps consume `packages/*` as TypeScript
source, so an image build needs the workspace root as its build context — not
the app directory. The API image must also run `prisma generate` during build,
since the generated client is gitignored.
