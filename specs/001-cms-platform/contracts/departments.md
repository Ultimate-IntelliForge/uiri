# Contract: Departments

**Base URL**: `/departments`

---

## GET /departments

List all active departments. **Public**.

**Query params**: none (archived depts never returned publicly)

**Response 200**
```json
[
  {
    "id": "cuid",
    "name": "Software Research",
    "slug": "software",
    "description": "...",
    "researchFocus": "...",
    "headResearcherName": "Dr. A. Smith",
    "accentColor": "#1E3A8A",
    "secondaryColor": null,
    "createdAt": "2026-05-21T00:00:00Z"
  }
]
```

---

## GET /departments/:slug

Get a single active department by slug. **Public**.

**Response 200** — same shape as list item, plus:
```json
{
  "...": "...",
  "recentPublications": [ /* last 5 published publications */ ],
  "teamMembers": [ /* active members, public fields only */ ]
}
```

**Response 404** if slug not found or department is archived.

---

## POST /departments

Create a department. **Super Admin only**.

**CSRF required**. **Auth required**.

**Request**
```json
{
  "name": "Quantum Computing",
  "slug": "quantum-computing",
  "description": "Research into quantum algorithms.",
  "researchFocus": "...",
  "headResearcherName": "Dr. B. Lee",
  "accentColor": "#7C3AED"
}
```

**Response 201**
```json
{ "id": "cuid", "slug": "quantum-computing", "...": "..." }
```

**Response 409** — slug already exists
```json
{ "statusCode": 409, "message": "Slug 'quantum-computing' is already in use" }
```

---

## PATCH /departments/:id

Update a department.

- **Super Admin**: can update all fields.
- **Dept Admin**: can update own department's `description`, `researchFocus`,
  `accentColor`, `secondaryColor`, `socialAccounts`.

**CSRF required**. **Auth required**.

**Request** — partial, any subset of fields.
```json
{
  "description": "Updated description.",
  "accentColor": "#059669"
}
```

**Response 200** — updated department object.

**Response 403** — Dept Admin attempting to update another department.

---

## DELETE /departments/:id

Archive a department (soft delete). **Super Admin only**.

**CSRF required**. **Auth required**.

**Response 200**
```json
{ "id": "cuid", "status": "ARCHIVED" }
```
