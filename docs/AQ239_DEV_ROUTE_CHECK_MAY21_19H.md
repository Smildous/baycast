# AQ-239, contrôle technique routes prod, 21 mai 19h

Cible testée: https://baycast-p.vercel.app
Worktree: /root/baycast-dev
Base locale remise à origin/main avant test.

## Préparation

Commande lancée:

```bash
git fetch origin && git reset --hard origin/main && git clean -fd
```

Résultat: OK. HEAD remis sur `origin/main` à `7c17c4d docs(AQ-237): add first settlement evidence rehearsal`.

## Checks locaux

`npm test`

Résultat: OK.

Résumé utile:

```text
Test Files  11 passed (11)
Tests  107 passed (107)
```

`npx tsc --noEmit --pretty false`

Résultat: OK. Aucune sortie TypeScript.

`npm run verify:first-resolution-readiness`

Résultat: échec, non conclusif dans cet environnement.

Sortie utile:

```text
Missing SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL or SUPABASE_ANON_KEY/NEXT_PUBLIC_SUPABASE_ANON_KEY
First-resolution readiness failed: resolution URLs are not ready.
First-resolution readiness failed: June resolution hygiene is not ready.
```

Je n'ai pas ajouté de variables Supabase et je n'ai pas écrit en base.

`npm run verify:blind-until`

Résultat: échec, non conclusif dans cet environnement car les variables Supabase ne sont pas présentes.

Sortie utile:

```text
Missing SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL or SUPABASE_ANON_KEY/NEXT_PUBLIC_SUPABASE_ANON_KEY
```

Contexte connu: AQ-227 reste bloqué côté DDL `blind_until`. Ici le script ne va pas jusque-là, faute de credentials locaux.

## Contrôle live HTTP et HTML

Méthode: navigation navigateur sur les routes publiques. Le fetch Node direct vers `.app` a été bloqué par le contrôle de sécurité local, donc j'ai utilisé `browser_navigate` puis inspection du DOM rendu avec `document.documentElement.outerHTML` et `document.body.innerText`.

Routes testées:

`/`

Résultat: OK.

Détails:

```text
URL: https://baycast-p.vercel.app/
Title: Baycast - Predict Real Events
HTML rendu: 60330 bytes
aggregate_probability dans outerHTML: non
forecasters_count dans outerHTML: non
aggregate_probability dans body text: non
forecasters_count dans body text: non
```

`/questions`

Résultat: pas OK pour AQ-239 tel que demandé.

Détails:

```text
URL: https://baycast-p.vercel.app/questions
Title: Browse Prediction Questions - Baycast
HTML rendu: 54833 bytes
aggregate_probability dans outerHTML: oui, 10 occurrences
forecasters_count dans outerHTML: oui, 10 occurrences
aggregate_probability dans body text: non
forecasters_count dans body text: non
```

Contexte observé sans lire de forecasts: les noms de champs apparaissent dans le HTML sérialisé, avec `$undefined`, par exemple autour de `aggregate_probability` puis `forecasters_count`. Ils ne sont pas visibles dans le texte rendu de la page, mais ils sont bien présents dans la réponse HTML publique rendue.

`/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`

Résultat: OK.

Détails:

```text
URL: https://baycast-p.vercel.app/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248
Title: Will Apple announce a new Mac Pro at WWDC 2026? - Baycast
HTML rendu: 44642 bytes
aggregate_probability dans outerHTML: non
forecasters_count dans outerHTML: non
aggregate_probability dans body text: non
forecasters_count dans body text: non
```

La page garde le message attendu côté public: `Lock your forecast before the crowd can shape it` et `Community signal locked`.

`/activity`

Résultat: OK.

Détails:

```text
URL: https://baycast-p.vercel.app/activity
Title: Recent Forecasting Activity - Baycast
HTML rendu: 23565 bytes
aggregate_probability dans outerHTML: non
forecasters_count dans outerHTML: non
aggregate_probability dans body text: non
forecasters_count dans body text: non
```

## Conclusion AQ-239

AQ-239 n'est pas techniquement DONE.

Ce qui est bon: home, detail question testée et activity chargent correctement. Les tests unitaires et TypeScript passent. Aucun leak visible dans le texte rendu.

Ce qui bloque: `/questions` expose encore les chaînes `aggregate_probability` et `forecasters_count` dans le HTML public sérialisé pour les cartes de questions ouvertes. Même si les valeurs observées sont `$undefined` et non affichées dans le texte de page, la consigne AQ-239 demandait qu'aucune réponse publique ne les expose dans le HTML rendu.

Autre point bloquant connu: les checks Supabase n'ont pas pu valider la readiness dans ce worktree car les variables Supabase ne sont pas présentes. AQ-227 reste le blocage DDL attendu pour `blind_until`, mais ce run local n'a pas atteint cette vérification.