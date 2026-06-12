# AQ-365 Dev verifier recheck, 12 juin 07h

Recheck fait depuis `/root/baycast`, après synchro sur `origin/main`. Je n'ai pas consulté `forecasts`.

Commande de synchro lancée avant le recheck:

```sh
git fetch origin && git pull --ff-only origin main
```

Résultat: succès, dépôt déjà à jour.

```text
From https://github.com/Smildous/baycast
 * branch            main       -> FETCH_HEAD
Already up to date.
```

## Commandes de vérification

### git diff

```sh
git diff --check
```

Résultat: succès. Aucune sortie, aucun whitespace error.

### Public BCP

```sh
npm run verify:public-bcp
```

Résultat: succès.

```text
> baycast@0.1.0 verify:public-bcp
> node scripts/verify-public-bcp-surfaces.mjs

Verifying public BCP surfaces at https://baycast-p.vercel.app
ok /
ok /questions
ok /questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248
ok /leaderboard
ok /activity
Public BCP surface verification passed.
```

### First settlement evidence

```sh
npm run verify:first-settlement-evidence
```

Résultat: succès.

```json
{
  "ok": true,
  "mode": "readonly",
  "table": "questions",
  "checked_at": "2026-06-12T07:01:29.742Z",
  "candidate_reason": "Apple Mac Pro exact match",
  "candidate": {
    "title": "Will Apple announce a new Mac Pro at WWDC 2026?",
    "status": "open",
    "closes_at": "2026-06-13T00:00:00+00:00",
    "resolution_source": "Apple WWDC and Apple Newsroom: https://developer.apple.com/wwdc26/ and https://www.apple.com/newsroom/",
    "resolution_url": null
  }
}
```

## Lecture et portée

Le verifier first settlement lit seulement `questions`:

```js
client.from('questions')
```

La sortie confirme aussi `"table": "questions"`. Le script est readonly, ne fait pas d'écriture Supabase, et son en-tête précise qu'il ne query jamais `forecasts`.

Candidat confirmé:

- question: `Will Apple announce a new Mac Pro at WWDC 2026?`
- raison: `Apple Mac Pro exact match`
- statut: `open`
- close: `2026-06-13T00:00:00+00:00`

Aucune lecture de `forecasts` n'a été faite pendant ce recheck.

## Bilan

- `git diff --check`: pass
- `npm run verify:public-bcp`: pass
- `npm run verify:first-settlement-evidence`: pass

Échec rencontré: aucun.
