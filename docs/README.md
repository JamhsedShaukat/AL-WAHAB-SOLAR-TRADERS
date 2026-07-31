# Documentation

Specification set for the v2.0 rebuild. Read in order; `03-design-system.md` is
the main build brief for screens.

| File                                                             | What it covers                                                                |
| ---------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| [00-handover.md](00-handover.md)                                 | Reading order and the build brief                                             |
| [01-prd.md](01-prd.md)                                           | Product requirements, personas, 90+ numbered requirements, acceptance criteria |
| [02-technical-design.md](02-technical-design.md)                  | Architecture, full data model, pricing engine, security, deployment            |
| [03-design-system.md](03-design-system.md)                       | Design tokens, component library, screen-by-screen specs (S-01 … S-22)        |
| [04-information-architecture.md](04-information-architecture.md) | Sitemap, route map, state machines, notification matrix, analytics taxonomy    |
| [05-admin-panel.md](05-admin-panel.md)                           | All admin modules (A-01 … A-22) with columns, filters and permissions          |
| [06-content-copy-deck.md](06-content-copy-deck.md)               | Every user-facing string, English + Urdu                                      |
| [07-implementation-plan.md](07-implementation-plan.md)           | Milestones, estimates, risks, budget                                          |
| [progress.md](progress.md)                                       | Build log for the marketing site (historical)                                 |

## Architecture note

`02-technical-design.md` predates the current direction and describes a
Supabase-backed single Next.js app. The repo now uses a standalone NestJS API
with Prisma and PostgreSQL — see the *Known inconsistency* section in
[../CLAUDE.md](../CLAUDE.md). These docs remain authoritative for domain
content: data model, pricing engine, permission matrix, screens and copy.

Design-tool exports and the static reference screens live in
[../design](../design).
