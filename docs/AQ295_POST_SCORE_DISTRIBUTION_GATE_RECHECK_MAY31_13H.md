# AQ-295, recheck distribution post-score, 31 mai 13h UTC

Verdict: NO-SEND.

Contrôle fait depuis `/root/baycast-marketing` après remise à zéro stricte sur `origin/main`. Aucun message envoyé. Pas d'email, pas de DM, pas de tweet, pas de post, pas de message de test.

Le gate ne passe pas. Pour envoyer, il faut les trois preuves en même temps: une note publique de settlement, des scores visibles, et une warm target list privée hors git. À 13h, elles ne sont pas là.

## Preuves vues

Côté settlement public, les routes évidentes `https://baycast-p.vercel.app/settlements`, `/settlement`, `/resolutions`, `/notes`, `/blog` et `/updates` répondent en 404. Dans le repo, les fichiers récents restent des rechecks, des templates ou des garde-fous. Je n'ai pas trouvé de note publique finale utilisable comme lien de distribution. Statut: faux.

Côté scores visibles, `https://baycast-p.vercel.app/questions` répond et affiche encore `44 open`. `https://baycast-p.vercel.app/leaderboard` répond, avec les colonnes Brier, Log Score, Predictions et Resolved, mais sans preuve publique d'une ligne scorée post-settlement. `https://baycast-p.vercel.app/activity` répond aussi, sans preuve de question résolue avec outcome et score consultable. Les mots de scoring vus sont de la structure produit, pas un score réel. Statut: faux.

Côté liste privée, je n'ai ouvert ni imprimé aucun contenu de cible. J'ai seulement cherché la présence de chemins plausibles sous `/root`, en séparant les fichiers dans git des fichiers hors git. Le scan n'a trouvé aucun fichier hors git ressemblant à une warm target list Baycast. Les seuls chemins hors git contenant `warm` sont des références de style dans des skills Hermes, pas des listes de distribution. Statut: faux.

Côté outils outbound, le contrôle est resté non émetteur. `command -v himalaya` ne trouve rien, donc `himalaya account list` n'a pas été lancé. `command -v x` ne trouve rien. `command -v x-cli` ne trouve rien. Même si un canal apparaissait, cela ne suffirait pas sans settlement public, score visible et liste privée.

J'ai tenté le helper local `node scripts/supabase-admin.mjs status` pour recouper l'état live, mais il ne démarre pas dans ce clone propre: dépendance `@supabase/supabase-js` absente après reset et clean. Je n'ai pas installé de dépendance ni utilisé de secret. Les preuves publiques suffisent pour fermer le gate.

## Décision

NO-SEND.

Le prochain déblocage utile est simple: publier une vraie note de settlement après la première résolution, vérifier une page publique où l'outcome et les scores sont visibles, puis déposer une warm target list approuvée hors git sans la copier dans le repo. Tant qu'un seul de ces points manque, marketing reste fermé.
