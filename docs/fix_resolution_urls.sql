-- fix_resolution_urls.sql
-- AQ-103: Fix 6 broken resolution URLs found during E2E audit
-- Execute against the Supabase 'questions' table.
-- Run each statement individually to verify row counts before committing.

BEGIN;

-- 1. ICE / Bloomberg → Intercontinental Exchange
UPDATE questions
SET resolution_source = 'https://www.theice.com'
WHERE resolution_source ILIKE 'https://ice / bloomberg%';

-- 2. Official Journal of the European Union → EUR-Lex
UPDATE questions
SET resolution_source = 'https://eur-lex.europa.eu'
WHERE resolution_source ILIKE 'https://official journal of the european union%';

-- 3. ISRO Official Communications → ISRO
UPDATE questions
SET resolution_source = 'https://www.isro.gov.in'
WHERE resolution_source ILIKE 'https://isro official communications%';

-- 4. Reuters / UN Security Council → Reuters
UPDATE questions
SET resolution_source = 'https://www.reuters.com'
WHERE resolution_source ILIKE 'https://reuters / un security council%';

-- 5. Nature / Science / DOE → Nature journal
UPDATE questions
SET resolution_source = 'https://www.nature.com'
WHERE resolution_source ILIKE 'https://nature / science / doe%';

-- 6. CoinGecko (bare domain without protocol)
UPDATE questions
SET resolution_source = 'https://www.coingecko.com'
WHERE resolution_source ILIKE 'https://coingecko'
   OR resolution_source ILIKE 'coingecko';

COMMIT;

-- Verification query: check no broken URLs remain
-- SELECT id, title, resolution_source
-- FROM questions
-- WHERE resolution_source ~ '\s'   -- contains spaces
--    OR (resolution_source NOT LIKE 'http://%' AND resolution_source NOT LIKE 'https://%');
