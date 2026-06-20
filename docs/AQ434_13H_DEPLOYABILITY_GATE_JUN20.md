# AQ-434, gate de déployabilité du 20 juin, 13h

Run fait depuis `/root/baycast-dev` après synchronisation de `main`.

Commande de mise à jour :

```bash
git fetch origin && git pull --ff-only origin main
```

Résultat : dépôt déjà à jour.

Suite lancée :

```bash
git diff --check
npm run verify:next-settlement-watch
npm run verify:distribution-gate
npm run verify:public-bcp
npm test
rm -rf .next && npm run build
```

Résultats :

`git diff --check` passe, aucun problème de whitespace.

`npm run verify:next-settlement-watch` passe. Les trois marchés surveillés sont bien ouverts et valides : match d'ouverture FIFA 2026, modèle vidéo public OpenAI avant le 1er juillet 2026, handheld Xbox first party avant le 1er août 2026.

`npm run verify:distribution-gate` passe sur `https://baycast-p.vercel.app`. Les routes `/settlements/apple-mac-pro-wwdc-2026`, `/questions?status=resolved` et `/` répondent correctement.

`npm run verify:public-bcp` passe sur `https://baycast-p.vercel.app`. Les surfaces `/`, `/questions`, `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`, `/leaderboard` et `/activity` répondent correctement.

`npm test` passe avec 12 fichiers de test et 110 tests réussis.

`npm run build` passe avec Next.js 14.2.16. Le build compile, typecheck, génère 27 pages statiques et finalise les traces sans erreur bloquante. Un avertissement webpack sur la sérialisation de grosses chaînes est présent, non bloquant.

Aucune panne applicative réelle trouvée pendant ce passage. Aucun correctif code nécessaire.

Verdict : prêt pour déploiement côté gate AQ-434 13h.
