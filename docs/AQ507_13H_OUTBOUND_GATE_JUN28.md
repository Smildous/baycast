# AQ-507 gate outbound 13h, 28 juin

Check fait le 2026-06-28T13:02:36Z depuis `/root/baycast-marketing`. Aucun message envoyé. Aucun email, aucun post X, aucun DM.

Verdict: NO SEND.

La surface publique est OK et les deux gates publics passent. Himalaya est prêt en accès direct. X n'est pas authentifié dans ce run. Les fichiers privés de warm targets ont encore 0 ligne réelle complète et envoyable. La règle bloque donc tout outbound.

## Evidence

Repo synchronisé avant contrôle avec la commande demandée:

```text
git fetch origin && git pull --ff-only origin main
```

Résultat: déjà à jour sur `6efa035`.

URL publique:

```text
curl -I -L --max-time 20 https://baycast-p.vercel.app
```

Résultat: HTTP 200. Réponse Vercel datée `Sun, 28 Jun 2026 13:01:41 GMT`.

Distribution gate:

```text
npm run verify:distribution-gate
```

Résultat: PASS. Routes vérifiées: `/settlements/apple-mac-pro-wwdc-2026`, `/questions?status=resolved`, `/`.

Public BCP verifier:

```text
npm run verify:public-bcp
```

Résultat: PASS. Routes vérifiées: `/`, `/questions`, `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`, `/leaderboard`, `/activity`.

Email local:

```text
/root/.local/bin/himalaya --version
/root/.local/bin/himalaya account doctor
```

Résultat: Himalaya `v1.2.0`, doctor exit 0. TOML, IMAP et SMTP OK. Note utile: `himalaya` n'est pas dans le `PATH` de ce shell, il faut l'appeler par `/root/.local/bin/himalaya`. Aucun envoi lancé.

X:

```text
/root/.local/bin/x-cli --help
/root/.local/bin/x-cli me bookmarks
```

Résultat: `x-cli` est présent et le help répond exit 0. Le test authentifié `me bookmarks` échoue avec `Missing env var: X_API_KEY`. Variables visibles `X_*` ou `TWITTER_*`: 0. Variables X requises présentes: 0 sur 5. Auth X non prouvée. Aucun post lancé.

Warm targets privés:

Répertoire vérifié: `/root/baycast-private/outreach`. Je n'ai imprimé aucun contact privé dans ce doc.

```text
fichiers trouvés: 2
data rows: 2
lignes non vides: 2
lignes complètes envoyables: 0
```

Fichiers vus: `warm_targets_jun14_19h.csv` et `warm_targets.example.csv`. Les lignes de données actuelles sont des placeholders bloqués, pas des contacts réels.

Critère utilisé: ligne complète avec identité, canal joignable, plateforme, relation, pertinence, contexte récent ou note personnelle, statut opt-in, et statut non bloquant.

## Décision

NO SEND.

Le BCP public passe, mais le gate demandé exige aussi une auth canal prouvée et au moins une warm target privée réelle complète. Ici X n'est pas authentifié et la liste warm reste à 0 ligne envoyable. Stop avant tout outbound.
