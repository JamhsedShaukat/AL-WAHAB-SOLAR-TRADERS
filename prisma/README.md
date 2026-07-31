# Prisma

Database schema, migrations and seed files. Not yet configured — Phase 3.

When adding the schema here:

- Models are `PascalCase`, columns are `snake_case` via `@map`
- UUID primary keys, `createdAt` / `updatedAt` on every model
- Derive the models from the data model in
  [../docs/02-technical-design.md](../docs/02-technical-design.md) §4
- Keep the enums aligned with the unions already declared in `@wahab/types`
  (`EstimateStatus`, `ProjectStatus`, `UserStatus`, `RoleKey`, …) so the API
  does not need a translation layer
- The Prisma client is consumed through `apps/api/src/database/`
