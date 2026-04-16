# PLM logic layer — green-light checklist (post–`db push`)

Run after `npx prisma generate` and `npx prisma db push` against your Namecheap MySQL URL.

## 1. Schema sync

- [ ] `prisma/schema.prisma` validates (`npx prisma validate`).
- [ ] Client generates (`npx prisma generate`).
- [ ] Tables exist: `services`, `form_templates`, `project_snapshots`, `activity_logs`, `deliverables`, `Project` with `lifecycle_status`, `portfolio_projects` with `bridge_status`.

## 2. Smoke script (API + DB)

```bash
BASE_URL="http://127.0.0.1:3000" npm run smoke:onboarding
```

Expect: **Smoke test passed.** (Creates project, UUID bearer token, PATCHes 5 steps, verifies submission + pipeline query.)

## 3. Logic checks (manual)

- [ ] New projects use `lifecycleStatus` (default flow: `SENT` → autosave → `UNDER_REVIEW` / `SUBMITTED`).
- [ ] `ActivityLog` rows append on create and on client PATCH (with IP when headers present).
- [ ] `promoteToPortfolioAction` / `promoteProjectToPortfolio` upserts `PortfolioProject` with `bridgeStatus: DRAFT` and sets lifecycle `APPROVED`.
- [ ] `SecureToken`: lookup by SHA-256 digest; legacy UUID path still resolves via `findSecureTokenByBearer`.

## 4. Not done in this phase (by design)

- Dynamic wizard UI from `schemaSnapshotJson` (next phase).
- Admin “Elite” field toggles UI, deliverable upload UI, timeline UI (next phase).

When 1–3 pass, the **database + logic layer** is cleared for UI work.
