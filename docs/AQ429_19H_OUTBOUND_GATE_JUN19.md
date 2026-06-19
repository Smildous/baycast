# AQ429 19h outbound gate, Jun 19

Contrôle fait le 2026-06-19T19:02:49Z depuis `/root/baycast-marketing`. Rien n'a été envoyé. Aucun email, aucun post X, aucun DM, aucun test d'envoi.

Verdict: NO SEND.

Le public est propre et l'email local est utilisable. Le blocage est ailleurs: X n'est pas authentifié, et la liste privée chaude a 2 lignes actionnables mais 0 ligne complète et sendable. AQ-233 reste donc fermé.

## Surface publique

La synchro demandée a été faite avant les contrôles:

```text
git fetch origin && git pull --ff-only origin main
```

`npm run verify:public-bcp` passe sur `https://baycast-p.vercel.app` pour `/`, `/questions`, une page question résolue, `/leaderboard` et `/activity`.

`npm run verify:distribution-gate` passe aussi pour `/settlements/apple-mac-pro-wwdc-2026`, `/questions?status=resolved` et `/`.

J'ai repris un contrôle HTTP direct de la note publique Apple Mac Pro, de la page résolue et de la home. Les trois répondent 200. La note publique est usable pour une distribution post-résolution, et le scan simple n'a pas trouvé `aggregate_probability`, `forecasters_count`, `settled_by`, `evidence_doc`, `forecastCount` ou `fcCount` dans les pages testées.

Conclusion publique: OK.

## Canaux sortants

Himalaya est présent à `/root/.local/bin/himalaya`. `himalaya account doctor` sort en exit 0, avec TOML, IMAP et SMTP OK. Email: usable.

`x-cli` est présent à `/root/.local/bin/x-cli`. L'aide répond en exit 0. Aucun `X_*` ni `TWITTER_*` n'est présent dans l'environnement du run. `x-cli me` a été lancé avec sortie supprimée pour ne pas imprimer d'identité, et sort en exit 2. X: non authentifié dans ce run.

Conclusion canal: email OK, X non prouvé.

## Liste privée

Répertoire vérifié: `/root/baycast-private/outreach`. Je ne reprends ici aucun nom, email, handle ou détail personnel.

Fichiers trouvés: 2. Un fichier est un exemple. Un fichier est actionnable. Le répertoire privé n'est pas un dépôt git local, et ces fichiers ne sont pas dans le repo marketing.

Comptage du fichier actionnable: 2 lignes non vides, 0 ligne complète et sendable.

Critère de ligne complète: nom, contact email ou handle, plateforme, relation, pertinence, dernier contexte, opt-in exploitable, note personnelle, et aucun statut bloquant. Les 2 lignes sont incomplètes et n'ont pas d'opt-in sendable.

## Décision

NO SEND.

Tous les gates ne sont pas vrais en même temps. Le blocker exact est double: X n'est pas authentifié dans ce run, et la liste privée chaude contient 0 ligne complète et sendable. Même avec l'email OK, aucun outbound ne doit partir à 19h.

Action utile suivante: compléter hors git au moins une ligne privée avec opt-in clair, contexte récent et note personnelle exploitable, puis relancer le gate avant toute copie nominative.
