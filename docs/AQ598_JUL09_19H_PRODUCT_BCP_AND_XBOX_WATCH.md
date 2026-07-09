# AQ-598 Jul 9 19h Product / Questions gate

Scope: contrôle de production sur `https://baycast-p.vercel.app`, limité aux surfaces publiques BCP et à la question Microsoft Xbox handheld. Le dépôt utilisé est `/root/baycast-product`. J'ai commencé par un fetch origin puis un pull fast-forward only sur main. Je n'ai pas lu la table `forecasts`.

Checks run: `npm run verify:public-bcp` depuis `/root/baycast-product`. Le script a vérifié `/`, `/questions`, `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`, `/leaderboard` et `/activity`. Résultat: pass, avec `Public BCP surface verification passed.`

Results: le contrôle public est propre. J'ai aussi fait un contrôle HTTP direct sur les routes publiques de production: `/`, `/questions`, `/questions?status=resolved`, `/leaderboard`, `/activity` et `/questions/5cc9fe74-5306-49d9-bec3-251ad276a779`. Chaque route a retourné 200 avec un `content-type` HTML. Les pages contrôlées ne contiennent pas `aggregate_probability`, `forecasters_count`, `settled_by` ni `evidence_doc`, et elles ne sont pas servies comme JSON brut.

Contrôle navigateur sur la page Xbox: la route `/questions/5cc9fe74-5306-49d9-bec3-251ad276a779` charge bien le titre `Will Microsoft announce a new first-party Xbox handheld before August 1, 2026?`. Le DOM public montre le verrou BCP, `Community signal locked`, et la date `Jul 31, 2026` dans le bloc de clôture. Le DOM ne contient pas les champs de fuite surveillés.

Pour la watch Xbox, j'ai utilisé une lecture publique et sûre de `questions` uniquement via l'API REST Supabase exposée au client public. La requête était limitée à `id,title,status,closes_at` pour `5cc9fe74-5306-49d9-bec3-251ad276a779`. Résultat: status `open`, `closes_at` `2026-07-31T23:59:59+00:00`.

`npm run verify:next-settlement-watch` a été tenté dans `/root/baycast-product`, mais ce clone n'a pas de `.env.local` et aucun secret Supabase dans l'environnement shell. Le script a donc échoué avant toute lecture avec `Missing SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL or SUPABASE_ANON_KEY/NEXT_PUBLIC_SUPABASE_ANON_KEY`. Je n'ai pas basculé sur un autre clone, puisque la consigne demandait d'utiliser `/root/baycast-product` seulement.

Forecast table read: no.

Verdict: AQ-598 passe. Les routes publiques de production répondent, la surface publique ne fuit pas les champs BCP surveillés ni de JSON brut, et la question Microsoft Xbox handheld reste ouverte avec une clôture au 31 juillet 2026.
