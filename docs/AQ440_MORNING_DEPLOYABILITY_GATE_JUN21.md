# AQ-440, gate de déployabilité du 21 juin, matin

Run fait depuis `/root/baycast-dev`, après synchronisation de `main` sur `origin/main`.

## Mise à jour du dépôt

```bash
git fetch origin main && git merge --ff-only origin/main && git rev-parse --short HEAD
```

Résultat : passe. Le dépôt était déjà à jour sur `fd610b3`.

Node utilisé : `v22.22.2`. Pas besoin de basculer sur Node 20, Vitest et le build sont passés avec cette version.

## Contrôles lancés

```bash
node -v && git diff --check && npm run verify:next-settlement-watch && npm run verify:distribution-gate && npm run verify:public-bcp
```

Résultat : passe.

`git diff --check` n'a signalé aucun problème de whitespace.

`npm run verify:next-settlement-watch` : passe. Les trois marchés surveillés sont valides et ouverts :

- FIFA opening match at least three goals, `5745e845-94e9-4802-bbeb-850c982e1276`, fermeture `2026-06-30T23:59:59+00:00`
- OpenAI public video generation model before July 1 2026, `d3338e47-11ec-4568-942e-42bb19be0f5e`, fermeture `2026-06-30T23:59:59+00:00`
- Microsoft first-party Xbox handheld before Aug 1 2026, `5cc9fe74-5306-49d9-bec3-251ad276a779`, fermeture `2026-07-31T23:59:59+00:00`

`npm run verify:distribution-gate` : passe sur `https://baycast-p.vercel.app`.

Routes vérifiées :

- `/settlements/apple-mac-pro-wwdc-2026`
- `/questions?status=resolved`
- `/`

`npm run verify:public-bcp` : passe sur `https://baycast-p.vercel.app`.

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

Fichier ajouté pour ce gate : `docs/AQ440_MORNING_DEPLOYABILITY_GATE_JUN21.md`.

## Verdict

Gate AQ-440 matin vert. Déployabilité confirmée pour ce passage.
