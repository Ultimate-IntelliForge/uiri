# Contract: Publications

**Base URL**: `/publications`

---

## GET /publications

List publications.

- **Public (unauthenticated)**: returns only `status=PUBLISHED, visibility=PUBLIC`.
- **Dept Admin / Blog Manager**: returns all statuses for their department.
- **Super Admin**: returns all publications across all departments.

**Query params**:

| Param | Type | Description |
|---|---|---|
| `departmentId` | string | Filter by department |
| `type` | PubType | ARTICLE \| PROJECT_UPDATE \| NEWS \| ANNOUNCEMENT |
| `status` | PubStatus | Authenticated only |
| `page` | number | Default 1 |
| `limit` | number | Default 20, max 100 |

**Response 200**
```json
{
  "data": [
    {
      "id": "cuid",
      "title": "...",
      "summary": "...",
      "slug": "...",
      "type": "ARTICLE",
      "status": "PUBLISHED",
      "visibility": "PUBLIC",
      "author": { "id": "cuid", "fullName": "Dr. X" },
      "department": { "id": "cuid", "name": "Software", "slug": "software" },
      "publishedAt": "2026-05-21T00:00:00Z",
      "attachments": []
    }
  ],
  "total": 42,
  "page": 1,
  "limit": 20
}
```

---

## GET /publications/:id

Get a single publication.

- Public: only `PUBLISHED + PUBLIC`.
- Authenticated (scoped dept): `PUBLISHED + PRIVATE` + own dept drafts/pending.
- Super Admin: any.

**Response 404** for missing or inaccessible.

---

## POST /publications

Create a draft. **Blog Manager or Dept Admin** (own department).

**CSRF required**. **Auth required**.

```json
{
  "title": "Advances in Distributed Systems",
  "summary": "...",
  "slug": "advances-distributed-systems",
  "bodyContent": "...",
  "type": "ARTICLE",
  "visibility": "PUBLIC",
  "authorId": "cuid",
  "departmentId": "cuid",
  "attachmentIds": ["media-asset-cuid"]
}
```

**Response 201** — publication object with `status: "DRAFT"`.

---

## PATCH /publications/:id

Update a draft or rejected publication. Creator or Dept Admin (own dept).

```json
{
  "title": "Updated title",
  "bodyContent": "Updated body",
  "attachmentIds": ["new-media-id"]
}
```

**Response 200** — updated publication.
**Response 403** — not the creator or wrong department.

---

## POST /publications/:id/submit

Submit a draft for review. **Blog Manager** (own department).

**CSRF required**. **Auth required**.

**Response 200**
```json
{ "id": "cuid", "status": "PENDING", "submittedAt": "2026-05-21T..." }
```

**Response 422** — publication not in DRAFT or REJECTED status.

---

## POST /publications/:id/approve

Approve a pending publication. **Dept Admin** (own department).

**CSRF required**. **Auth required**.

**Response 200**
```json
{ "id": "cuid", "status": "PUBLISHED", "publishedAt": "2026-05-21T..." }
```

**Response 422** — not in PENDING status.

---

## POST /publications/:id/reject

Reject a pending publication with a reason. **Dept Admin** (own department).

**CSRF required**. **Auth required**.

```json
{ "reason": "The abstract is unclear. Please revise the introduction." }
```

**Response 200**
```json
{ "id": "cuid", "status": "REJECTED", "rejectionReason": "..." }
```

---

## DELETE /publications/:id

Soft-delete (unpublish and archive). **Dept Admin or Super Admin**.

**Response 200**
```json
{ "id": "cuid", "status": "DRAFT" }
```
