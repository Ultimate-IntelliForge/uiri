# Feature Specification: UIRI CMS Platform

**Feature Branch**: `001-cms-platform`

**Created**: 2026-05-21

**Status**: Draft

**Input**: Full-conversation discovery session — company portfolio + content management
system for ULTIMATE INTELLIFORGE RESEARCH INSTITUTE (UIRI).

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Public Visitor Browses the Institute (Priority: P1)

A researcher, student, potential partner, or investor visits the public website to
learn about UIRI, discover its departments, understand its research focus, read
publications, and find contact information.

**Why this priority**: This is the primary face of the institute. Every other feature
depends on having a compelling, navigable public site. This is the MVP that must work
before any other story matters.

**Independent Test**: A person with no login credentials can open the site, navigate to
any department page, read a published article, view team member names, and reach the
contact page — all without ever seeing an admin screen or hitting an error.

**Acceptance Scenarios**:

1. **Given** a visitor lands on the homepage, **When** the page loads, **Then** they see
   the institute name, a hero statement, a curated selection of featured research and
   departments, and a navigation menu to all public sections.

2. **Given** a visitor clicks on a department, **When** the department page loads,
   **Then** they see the department name, description, research focus, published projects,
   publications, and team members — styled with that department's own visual accent.

3. **Given** a visitor navigates to the departments listing, **When** the page loads,
   **Then** they see all active departments; archived departments are not shown.

4. **Given** a visitor opens a published research article, **When** the article page loads,
   **Then** they can read the full content and, if a document is attached, preview or
   download it.

5. **Given** a visitor selects a language from the language switcher, **When** they choose
   a supported language (up to 10), **Then** all navigation, buttons, labels, and UI
   chrome switch to that language; article and research content remains in English.

6. **Given** a visitor attempts to access a page marked private, **When** they request
   the URL, **Then** they receive an access-denied response; the content is not exposed.

---

### User Story 2 — Blog Manager Creates & Submits Department Content (Priority: P2)

A Blog Manager for a specific department creates new content (research write-ups,
announcements, project updates), attaches supporting documents, and submits the content
for approval before it becomes publicly visible.

**Why this priority**: Content is the core value of the platform. Without a reliable
creation-and-approval workflow the site cannot stay current with research activity.

**Independent Test**: A Blog Manager logs in, creates a new article with title, body,
and attached document, submits it for review, and sees it listed as "Pending" — all
without requiring a super admin to configure anything new.

**Acceptance Scenarios**:

1. **Given** a Blog Manager is logged in, **When** they create a new article with a
   title, summary, body, and optional attached document, **Then** the article is saved
   as a draft visible only to the creator and their Department Admin.

2. **Given** a Blog Manager has a saved draft, **When** they submit it for review,
   **Then** the status changes to "Pending Approval" and the Department Admin is notified.

3. **Given** a Blog Manager uploads a document file, **When** the upload completes,
   **Then** the file is stored in institute cloud storage and a preview link is available
   to embed in the article.

4. **Given** a Blog Manager's article is rejected, **When** they view the article,
   **Then** they see the rejection reason and can edit and re-submit.

5. **Given** a Blog Manager tries to access another department's drafts, **When** they
   attempt it, **Then** access is denied.

---

### User Story 3 — Department Admin Manages Department Content & Team (Priority: P3)

A Department Admin reviews submitted content, approves or rejects publications, manages
team member profiles, and keeps the department page up to date.

**Why this priority**: Department Admins are the quality gate for all published content.
Without this role, the approval workflow breaks and content either never publishes or
publishes unreviewed.

**Independent Test**: A Department Admin logs in, approves a pending article making it
publicly visible, then adds a new team member — all within their department's scope with
no access to other departments.

**Acceptance Scenarios**:

1. **Given** a Department Admin approves a pending article, **When** the action is saved,
   **Then** the article becomes publicly visible on the department page immediately.

2. **Given** a Department Admin rejects an article with a written reason, **When** the
   action is saved, **Then** the article returns to draft status and the Blog Manager is
   notified of the rejection reason.

3. **Given** a Department Admin creates a team member profile, **When** they save name,
   title, bio, and photo, **Then** the profile appears on the public department page
   showing only fields marked public; private fields are never shown publicly.

4. **Given** a Department Admin edits the department description or research focus,
   **When** they save changes, **Then** the public department page reflects the update.

5. **Given** a Department Admin tries to access another department's data or global
   settings, **When** they attempt it, **Then** access is denied.

---

### User Story 4 — Super Admin Manages the Platform (Priority: P4)

The Super Admin controls the entire platform: creates and archives departments, creates
and assigns user accounts with specific roles, manages global site settings, and controls
page-level visibility.

**Why this priority**: Without Super Admin capabilities, departments cannot be created,
users cannot be granted access, and the platform cannot be configured.

**Independent Test**: A Super Admin logs in, creates a new department, creates a user
account, assigns that user as the Department Admin for the new department, then toggles
a page to private — all in one session.

**Acceptance Scenarios**:

1. **Given** a Super Admin creates a new department, **When** they provide a name, slug,
   description, research focus, and optional accent colour, **Then** a new public
   department page is immediately available at its unique URL (initially empty).

2. **Given** a Super Admin creates a user account, **When** they assign a role and
   department scope, **Then** the user can log in and perform only their permitted actions.

3. **Given** a Super Admin toggles a page or content item to "Private", **When** the
   change is saved, **Then** public visitors can no longer access that content; it is
   visible only to authenticated internal users with the appropriate department scope.

4. **Given** a Super Admin archives a department, **When** confirmed, **Then** the
   department is removed from the public listing but its content is retained in the admin.

5. **Given** a Super Admin updates global site settings, **When** changes are saved,
   **Then** all public pages reflect the updated information.

6. **Given** a Super Admin generates an access link for a private content item, **When**
   the link is created, **Then** a one-use encrypted link is produced that can be shared
   with an external partner; on first use it works and is then permanently invalidated.

---

### User Story 5 — Internal Staff Access Private Content (Priority: P5)

Authenticated staff members can view content marked private for their department —
including draft research, internal documents, and restricted publications.

**Why this priority**: Not all research is ready for public release. Staff need secure
access to in-progress or sensitive material.

**Independent Test**: A Department Admin can view a private document in their department
that a public visitor cannot access — confirmed by checking the same URL logged out.

**Acceptance Scenarios**:

1. **Given** a staff member is logged in with a role scoped to a department, **When**
   they navigate to a private content item in that department, **Then** they can view it.

2. **Given** a staff member is logged in but scoped to a different department, **When**
   they try to access private content from another department, **Then** access is denied.

3. **Given** a Super Admin is logged in, **When** they access any private content,
   **Then** they can view it regardless of department.

---

### User Story 6 — Visitor Discovers Research via Search & Navigation (Priority: P6)

A visitor wants to find specific research topics, departments, or publications without
knowing the exact URL.

**Why this priority**: As content grows across multiple departments, discoverability
becomes critical. A site nobody can find or navigate negates all content effort.

**Independent Test**: A visitor uses the site search bar to find a published article by
keyword, AND a search engine can index and return the main public pages for the
institute's name.

**Acceptance Scenarios**:

1. **Given** a visitor uses the site's search, **When** they type a keyword, **Then**
   matching published articles, departments, and projects are returned.

2. **Given** a search engine crawler visits the site, **When** it reads a public page,
   **Then** the page has a proper title, meta description, and OG tags.

3. **Given** the institute's name is searched on Google, **When** results appear, **Then**
   the site appears with accurate title, description, and site links.

---

### Edge Cases

- A department is archived but its published articles are linked externally: articles
  remain accessible via direct URL; the department no longer appears in the listing.
- A Blog Manager submits content but their Department Admin account is inactive: content
  remains pending; Super Admin is notified to reassign or action it.
- A one-use access link is accessed a second time: the link is already invalidated and
  the requester receives an "access expired" message.
- Cloud storage is unavailable during a file upload: upload fails gracefully with a
  user-facing error; no orphaned records are created in the database.
- An admin creates a department with a slug that already exists: system rejects with a
  duplicate-slug error before saving.
- A visitor's browser language is not among the 10 supported UI languages: site defaults
  to English.
- A team member profile is marked inactive: the profile is hidden from the public team
  listing but retained in the admin panel.

---

## Requirements *(mandatory)*

### Functional Requirements

**Public Site**

- **FR-001**: System MUST display a homepage with institute hero content, featured
  departments, and recent publications — all sourced from the CMS with no hardcoded text.
- **FR-002**: System MUST display a public listing page of all active departments.
- **FR-003**: System MUST display a public detail page for each active department at a
  unique URL derived from the department's slug.
- **FR-004**: System MUST display published research articles, projects, and news for
  each department on the department's detail page.
- **FR-005**: System MUST display a team listing per department showing only public
  profile fields (name, title, public bio, photo); private fields MUST never appear
  publicly.
- **FR-006**: System MUST support a UI language switcher for up to 10 languages; all
  content text remains in English.
- **FR-007**: System MUST return an access-denied response for any content or page marked
  private, without revealing the content to unauthenticated visitors.
- **FR-008**: System MUST serve all public pages with metadata (title, description, OG
  tags, canonical URL) suitable for search engine indexing.
- **FR-009**: System MUST provide a site-wide public search returning published articles,
  departments, and projects matching a keyword query.
- **FR-010**: System MUST include a public About, Contact, and News/Announcements page,
  all editable from the admin.

**Content Creation & Approval Workflow**

- **FR-011**: System MUST allow a Blog Manager to create article drafts with title,
  summary, structured body, and optional document attachment.
- **FR-012**: System MUST allow a Blog Manager to upload document and image files; files
  are stored in institute cloud storage and a preview/download link is returned.
- **FR-013**: System MUST allow a Blog Manager to submit a draft for review, changing its
  status to "Pending Approval".
- **FR-014**: System MUST notify the Department Admin when an article is submitted for
  review.
- **FR-015**: System MUST allow a Department Admin to approve a pending article, making
  it publicly visible immediately.
- **FR-016**: System MUST allow a Department Admin to reject a pending article with a
  written reason; the article returns to draft and the Blog Manager is notified.
- **FR-017**: System MUST allow a Department Admin to update their department's name,
  description, research focus, and accent theme tokens.
- **FR-018**: System MUST allow a Department Admin to create, update, and deactivate team
  member profiles within their department, controlling which profile fields are public.

**Platform Administration**

- **FR-019**: System MUST enforce four roles — Super Admin, Department Admin, Blog
  Manager, System Audit — with non-overlapping, server-enforced permission sets.
- **FR-020**: System MUST restrict Department Admin and Blog Manager access to their
  assigned department only; cross-department access MUST be denied at the server level.
- **FR-021**: System MUST allow a Super Admin to create, edit, and archive departments.
- **FR-022**: System MUST allow a Super Admin to create user accounts and assign a role
  and department scope.
- **FR-023**: System MUST allow a Super Admin to toggle the visibility (public / private)
  of any page or content item across the platform.
- **FR-024**: System MUST allow a Super Admin to update global site settings: institute
  name, contact details, address, and global social media links.
- **FR-025**: System MUST allow a Super Admin to generate a one-use, time-limited
  encrypted access link for any private content item.
- **FR-026**: System MUST permanently invalidate a one-use access link after it is
  opened for the first time.
- **FR-027**: System MUST allow authenticated staff to access private content scoped to
  their department while denying access to other departments' private content.
- **FR-028**: System MUST provide a System Audit role with read-only access to department
  content and activity/audit logs.
- **FR-029**: System MUST authenticate admin users via a secure login form with
  session management protected against common web attacks.

**Media & Storage**

- **FR-030**: System MUST allow document and image uploads from the admin panel; files
  are stored in institute cloud storage and linkable within content items.
- **FR-031**: System MUST provide an in-admin document preview for uploaded files.
- **FR-032**: System MUST provide a media library view where admins can browse and
  reuse previously uploaded files scoped to their department (Super Admin sees all).

**Analytics & Integrations**

- **FR-033**: System MUST integrate with Google Analytics to track public visitor
  behaviour and report data in the admin dashboard.
- **FR-034**: System MUST support Google Search Console registration via a verification
  meta tag or file managed from the admin panel.

### Key Entities

- **SiteSettings**: Institute name, tagline, contact email, contact phone, address,
  global social media links, Google Analytics ID, Search Console verification token,
  homepage featured department IDs, homepage featured publication IDs.

- **Department**: Name, slug (unique), description, research focus summary, head
  researcher name, status (active/archived), accent theme tokens, social media account
  fields (reserved for v2 auto-post), created date.

- **Page**: Title, slug, body content, visibility (public/private), meta title, meta
  description, associated department (optional), published date.

- **Publication**: Title, summary, body content, type (article/project-update/news/
  announcement), attached document (storage URL + preview URL), author (TeamMember),
  department, visibility (public/private), status (draft/pending/published/rejected),
  rejection reason, published date.

- **TeamMember**: Full name, job title, department, biography, profile photo, public
  fields flag set (which fields appear publicly), status (active/inactive).

- **User**: Email, hashed password, role (super\_admin / dept\_admin / blog\_manager /
  system\_audit), assigned department (null for super\_admin), status (active/inactive),
  last login timestamp.

- **MediaAsset**: File name, file type (image/document), storage URL, preview URL,
  storage provider reference ID, uploaded by (User), upload date, department scope.

- **AccessLink**: Target content ID, content type, one-use token, created by (Super
  Admin), expires at, used at (null until accessed), status (active/used/expired).

- **AuditLog**: Actor (User ID), action verb, target entity type, target entity ID,
  timestamp, department scope.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A Super Admin can create a new department and have its public page live in
  under 5 minutes with no developer involvement.
- **SC-002**: A Blog Manager can complete the full draft-to-submission workflow (write,
  attach document, submit) in under 10 minutes.
- **SC-003**: A Department Admin can review, approve, and publish a submitted article in
  under 3 minutes.
- **SC-004**: All public pages display their full content in under 3 seconds on a standard
  broadband connection.
- **SC-005**: The institute's name and at least 3 department pages appear in Google search
  results within 4 weeks of launch.
- **SC-006**: All public pages meet Google Core Web Vitals thresholds (LCP, CLS, INP) as
  reported by Search Console within 4 weeks of launch.
- **SC-007**: A one-use access link works on first access and is invalidated within 1
  second of use.
- **SC-008**: The platform operates correctly with up to 50 admin accounts without
  configuration changes.
- **SC-009**: Adding a new supported UI language requires only a translation file — no
  changes to any UI component code.
- **SC-010**: 100% of public-facing text, images, and documents on the site are
  manageable by an authorised admin without a code deployment.

---

## Assumptions

- All research publications and articles are written in English; multi-language support
  covers only UI chrome (navigation, labels, buttons).
- Google Drive is the document storage provider for v1; the data model is storage-agnostic
  so the provider can be swapped without content model changes.
- Social media auto-posting is out of scope for v1. Department social media account fields
  are stored in the Department entity to support v2 without a schema migration.
- The public site is read-only for unauthenticated visitors; no public user registration
  or commenting system is in scope.
- Email notification delivery (approval workflow alerts) uses a transactional email
  service; the specific provider is a technical decision outside this spec's scope.
- Careers/jobs and Events/Conferences pages are out of scope for v1.
- The design color palette and typography are not yet defined; they will be established
  in the design phase before UI implementation.
- The platform launches at startup scale (5 admins, ~50 monthly public visitors); the
  architecture must not actively prevent future horizontal scaling.
- There is no hard launch deadline; the goal is a fully production-ready v1 covering all
  P1–P5 user stories.
