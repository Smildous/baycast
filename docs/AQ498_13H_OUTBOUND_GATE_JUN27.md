# AQ-498 gate outbound 13h UTC, 27 juin

Check fait le 2026-06-27 à 13:01 UTC. Rien n'a été envoyé, rien n'a été posté.

## Verdict

NO SEND.

La prod publique est disponible et le gate distribution passe. Email local est prêt via Himalaya. X n'est pas authentifié dans ce run. La liste privée contient 2 lignes non vides, mais 0 ligne complète envoyable. Le gate reste fermé tant qu'il n'y a pas au moins une cible privée complète et un canal prêt pour le message prévu.

## Checks du run

Repo de travail: `/root/baycast-marketing`.

HEAD au moment du check: `88c28c8`.

Synchronisation initiale demandée exécutée: `git fetch origin && git checkout main && git pull --ff-only origin main`.

### 1. URL publique

URL testée avec navigateur: `https://baycast-p.vercel.app/`.

Résultat: OK. La page charge avec le titre `Baycast - Predict Real Events` et expose la home Baycast, dont les liens `Questions`, `Activity`, `Leaderboard` et `Get Started Free`.

Aucune action d'envoi.

### 2. Gate distribution

Commande disponible et lancée:

```bash
npm run verify:distribution-gate
```

Résultat: OK, exit 0.

Routes vérifiées par le script:

- `/settlements/apple-mac-pro-wwdc-2026`
- `/questions?status=resolved`
- `/`

Sortie utile: `Distribution gate verification passed.`

### 3. Email, Himalaya

`himalaya` est présent à `/root/.local/bin/himalaya`.

Version: `himalaya v1.2.0 +maildir +smtp +wizard +sendmail +pgp-commands +imap`.

Probe sans envoi:

```bash
himalaya account doctor
```

Résultat: OK, exit 0.

- TOML configuration integrity: OK
- IMAP integrity: OK
- SMTP integrity: OK

Aucun email envoyé.

### 4. X tooling et env

`x-cli` est présent à `/root/.local/bin/x-cli`.

`x-cli --help` répond en exit 0.

Variables `X_*` ou `TWITTER_*` visibles dans l'environnement: 0.

Variables X requises présentes: 0 sur 5.

Probe lecture seule, sans publication:

```bash
x-cli me bookmarks --max 1
```

Résultat: FAIL, exit 1. Le CLI demande les variables X attendues, dont `X_API_KEY` et `X_BEARER_TOKEN`.

Aucun post X lancé.

### 5. Warm targets privés

Dossier vérifié: `/root/baycast-private/outreach/`.

Les données privées ne sont pas imprimées ici. Pas d'email, pas de handle, pas de nom, pas de ligne complète.

| Fichier | Lignes totales | Lignes non vides | Lignes email complètes | Lignes X complètes | Lignes complètes envoyables |
|---|---:|---:|---:|---:|---:|
| `warm_targets.example.csv` | 0 | 0 | 0 | 0 | 0 |
| `warm_targets_jun14_19h.csv` | 2 | 2 | 0 | 0 | 0 |

Critère de comptage utilisé pour ce gate: une ligne email complète doit avoir au minimum une identité, un email et un contexte ou angle personnel. Une ligne X complète doit avoir au minimum une identité, un handle et un contexte ou angle personnel. Les lignes incomplètes ne sont pas envoyables.

Total actuel: 0 cible complète envoyable.

## Contenu prêt, mais gated

Ces variantes sont prêtes à être utilisées plus tard si le gate passe. Elles ne doivent pas être envoyées depuis ce run.

### Email gated

Objet: Baycast, pour tester vos prédictions avant de voir le consensus

Bonjour,

Je vous partage Baycast, un petit produit de forecasting qui force une prédiction avant d'afficher le consensus. L'idée est simple: répondre d'abord, comparer ensuite, puis être scoré quand l'événement se résout.

La version publique est ici: https://baycast-p.vercel.app

Si vous aimez tester votre jugement sur des questions réelles, je serais preneur d'un retour court: est-ce que le principe est clair en moins d'une minute, et quelle question vous donnerait envie de répondre?

Merci,
Baycast

Statut: gated, ne pas envoyer tant que le verdict reste NO SEND.

### X post gated

Baycast est un outil de prediction polling: vous donnez votre probabilité avant de voir le consensus, puis vous êtes scoré quand le réel tranche.

Test public: https://baycast-p.vercel.app

Statut: gated, ne pas poster tant que le verdict reste NO SEND.

## Décision finale

NO SEND.

Raisons bloquantes:

- X non authentifié dans ce run.
- 0 warm target privée complète envoyable.

Actions non faites:

- Aucun email envoyé.
- Aucun post X envoyé.
- Aucun DM ou autre canal outbound utilisé.
