# AQ-477, outbound gate matin, Jun 25

Contrôle fait le 2026-06-25T07:02:54Z depuis `/root/baycast-marketing`. Le repo a été mis à jour avant le recheck avec `git fetch origin && git pull --ff-only origin main`. Aucun envoi n'a été fait: pas d'email, pas de post X, pas de DM, pas de test sortant.

Verdict: NO SEND.

La surface publique est prête. L'URL répond, le gate distribution passe, le verifier BCP public passe. Le canal email local est aussi utilisable via Himalaya. Le blocage reste la liste privée: elle contient 2 lignes de travail, mais 0 ligne complète et sendable. X est installé, mais son authentification n'est pas prouvée dans ce run. Avec 0 cible privée complète, le gate reste fermé.

## Repo

```text
git fetch origin && git pull --ff-only origin main
From https://github.com/Smildous/baycast
 * branch            main       -> FETCH_HEAD
Already up to date.
```

## Public

```text
curl -L https://baycast-p.vercel.app/
http_code=200 final_url=https://baycast-p.vercel.app/
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

Résultat public: PASS. Baycast est présenté comme prediction polling, pas comme gambling, et je n'ai rien vu ici qui justifie de bloquer la surface publique.

## Canaux sortants vérifiés sans envoyer

Himalaya est installé à `/root/.local/bin/himalaya`. Le compte local passe le doctor.

```text
himalaya account list: exit 0
himalaya account doctor: exit 0
Checking TOML configuration integrity for default account… OK
Checking IMAP integrity… OK
Checking SMTP integrity… OK
```

Je compte donc l'email comme canal authentifié disponible pour ce gate.

X CLI est installé à `/root/.local/bin/x-cli`, mais je ne compte pas X comme prêt. `x-cli auth status` échoue parce que la commande `auth` n'existe pas dans ce binaire, et `x-cli me` sans sous-commande affiche seulement l'aide.

```text
x-cli --help: exit 0
x-cli auth status: exit 2
x-cli me: exit 2
```

## Warm targets privés

Contrôle limité à `/root/baycast-private/outreach`. Je n'ai imprimé aucun nom, email, handle, note personnelle ou détail privé.

```text
warm_targets.example.csv: rows=0 actionable_rows=0 blocked_rows=0 complete_sendable_rows=0 columns=15
warm_targets_jun14_19h.csv: rows=2 actionable_rows=2 blocked_rows=0 complete_sendable_rows=0 columns=15
```

Critère appliqué: une ligne complète doit avoir au minimum une identité, un contact email ou handle, une plateforme, une relation, une raison claire, un dernier contexte, un opt-in exploitable, une note personnelle, un owner, une next action, et un statut prêt ou approuvé. Le total actuel est 0 ligne complète et sendable.

## Snippet prêt à envoyer, non envoyé

Objet: Premier score public Baycast, feedback bienvenu

Salut [prénom],

Je te partage Baycast parce que ton regard sur [contexte personnel] m'intéresse. On vient de publier un premier score public sur une question résolue: https://baycast-p.vercel.app/settlements/apple-mac-pro-wwdc-2026

Baycast est du prediction polling. Pas de marché, pas d'argent, pas de pari. Tu donnes une probabilité, puis le score devient visible quand la question se résout.

Si tu as 5 minutes, j'aimerais surtout savoir deux choses: est-ce que la page de settlement est claire, et est-ce que tu aurais envie de répondre à une prochaine question publique?

Merci,
[signature]

Ce texte reste en attente. Il ne doit partir qu'après ajout hors git d'au moins une cible warm complète, avec opt-in et note personnelle revue.

## Décision

NO SEND.

Les conditions d'ouverture sont: URL publique atteignable, BCP public propre, au moins un canal authentifié, et au moins une ligne privée complète et sendable. Les trois premiers points passent grâce au public et à Himalaya. Le dernier point échoue. Aucun outbound ne doit partir ce matin.
