# AQ-464 19h deployability gate, Jun 23

Passage fait le 2026-06-23 à 19:03 UTC dans `/root/baycast-dev`.

HEAD vérifié avant commit: `ffd5bb834fed7de9b5046ab3639c5d08c2ed461e`.

Synchronisation dépôt: PASS.
`git fetch origin && git pull --ff-only origin main` a répondu `Already up to date`.

`git diff --check`: PASS.
Aucune erreur d'espaces ou de diff détectée.

`npm run verify:next-settlement-watch`: PASS.
Le script a terminé sur `next settlement watch: PASS`. Les trois contrôles attendus sont ok: match d'ouverture FIFA, nouveau modèle vidéo public OpenAI avant le 1er juillet 2026, et handheld Xbox first-party avant le 1er août 2026.

`npm run verify:distribution-gate`: PASS.
Vérification sur `https://baycast-p.vercel.app`. Routes ok: `/settlements/apple-mac-pro-wwdc-2026`, `/questions?status=resolved`, `/`. Sortie finale: `Distribution gate verification passed.`

`npm run verify:public-bcp`: PASS.
Vérification sur `https://baycast-p.vercel.app`. Routes ok: `/`, `/questions`, `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`, `/leaderboard`, `/activity`. Sortie finale: `Public BCP surface verification passed.`

`npm test`: PASS.
Vitest `v4.1.5` a passé 12 fichiers de test et 110 tests. Durée: 15.00s.

`rm -rf .next && npm run build`: PASS.
Next.js `14.2.16` a compilé, typé, généré 27 pages statiques et finalisé l'optimisation. Un avertissement webpack cache sur les grosses chaînes a été affiché, sans échec de build.

Node 20 fallback: non utilisé. Node courant a passé les tests et le build, aucun échec Vitest/Rolldown `styleText` ou `node:util`.

Correctifs faits: aucun. Aucun fichier applicatif modifié.

Résultat: déployabilité validée sur les gates demandées.
