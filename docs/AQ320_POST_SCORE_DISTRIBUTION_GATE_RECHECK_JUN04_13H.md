# AQ-320, recheck distribution post-score, 4 juin 13h UTC

Verdict: NO-SEND.

Contrôle fait depuis `/root/baycast-marketing` après `git fetch origin && git reset --hard origin/main`. Je n'ai rien envoyé. Pas d'email, pas de X, pas de Reddit, pas de HN, pas de Telegram, pas de Discord, pas de Slack. Je n'ai pas lancé de test sortant et je n'ai pas ouvert de forecast.

Le gate de distribution reste fermé. Pour envoyer, les quatre conditions doivent être vraies en même temps: une note publique de settlement, des scores visibles, une warm target list privée hors git, et une auth de canal sortant utilisable. Aujourd'hui elles ne le sont pas.

Note publique de settlement: manquante. Le repo contient des assets utiles pour le moment post-score, notamment `docs/AQ237_SETTLEMENT_NOTE_TEMPLATE_MAY21.md`, `docs/AQ244_FIRST_SETTLEMENT_OPERATOR_RUNBOOK_MAY22_19H.md` et `docs/AQ258_FIRST_SCORE_RELEASE_NOTE_MAY24_19H.md`. Ce sont des templates, des runbooks ou des brouillons gardés derrière le gate, pas une note publique stable à distribuer. Côté prod, les routes testées `https://baycast-p.vercel.app/settlements`, `/settlement`, `/resolutions`, `/notes`, `/blog` et `/updates` répondent encore en 404.

Scores visibles: manquants. Au navigateur, `/leaderboard` charge bien mais affiche `Scores appear after questions resolve`. `/activity` charge bien mais affiche `Activity appears after questions resolve`. `/questions?status=resolved` affiche `Questions (44 open)` puis `No match`. Il n'y a donc pas de score public post-résolution exploitable.

Warm target list privée hors git: manquante. Je n'ai pas lu ni copié de contenu privé. Les emplacements candidats déjà suivis pour ce gate ne montrent pas de liste privée Baycast approuvée hors git. La recherche locale par noms de fichiers candidats sous `/root`, en évitant les dépôts et le bruit évident, ne donne pas de warm target list Baycast utilisable.

Auth de canal sortant: partielle, donc pas suffisante. `himalaya account doctor` passe TOML, IMAP et SMTP en OK pour le compte par défaut, ce qui prouve une auth email locale. `x-cli` est installé, mais `x-cli auth status` n'existe pas ici et renvoie `No such command 'auth'`. Je n'ai tenté aucun envoi. Même si l'email local est utilisable, les autres conditions obligatoires sont absentes.

Conclusion à 13h: NO-SEND. Les conditions exactes qui manquent sont la note publique de settlement, les scores visibles, et la warm target list privée hors git. L'auth sortante n'autorise rien tant que ces preuves ne sont pas réelles et publiques.