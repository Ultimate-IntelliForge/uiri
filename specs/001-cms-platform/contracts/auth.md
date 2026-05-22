# Contract: Authentication

**Base URL**: `POST /auth`, `GET /auth`
**Auth**: All auth endpoints are public except `/auth/me` and `/auth/logout`

---

## POST /auth/login

Login with email and password.

**Request**
```json
{
  "email": "admin@uiri.org",
  "password": "SecurePass123!"
}
```

**Response 200** — Sets two cookies:
- `access_token` — httpOnly, Secure, SameSite=Strict, 15 min TTL
- `csrf_token` — readable (no httpOnly), Secure, SameSite=Strict, 15 min TTL

```json
{
  "user": {
    "id": "cuid",
    "email": "admin@uiri.org",
    "role": "SUPER_ADMIN",
    "departmentId": null
  }
}
```

**Response 401**
```json
{ "statusCode": 401, "message": "Invalid credentials" }
```

---

## POST /auth/refresh

Refresh the access token using the httpOnly refresh token cookie.

**Request**: No body. Reads `refresh_token` cookie.

**Response 200** — Rotates both tokens (sets new cookies).
```json
{ "ok": true }
```

**Response 401** — Token expired or revoked.
```json
{ "statusCode": 401, "message": "Session expired" }
```

---

## POST /auth/logout

**Auth required**: Yes (access_token cookie)
**CSRF**: Required header `X-CSRF-Token`

**Request**: No body.

**Response 200** — Revokes refresh token, clears all cookies.
```json
{ "ok": true }
```

---

## GET /auth/me

**Auth required**: Yes

**Response 200**
```json
{
  "id": "cuid",
  "email": "admin@uiri.org",
  "role": "DEPT_ADMIN",
  "departmentId": "cuid"
}
```
