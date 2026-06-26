# AQ-488 13h deployability gate, 26 juin

Run fait dans `/root/baycast-dev` le 2026-06-26 à partir de `origin/main` au commit `fa8fdfa488721c0a7b926c026091f1dbe85f47a3`.

Tout est passé. Aucun correctif code n'a été nécessaire.

| Commande | Résultat |
| --- | --- |
| `git diff --check` | PASS, aucune sortie |
| `npm run verify:next-settlement-watch` | PASS, `next settlement watch: PASS` avec les 3 questions attendues en `open` |
| `npm run verify:distribution-gate` | PASS, `/settlements/apple-mac-pro-wwdc-2026`, `/questions?status=resolved` et `/` ok sur `https://baycast-p.vercel.app` |
| `npm run verify:public-bcp` | PASS, `/`, `/questions`, `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`, `/leaderboard` et `/activity` ok sur `https://baycast-p.vercel.app` |
| `npm test` | PASS, 12 fichiers et 112 tests passés |
| `rm -rf .next && npm run build` | PASS, build Next.js compilé, types et pages statiques générés, 27 pages statiques |

Note build: Webpack a signalé l'avertissement habituel sur la sérialisation de grosses chaînes dans le cache. Il n'a pas bloqué le build.
