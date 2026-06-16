# AQ-401, gate outbound 19h, 16 juin

Contrôle lancé à 2026-06-16T19:03:51Z, après `git fetch origin main` puis fast-forward sur `origin/main`. Aucun message n'a été envoyé. Les fichiers AQ-395 et AQ-398 n'ont pas été modifiés.

Verdict: NO SEND.

La raison est simple: la liste privée hors git existe, mais elle ne contient aujourd'hui aucune cible complète. J'ai contrôlé `/root/baycast-private/outreach/` sans publier de détail privé dans ce dépôt. Deux fichiers CSV ont été trouvés: un exemple vide et une liste de travail avec 2 lignes. Une ligne sendable devait avoir un contact, un canal, un contexte et une prochaine action. Résultat: 2 lignes de données, 0 ligne complète. Les deux lignes ont du contexte, mais il manque le contact, le canal et la prochaine action. Donc il n'y a rien à envoyer proprement.

Côté email, `himalaya` est disponible dans `/root/.local/bin/himalaya`. Le compte par défaut `gmail` est listé avec IMAP et SMTP, et `himalaya account doctor` passe TOML, IMAP et SMTP en OK. L'email local paraît utilisable, mais ce point ne suffit pas à ouvrir le gate.

Côté X, `x-cli` est disponible dans `/root/.local/bin/x-cli`, avec les commandes authentifiées habituelles. Dans ce run, aucune variable `X_*` ou `TWITTER_*` n'est visible. Le probe read-only `x-cli -j me mentions` échoue sur les variables X manquantes. X n'est donc pas prouvé utilisable ici.

J'ai aussi refait un contrôle public léger dans ce même run pour éviter de m'appuyer seulement sur l'état de 13h. `https://baycast-p.vercel.app/`, `/questions`, et les deux pages publiques FIFA et OpenAI répondent HTTP 200. Les pages questions et détails ne montrent pas les termes BCP contrôlés: `aggregate_probability`, `forecasters_count`, `forecast count`, `forecast_count`, `forecasts_count`, `forecasts`, `consensus`, `settled_by`, `evidence_doc`. La home contient seulement le mot `consensus` dans une phrase marketing, pas comme donnée produit ou score.

Même avec une surface publique qui paraît propre et un email local utilisable, le gate reste fermé parce que le fichier privé ne contient aucune cible complète. Pas d'envoi, pas de DM, pas de publication, pas de contournement.
