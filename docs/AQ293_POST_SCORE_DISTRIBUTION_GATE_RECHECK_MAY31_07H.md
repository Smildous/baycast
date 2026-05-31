# AQ-293, recheck distribution post-score, 31 mai 07h UTC

Verdict: NO-SEND.

Contrôle fait le 2026-05-31 à 07:02 UTC depuis `/root/baycast-marketing`, après `git fetch origin && git reset --hard origin/main`. Aucun message envoyé. Pas d'email, pas de DM, pas de post X, pas de Slack, pas de Discord, pas de Telegram.

Le gate reste fermé. Le repo dit déjà la règle dans `docs/AQ246_POST_SCORE_OUTREACH_SEQUENCE_MAY22_19H.md`: ne rien envoyer tant que la première note de settlement n'est pas publique, tant que la question résolue ne montre pas l'outcome et les scores, et tant que la distribution ne s'appuie pas sur une vraie liste approuvée hors git. À 07h, ces preuves ne sont pas réunies.

## Ce que j'ai vérifié

Côté settlement public, je n'ai pas trouvé de note publique exploitable dans le repo. Les docs récents restent des préparations, des templates ou des rechecks no-send. Le fichier `AQ246_POST_SCORE_OUTREACH_SEQUENCE_MAY22_19H.md` garde encore un placeholder de lien vers la première question settled. Les routes publiques évidentes `/settlements`, `/settlement`, `/resolutions`, `/notes`, `/blog` et `/updates` sur `https://baycast-p.vercel.app` répondent encore en 404. Statut: faux.

Côté scores visibles, `/questions`, `/leaderboard` et `/activity` répondent, mais je n'ai pas vu de score post-settlement réel. Le leaderboard garde la logique d'attente des résolutions, et l'activité publique ne donne pas une preuve de question résolue avec score consultable. Les mots comme Brier, Log Score, Resolved ou Outcome relèvent de la structure produit ou de la copie, pas d'une preuve de score publié. Statut: faux.

Côté liste privée, je n'ai pas ouvert ni imprimé de données personnelles. J'ai seulement vérifié l'existence de chemins plausibles hors git. `/root/baycast-private`, `/root/private` et `/root/obsidian-vault/Private` sont absents sur cette machine. Je ne vois donc pas de warm target list privée, approuvée et disponible hors repo. Statut: faux.

Côté canaux outbound, le contrôle est resté non émetteur. `himalaya` existe dans `/root/.local/bin/himalaya` et `himalaya account list` répond sans erreur, avec une sortie masquée ici pour ne pas exposer de compte. `x-cli` existe dans `/root/.local/bin/x-cli`, mais `x-cli whoami` ne valide pas une session utilisable. Cela ne change pas la décision: un canal local potentiel ne suffit pas sans settlement public, scores visibles et liste privée.

## Minimum exact pour débloquer

Passage en SEND seulement si tout est vrai dans le même run:

1. une note publique de settlement existe et son URL finale est utilisable dans la copie;
2. la page de la question résolue montre l'outcome en clair et des scores visibles, pas seulement une promesse de scoring futur;
3. une warm target list privée, approuvée, existe hors git et n'est pas copiée dans le repo;
4. le canal choisi est authentifié pour le vrai sender, avec une personne prête à assumer les réponses;
5. la copie reste factuelle: prediction polling, score visible, demande de feedback. Pas de traction inventée, pas de langage gambling, pas de promesse de demande marché.

Tant qu'un seul point manque, la décision reste NO-SEND. À 07h, il manque au moins les trois preuves centrales: settlement public, scores visibles, liste privée.
