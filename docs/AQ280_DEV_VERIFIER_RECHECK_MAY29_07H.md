# AQ-280 dev verifier recheck, 29 mai 07h

Run fait depuis `/root/baycast-dev` après remise à zéro sur `origin/main`. Le fichier de rapport a été créé avant les checks, puis rempli avec les sorties ci-dessous. Je n'ai pas lu ni interrogé la table `forecasts` directement.

Commande de sync:

```bash
git fetch origin && git reset --hard origin/main
```

Résultat: PASS.

```text
HEAD is now at 0cdd9d1 docs(AQ-279): add post-score distribution gate recheck at 19h
```

Commande:

```bash
git diff --check
```

Résultat: PASS. Aucune sortie.

Commande:

```bash
npm run verify:public-bcp
```

Résultat: PASS.

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

Commande d'abord lancée sans env Supabase locale dans `/root/baycast-dev`:

```bash
npm run verify:first-settlement-evidence
```

Résultat: FAIL environnement, pas bug verifier.

```text
> baycast@0.1.0 verify:first-settlement-evidence
> node scripts/first-settlement-evidence.mjs

{
  "ok": false,
  "error": "Missing SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL or SUPABASE_ANON_KEY/NEXT_PUBLIC_SUPABASE_ANON_KEY"
}
```

Commande relancée avec l'env repo disponible, sans afficher de secret:

```bash
set -a; . /root/baycast/.env.local; set +a; npm run verify:first-settlement-evidence
```

Résultat: PASS.

```text
> baycast@0.1.0 verify:first-settlement-evidence
> node scripts/first-settlement-evidence.mjs

⚠️  Node.js 18 and below are deprecated and will no longer be supported in future versions of @supabase/supabase-js. Please upgrade to Node.js 20 or later. For more information, visit: https://github.com/orgs/supabase/discussions/37217
{
  "ok": true,
  "mode": "readonly",
  "table": "questions",
  "checked_at": "2026-05-29T07:02:22.668Z",
  "candidate_reason": "Apple Mac Pro exact match",
  "candidate": {
    "title": "Will Apple announce a new Mac Pro at WWDC 2026?",
    "status": "open",
    "closes_at": "2026-06-13T00:00:00+00:00",
    "resolution_source": "Apple WWDC and Apple Newsroom: https://developer.apple.com/wwdc26/ and https://www.apple.com/newsroom/",
    "resolution_url": null
  },
  "checklist": [
    "Confirm the candidate title matches the intended first settlement.",
    "Open the public source URL before settlement.",
    "Capture source title, publisher, URL, and retrieval timestamp.",
    "Save public evidence only. Do not inspect protected Blind Consensus data for open questions.",
    "Settle only after close time and after the source directly answers the question."
  ]
}
```

Conclusion: les deux verifiers demandés passent. Le premier settlement evidence verifier reste read-only et lit `questions`. La route directe Apple Mac Pro vérifiée par le public BCP est `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`. Aucun correctif produit n'a été nécessaire.
