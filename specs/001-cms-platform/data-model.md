# Data Model: UIRI CMS Platform

**Date**: 2026-05-21 | **ORM**: Prisma | **DB**: PostgreSQL (Supabase)

---

## Entity Relationship Overview

```
SiteSettings (singleton)

Department (1) ──< Publication (many)
Department (1) ──< TeamMember (many)
Department (1) ──< Page (many, optional)
Department (1) ──< MediaAsset (many, optional)
Department (1) ──< User (many, optional — dept-scoped users)

Publication (1) ──< Publication_MediaAsset (many-to-many join)
Publication (many) >── TeamMember (1, optional author)

User (1) ──< AccessLink (many)
User (1) ──< AuditLog (many)
User (1) ──< MediaAsset (many, uploaded)
User (1) ──< RefreshToken (many)
```

---

## Full Prisma Schema

```prisma
// apps/api/prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")      // pooler (PgBouncer) for runtime
  directUrl = env("DIRECT_URL")        // direct connection for migrations
}

// ─────────────────────────────────────────────────────────────
// ENUMS
// ─────────────────────────────────────────────────────────────

enum DeptStatus {
  ACTIVE
  ARCHIVED
}

enum Visibility {
  PUBLIC
  PRIVATE
}

enum PubType {
  ARTICLE
  PROJECT_UPDATE
  NEWS
  ANNOUNCEMENT
}

enum PubStatus {
  DRAFT
  PENDING
  PUBLISHED
  REJECTED
}

enum MemberStatus {
  ACTIVE
  INACTIVE
}

enum Role {
  SUPER_ADMIN
  DEPT_ADMIN
  BLOG_MANAGER
  SYSTEM_AUDIT
  EXTERNAL_PARTY
}

enum UserStatus {
  ACTIVE
  INACTIVE
}

enum MediaType {
  IMAGE
  DOCUMENT
}

enum LinkStatus {
  ACTIVE
  USED
  EXPIRED
}

// ─────────────────────────────────────────────────────────────
// SITE SETTINGS — singleton (one row)
// ─────────────────────────────────────────────────────────────

model SiteSettings {
  id                         String   @id @default(cuid())
  instituteName              String   @default("ULTIMATE INTELLIFORGE RESEARCH INSTITUTE")
  tagline                    String?
  contactEmail               String?
  contactPhone               String?
  address                    String?
  // JSON: { "facebook": "url", "linkedin": "url", "x": "url", ... }
  globalSocialLinks          Json?
  googleAnalyticsId          String?
  searchConsoleVerifyToken   String?
  // IDs of departments to feature on homepage
  homepageFeaturedDeptIds    String[]
  // IDs of publications to feature on homepage
  homepageFeaturedPubIds     String[]
  updatedAt                  DateTime @updatedAt
}

// ─────────────────────────────────────────────────────────────
// DEPARTMENT
// ─────────────────────────────────────────────────────────────

model Department {
  id                 String       @id @default(cuid())
  name               String
  // URL key — unique, lowercase, hyphenated
  slug               String       @unique
  description        String?      @db.Text
  researchFocus      String?      @db.Text
  headResearcherName String?
  status             DeptStatus   @default(ACTIVE)
  // CSS hex value, e.g. "#1E3A8A". Overrides global accent on dept pages.
  accentColor        String?
  secondaryColor     String?
  // JSON: { "facebook": "url", "linkedin": "url", ... }
  // Reserved for v2 social auto-post — stored now, unused in v1.
  socialAccounts     Json?
  createdAt          DateTime     @default(now())
  updatedAt          DateTime     @updatedAt

  users        User[]
  publications Publication[]
  teamMembers  TeamMember[]
  pages        Page[]
  mediaAssets  MediaAsset[]
}

// ─────────────────────────────────────────────────────────────
// PAGE — CMS-managed static/semi-static pages
// ─────────────────────────────────────────────────────────────

model Page {
  id              String      @id @default(cuid())
  title           String
  // unique within a department scope (or globally for dept=null)
  slug            String
  bodyContent     String?     @db.Text
  visibility      Visibility  @default(PUBLIC)
  metaTitle       String?
  metaDescription String?
  departmentId    String?
  department      Department? @relation(fields: [departmentId], references: [id])
  publishedAt     DateTime?
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt

  @@unique([slug, departmentId])
}

// ─────────────────────────────────────────────────────────────
// PUBLICATION — articles, project updates, news, announcements
// ─────────────────────────────────────────────────────────────

model Publication {
  id              String      @id @default(cuid())
  title           String
  summary         String?
  bodyContent     String?     @db.Text
  type            PubType     @default(ARTICLE)
  // URL key within the department
  slug            String
  authorId        String?
  author          TeamMember? @relation(fields: [authorId], references: [id])
  departmentId    String
  department      Department  @relation(fields: [departmentId], references: [id])
  visibility      Visibility  @default(PUBLIC)
  status          PubStatus   @default(DRAFT)
  rejectionReason String?
  submittedAt     DateTime?
  publishedAt     DateTime?
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt

  attachments PublicationMedia[]

  @@unique([slug, departmentId])
}

// Join table: Publication ↔ MediaAsset (many-to-many)
model PublicationMedia {
  publicationId String
  mediaAssetId  String
  publication   Publication @relation(fields: [publicationId], references: [id])
  mediaAsset    MediaAsset  @relation(fields: [mediaAssetId], references: [id])
  sortOrder     Int         @default(0)

  @@id([publicationId, mediaAssetId])
}

// ─────────────────────────────────────────────────────────────
// TEAM MEMBER
// ─────────────────────────────────────────────────────────────

model TeamMember {
  id              String       @id @default(cuid())
  fullName        String
  jobTitle        String?
  departmentId    String
  department      Department   @relation(fields: [departmentId], references: [id])
  biography       String?      @db.Text  // internal full bio
  publicBio       String?      @db.Text  // the public-facing summary
  profilePhotoUrl String?
  // Array of field names that are visible publicly.
  // Allowed values: "fullName" | "jobTitle" | "publicBio" | "profilePhotoUrl"
  publicFields    String[]     @default(["fullName", "jobTitle"])
  personalContact String?      // private — never exposed via API
  internalNotes   String?      // private — never exposed via API
  status          MemberStatus @default(ACTIVE)
  createdAt       DateTime     @default(now())
  updatedAt       DateTime     @updatedAt

  publications Publication[]
}

// ─────────────────────────────────────────────────────────────
// USER — admin accounts only (no public user registration)
// ─────────────────────────────────────────────────────────────

model User {
  id           String     @id @default(cuid())
  email        String     @unique
  passwordHash String
  role         Role[]
  // null for SUPER_ADMIN; required for all other roles
  departmentId String?
  department   Department? @relation(fields: [departmentId], references: [id])
  status       UserStatus @default(ACTIVE)
  lastLoginAt  DateTime?
  createdAt    DateTime   @default(now())
  updatedAt    DateTime   @updatedAt

  refreshTokens RefreshToken[]
  accessLinks   AccessLink[]
  mediaAssets   MediaAsset[]
  auditLogs     AuditLog[]
}

// ─────────────────────────────────────────────────────────────
// REFRESH TOKEN — for JWT rotation
// ─────────────────────────────────────────────────────────────

model RefreshToken {
  id        String    @id @default(cuid())
  // stored as bcrypt hash, compared on use
  tokenHash String    @unique
  userId    String
  user      User      @relation(fields: [userId], references: [id])
  expiresAt DateTime
  revokedAt DateTime?
  createdAt DateTime  @default(now())
}

// ─────────────────────────────────────────────────────────────
// MEDIA ASSET — images and documents stored via Google Drive v1
// ─────────────────────────────────────────────────────────────

model MediaAsset {
  id                 String    @id @default(cuid())
  fileName           String
  fileType           MediaType
  // Google Drive webViewLink (preview)
  storageUrl         String
  // Google Drive webContentLink (download) — null for images
  downloadUrl        String?
  // Google Drive fileId — used for deletion and access control
  storageProviderRef String
  uploadedById       String
  uploadedBy         User      @relation(fields: [uploadedById], references: [id])
  departmentId       String?
  department         Department? @relation(fields: [departmentId], references: [id])
  uploadedAt         DateTime  @default(now())

  publicationAttachments PublicationMedia[]
}

// ─────────────────────────────────────────────────────────────
// ACCESS LINK — one-use encrypted links for external partners
// ─────────────────────────────────────────────────────────────

model AccessLink {
  id           String     @id @default(cuid())
  // ID of the target content item
  targetId     String
  // "publication" | "page" | "media_asset"
  targetType   String
  // HMAC-SHA256 signed token (unique, stored for lookup)
  token        String     @unique
  createdById  String
  createdBy    User       @relation(fields: [createdById], references: [id])
  expiresAt    DateTime
  usedAt       DateTime?
  status       LinkStatus @default(ACTIVE)
  createdAt    DateTime   @default(now())
}

// ─────────────────────────────────────────────────────────────
// AUDIT LOG — immutable record of admin actions
// ─────────────────────────────────────────────────────────────

model AuditLog {
  id               String   @id @default(cuid())
  actorId          String
  actor            User     @relation(fields: [actorId], references: [id])
  // dot-namespaced action: "department.created", "publication.approved", etc.
  action           String
  targetEntityType String
  targetEntityId   String
  // additional context as JSON blob
  metadata         Json?
  // null for super_admin actions with no dept scope
  departmentScope  String?
  timestamp        DateTime @default(now())

  @@index([actorId])
  @@index([departmentScope])
  @@index([timestamp])
}
```

---

## State Transitions

### Publication Status

```
DRAFT ──[submit]──> PENDING ──[approve]──> PUBLISHED
                          └──[reject]───> REJECTED ──[edit+resubmit]──> PENDING
PUBLISHED ──[unpublish]──> DRAFT
```

### Department Status

```
ACTIVE ──[archive]──> ARCHIVED
ARCHIVED ──[restore]──> ACTIVE
```

### AccessLink Status

```
ACTIVE ──[first access]──> USED  (immediate, atomic)
ACTIVE ──[expiry check]──> EXPIRED (background or on-access check)
```

### User Status

```
ACTIVE ──[deactivate]──> INACTIVE
INACTIVE ──[reactivate]──> ACTIVE
```

---

## Indexes (beyond Prisma defaults)

| Table | Index | Reason |
|---|---|---|
| AuditLog | `departmentScope` | Dept Admin audit view filtering |
| AuditLog | `timestamp` | Time-range queries on audit screen |
| Publication | `departmentId, status` | Content queue per dept admin |
| Publication | `visibility, status, publishedAt` | Public listing queries |
| AccessLink | `token` | Unique lookup on every access attempt |
| RefreshToken | `tokenHash` | Lookup on refresh flow |

---

## Validation Rules (Zod — packages/types)

| Field | Rule |
|---|---|
| `Department.slug` | `^[a-z0-9-]+$`, 3–60 chars, no leading/trailing dash |
| `User.email` | valid email format |
| `User.passwordHash` | password (pre-hash): min 12 chars, 1 upper, 1 number |
| `Publication.title` | 3–200 chars |
| `Publication.summary` | max 500 chars |
| `TeamMember.publicFields` | subset of allowed field names |
| `AccessLink.expiresAt` | must be in the future |
| `MediaAsset.fileType` | IMAGE or DOCUMENT enum |
