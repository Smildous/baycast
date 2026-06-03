# AQ-312, recheck distribution post-score, 3 juin 07h UTC

Verdict: NO-SEND.

Contrôle fait à 07:04 UTC après sync sur `origin/main`. Aucun message envoyé, aucun post X, aucun email, aucun contournement. Je n'ai pas interrogé la table `forecasts`.

Le gate reste fermé. Il manque encore les preuves publiques qui permettraient de distribuer proprement.

Côté Supabase, lecture seule sur `questions`: `44` questions au total, `44` open, `0` resolved. Le vérifieur first-settlement lit seulement `questions` et retourne encore le candidat Apple Mac Pro en statut `open`, clôture `2026-06-13T00:00:00+00:00`, avec une source de résolution prévue mais pas de settlement public publié.

Note publique de settlement: non. Les routes publiques testées ne donnent pas de note stable à citer. `/settlements`, `/settlement`, `/resolutions`, `/notes`, `/blog` et `/updates` répondent en 404 sur `https://baycast-p.vercel.app`.

Scores visibles: non. La prod répond, mais rien ne montre un score post-résolution réel. `/questions` répond en 200 avec `44 open`. `/questions?status=resolved` répond en 200 avec `44 open` et `No match`. `/leaderboard` affiche encore `Scores appear after questions resolve`. `/activity` affiche encore `Activity appears after questions resolve`. Les mots Brier, Log Score, Resolved ou score existent dans l'interface, mais pas comme score public attaché à un résultat réglé.

Warm target list privée hors git: non. J'ai vérifié seulement l'existence et les noms de fichiers, sans ouvrir ni imprimer de contenu privé. `/root/baycast-private` est absent. `/root/private` est absent. Aucun fichier candidat n'a été trouvé dans ces racines privées.

Côté canaux, email est techniquement disponible mais ça ne suffit pas. `himalaya` est installé dans `/root/.local/bin/himalaya`; `himalaya account list` voit `gmail` comme compte par défaut avec IMAP et SMTP; `himalaya account doctor` passe TOML, IMAP et SMTP en OK. Rien n'a été envoyé.

X n'est pas prouvé comme canal utilisable. `x-cli` est installé dans `/root/.local/bin/x-cli`, mais `x-cli auth status`, `x-cli account` et `x-cli whoami` ne sont pas des commandes disponibles. `x-cli me` affiche seulement l'aide des commandes self. Je ne compte donc pas X comme prêt.

Prochaine condition exacte: publier une note de settlement publique, rendre au moins un score post-résolution visible en prod, placer une warm target list privée approuvée hors git, puis confirmer le canal choisi pour le sender. Tant que ces preuves ne sont pas vraies ensemble, Baycast ne distribue pas le message post-score.
