# AQ-480, gate outbound 13h, Jun 25

Contrôle fait le 2026-06-25T13:01:43Z depuis `/root/baycast-marketing`, après mise à jour sur `origin/main`. Aucun message envoyé. Pas d'email, pas de post X, pas de DM, pas de test sortant.

Verdict: NO SEND.

Le produit public est prêt pour une distribution courte. L'URL répond, le gate distribution passe, le verifier BCP public passe. Himalaya est authentifié côté email. X reste non prouvé dans ce run. Le blocage concret reste la liste privée: il y a 2 lignes de travail sous `/root/baycast-private/outreach`, mais 0 ligne complète et sendable. Sans cible privée complète, je ne lance rien.

## Repo

```text
git fetch origin main && git checkout main && git pull --ff-only origin main
From https://github.com/Smildous/baycast
 * branch            main       -> FETCH_HEAD
Already on 'main'
Your branch is up to date with 'origin/main'.
Already up to date.
```

## Surface publique

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

Je compte donc le public comme PASS. Le lien utilisable pour un message first-score est `https://baycast-p.vercel.app/settlements/apple-mac-pro-wwdc-2026`.

## Canaux sortants

Himalaya est présent à `/root/.local/bin/himalaya`. Le compte local passe les contrôles IMAP et SMTP.

```text
himalaya account list: exit 0
himalaya account doctor: exit 0
Checking TOML configuration integrity for default account… OK
Checking IMAP integrity… OK
Checking SMTP integrity… OK
```

Je compte l'email comme canal authentifié disponible, sans envoi.

X CLI est présent à `/root/.local/bin/x-cli`, mais je ne compte pas X comme prêt. Le check sûr ne prouve pas l'authentification: `x-cli auth status` échoue parce que cette commande n'existe pas dans ce binaire, et `x-cli me` renvoie aussi une erreur d'usage.

```text
x-cli --help: exit 0
x-cli auth status: exit 2
x-cli me: exit 2
```

## Warm targets privés

Contrôle limité à `/root/baycast-private/outreach`. Je n'ai imprimé aucun nom, email, handle, note personnelle ou détail de contact.

```text
warm_targets.example.csv: nonempty_rows=0 complete_sendable_rows=0 ready_status_rows=0 missing_counts=none
warm_targets_jun14_19h.csv: nonempty_rows=2 complete_sendable_rows=0 ready_status_rows=0 missing_counts=name=2, handle_or_email=2, platform=2, relationship=2, why_relevant=2, last_context=2, opt_in_status=2, next_action=2
```

Critère gardé simple: une ligne sendable doit avoir une identité, un contact, une plateforme, une relation, une raison, un contexte récent, un opt-in clair, une note personnelle, un owner, une next action, et un statut prêt ou approuvé. Total actuel: 0 cible complète.

## Snippet prêt à envoyer, non envoyé

Objet: Premier score public Baycast, avis bienvenu

Salut [prénom],

Je te partage Baycast parce que ton regard sur [contexte personnel] m'intéresse. On vient de publier notre premier score public sur une question résolue: https://baycast-p.vercel.app/settlements/apple-mac-pro-wwdc-2026

Baycast est du prediction polling. Pas de marché, pas d'argent, pas de pari. Tu donnes une probabilité, puis le score devient visible quand la question se résout.

Si tu as 5 minutes, j'aimerais surtout savoir deux choses: est-ce que la page de settlement est claire, et est-ce que tu aurais envie de répondre à une prochaine question publique?

Merci,
[signature]

Ce texte reste en attente. Il ne doit partir qu'après ajout hors git d'au moins une cible warm complète, avec opt-in et note personnelle revue.

## Décision

NO SEND.

Les gates publics passent et l'email est utilisable. La distribution reste fermée parce qu'aucune cible privée complète n'existe pour un envoi propre. X n'ajoute pas de capacité validée dans ce run. Aucun outbound ne doit partir à 13h.
