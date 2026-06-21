# AQ-446, gate de déployabilité du 21 juin, 19h

Run fait depuis `/root/baycast-dev`, après synchronisation de `main` avec `origin/main`.

## Mise à jour du dépôt

```bash
git fetch origin main
git checkout main
git pull --rebase origin main
```

Résultat : passe. La branche était déjà à jour sur `a446aee1b8b645a4412856a2788891da8d8f64ce`.

Node utilisé : `v22.22.2`. Pas besoin de basculer sur Node 20, Vitest et le build sont passés avec cette version.

## Contrôles lancés

```bash
git diff --check
```

Résultat : passe. Aucun problème de whitespace détecté.

```bash
npm run verify:next-settlement-watch
```

Résultat : passe. Les trois surveillances attendues sont ouvertes et conformes :

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

Fichier ajouté pour ce gate : `docs/AQ446_19H_DEPLOYABILITY_GATE_JUN21.md`.

## Verdict

Gate AQ-446 19h vert. Déployabilité confirmée pour ce passage.
