# AQ-363 product live gate recheck, 11 juin 2026 19h UTC

Contrôle fait sur le proto public `https://baycast-p.vercel.app` le 2026-06-11T19:01:59Z. Je n'ai pas lu la table `forecasts`, je n'ai consulté aucune donnée de forecast côté base, je n'ai pas lancé de settlement et je n'ai rien écrit dans Supabase. Le contrôle est limité aux surfaces publiques visibles dans le navigateur.

Routes vérifiées: `/`, `/questions`, `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248` pour la question Apple Mac Pro, `/leaderboard`, `/activity`.

Sur `/`, la page d'accueil montre les questions live et pousse vers la prévision avec le wording "Lock your call before the crowd can shape it". Je n'ai pas vu de probabilité de consensus publique, pas de nombre exact de forecasters, pas de flux d'activité sur question ouverte, pas de wording de pari ou betting, et pas de contrôle de settlement.

Sur `/questions`, la liste affiche les questions ouvertes avec catégorie et temps restant. La question Apple Mac Pro est visible en tête. Je n'ai pas vu de consensus public ni de count exact de forecasters sur les cartes. La page contient un total de questions ouvertes, mais pas de métrique de participation par question. Aucun framing gambling ou betting repéré. Aucun bouton ou lien de settlement public.

Sur le détail Apple Mac Pro, la résolution est claire: Yes si Apple annonce un nouveau Mac Pro pendant WWDC 2026 ou via Apple Newsroom du 2026-06-08 au 2026-06-12, No sinon. Les liens de contexte sont pertinents: Apple WWDC et Apple Newsroom. La surface publique garde le signal communauté verrouillé, sans probabilité de consensus et sans count exact de forecasters. Le formulaire public permet seulement de préparer une probabilité côté visiteur avec invitation à s'inscrire, il ne montre pas de résultat public. Aucun contrôle de settlement n'est visible.

Sur `/leaderboard`, les scores sont masqués tant que les questions ne sont pas résolues: "Scores appear after questions resolve". Pas de donnée de forecast ouverte, pas de count de forecasters, pas de settlement public, pas de framing betting.

Sur `/activity`, l'activité est masquée tant que les questions ne sont pas résolues: "Activity appears after questions resolve". Cela respecte l'exigence de ne pas exposer d'activité sur question ouverte. Aucun contrôle de settlement public et aucun framing gambling repéré.

Conclusion: la surface produit publique est saine pour AQ-363. GO pour garder la question Apple Mac Pro en live dans cet état. NO-GO pour tout settlement avant `2026-06-13T00:00:00Z`.