# Seed Questions Guide

Insert all 133+ pending prediction questions into the Baycast Supabase database.

## Prerequisites

- **Node.js 18+** installed locally ([download](https://nodejs.org/))
- **Supabase credentials** (from your Supabase dashboard → Settings → API):
  - `SUPABASE_URL` — e.g. `https://jlfohoqtdwtgfsgslsbr.supabase.co`
  - `SUPABASE_ANON_KEY` — the `anon public` key

## Steps

### 1. Install dependencies

```bash
cd baycast
npm install
```

> Dependencies (`@supabase/supabase-js`, etc.) are already in `package.json`.

### 2. Create `.env.local`

Create a `.env.local` file in the project root (this file is git-ignored):

```bash
SUPABASE_URL=https://jlfohoqtdwtgfsgslsbr.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...your-key-here
```

Or export the variables directly in your shell:

```bash
export SUPABASE_URL=https://jlfohoqtdwtgfsgslsbr.supabase.co
export SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
```

### 3. Run the seed script

```bash
npx tsx scripts/seed-questions.ts
```

### Expected Output

```
📦 Found 11 question batch files in docs/

🔍 Fetching existing question titles from Supabase...
   Found 2 existing questions in database.

📄 Processing: questions_batch_may6.sql
   Parsed 15 questions
   ✅ Inserted 15 new questions

📄 Processing: questions_batch_may7.sql
   ...
   ✅ Inserted 15 new questions

... (9 more files) ...

═══════════════════════════════════════════════
  SEED COMPLETE
═══════════════════════════════════════════════
  ✅ Inserted: 133
  ⏭ Skipped:  2 (already exist)
  ❌ Errors:   0
═══════════════════════════════════════════════
```

### 4. Verify

Check the Supabase dashboard → Table Editor → `questions` to confirm the rows appear.

## Troubleshooting

| Problem | Solution |
|---------|----------|
| `❌ Missing SUPABASE_URL or SUPABASE_ANON_KEY` | Make sure `.env.local` exists in the project root, or export the env vars. |
| `Error fetching existing questions` | Check your Supabase URL and key. The `anon` key should have read access to the `questions` table. |
| `Insert error: permission denied` | The anon key needs INSERT permission on the `questions` table. Check Supabase → Authentication → Policies. |
| `Insert error: relation "questions" does not exist` | The table hasn't been created yet. Run the migrations in `supabase/migrations/` first. |
| `Column/value count mismatch` | A SQL file may have a formatting issue. Check the specific file mentioned in the warning. |
| Script runs but inserts 0 | All questions may already exist in the database. The script is idempotent — re-running is safe. |
| `npx tsx` not found | Run `npm install -g tsx` or use `npx tsx` (it auto-installs). Requires Node 18+. |

## Notes

- **Idempotent**: Running the script multiple times is safe. It skips questions whose titles already exist.
- **Two SQL formats**: The script handles both the full schema (may6–may14) and the simplified schema (may15–may16) automatically.
- **Source files**: 11 SQL batch files in `docs/questions_batch_may{6..16}.sql`.
