# Research: UIRI CMS Platform

**Date**: 2026-05-21
**Branch**: `001-cms-platform`

---

## 1. Turborepo + NestJS + Next.js Monorepo

**Decision**: Turborepo v2 as the monorepo orchestrator with two apps (`web`, `api`) and
three shared packages (`ui`, `types`, `config`).

**Rationale**:
- Turborepo's remote cache eliminates redundant builds across apps — critical when
  `packages/types` changes and both apps need to rebuild.
- Parallel task execution (`turbo run build`) builds `api` and `web` simultaneously.
- Workspace protocol (`workspace:*`) ensures shared packages are always the local version.

**Monorepo task pipeline**:
```json
{
  "build": { "dependsOn": ["^build"] },
  "dev":   { "cache": false, "persistent": true },
  "lint":  { "dependsOn": ["^lint"] },
  "typecheck": { "dependsOn": ["^typecheck"] }
}
```

**Alternatives considered**:
- Nx: More powerful but heavier config overhead — unnecessary at startup scale.
- Simple npm workspaces without Turborepo: No caching/pipeline orchestration.

---

## 2. NestJS Module Architecture

**Decision**: Feature-based module structure. Each domain (auth, departments, publications,
users, media, pages, site-settings, access-links, audit, search) is its own NestJS module.

**Rationale**:
- NestJS modules enforce bounded contexts — aligns with the per-department RBAC model.
- Each module encapsulates: Controller → Service → Repository (Prisma access) → DTOs.
- Guards (`RolesGuard`, `DepartmentScopeGuard`) applied at controller level via decorators.

**Module dependency direction**:
```
AuthModule ← (imported by all modules needing auth)
PrismaModule ← (global, imported by all service modules)
UsersModule ← AuthModule
DepartmentsModule ← Publications, TeamMembers, Media, Pages
```

**Alternatives considered**:
- Shared service layer without modules: Loses NestJS DI benefits and testability.

---

## 3. Passport.js + JWT + httpOnly Cookie + CSRF

**Decision**: Two-token auth strategy:
- **Access token**: Short-lived JWT (15 min) stored in `httpOnly; Secure; SameSite=Strict`
  cookie — not accessible by JavaScript, immune to XSS.
- **Refresh token**: Long-lived (7 days), stored in DB (`RefreshToken` table), rotated on
  use, revocable.
- **CSRF protection**: Double-submit cookie pattern. NestJS generates a CSRF token on
  login; Next.js reads it from a readable cookie and sends it as `X-CSRF-Token` header
  on every state-changing request.

**Flow**:
```
POST /auth/login
  → validate credentials
  → issue access JWT (httpOnly cookie) + CSRF token (readable cookie)
  → store hashed refresh token in DB

POST /auth/refresh
  → validate refresh token from httpOnly cookie
  → rotate: revoke old, issue new refresh + new access JWT
  → validate CSRF header on all mutating requests

POST /auth/logout
  → revoke refresh token in DB
  → clear both cookies
```

**Passport strategies**: `passport-local` (login), `passport-jwt` (protected routes).

**Alternatives considered**:
- Bearer token in Authorization header + localStorage: Vulnerable to XSS — rejected.
- Clerk/Auth0: Adds third-party dependency and cost at scale — rejected for now.

---

## 4. Prisma + Supabase Configuration

**Decision**: Prisma ORM with Supabase's direct PostgreSQL connection string (port 5432)
for migrations and queries. Connection pooling via Supabase's built-in PgBouncer
(port 6543, `?pgbouncer=true` flag) for the deployed API.

**Two connection strings**:
```
# .env (api)
DATABASE_URL="postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:5432/postgres"
```

**schema.prisma datasource**:
```prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}
```

**Migration to self-hosted PostgreSQL**: Swap both connection strings — zero code changes.

**Rationale**: `directUrl` bypasses PgBouncer for Prisma migrations (which require
persistent connections). `DATABASE_URL` uses the pooler for runtime queries.

---

## 5. Google Drive API for Document Storage

**Decision**: Service Account authentication (not OAuth per-user) with a dedicated
UIRI Google Drive service account. Files are uploaded to a shared Drive folder.

**Flow**:
```
1. Admin uploads file via admin panel
2. NestJS receives multipart/form-data (Multer)
3. NestJS streams file to Google Drive via googleapis SDK
4. Drive returns fileId + webViewLink (preview) + webContentLink (download)
5. NestJS stores fileId, webViewLink, webContentLink in MediaAsset record
6. Front-end embeds webViewLink as an iframe preview
```

**Sharing**: Uploaded files are set to `reader` access for "anyone with the link"
for public documents, or left restricted for private ones (access link flow handles
private document delivery).

**Alternatives considered**:
- S3-compatible (Supabase Storage): Cleaner API but adds cost and complexity at startup.
  Designed as the v2 upgrade path via the storage-agnostic MediaAsset model.
- Direct file storage on server disk: Not portable, lost on redeploy.

---

## 6. One-Use Encrypted Access Links

**Decision**: HMAC-SHA256 signed tokens with expiry and single-use DB flag.

**Token structure** (URL-safe base64):
```
payload = { targetId, targetType, expiresAt, nonce: crypto.randomUUID() }
token   = base64url(payload) + "." + base64url(HMAC-SHA256(base64url(payload), SECRET_KEY))
```

**Verification flow**:
```
1. Super Admin POSTs /access-links → token generated, stored in AccessLink table (status=ACTIVE)
2. Partner GETs /access/[token]
3. NestJS: verify HMAC signature → check expiry → check status=ACTIVE → load content
4. NestJS: set AccessLink.usedAt = now(), status = USED (atomic DB update)
5. Return content (redirect to Drive webViewLink with short-lived signed URL, or stream)
6. Any subsequent request with same token → status=USED → 410 Gone
```

**Rationale**: No asymmetric crypto needed since the server both generates and verifies.
HMAC is faster and the nonce prevents token reuse attacks even if the payload is guessed.

---

## 7. Per-Department Theme Tokens (Tailwind CSS v4)

**Decision**: CSS custom properties scoped to a `data-dept` attribute on the
department page wrapper. Tailwind v4's `@theme` block defines the global defaults;
department pages override them inline.

**Pattern**:
```css
/* globals.css — Institute global theme */
@theme {
  --color-accent: #1E3A8A;       /* deep navy */
  --color-accent-foreground: #fff;
}
```

```tsx
/* DepartmentLayout.tsx */
<div
  data-dept={department.slug}
  style={{
    "--color-accent": department.accentColor ?? "var(--color-institute-accent)",
  } as React.CSSProperties}
>
  {children}
</div>
```

Tailwind utilities that reference `--color-accent` automatically pick up the scoped
value within the department wrapper.

**Rationale**: No runtime CSS injection, no CSS-in-JS. Pure CSS custom property
inheritance — zero JS overhead, SSR-safe.

---

## 8. next-intl Setup in App Router

**Decision**: `next-intl` v3 with the App Router middleware strategy.
- Route structure: `/[locale]/(public)/...` and `/[locale]/(admin)/...`
- Default locale `en` is used when no locale prefix is present.
- Translation JSON files in `apps/web/messages/[locale].json` (UI strings only).
- 10 languages: `en, fr, de, es, pt, ar, zh, ja, ko, ru`.

**Middleware** rewrites requests to the locale-prefixed paths transparently.
Content (articles, department descriptions) is always English — no content translation
needed in the data model.

---

## 9. ISR Strategy for Department & Publication Pages

**Decision**: ISR with 60-second revalidation + on-demand revalidation on publish.

- **Department pages** (`/departments/[slug]`): `revalidate = 60`. On-demand revalidation
  triggered by NestJS webhook call to Next.js revalidation endpoint when a department
  or publication changes.
- **Homepage** (`/`): `revalidate = 300` + on-demand on featured content change.
- **Individual publications** (`/departments/[slug]/[pubSlug]`): `revalidate = 60` +
  on-demand on publish/update.

**On-demand revalidation endpoint** in Next.js:
```
POST /api/revalidate
  Body: { path: "/departments/software", secret: REVALIDATION_SECRET }
  → revalidatePath(path)
```

NestJS calls this endpoint via an internal HTTP request after any content mutation.

---

## 10. Batch-Based Development Workflow (User Requirement)

**Decision**: The implementation is divided into 12 sequential batches. Each batch:
1. Gets its own git branch (`###-batch-N-description`) cut from `main`.
2. Represents a deployable, independently testable increment.
3. Is committed and merged back to `main` only after user approval.
4. Builds on the previous batch's output — batches are ordered by dependency.

**Batch dependency chain**:
```
Batch 1 (Foundation) → Batch 2 (Auth) → Batch 3 (DB Schema) →
Batch 4 (Departments) → Batch 5 (Publications) → Batch 6 (Team) →
Batch 7 (Media) → Batch 8 (Site Settings) → Batch 9 (Private Content) →
Batch 10 (Search & SEO) → Batch 11 (i18n) → Batch 12 (Polish)
```
