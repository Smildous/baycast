# AI Forecaster v0 gate recheck, May 18 13h

Contrôle fait depuis `/root/baycast` le 2026-05-18 à 13h02 UTC. Je n'ai inséré aucun forecast, je n'ai pas appelé `/api/agent/forecast` en mode écriture, et je n'ai touché qu'à ce document.

## Décision

NO-GO pour insérer ou publier plus de forecasts AI aujourd'hui.

Baycast peut préparer un dry-run de lecture, mais pas ajouter de nouvelle trace live tant que le produit n'a pas une preuve propre que Blind Consensus tient sur toutes les surfaces publiques avec des comptes AI visibles comme tels. Le risque n'est pas le choix des questions. Le risque est de transformer une amorce encore fragile en signal public confus.

## Ce que disent les docs v0 actuels

`docs/AI_FORECASTER_V0_PRODUCT_SPEC.md` pose une règle claire: un agent AI est un participant du protocole, pas un raccourci autour du consensus. L'agent ne doit pas voir le consensus Baycast, le nombre de forecasts, les autres forecasts, l'activité de la question ou un signal de rang avant de prévoir. L'utilisateur ne doit pas voir la probabilité AI, la rationale, les noms d'agents ou les comptes exacts avant son propre forecast, sauf question résolue ou règle d'unlock existante. Le même document dit aussi que le live Supabase write n'est pas nécessaire pour compléter la spec et qu'il faut arrêter les inserts au premier doute d'affichage.

`docs/AI_FORECASTER_LAUNCH_QA_MAY15_EXEC3.md` avait déjà conclu `Wait`. Les questions étaient bonnes, mais le live UX avait deux signaux faibles: leaderboard vide malgré activité, et mismatch d'affichage dans l'activity feed. Ce document disait de corriger ou expliquer ces points avant un batch AI.

`docs/AI_FORECASTER_V0_PILOT_SHORTLIST.md` a réduit le premier pilote à un lot très petit, avec des questions binaires, publiques et proches. Il dit explicitement de ne pas insérer depuis le document, de reconfirmer l'état live avant toute écriture, et de tester d'abord sur un environnement validé.

`docs/AQ221_DEV_VERIFICATION_MAY17_13H.md` est une bonne nouvelle: une fuite BCP possible sur les profils a été trouvée et corrigée, et les surfaces relues ne montraient plus de consensus public hors unlock. Ça réduit le risque, mais ça ne remplace pas un gate live complet juste avant d'ajouter plus d'activité AI.

## État live Supabase lu aujourd'hui

Le helper `node scripts/supabase-admin.mjs status` fonctionne. Il a répondu en mode `service_role`, sans écriture.

État lu à 13h02 UTC: 44 questions, 44 questions ouvertes, 11 forecasts, 4 profils.

J'ai aussi fait une requête read-only sur les questions ouvertes binaires pour vérifier les titres, sources et dates. Elle confirme que les bons candidats courts sont toujours ouverts et résolubles depuis des sources publiques.

Point de vigilance: une requête read-only qui demandait `blind_until` a échoué car la colonne n'existe pas dans la table live. Le fichier schema du repo la documente pourtant comme base possible de politique BCP. Ce n'est pas une preuve de fuite à lui seul, mais c'est assez pour ne pas augmenter l'exposition aujourd'hui sans vérifier précisément où l'unlock est garanti, côté DB et côté app.

## Lecture BCP

BCP doit rester simple: forecast first, signal after. Si Baycast ajoute des agents AI, ils doivent être lisibles comme agents, mais leurs probabilités ne doivent pas aider un visiteur à s'ancrer avant son propre forecast.

Aujourd'hui, je ne vois pas assez d'éléments pour dire que tout est prêt à publier plus de forecasts AI. Il y a déjà 11 forecasts et 4 profils. Ajouter plus d'AI peut remplir l'activité, mais peut aussi donner l'impression que le produit est surtout habité par des agents. Sans scores résolus, sans leaderboard propre pour les agents, et avec la colonne live `blind_until` absente, le bon choix produit est d'attendre.

Le dry-run reste utile s'il reste vraiment en lecture: sélectionner les questions, construire les prompts, produire des probabilités localement dans un journal non publié, puis vérifier que rien ne lit le consensus ni les forecasts existants. Mais ça doit rester hors Supabase live.

## Shortlist live pour un futur dry-run, sans écriture

Ces cinq titres viennent de Supabase live. Ils sont ouverts, binaires, proches, avec une source publique claire. Ils sont adaptés à un test de dry-run parce qu'ils évitent les zones médicales, légales, urgence et conseil direct.

1. Will Apple announce a new Mac Pro at WWDC 2026?
2. Will the 2026 Atlantic hurricane season have a named storm before June 15?
3. Will the 2026 FIFA World Cup opening match have at least three total goals?
4. Will OpenAI release a new public video generation model before July 1, 2026?
5. Will US core CPI for May 2026 be 0.3 percent month over month or higher?

## Gate concret

Ne pas insérer et ne pas publier plus de forecasts AI aujourd'hui.

Pour passer GO plus tard, il faut au minimum une vérification live courte et reproductible: agent endpoint en dry-run read-only, aucune lecture de consensus ou de forecast count avant génération, labels AI visibles sur profil et activité, activity feed sans probabilité ou direction avant unlock, profils sans fuite sur questions ouvertes, leaderboard qui n'invente pas de rang AI avant résolutions, et une décision explicite sur l'écart entre le schema repo et la table live pour `blind_until`.

Si tout ça passe, le bon premier mouvement reste petit: pas un remplissage des 44 questions, mais quelques forecasts labellisés sur des questions comme celles ci-dessus. Aujourd'hui, le gate produit reste fermé.
