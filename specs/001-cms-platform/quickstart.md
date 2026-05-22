# Quickstart: UIRI CMS Platform

**Prerequisites**: Node.js 20+, npm 10+, Git, a Supabase project, a Google Drive
Service Account JSON key.

---

## 1. Clone & Install

```bash
git clone <repo-url> uiri-cms
cd uiri-cms
npm install          # installs all workspace dependencies via Turborepo
```

---

## 2. Environment Variables

Copy and fill in each app's env file:

```bash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
```

**apps/api/.env**

```env
# Supabase PostgreSQL — pooler for runtime
DATABASE_URL="postgresql://postgres.[ref]:[pw]@pooler.supabase.com:6543/postgres?pgbouncer=true"
# Supabase PostgreSQL — direct for migrations
DIRECT_URL="postgresql://postgres.[ref]:[pw]@pooler.supabase.com:5432/postgres"

JWT_SECRET="generate-with: openssl rand -hex 64"
JWT_ACCESS_EXPIRES_IN="15m"
JWT_REFRESH_EXPIRES_IN="7d"
CSRF_SECRET="generate-with: openssl rand -hex 32"

# Google Drive Service Account key file path
GOOGLE_SERVICE_ACCOUNT_KEY_PATH="./secrets/google-service-account.json"
GOOGLE_DRIVE_FOLDER_ID="your-shared-drive-folder-id"

# Next.js revalidation (shared secret)
REVALIDATION_SECRET="generate-with: openssl rand -hex 32"
WEB_BASE_URL="http://localhost:3000"

PORT=4000
```

**apps/web/.env**

```env
NEXT_PUBLIC_API_URL="http://localhost:4000"
REVALIDATION_SECRET="same-as-api"

# Google Analytics
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
```

---

## 3. Database Setup

```bash
# Run from repo root
cd apps/api
npx prisma migrate dev --name init
npx prisma generate
```

Seed the database with a Super Admin account:

```bash
npx ts-node prisma/seed.ts
# Default: admin@uiri.org / ChangeMe123! (change on first login)
```

---

## 4. Run in Development

From the repo root:

```bash
npm run dev
# Turborepo starts apps/api (port 4000) and apps/web (port 3000) in parallel
```

Visit:
- Public site: `http://localhost:3000`
- Admin dashboard: `http://localhost:3000/admin`
- API (health check): `http://localhost:4000/health`

---

## 5. Production Build

```bash
npm run build
# Turborepo builds packages first, then apps in parallel
```

Deploy:
- `apps/web` → Vercel (`vercel deploy`)
- `apps/api` → Railway / Render (`railway up` or via CI)

---

## 6. Verify Core Flows

After setup, confirm:

1. **Public site loads** — `GET /` returns 200 with institute homepage.
2. **Admin login** — POST `/auth/login` with seed credentials returns access token cookie.
3. **Create department** — Super Admin creates "Software" department; public page appears
   at `/departments/software`.
4. **Upload media** — Blog Manager uploads a PDF; Drive file ID saved in MediaAsset.
5. **Publication workflow** — Blog Manager drafts → submits → Dept Admin approves →
   article appears publicly.
6. **Access link** — Super Admin generates one-use link for a private publication;
   visiting it once works, second visit returns 410.
