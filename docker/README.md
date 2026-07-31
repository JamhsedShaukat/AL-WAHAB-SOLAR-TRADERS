# Docker

Dockerfiles and docker-compose configuration. Not yet configured — Phase 6.

Planned services: `postgres`, `api` (apps/api), `web` (apps/web).

Note for whoever writes these: both apps consume `packages/*` as TypeScript
source, so an image build needs the workspace root as its build context — not
the app directory. Persisted volumes belong in `docker/volumes/`, which is
already gitignored.
