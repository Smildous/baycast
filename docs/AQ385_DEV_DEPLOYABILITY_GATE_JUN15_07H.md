# AQ-385 deployability gate, 15 juin 2026 07h

HEAD vérifié: `50d4a2de0824db5dcd3b22c16ae24555c356fafa`

## Commandes lancées

### `git pull --rebase origin main`

Résultat: succès. Le clone était déjà à jour avec `origin/main`.

### `npm run verify:distribution-gate`

Résultat: succès.

Résumé de sortie:

```text
Verifying distribution gate at https://baycast-p.vercel.app
ok /settlements/apple-mac-pro-wwdc-2026
ok /questions?status=resolved
ok /
Distribution gate verification passed.
```

### `npm run verify:public-bcp`

Résultat: succès.

Résumé de sortie:

```text
Verifying public BCP surfaces at https://baycast-p.vercel.app
ok /
ok /questions
ok /questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248
ok /leaderboard
ok /activity
Public BCP surface verification passed.
```

### `npm test`

Résultat: succès.

Résumé de sortie:

```text
Test Files  12 passed (12)
Tests       110 passed (110)
Duration    14.27s
```

### `rm -rf .next && npm run build`

Résultat: succès.

Résumé de sortie:

```text
Next.js 14.2.16
Compiled successfully
Linting and checking validity of types passed
Generated static pages: 27/27
Finalizing page optimization passed
Collecting build traces passed
```

Note: webpack a signalé un avertissement de performance sur la sérialisation de grosses chaînes dans le cache. Ce n'est pas bloquant pour le build.

## Verdict

Gate validée. Aucun correctif code nécessaire.
