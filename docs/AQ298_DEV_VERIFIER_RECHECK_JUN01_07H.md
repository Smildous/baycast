# AQ-298 dev verifier recheck, 2026-06-01 07h UTC

Clone utilisé: `/root/baycast-dev`, synchronisé sur `origin/main` avant les contrôles.

## Résultat court

`git diff --check`: PASS.

`npm run verify:public-bcp`: PASS. Les surfaces publiques répondent bien sur la prod Vercel.

`npm run verify:first-settlement-evidence`: non validé dans ce clone, car les variables Supabase ne sont pas disponibles. Le script a été lancé et s'est arrêté sur l'erreur d'environnement manquant.

Lecture du script `scripts/first-settlement-evidence.mjs`: il cible seulement la table `questions`, avec des appels `.select(...)`. Je n'ai vu aucun appel à une table `forecasts` ni opération d'écriture. Le mot `forecasts` apparaît seulement dans un commentaire qui dit que le script ne les interroge pas.

## Commandes et sorties

### Sync

```text
git fetch origin main && git checkout main && git reset --hard origin/main

From https://github.com/Smildous/baycast
 * branch            main       -> FETCH_HEAD
   6394d31..5d56378  main       -> origin/main
Already on 'main'
Your branch is behind 'origin/main' by 2 commits, and can be fast-forwarded.
  (use "git pull" to update your local branch)
HEAD is now at 5d56378 docs(AQ-297): add post-score distribution gate recheck at 19h
```

### Code level check

```text
git diff --check

(no output)
```

Pass: oui.

### Public BCP verifier

```text
npm run verify:public-bcp

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

Pass: oui.

### First settlement evidence verifier

```text
node -e "const fs=require('fs'); for (const f of ['.env','.env.local','.env.production','.env.production.local']) if (fs.existsSync(f)) console.log(f+' present');" && npm run verify:first-settlement-evidence

> baycast@0.1.0 verify:first-settlement-evidence
> node scripts/first-settlement-evidence.mjs

{
  "ok": false,
  "error": "Missing SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL or SUPABASE_ANON_KEY/NEXT_PUBLIC_SUPABASE_ANON_KEY"
}
```

Pass: non, environnement Supabase absent dans ce clone.

Le pré-check n'a listé aucun fichier `.env` connu dans la racine du clone.

### Contrôle lecture seule du script settlement

```text
node -e "const fs=require('fs'); const p='scripts/first-settlement-evidence.mjs'; const s=fs.readFileSync(p,'utf8'); console.log('contains forecasts:', /forecast/i.test(s)); console.log('from tables:', [...s.matchAll(/\.from\(['\"]([^'\"]+)/g)].map(m=>m[1]).join(',') || '(none)'); console.log('write verbs:', /(insert|update|upsert|delete|rpc)\s*\(/i.test(s)); const lines=s.split(/\n/); lines.forEach((l,i)=>{if(/forecast|\.from\(|select\(|insert|update|upsert|delete|rpc/i.test(l)) console.log(String(i+1).padStart(3)+': '+l.trim())});"

contains forecasts: true
from tables: questions,questions
write verbs: false
  6: * Reads questions only. It never queries forecasts and never writes to Supabase.
 26: const { error } = await client.from('questions').select(column).limit(1)
 61: .from('questions')
 62: .select(selectColumns)
```

Conclusion: le script est conçu en lecture seule sur `questions`. Il ne lit pas `forecasts`.
