# AQ-437, gate de déployabilité du 20 juin, 19h

Run fait depuis `/root/baycast-dev`, après synchronisation de `main`.

## Mise à jour du dépôt

```bash
git fetch origin && git pull --ff-only origin main
```

Résultat : passe. Le dépôt était déjà à jour sur `88c8a58d1efc09faed1f02dbf29e4e9196d1f2c4`.

Node utilisé : `v22.22.2`. Pas besoin de basculer sur Node 20, Vitest et le build sont passés avec cette version.

## Contrôles lancés

```bash
git diff --check
```

Résultat : passe. Aucun problème de whitespace détecté.

```bash
npm run verify:next-settlement-watch
```

Résultat : passe. Les trois marchés surveillés sont valides et ouverts :

- FIFA opening match at least three goals
- OpenAI public video generation model before July 1 2026
- Microsoft first-party Xbox handheld before Aug 1 2026

```bash
npm run verify:distribution-gate
```

Résultat : passe sur `https://baycast-p.vercel.app`.

Routes vérifiées :

- `/settlements/apple-mac-pro-wwdc-2026`
- `/questions?status=resolved`
- `/`

```bash
npm run verify:public-bcp
```

Résultat : passe sur `https://baycast-p.vercel.app`.

Surfaces vérifiées :

- `/`
- `/questions`
- `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`
- `/leaderboard`
- `/activity`

```bash
npm test
```

Résultat : passe.

Décompte : 12 fichiers de test passés, 110 tests passés.

```bash
rm -rf .next && npm run build
```

Résultat : passe avec Next.js `14.2.16`.

Le build compile, valide les types, génère 27 pages statiques et collecte les traces sans erreur bloquante.

Avertissement non bloquant relevé :

```text
[webpack.cache.PackFileCacheStrategy] Serializing big strings (215kiB) impacts deserialization performance (consider using Buffer instead and decode when needed)
```

## Changements code

Aucun changement de code applicatif. Aucun correctif nécessaire.

Fichier ajouté pour ce gate : `docs/AQ437_19H_DEPLOYABILITY_GATE_JUN20.md`.

## Verdict

Gate AQ-437 19h vert. Déployabilité confirmée pour ce passage.
