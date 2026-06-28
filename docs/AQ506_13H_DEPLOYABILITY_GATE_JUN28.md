# AQ-506 13h deployability gate, Jun 28

Verdict: prêt à déployer.

## Commandes lancées

- `git fetch origin && git pull --ff-only origin main`: dépôt déjà à jour.
- `git diff --check`: OK, aucun problème de whitespace.
- `npm run verify:next-settlement-watch`: OK.
  - FIFA opening match at least three goals: open, échéance 2026-06-30.
  - OpenAI public video generation model before July 1 2026: open, échéance 2026-06-30.
  - Microsoft first-party Xbox handheld before Aug 1 2026: open, échéance 2026-07-31.
- `npm run verify:distribution-gate`: OK sur `https://baycast-p.vercel.app`.
  - `/settlements/apple-mac-pro-wwdc-2026`
  - `/questions?status=resolved`
  - `/`
- `npm run verify:public-bcp`: OK sur `https://baycast-p.vercel.app`.
  - `/`
  - `/questions`
  - `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`
  - `/leaderboard`
  - `/activity`
- `npm test`: OK, 12 fichiers de test passés, 112 tests passés.
- `rm -rf .next && npm run build`: OK, build Next.js compilé, types validés, pages générées.

## Notes

Aucun correctif code requis. Le gate est vert sur les vérifications locales et les surfaces publiques ciblées.
