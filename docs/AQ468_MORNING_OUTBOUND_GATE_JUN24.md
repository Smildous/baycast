# AQ-468, outbound gate matin, Jun 24

Verdict: NO SEND.

Run fait depuis `/root/baycast-marketing` le 2026-06-24 à 07:01 UTC. Le clone a d'abord été remis à jour avec `git fetch origin`, `git checkout main`, puis `git pull --ff-only origin main`. Rien n'a été envoyé. Pas d'email, pas de post X, pas de DM, pas de test d'envoi.

La règle est simple: on n'envoie que si l'URL publique répond, si le BCP public passe, si le gate distribution passe quand le script existe, si au moins un canal sortant est utilisable, et si la liste privée warm targets contient au moins une ligne complète et sendable. Aujourd'hui, les surfaces publiques passent et Himalaya est utilisable. La liste privée bloque encore: 2 lignes dans le fichier réel, 0 ligne actionnable, 0 ligne complète et sendable. X n'est pas prouvé non plus.

## Contrôles du run

Précheck repo:

```text
git fetch origin && git checkout main && git pull --ff-only origin main
Already on 'main'
Your branch is up to date with 'origin/main'.
Already up to date.
```

URL publique:

```text
curl -L https://baycast-p.vercel.app/
http_code=200 final_url=https://baycast-p.vercel.app/
```

Le site public répond en 200 sur l'URL stable.

Distribution:

```text
npm run verify:distribution-gate
Verifying distribution gate at https://baycast-p.vercel.app
ok /settlements/apple-mac-pro-wwdc-2026
ok /questions?status=resolved
ok /
Distribution gate verification passed.
```

BCP public:

```text
npm run verify:public-bcp
Verifying public BCP surfaces at https://baycast-p.vercel.app
ok /
ok /questions
ok /questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248
ok /leaderboard
ok /activity
Public BCP surface verification passed.
```

Canaux sortants:

```text
himalaya account doctor
Checking TOML configuration integrity for default account… OK
Checking IMAP integrity… OK
Checking SMTP integrity… OK
```

Himalaya est utilisable localement pour l'email. Je n'ai imprimé ni adresse, ni secret, ni contenu de message.

```text
x-cli --help
xcli_help_exit=0
x-cli auth status
xcli_auth_status_exit=2
x-cli me
xcli_me_exit=2
```

`x-cli` est installé, mais ce run ne prouve pas une session X authentifiée. `auth status` n'est pas une commande valide ici et `x-cli me` sans sous-commande ne donne pas une identité authentifiée exploitable. Je ne traite donc pas X comme prêt.

Liste privée warm targets:

```text
/root/baycast-private/outreach/warm_targets.example.csv: rows=0 actionable_rows=0 complete_sendable_rows=0
/root/baycast-private/outreach/warm_targets_jun14_19h.csv: rows=2 actionable_rows=0 complete_sendable_rows=0
```

Le contrôle a été fait sous `/root/baycast-private/outreach` sans afficher d'email, de handle, de nom, de note personnelle ou de secret. Le fichier réel contient seulement deux lignes de gate non actionnables. Il n'y a aucune cible privée complète et sendable.

## Décision

NO SEND.

Bloqueurs précis:

1. Liste privée warm targets: 0 ligne complète et sendable. C'est le bloqueur dur.
2. X: auth non prouvée dans ce run. Pas de post, pas de DM, pas d'action X.

Ce qui passe:

1. URL publique stable: 200 sur `https://baycast-p.vercel.app/`.
2. `verify:distribution-gate`: PASS.
3. `verify:public-bcp`: PASS.
4. Himalaya: TOML, IMAP et SMTP OK.

Le send reste fermé tant qu'une vraie ligne warm target privée n'est pas complète, revue et sendable. Même avec l'email prêt et les surfaces publiques propres, envoyer maintenant violerait le gate outbound Baycast.
