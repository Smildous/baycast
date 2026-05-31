# AQ-297, recheck distribution post-score, 31 mai 19h UTC

Verdict: NO-SEND.

Contrôle fait depuis `/root/baycast-marketing`, synchronisé avec `origin/main` avant le recheck. Rien n'a été envoyé. Pas d'email, pas de DM, pas de post, pas de message public, pas de test sortant.

Le gate reste fermé à 19h. Il faut quatre voyants vrais au même moment: une note publique de settlement, des scores visibles, une warm target list privée hors git, et un canal outbound utilisable. Le canal email existe, mais les preuves publiques et la liste privée ne sont pas là. Donc pas d'envoi.

## Ce qui a été vérifié

Note publique de settlement: faux. Les routes publiques évidentes `https://baycast-p.vercel.app/settlements`, `/settlement`, `/resolutions`, `/notes`, `/blog` et `/updates` répondent en 404. Je n'ai pas trouvé de page publique de settlement exploitable comme lien de distribution.

Scores visibles: faux. `https://baycast-p.vercel.app/questions` répond avec `44 open`. Le filtre `Resolved` affiche `No match`. `https://baycast-p.vercel.app/leaderboard` répond, mais indique `Scores appear after questions resolve` au lieu de lignes scorées. `https://baycast-p.vercel.app/activity` répond, mais indique `Activity appears after questions resolve`. Il y a du vocabulaire de scoring dans l'interface, pas un score réel post-settlement visible.

Warm target list privée hors git: faux. Je n'ai ouvert ni copié aucun contenu de cible. Le contrôle a seulement regardé la présence de chemins plausibles sous `/root`, sans imprimer de contenu privé. Aucun fichier hors git ne ressemble à une warm target list Baycast approuvée. Les seuls chemins plausibles remontés hors docs sont des fichiers de style ou des documents techniques Hermes, pas une liste de distribution.

Canal outbound utilisable: vrai pour l'email local, sans envoi. `himalaya` est installé. `himalaya account list` voit le compte `gmail` en défaut avec IMAP et SMTP. `himalaya account doctor` passe la configuration TOML, IMAP et SMTP en OK. `x-cli` est installé aussi, mais je n'ai pas trouvé de commande d'état auth exploitable sans publier. Même avec l'email OK, ce point ne débloque rien seul.

## Décision

NO-SEND.

La prochaine ouverture du gate demande une vraie note publique de settlement, une page publique où l'outcome et les scores sont visibles, puis une warm target list approuvée et gardée hors git. Tant qu'un de ces éléments manque, marketing ne distribue pas.
