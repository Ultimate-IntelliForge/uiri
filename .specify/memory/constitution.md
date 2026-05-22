<!--
SYNC IMPACT REPORT
==================
Version change: 1.0.0 → 2.0.1 (PATCH: TBD decisions resolved — database, ORM, auth finalized;
  previously documented as 2.0.0 for the architecture/role/dark-mode changes)

Modified principles:
  - Principle I: "Full-Stack Next.js Architecture" → "Turborepo Monorepo Architecture"
    (NestJS REST API + Next.js frontend replaces Next.js Server Actions pattern)
  - Principle V: Role system expanded (Super Admin, Department Admin, Blog Manager, System Audit)
  - Principle VII: Dark mode requirement removed; light-mode-only mandated

Added sections / decisions:
  - Storage: Google Drive (v1), upgrade path TBD
  - Social media auto-post deferred to v2 — data model must accommodate it from day 1
  - Multi-language scope clarified: UI chrome only (i18n strings), all content in English
  - Private content access model: internal = role-gated; external = one-use encrypted link

Removed:
  - Next.js Server Actions as primary mutation mechanism (replaced by NestJS REST API)
  - Dark mode Tailwind variant requirement

Templates requiring updates:
  - .specify/templates/plan-template.md  ✅ compatible (Technical Context section handles monorepo)
  - .specify/templates/spec-template.md  ✅ compatible (user story structure unchanged)
  - .specify/templates/tasks-template.md ✅ compatible (web app / monorepo path option applies)
  - .specify/templates/constitution-template.md ✅ generic template — no project-specific changes needed

Resolved TBDs:
  - Database: Supabase (PostgreSQL free tier; Prisma connection string — easy migration to
    self-hosted PostgreSQL with no code changes required)
  - ORM: Prisma
  - Auth: Passport.js + JWT + httpOnly Cookie + CSRF token protection
Follow-up TODOs:
  - Confirm deployment targets: Vercel (web), Railway/Render/Fly.io (api)
  - Design token decisions (color palette) deferred to design phase
-->

# ULTIMATE INTELLIFORGE RESEARCH INSTITUTE — CMS Constitution

## Core Principles

### I. Turborepo Monorepo Architecture (NON-NEGOTIABLE)

The platform MUST be a **Turborepo monorepo** containing two applications and shared
packages. No single-repo, no polyrepo — one monorepo, one source of truth.

Monorepo layout:

```
apps/
  web/      ← Next.js App Router (public site + /admin dashboard, one deployment)
  api/      ← NestJS REST API (business logic, DB access, auth, file handling)
packages/
  ui/       ← shared shadcn/ui components consumed by web
  types/    ← shared Zod schemas + TypeScript types (single source of truth)
  config/   ← shared ESLint, TypeScript, Tailwind base configs
```

Rules:
- `apps/web` communicates with `apps/api` exclusively over the REST API — no direct DB
  calls from the frontend, no shared DB client between apps.
- `packages/types` is the contract layer; Zod schemas defined there are the authoritative
  shape for every API request/response pair.
- All environment secrets live in the app that owns them (`apps/api` for DB, JWT signing
  keys, etc.); `apps/web` only holds public API URL and public analytics keys.
- Deployment: `apps/web` → Vercel; `apps/api` → Railway / Render / Fly.io (TBD).

### II. CMS-First Content Model

Every piece of public-facing content MUST be editable through the admin panel without
a code change or redeployment.

- Hardcoded display strings (org name, descriptions, contact info, department details,
  research summaries) in React components are forbidden.
- Content MUST be stored in a structured database and served via the `apps/api` REST API.
- The admin dashboard (`apps/web/app/(admin)`) MUST provide CRUD interfaces for:
  site settings, departments, research projects, publications, team members, pages,
  and news/announcements.
- Adding a new research department MUST require only an admin CMS action — no code PR,
  no redeployment.

### III. Research Department Modularity

The Institute creates a new department for every successful research initiative — sometimes
multiple per week. The platform MUST absorb this growth without engineering intervention.

- **Department** is a first-class entity: name, slug, description, head researcher,
  research focus, status (active/archived), custom theme tokens, social media accounts,
  and associated projects/publications.
- Each department gets a dynamically generated public page (`/departments/[slug]`).
  New departments appear immediately after CMS creation — no code change required.
- Inter-department relationships (shared projects, cross-dept collaborations) MUST be
  expressible in the data model from day one.
- **Social media auto-post** is a planned v2 feature. The Department entity MUST carry
  social media account fields from day one so v2 has a data foundation to build on.

### IV. Type-Safe End-to-End

TypeScript MUST be used throughout — `apps/web`, `apps/api`, and all `packages/`.

- All data shapes crossing the `web ↔ api` boundary MUST be defined as Zod schemas in
  `packages/types` and validated on both sides (API response parsing on the frontend,
  request body validation in NestJS DTOs/pipes).
- Database query results MUST be typed via ORM-generated types; no `any` casts on DB
  output.
- `strict: true` is mandatory in every `tsconfig.json`; disabling strict flags requires
  written justification in the PR description.
- NestJS DTOs MUST use `class-validator` decorators aligned with the Zod schemas in
  `packages/types` (both express the same contract).

### V. Role-Based Access Control

The admin panel MUST enforce role separation from the first deployment. Every API
endpoint that mutates or reads protected data MUST verify the caller's role server-side
in `apps/api`. Client-side role checks are cosmetic only and MUST NOT be the sole gate.

**Platform-wide roles (Super Admin only creates these):**

| Role | Scope | Capabilities |
|---|---|---|
| Super Admin | Platform-wide | Full access; create/archive departments; grant all roles |
| Department Admin | Own department | Manage department content, team, approve publications |
| Blog Manager | Own department | Create/upload content; submit for Department Admin approval |
| System Audit | Own department | Read-only access to department audit logs and analytics |

Role system is designed for expansion: new roles are addable without schema migrations
(roles stored as a string enum / permission flags, not hard-coded in DB schema).

**Private content access model:**
- Internal access: any authenticated user with a role scoped to the owning department
  or a Super Admin can see private content.
- External access: Super Admin generates a one-use, time-limited encrypted link;
  partner uses a public key to decrypt. Link is invalidated on first use.

### VI. Performance & SEO

Public-facing pages represent the Institute's research reputation — they MUST load fast
and be fully indexable.

- All public pages in `apps/web` MUST use **Static Generation (SSG)** or
  **Incremental Static Regeneration (ISR)**. Purely client-side data fetching is
  forbidden for above-the-fold content on public routes.
- Core Web Vitals targets: **LCP < 2.5 s**, **CLS < 0.1**, **INP < 200 ms**.
- Every public page MUST export Next.js `metadata` (title, description, OG tags,
  canonical URL).
- Images MUST use `next/image`; raw `<img>` tags are forbidden in production code.
- Google Search Console and Google Analytics integrations are in scope for v1.

### VII. Component-Driven UI with shadcn/ui

The entire UI MUST be composed from **shadcn/ui** primitives on **Tailwind CSS v4**.
The platform is **light mode only** — dark mode is not in scope.

- Install components via the shadcn CLI (`npx shadcn@latest add <component>`); do not
  vendor-copy or manually recreate components that shadcn provides.
- Custom components MUST follow shadcn's composition pattern: accept a `className` prop,
  use `cn()` for merging, and delegate accessibility to Radix UI primitives.
- Design tokens (colours, spacing, typography) MUST be defined in
  `apps/web/src/styles/globals.css` as CSS custom properties.
  - **Global theme**: Institute-wide palette (TBD in design phase — must convey authority,
    innovation, and academic credibility).
  - **Per-department theme**: Each department MAY override accent colour and secondary
    palette tokens scoped to its route segment.
  - No hardcoded hex values in component files — always reference a CSS custom property.
- UI i18n (menus, buttons, labels) MUST support up to 10 languages via a standard i18n
  library (e.g., `next-intl`). All CMS-managed content remains in English.

## Technology Stack

These are the mandated technologies. Deviations require a constitution amendment.

| Concern | Choice |
|---|---|
| Monorepo tooling | Turborepo |
| Backend framework | NestJS (apps/api) |
| Frontend framework | Next.js App Router (apps/web) |
| Language | TypeScript 5.x (`strict: true`) everywhere |
| Styling | Tailwind CSS v4 |
| UI components | shadcn/ui + Radix UI |
| Forms | react-hook-form + Zod |
| Validation (API) | class-validator + class-transformer (NestJS DTOs) |
| Contract layer | Zod schemas in packages/types |
| Database | Supabase (PostgreSQL free tier; Prisma connection — portable to self-hosted PG) |
| ORM | Prisma |
| Auth | Passport.js + JWT + httpOnly Cookie + CSRF (NestJS); token forwarded to web via cookie |
| File storage | Google Drive API (v1); upgrade path TBD |
| State (client) | Server Components first; Zustand for complex client-only state only |
| i18n | next-intl (UI strings only; content stays English) |
| Icons | Lucide React |
| Animation | Framer Motion (sparingly; CSS transitions by default) |
| Deployment — web | Vercel |
| Deployment — api | Railway / Render / Fly.io (TBD) |
| Package manager | npm |

**Decisions marked TBD MUST be resolved and this section updated before the first
feature plan is written.**

## Development Workflow

- **Branch strategy**: `main` is always deployable. Feature work lives on
  `###-short-description` branches created by `/speckit-git-feature`.
- **Spec before code**: Every non-trivial feature MUST have a spec (`/speckit-specify`),
  plan (`/speckit-plan`), and task list (`/speckit-tasks`) before implementation begins.
- **API-first**: NestJS modules/controllers/DTOs MUST be defined and agreed before the
  Next.js frontend consumes them. `packages/types` schemas are the source of truth.
- **No magic migrations**: DB schema changes MUST be written as explicit migration files
  (`prisma migrate dev` or `drizzle-kit generate`), reviewed, and committed alongside
  the feature PR.
- **Commit granularity**: Each task in `tasks.md` SHOULD correspond to at least one
  commit. Commits MUST follow Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`).
- **Environment parity**: `.env.example` at root and in each app MUST be updated with
  every new env var. Secrets are never committed.
- **Code review gate**: All PRs touching `apps/web/app/(admin)` or `apps/api` auth/RBAC
  modules MUST be reviewed for RBAC correctness before merge.

## Governance

This constitution supersedes all other development practices and ad-hoc conventions.

- **Compliance**: All PRs MUST verify constitution compliance. The `plan.md`
  "Constitution Check" section is the formal gate; a failing gate blocks merge.
- **Amendments**: Any change to this document requires: (1) written rationale, (2) a
  version bump per semantic rules below, (3) an updated Sync Impact Report at the top
  of this file, (4) propagation to affected templates.
- **Versioning**:
  - `MAJOR` — backward-incompatible principle removal or redefinition.
  - `MINOR` — new principle, new mandatory technology, or materially expanded guidance.
  - `PATCH` — clarifications, wording, typo fixes, non-semantic refinements.
- **Complexity justification**: Any deviation from a principle MUST be justified via the
  `Complexity Tracking` table in `plan.md`.
- **Runtime guidance**: Use `CLAUDE.md` (project root) for AI-agent development guidance;
  that file MUST reference the current plan for up-to-date technical context.

**Version**: 2.0.1 | **Ratified**: 2026-05-21 | **Last Amended**: 2026-05-21
