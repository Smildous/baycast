# AQ-443 13h deployability gate, 21 juin

Verdict: PASS.

J’ai lancé le gate depuis un arbre propre dans `/root/baycast-dev`, après `git fetch origin && git pull --ff-only origin main`. La branche était déjà à jour avec `origin/main`.

Les vérifications sont passées sans changement de code.

| Commande | Résultat |
| --- | --- |
| `git diff --check` | PASS, aucune erreur d’espaces ou de diff |
| `npm run verify:next-settlement-watch` | PASS, les trois surveillances attendues sont ouvertes et conformes |
| `npm run verify:distribution-gate` | PASS sur `https://baycast-p.vercel.app` pour `/settlements/apple-mac-pro-wwdc-2026`, `/questions?status=resolved` et `/` |
| `npm run verify:public-bcp` | PASS sur les surfaces publiques `/`, `/questions`, `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`, `/leaderboard` et `/activity` |
| `npm test` | PASS, 12 fichiers de test passés, 110 tests passés |
| `rm -rf .next && npm run build` | PASS, build Next.js 14.2.16 compilé, types validés, 27 pages générées |

Le build a seulement affiché l’avertissement webpack habituel sur la sérialisation de grosses chaînes dans le cache. Il n’a pas bloqué la compilation.

Aucun fix n’a été nécessaire. Le commit contient uniquement ce document de gate.
