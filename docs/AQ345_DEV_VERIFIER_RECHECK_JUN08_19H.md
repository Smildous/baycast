# AQ-345 dev verifier recheck, 2026-06-08 19h UTC

## Contexte

Recheck dev lancé depuis `/root/baycast-dev` après remise à jour de `main`.

Préparation exécutée :

```bash
git fetch origin && git checkout main && git pull --ff-only origin main
```

Résultat : branche `main` déjà à jour avec `origin/main`.

## Vérifications

| Commande | Résultat | Résumé |
| --- | --- | --- |
| `git diff --check` | OK | Aucun problème de whitespace détecté. |
| `npm run verify:public-bcp` | OK | Les surfaces publiques BCP ont répondu correctement : `/`, `/questions`, la question témoin, `/leaderboard`, `/activity`. |
| `npm run verify:first-settlement-evidence` | OK | Le script a confirmé le mode `readonly`, table `questions`, avec `ok: true`. |

## First settlement evidence

Le vérificateur first-settlement a uniquement lu la table `questions`. Il n'a pas lu Supabase `forecasts`.

Candidat confirmé : `Will Apple announce a new Mac Pro at WWDC 2026?`

Statut : `open`

Close time Apple Mac Pro : `2026-06-13T00:00:00+00:00`

Source de résolution déclarée : Apple WWDC et Apple Newsroom.

## Verdict

Recheck 19h UTC validé. Les deux vérificateurs demandés passent. Aucun correctif code nécessaire.
