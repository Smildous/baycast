# AQ-234 blind_until DDL handoff, May 20

AQ-227 stays blocked. The live verifier still sees no `questions.blind_until` column.

Verifier run from `/root/baycast`:

```text
> baycast@0.1.0 verify:blind-until
> node scripts/supabase-admin.mjs verify-blind-until

{
  "ok": false,
  "code": "AQ227_MISSING_BLIND_UNTIL",
  "error": "questions.blind_until is missing on the live schema. Apply sql/migration_006_aq226_blind_until_live_safety.sql before enabling AQ-227 live checks."
}
```

Do not try to force this through `service_role`. That key can bypass row level security for row reads and writes, but it is still not a database owner or migration role. It cannot safely run `ALTER TABLE`, create the index, or apply schema comments unless the database explicitly grants that DDL authority. Using it for DDL would mix app runtime access with migration ownership and is the wrong failure mode for production.

Apply this exact file with migration access:

`sql/migration_006_aq226_blind_until_live_safety.sql`

Minimum access needed: Postgres migration access for the live database, or a database role allowed to run the needed `ALTER TABLE public.questions`, `COMMENT ON COLUMN`, `CREATE INDEX`, and guarded backfill statements. An approved RPC that executes this reviewed migration under a migration owner is also acceptable.

After the migration, verify from `/root/baycast`:

```bash
npm run verify:blind-until
```

Expected result is `ok: true`. Only then unblock AQ-227 live checks.

Rollback and BCP caution: this migration adds schema and backfills live rows. Do not drop `blind_until` as a quick rollback unless the dependent code path has also been disabled and the data loss is accepted. If the migration causes trouble, keep AQ-227 blocked, stop live forecast enablement, preserve the current DB snapshot, and roll forward or restore through the normal database recovery path.
