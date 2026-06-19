# AQ-425 13h deployability gate, Jun 19

Run fait depuis `/root/baycast-dev`, après synchro main.

Commande de synchro:

```bash
git fetch origin && git pull --ff-only origin main
```

Résultat: main déjà à jour.

Commande:

```bash
git diff --check
```

Résultat: OK, aucune erreur de whitespace.

Commande:

```bash
npm run verify:next-settlement-watch
```

Résultat: OK. Le script retourne `next settlement watch: PASS` pour les trois marchés suivis:

- FIFA opening match at least three goals
- OpenAI public video generation model before July 1 2026
- Microsoft first-party Xbox handheld before Aug 1 2026

Commande:

```bash
npm run verify:distribution-gate
```

Résultat: OK. Vérification passée sur `https://baycast-p.vercel.app` pour:

- `/settlements/apple-mac-pro-wwdc-2026`
- `/questions?status=resolved`
- `/`

Commande:

```bash
npm run verify:public-bcp
```

Résultat: OK. Vérification passée sur `https://baycast-p.vercel.app` pour:

- `/`
- `/questions`
- `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`
- `/leaderboard`
- `/activity`

Commande:

```bash
npm test
```

Résultat: OK. Vitest a passé 12 fichiers de test et 110 tests.

Commande:

```bash
rm -rf .next && npm run build
```

Résultat: OK. Next.js 14.2.16 compile, typecheck, génère 27 pages statiques, puis finalise le build.

Conclusion: gate 13h vert. Aucun correctif code requis.
