# AQ-489, outbound gate 13h, Jun 26

Controle fait le 2026-06-26T13:02:10Z depuis `/root/baycast-marketing`, apres fast-forward sur `origin/main`.

Verdict: NO SEND.

Je n'ai rien envoye. Pas d'email, pas de post X, pas de DM, pas de like, pas de test sortant. Le public est propre, l'email local est utilisable, mais la liste privee n'a toujours aucune ligne complete et sendable. X n'est pas authentifie dans cet environnement.

## Repo

```text
git fetch origin main && git checkout main && git pull --ff-only origin main
Already on 'main'
Your branch is up to date with 'origin/main'.
Already up to date.
HEAD fa8fdfa488721c0a7b926c026091f1dbe85f47a3
```

## Public

```text
curl -L https://baycast-p.vercel.app/
http_code=200 final_url=https://baycast-p.vercel.app/ content_type=text/html; charset=utf-8
```

```text
npm run verify:distribution-gate
Verifying distribution gate at https://baycast-p.vercel.app
ok /settlements/apple-mac-pro-wwdc-2026
ok /questions?status=resolved
ok /
Distribution gate verification passed.
```

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

Resultat public: PASS. L'URL publique marche. Le lien de distribution reste `https://baycast-p.vercel.app/settlements/apple-mac-pro-wwdc-2026`.

## Canaux sortants, sans envoi

Himalaya est disponible a `/root/.local/bin/himalaya`.

```text
himalaya account list: exit 0
account visible: gmail, IMAP et SMTP, default yes
himalaya account doctor: exit 0
Checking TOML configuration integrity for default account… OK
Checking IMAP integrity… OK
Checking SMTP integrity… OK
```

Email: disponible techniquement. Je n'ai lance aucun envoi.

X CLI est disponible a `/root/.local/bin/x-cli`, mais l'auth n'est pas prete.

```text
x-cli --help: exit 0
commands visible: like, me, retweet, tweet, user
x-cli auth status: exit 2
Error: No such command 'auth'.
x-cli me: exit 2
shows help for Self operations only
x-cli --json me mentions: exit 1
Missing env var: X_API_KEY. Set X_API_KEY, X_API_SECRET, X_ACCESS_TOKEN, X_ACCESS_TOKEN_SECRET, X_BEARER_TOKEN.
```

X: NO READY. Aucun post, DM, like ou retweet lance.

## Warm targets prives

Controle limite a `/root/baycast-private/outreach`, hors git. Je n'ai imprime aucun nom, email, handle, note personnelle ou detail de contact.

```text
base_exists=True
warm_targets.example.csv: rows=0 nonempty_rows=0 complete_sendable_rows=0 ready_status_rows=0 columns=15
warm_targets.example.csv: missing_counts=none
warm_targets_jun14_19h.csv: rows=2 nonempty_rows=2 complete_sendable_rows=0 ready_status_rows=0 columns=15
warm_targets_jun14_19h.csv: missing_counts=identity=2, contact=2, platform=2, relationship=2, why_relevant=2, last_context=2, opt_in=2, next_action=2, ready_status=2
```

Critere applique: une cible sendable doit avoir une identite, un contact, une plateforme, une relation reelle, une raison pertinente, un dernier contexte, un opt-in exploitable, une note personnelle, un owner, une next action, et un statut pret ou approuve.

Completude actuelle: 2 lignes non vides, 0 ligne complete, 0 ligne sendable.

## Micro email pack pret a envoyer quand le gate ouvre

Ne pas envoyer maintenant. Ce pack est seulement la copie prete pour le moment ou au moins une cible privee complete est approuvee.

Sujet A: petit retour sur Baycast ?

```text
Salut {{first_name}},

Je te l'envoie parce que tu suis deja {{context_topic}} et que ton avis serait utile.

Baycast est un petit outil de prediction polling. On a maintenant une question resolue avec score public, donc il y a enfin quelque chose de concret a regarder, pas juste une landing page.

Le lien: https://baycast-p.vercel.app/settlements/apple-mac-pro-wwdc-2026

Si tu as 3 minutes, je cherche surtout un retour franc sur deux points:
1. est-ce que la page donne confiance ?
2. est-ce que tu aurais envie de faire une prediction sur une question ouverte ?

Merci,
{{sender_name}}
```

Sujet B: Baycast, premier score public

```text
Salut {{first_name}},

Je voulais te montrer la premiere page Baycast vraiment partageable: une prediction resolue, avec le score visible.

https://baycast-p.vercel.app/settlements/apple-mac-pro-wwdc-2026

Ce n'est pas un lancement large. Je cherche juste quelques retours de personnes qui comprennent {{context_topic}}.

Question simple: qu'est-ce qui bloque encore avant que tu fasses une prediction toi-meme ?

{{sender_name}}
```

Relance courte, J+3 max:

```text
Salut {{first_name}}, je te remets le lien Baycast ici au cas ou: https://baycast-p.vercel.app/settlements/apple-mac-pro-wwdc-2026

Un retour en une phrase suffit. Le plus utile pour moi: confiance, clarte, ou envie de predire.

Merci,
{{sender_name}}
```

Notes d'usage: personnaliser `{{context_topic}}` avec le contexte reel de la relation. Ne pas inventer d'interet, de traction, de communaute ou d'usage. Une seule relance. Stop si pas de reponse.

## Decision

NO SEND.

Le blocage exact est la liste privee: 2 lignes non vides, 0 complete, 0 sendable. Le public passe et Himalaya passe, mais cela ne suffit pas. X reste non authentifie. Tant qu'il n'y a pas au moins une cible privee complete et approuvee, rien ne part.
