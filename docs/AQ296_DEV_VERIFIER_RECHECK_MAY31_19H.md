# AQ-296 dev verifier recheck, 31 mai 19h

Recheck fait depuis `/root/baycast-dev`, après synchro avec `origin/main`. Le dépôt était à jour au moment du pull rebase.

`git diff --check` passe sans sortie.

`npm run verify:public-bcp` passe sur la prod `https://baycast-p.vercel.app`. Les surfaces vérifiées répondent correctement : `/`, `/questions`, la question publique `13aa9f2f-3226-4213-a04f-0cc2b87ad248`, `/leaderboard` et `/activity`. Le script termine par `Public BCP surface verification passed.` Le Public BCP reste scellé.

Le clone `/root/baycast-dev` ne contient pas d'environnement Supabase local, seulement `.env.example`. Le recheck first settlement a donc été lancé depuis `/root/baycast` avec `npm run verify:first-settlement-evidence`.

Le vérifieur first settlement passe en lecture seule. Il déclare explicitement `mode: readonly` et `table: questions`. Le script lit `questions`, pas `forecasts`; aucune requête vers `forecasts` n'a été faite.

Résultat first settlement : candidat Apple Mac Pro trouvé, statut `open`, fermeture `2026-06-13T00:00:00+00:00`, source publique Apple WWDC et Apple Newsroom. Aucun settlement à faire avant cette fermeture.

Aucun échec de vérifieur, donc aucune correction de code n'a été nécessaire. Ce commit ajoute seulement cette note de recheck.
