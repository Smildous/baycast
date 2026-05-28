# AQ-278 dev verifier recheck, May 28 19h

Recheck fait depuis `/root/baycast-dev`, après remise au propre sur `origin/main`.

Commande de départ exécutée :

```bash
git fetch origin && git reset --hard origin/main
```

Résultat : `HEAD is now at 8d6e5b1 docs(AQ-277): add post-score distribution gate recheck at 13h`.

Les vérifications lancées ensuite :

```bash
git diff --check
```

Pass. Aucune sortie, aucun whitespace error.

```bash
npm run verify:public-bcp
```

Pass. Le script a vérifié `https://baycast-p.vercel.app`, puis `/`, `/questions`, la question publique `13aa9f2f-3226-4213-a04f-0cc2b87ad248`, `/leaderboard` et `/activity`. Sortie finale : `Public BCP surface verification passed.`

```bash
set -a; . /root/baycast/.env.local; set +a; npm run verify:first-settlement-evidence
```

Pass avec l'env du repo. Sortie utile :

```json
{
  "ok": true,
  "mode": "readonly",
  "table": "questions",
  "checked_at": "2026-05-28T19:01:36.911Z",
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

Le close timestamp Apple Mac Pro est donc `2026-06-13T00:00:00+00:00`.

Statut readonly confirmé dans `scripts/first-settlement-evidence.mjs` : le fichier se présente comme read-only, annonce qu'il lit seulement `questions`, et la requête utilisée est `client.from('questions').select(...)` avec filtres sur `closes_at`. Le rapport émis indique aussi `mode: "readonly"` et `table: "questions"`.

Je n'ai pas lu la table `forecasts` ni de données forecast à la main. Le script inspecté ne requête pas `forecasts`, et cette recheck AQ-278 reste limitée aux surfaces publiques BCP et aux métadonnées de question nécessaires au premier settlement.
