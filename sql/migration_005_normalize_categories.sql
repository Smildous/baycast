-- migration_005_normalize_categories.sql
--
-- Normalize existing question categories to match the canonical Category type
-- used in the application code. The `category` column is plain text (no CHECK
-- constraint), so values may have been inserted with inconsistent casing or
-- legacy names (e.g., 'Geopolitics' → 'Politics', 'Economics' → 'Economy').
--
-- Run via Supabase SQL Editor:
--   npx supabase db execute --project-ref jlfohoqtdwtgfsgslsbr -f sql/migration_005_normalize_categories.sql
--
-- Safe to run multiple times (idempotent).

BEGIN;

-- Trim whitespace and capitalize first letter only (for known categories)
UPDATE public.questions SET category = 'Technology' WHERE LOWER(TRIM(category)) IN ('technology', 'tech');
UPDATE public.questions SET category = 'Economy'     WHERE LOWER(TRIM(category)) IN ('economy', 'economics');
UPDATE public.questions SET category = 'Science'     WHERE LOWER(TRIM(category)) IN ('science');
UPDATE public.questions SET category = 'Sports'      WHERE LOWER(TRIM(category)) IN ('sports', 'sport');
UPDATE public.questions SET category = 'Politics'    WHERE LOWER(TRIM(category)) IN ('politics', 'geopolitics', 'geopolitic');
UPDATE public.questions SET category = 'Culture'     WHERE LOWER(TRIM(category)) IN ('culture', 'cultures', 'arts');
UPDATE public.questions SET category = 'AI'          WHERE LOWER(TRIM(category)) IN ('ai', 'artificial intelligence', 'artificialintelligence');
UPDATE public.questions SET category = 'Crypto'      WHERE LOWER(TRIM(category)) IN ('crypto', 'cryptocurrency', 'cryptocurrencies', 'defi');
UPDATE public.questions SET category = 'Entertainment' WHERE LOWER(TRIM(category)) IN ('entertainment', 'entertainments', 'movies', 'music');
UPDATE public.questions SET category = 'Other'       WHERE LOWER(TRIM(category)) IN ('other', 'others', 'misc', 'miscellaneous', 'general');

-- Any remaining non-standard categories get mapped to 'Other'
UPDATE public.questions SET category = 'Other'
WHERE category NOT IN ('Technology', 'Economy', 'Science', 'Sports', 'Politics', 'Culture', 'AI', 'Crypto', 'Entertainment', 'Other');

COMMIT;
