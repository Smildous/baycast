# AQ-486, outbound gate matin, Jun 26

Contrôle fait le 2026-06-26T07:02:15Z depuis `/root/baycast-marketing`, après fast-forward sur `origin/main`. Je n'ai rien envoyé: pas d'email, pas de post X, pas de DM, pas de test sortant.

Verdict: NO SEND.

Le public passe. L'URL répond en 200, le gate distribution passe, et le verifier BCP public passe. Himalaya est disponible et le compte local passe IMAP et SMTP. Le blocage reste net: la liste privée hors git a 2 lignes de travail, mais 0 ligne complète et sendable. X est installé, mais l'auth API n'est pas disponible dans ce run. Avec 0 cible privée prête, la distribution reste fermée.

## Repo

```text
git fetch origin main && git merge --ff-only origin/main
From https://github.com/Smildous/baycast
 * branch            main       -> FETCH_HEAD
Already up to date.
HEAD d7be052dac51a9567275096eafd4e5a6285d224e
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

Résultat public: PASS. Le lien public utilisable reste `https://baycast-p.vercel.app/settlements/apple-mac-pro-wwdc-2026`.

## Canaux sortants, vérifiés sans envoyer

Himalaya est installé à `/root/.local/bin/himalaya`. Le check local passe.

```text
himalaya account list: exit 0
himalaya account doctor: exit 0
Checking TOML configuration integrity for default account… OK
Checking IMAP integrity… OK
Checking SMTP integrity… OK
```

Je compte donc l'email comme disponible, sans avoir envoyé quoi que ce soit.

X CLI est installé à `/root/.local/bin/x-cli`, mais je ne compte pas X comme prêt. `auth status` n'existe pas dans ce binaire, `me` sans sous-commande affiche l'aide, et le check de lecture authentifiée échoue avant auth complète.

```text
x-cli --help: exit 0
x-cli auth status: exit 2
x-cli me: exit 2
x-cli --json me mentions: exit 1
Missing env var: X_API_KEY. Set X_API_KEY, X_API_SECRET, X_ACCESS_TOKEN, X_ACCESS_TOKEN_SECRET, X_BEARER_TOKEN.
```

Aucun post, DM, like ou autre action X n'a été lancé.

## Warm targets privés

Contrôle limité à `/root/baycast-private/outreach`, hors git. Je n'ai imprimé aucun nom, email, handle, note personnelle ou détail de contact.

```text
warm_targets.example.csv: nonempty_rows=0 complete_sendable_rows=0 ready_status_rows=0 columns=0
warm_targets_jun14_19h.csv: nonempty_rows=2 complete_sendable_rows=0 ready_status_rows=0 columns=15
missing_counts=contact=2, identity=2, last_context=2, next_action=2, opt_in=2, platform=2, ready_status=2, relationship=2, why_relevant=2
```

Critère appliqué: une cible sendable doit avoir une identité, un contact, une plateforme, une relation réelle, une raison pertinente, un dernier contexte, un opt-in exploitable, une note personnelle, un owner, une next action, et un statut prêt ou approuvé. Total actuel: 0 ligne complète.

## Décision

NO SEND.

Les raisons concrètes sont simples: la partie publique est propre et l'email est utilisable, mais la liste privée ne contient aucune cible complète. X n'est pas authentifié non plus. La règle Baycast reste fermée tant que le verifier public et la liste privée ne sont pas tous les deux complets. Ici, la liste privée échoue, donc rien ne part.
