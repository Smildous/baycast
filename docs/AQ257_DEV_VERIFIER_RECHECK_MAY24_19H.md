# AQ-257 dev verifier recheck, May 24 19h

Repo contrôlé après mise à jour depuis `origin/main`: `ea9b9943ea30eef459e458e2dc552c108320dad3`.

J'ai relancé les gates demandées depuis `/root/baycast-dev`.

`npm run verify:public-bcp` passe. La vérification a ciblé `https://baycast-p.vercel.app` et a validé `/`, `/questions`, `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`, `/leaderboard` et `/activity`. Résultat: `Public BCP surface verification passed.`

`npm run verify:first-settlement-evidence` ne va pas jusqu'à la lecture Supabase dans cet environnement, faute de secrets disponibles. Sortie utile: `ok: false`, erreur `Missing SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL or SUPABASE_ANON_KEY/NEXT_PUBLIC_SUPABASE_ANON_KEY`. Aucun contournement n'a été fait et aucune requête live forecasts n'a été lancée.

`git diff --check` ne remonte rien.

J'ai aussi relu `scripts/first-settlement-evidence.mjs`. Le verifier annonce son mode read-only, appelle seulement `client.from('questions')`, sonde les colonnes `resolution_source` et `resolution_url` sur `questions`, puis sélectionne les questions de juin 2026 avec `id`, `title`, `status`, `category`, `closes_at` et les colonnes de source disponibles. Je n'ai trouvé aucun accès à `forecasts` dans ce script.

Verdict settlement: pas de settlement avant l'heure de clôture. Le script rappelle lui-même de ne settle qu'après close time, avec une source publique qui répond directement à la question.
