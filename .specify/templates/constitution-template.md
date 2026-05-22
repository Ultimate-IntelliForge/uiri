<!--
SYNC IMPACT REPORT
==================
Version change: [OLD_VERSION] → [NEW_VERSION] ([BUMP_TYPE]: [REASON])
Modified principles: [LIST]
Added sections: [LIST]
Removed sections: [LIST]
Templates requiring updates: [LIST with ✅/⚠ status and file paths]
Follow-up TODOs: [LIST of deferred decisions]
-->

# [PROJECT_NAME] Constitution
<!-- Example: Spec Constitution, TaskFlow Constitution, CMS Constitution, etc. -->

## Core Principles

### [PRINCIPLE_1_NAME]
<!-- Example: I. Library-First, I. Monorepo Architecture, I. API-First Design -->
[PRINCIPLE_1_DESCRIPTION]
<!-- Describe non-negotiable rules, rationale, and enforcement criteria.
     Use MUST/MUST NOT for mandated behaviour; SHOULD for strong recommendations. -->

### [PRINCIPLE_2_NAME]
<!-- Example: II. CMS-First Content Model, II. CLI Interface, II. Test-First -->
[PRINCIPLE_2_DESCRIPTION]

### [PRINCIPLE_3_NAME]
<!-- Example: III. Type-Safe End-to-End, III. Integration Testing -->
[PRINCIPLE_3_DESCRIPTION]

### [PRINCIPLE_4_NAME]
<!-- Example: IV. Role-Based Access Control, IV. Observability -->
[PRINCIPLE_4_DESCRIPTION]

### [PRINCIPLE_5_NAME]
<!-- Example: V. Performance & SEO, V. Versioning & Breaking Changes, V. Simplicity -->
[PRINCIPLE_5_DESCRIPTION]

### [PRINCIPLE_6_NAME]
<!-- Example: VI. Component-Driven UI, VI. Security, VI. Modularity — add/remove as needed -->
[PRINCIPLE_6_DESCRIPTION]

## Technology Stack

<!-- List every mandated technology choice. Deviations require a constitution amendment.
     Mark unresolved decisions as TBD with a resolution deadline. -->

| Concern | Choice |
|---|---|
| [CONCERN_1] | [TECHNOLOGY_1] |
| [CONCERN_2] | [TECHNOLOGY_2] |
| [CONCERN_3] | [TECHNOLOGY_3] |
| [CONCERN_N] | [TECHNOLOGY_N] |

<!-- Example rows:
| Framework        | Next.js App Router                              |
| Backend          | NestJS (apps/api)                               |
| Language         | TypeScript 5.x (strict: true)                  |
| Styling          | Tailwind CSS v4                                 |
| UI Components    | shadcn/ui + Radix UI                            |
| Database         | PostgreSQL — Supabase or Neon (TBD)             |
| ORM              | Prisma (TBD before first plan)                  |
| Auth             | Passport.js + JWT (TBD)                         |
| Deployment       | Vercel (web), Railway (api)                     |
| Package Manager  | npm                                             |
-->

**Decisions marked TBD MUST be resolved and this section updated before the first
feature plan is written.**

## Development Workflow

<!-- Define the branching strategy, spec-before-code requirement, commit conventions,
     migration policy, and any quality gates. -->

[DEVELOPMENT_WORKFLOW_RULES]

<!-- Example:
- Branch strategy: `main` is always deployable; features on `###-short-description` branches
- Spec before code: spec → plan → tasks MUST exist before implementation
- No magic migrations: schema changes require explicit migration files
- Commit conventions: Conventional Commits (feat:, fix:, chore:, docs:)
- Environment parity: .env.example updated with every new env var; secrets never committed
-->

## Governance
<!-- Constitution supersedes all other practices; Amendments require documentation, approval,
     migration plan; Versioning: MAJOR/MINOR/PATCH per semantic rules -->

[GOVERNANCE_RULES]

<!-- Example:
- Compliance: All PRs MUST verify constitution compliance via plan.md Constitution Check gate
- Amendments: written rationale + version bump + Sync Impact Report update + template propagation
- Versioning: MAJOR = incompatible principle removal/redefinition; MINOR = new principle/tech;
  PATCH = clarifications/wording
- Complexity deviations must be justified in plan.md Complexity Tracking table
- Use CLAUDE.md for AI-agent runtime guidance; reference current plan for technical context
-->

**Version**: [CONSTITUTION_VERSION] | **Ratified**: [RATIFICATION_DATE] | **Last Amended**: [LAST_AMENDED_DATE]
<!-- Example: Version: 2.0.0 | Ratified: 2026-05-21 | Last Amended: 2026-05-21 -->
