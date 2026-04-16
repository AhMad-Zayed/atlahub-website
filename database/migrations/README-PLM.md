# PLM schema migration (MySQL / Namecheap)

After updating `prisma/schema.prisma`, run:

```bash
npx prisma generate
npx prisma db push
```

If you have **existing** `Project` rows with a legacy `status` `VARCHAR` column, `db push` may alter the table. Prefer a staged migration:

1. Add column `lifecycle_status` as `ENUM` with a default.
2. Backfill from legacy `status`:

```sql
UPDATE `Project` SET `lifecycle_status` = 'DRAFT' WHERE `status` IN ('Pipeline', 'pipeline');
UPDATE `Project` SET `lifecycle_status` = 'UNDER_REVIEW' WHERE `status` IN ('Review', 'review');
UPDATE `Project` SET `lifecycle_status` = 'NEEDS_REVISION' WHERE `status` LIKE 'Needs%';
UPDATE `Project` SET `lifecycle_status` = 'APPROVED' WHERE `status` = 'Approved';
UPDATE `Project` SET `lifecycle_status` = 'COMPLETED' WHERE `status` = 'Completed';
```

3. Drop legacy `status` column when safe.

`SecureToken`: new rows store only `token_hash` (SHA-256 hex). Legacy URLs that used the UUID as the path segment remain supported in application code via `src/lib/plm/tokens.js`.
