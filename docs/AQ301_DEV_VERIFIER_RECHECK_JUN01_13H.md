# AQ-301 Dev verifier recheck, 1 juin, 13h

Recheck fait depuis `/root/baycast-dev` après `git fetch origin main` puis un pull fast forward only depuis `origin main`. La branche était déjà à jour sur `origin/main`.

Je n'ai pas lu la table `forecasts`. Les vérifications utilisées ne consultent pas les prévisions. `verify:public-bcp` récupère seulement des pages publiques en HTML sur la production. `verify:first-settlement-evidence` utilise Supabase en lecture seule et lit la table `questions` pour le créneau de juin 2026.

Table access statement: accès Supabase lu uniquement sur `questions` pour `verify:first-settlement-evidence`. Aucun accès volontaire à `forecasts`, aucune écriture Supabase, aucune clé service role copiée dans ce clone.

`git diff` whitespace check: PASS. Aucune erreur de whitespace.

`npm run verify:public-bcp`: PASS. La vérification a ciblé la production `https://baycast-p.vercel.app`. Les routes `/`, `/questions`, `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`, `/leaderboard` et `/activity` sont toutes OK. Sortie finale: `Public BCP surface verification passed.`

`npm run verify:first-settlement-evidence`: premier essai FAIL car `.env.local` manquait dans le clone Dev. J'ai inspecté les scripts, puis copié seulement l'env public et anon depuis canonical, sans service role ni admin secret. Deuxième essai PASS. Sortie utile: `ok: true`, mode `readonly`, table `questions`.

Le candidat de première settlement trouvé est bien `Will Apple announce a new Mac Pro at WWDC 2026?`. Statut `open`. Close `2026-06-13T00:00:00+00:00`. Source publique indiquée: Apple WWDC et Apple Newsroom, `https://developer.apple.com/wwdc26/` et `https://www.apple.com/newsroom/`. `resolution_url` est nul.

Verdict Dev: PASS pour le recheck AQ-301 à 13h.

Point à garder côté Odin: comme le clone Dev n'avait pas son env au départ, Odin doit aussi relancer le run canonical depuis `/root/baycast`, avec l'env service role déjà présent, pour garder la preuve canonique séparée de ce recheck Dev.
