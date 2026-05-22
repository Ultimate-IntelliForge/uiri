# Contract: Users, Team Members & Media

---

# Users

**Base URL**: `/users` | **Super Admin only** (all endpoints)

## GET /users

```json
{
  "data": [
    {
      "id": "cuid",
      "email": "...",
      "role": "DEPT_ADMIN",
      "departmentId": "cuid",
      "status": "ACTIVE",
      "lastLoginAt": "2026-05-21T..."
    }
  ],
  "total": 5
}
```

## POST /users

Create an admin user.

```json
{
  "email": "dept.admin@uiri.org",
  "password": "InitialPass123!",
  "role": "DEPT_ADMIN",
  "departmentId": "cuid"
}
```

**Response 201** — user object (no passwordHash in response).
**Response 409** — email already exists.

**Rules**:
- `departmentId` is required for `DEPT_ADMIN`, `BLOG_MANAGER`, `SYSTEM_AUDIT`.
- `departmentId` must be null for `SUPER_ADMIN`.

## PATCH /users/:id

Update role, department scope, or status.

```json
{
  "role": "BLOG_MANAGER",
  "departmentId": "cuid",
  "status": "INACTIVE"
}
```

## DELETE /users/:id

Deactivate (sets `status=INACTIVE`, revokes all refresh tokens).
Cannot delete own account.

---

# Team Members

**Base URL**: `/team-members`

## GET /departments/:deptId/team

List team members for a department. **Public**.

Returns only `status=ACTIVE` members; only the fields listed in `publicFields`.

```json
[
  {
    "id": "cuid",
    "fullName": "Dr. A. Smith",
    "jobTitle": "Head of Research",
    "publicBio": "...",
    "profilePhotoUrl": "https://..."
  }
]
```

Private fields (`biography`, `personalContact`, `internalNotes`) are NEVER returned.

## POST /team-members

**Dept Admin (own dept) or Super Admin**.

```json
{
  "fullName": "Dr. C. Jones",
  "jobTitle": "Researcher",
  "departmentId": "cuid",
  "biography": "Full internal bio...",
  "publicBio": "Public summary...",
  "profilePhotoUrl": "https://...",
  "publicFields": ["fullName", "jobTitle", "publicBio", "profilePhotoUrl"],
  "personalContact": "private@email.com"
}
```

## PATCH /team-members/:id

Update any field. Same role rules as POST.

## DELETE /team-members/:id

Deactivate (sets `status=INACTIVE`, hides from public listing).
Record is retained in the DB.

---

# Media Assets

**Base URL**: `/media`

## GET /media

List media assets.

- **Dept Admin / Blog Manager**: own department's assets only.
- **Super Admin**: all assets, filterable by `departmentId`.

**Query**: `?departmentId=cuid&type=IMAGE|DOCUMENT&page=1&limit=20`

```json
{
  "data": [
    {
      "id": "cuid",
      "fileName": "research-paper-q1.pdf",
      "fileType": "DOCUMENT",
      "storageUrl": "https://drive.google.com/file/d/...",
      "downloadUrl": "https://drive.google.com/uc?id=...",
      "uploadedAt": "2026-05-21T..."
    }
  ],
  "total": 12
}
```

## POST /media/upload

Upload a file. **Dept Admin or Blog Manager** (own dept).

**Content-Type**: `multipart/form-data`

| Field | Type | Description |
|---|---|---|
| `file` | File | The file to upload (image or document) |
| `departmentId` | string | Owning department |

**Response 201**
```json
{
  "id": "cuid",
  "fileName": "paper.pdf",
  "fileType": "DOCUMENT",
  "storageUrl": "https://drive.google.com/file/d/...",
  "downloadUrl": "https://drive.google.com/uc?id=...",
  "storageProviderRef": "google-drive-file-id"
}
```

## DELETE /media/:id

Delete from media library and Google Drive. **Dept Admin (own dept) or Super Admin**.

**Response 200** `{ "deleted": true }`

---

# Site Settings & Pages

**Base URL**: `/site-settings`, `/pages`

## GET /site-settings

Public fields only (no analytics keys in public response).

```json
{
  "instituteName": "ULTIMATE INTELLIFORGE RESEARCH INSTITUTE",
  "tagline": "...",
  "contactEmail": "info@uiri.org",
  "contactPhone": "+1...",
  "address": "...",
  "globalSocialLinks": { "linkedin": "https://..." }
}
```

## PATCH /site-settings

**Super Admin only**. Full update of any field.

---

## GET /pages

List pages. Public: only `visibility=PUBLIC`.
Authenticated: all pages for their dept scope.

## GET /pages/:slug

Get page by slug. Private pages return 403 for unauthenticated.

## POST /pages

**Super Admin or Dept Admin** (for dept-scoped pages).

```json
{
  "title": "About Software Department",
  "slug": "about",
  "bodyContent": "...",
  "visibility": "PUBLIC",
  "departmentId": "cuid",
  "metaTitle": "...",
  "metaDescription": "..."
}
```

## PATCH /pages/:id/visibility

Toggle page visibility. **Super Admin** for any; **Dept Admin** for own dept pages.

```json
{ "visibility": "PRIVATE" }
```

---

# Access Links

**Base URL**: `/access-links` | **Super Admin only**

## POST /access-links

Generate a one-use encrypted access link.

```json
{
  "targetId": "publication-cuid",
  "targetType": "publication",
  "expiresInHours": 72
}
```

**Response 201**
```json
{
  "id": "cuid",
  "token": "eyJ...",
  "accessUrl": "https://uiri.org/access/eyJ...",
  "expiresAt": "2026-05-24T00:00:00Z"
}
```

## GET /access/:token

**Public endpoint** — called when a partner opens the link.

- Verifies HMAC signature.
- Checks `status=ACTIVE` and `expiresAt > now`.
- Sets `usedAt`, `status=USED` atomically.
- Returns the content or redirects to Google Drive view link.

**Response 200** — redirects to content.
**Response 410** — link already used.
**Response 404** — token not found or invalid signature.
**Response 403** — link expired.

---

# Search

**Base URL**: `/search`

## GET /search?q=:query

Full-text search across published, public content.

**Query params**: `q` (required), `page`, `limit`

**Response 200**
```json
{
  "data": [
    {
      "type": "publication",
      "id": "cuid",
      "title": "...",
      "summary": "...",
      "department": { "name": "Software", "slug": "software" },
      "url": "/departments/software/advances-distributed-systems"
    },
    {
      "type": "department",
      "id": "cuid",
      "name": "Quantum Computing",
      "url": "/departments/quantum-computing"
    }
  ],
  "total": 3,
  "query": "distributed"
}
```

---

# Internal: Revalidation

**Base URL**: `/api/revalidate` (Next.js internal route, not NestJS)

## POST /api/revalidate

Called by NestJS after any content mutation to trigger ISR.

```json
{
  "paths": ["/departments/software", "/"],
  "secret": "REVALIDATION_SECRET"
}
```

**Response 200** `{ "revalidated": true }`
**Response 401** — invalid secret.
