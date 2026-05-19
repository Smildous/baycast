# Resolution readiness, 19 mai exec2

Run de référence: 2026-05-19, depuis `/root/baycast`.

Source live utilisée: `node scripts/supabase-admin.mjs status`. Le statut Supabase répond en service role, avec 44 questions ouvertes, 11 forecasts et 4 profils. Les cinq dernières questions créées sont encore ouvertes. Le catalogue est donc assez rempli. Le prochain cycle ne doit pas créer de questions. Il doit transformer les premières fenêtres de juin en résolutions propres, auditables, et lisibles sans casser Blind Consensus.

Point de garde: Baycast reste du prediction polling. Pas de pari, pas d'odds, pas de payout, pas de promesse de performance. Avant résolution, ne jamais publier le consensus Baycast, le nombre de forecasts par question, la probabilité agrégée, ni une formulation qui permettrait de les inférer.

## Candidats à surveiller en priorité

### 1. Apple Mac Pro à WWDC 2026

Question live: `Will Apple announce a new Mac Pro at WWDC 2026?`

Fenêtre de clôture: 2026-06-13T00:00:00Z. C'est le premier vrai candidat. La source est nette: Apple WWDC 2026 et Apple Newsroom. La résolution doit regarder les annonces datées du 8 au 12 juin 2026.

Ce qui tranche: Yes si Apple annonce un nouveau Mac Pro dans cette fenêtre, y compris si la livraison arrive plus tard. No si Apple annonce seulement Mac Studio, MacBook, iMac, Mac mini, une puce, ou un accessoire.

Ambiguïté possible: un teaser de keynote, une mention développeur, ou un Mac Pro existant avec configuration mineure. Ne pas élargir le critère. Il faut un nouveau modèle Mac Pro annoncé par Apple.

### 2. Première tempête nommée Atlantique avant le 15 juin

Question live: `Will the 2026 Atlantic hurricane season have a named storm before June 15?`

Fenêtre de clôture: 2026-06-15T00:00:00Z. Source: National Hurricane Center, advisories et tropical cyclone reports.

Ce qui tranche: Yes si le NHC désigne au moins une tempête tropicale ou subtropicale nommée dans le bassin Atlantique avant 2026-06-15 00:00 UTC. No si le système reste dépression tropicale, invest, onde tropicale, ou s'il est nommé après le cutoff sans preuve officielle qu'il avait atteint le seuil avant.

Ambiguïté possible: le cas d'un système formé avant la date mais nommé après. La question prévoit déjà le traitement: il faut que le best track ou l'advisory officiel dise que le seuil de tempête nommée était atteint avant le cutoff.

### 3. Match d'ouverture de la Coupe du Monde 2026 avec au moins trois buts

Question live: `Will the 2026 FIFA World Cup opening match have at least three total goals?`

Fenêtre de clôture: 2026-06-30T23:59:59Z. Source: FIFA official match centre.

Ce qui tranche: Yes si le score officiel du match d'ouverture contient trois buts ou plus à la fin du temps réglementaire et du temps additionnel. Les own goals comptent. No si le total est zéro, un ou deux.

Ambiguïté possible: match interrompu, match rejoué, prolongation improbable ou séance de tirs au but. Ne compter que le score officiel du match d'ouverture, hors tirs au but, et suivre le texte live si le match n'est pas terminé avant le 30 juin.

### 4. Nouveau modèle vidéo public d'OpenAI avant le 1er juillet

Question live: `Will OpenAI release a new public video generation model before July 1, 2026?`

Fenêtre de clôture: 2026-06-30T23:59:59Z. Sources: OpenAI News et ChatGPT release notes.

Ce qui tranche: Yes si OpenAI rend public un nouveau modèle vidéo, ou une mise à niveau matérielle de modèle vidéo, accessible aux utilisateurs ChatGPT, API, ou à un tier public payant avant 2026-07-01 00:00 UTC. No pour un simple papier de recherche, une démo fermée, une waitlist seule, une note de sécurité, un changement de prix, ou une UI mineure.

Ambiguïté possible: le mot `public`. Une annonce seule ne suffit pas si personne ne peut utiliser le modèle hors preview fermée. Capturer la page d'annonce et la page d'accès produit.

### 5. Palme d'Or 2026 à un film réalisé par une femme

Question live: `Will the 2026 Cannes Palme d'Or go to a film from a female director?`

Fenêtre de clôture: 2026-06-30T23:59:59Z. Source: Festival de Cannes, palmarès officiel et page film.

Ce qui tranche: Yes si le film gagnant est réalisé ou coréalisé par au moins une femme selon la fiche officielle Cannes. Si la Palme d'Or est partagée, Yes si au moins un film gagnant remplit le critère. No si aucun film gagnant ne le remplit, ou si le prix n'est pas attribué avant le 30 juin.

Ambiguïté possible: coréalisation, nom d'usage, fiche presse contradictoire. La fiche Cannes prime. Si la fiche ne suffit pas, ajouter une seconde source biographique, mais ne pas remplacer la source officielle pour le résultat.

### 6. Core CPI US de mai 2026 à 0,3 pour cent m/m ou plus

Question live: `Will US core CPI for May 2026 be 0.3 percent month over month or higher?`

Fenêtre de clôture: 2026-06-30T23:59:59Z. Source: US Bureau of Labor Statistics CPI release.

Ce qui tranche: Yes si la première publication BLS du CPI de mai 2026 montre `all items less food and energy` à 0,3 pour cent ou plus en variation mensuelle désaisonnalisée. No à 0,2 pour cent ou moins. La première valeur publiée est contraignante.

Ambiguïté possible: arrondi, révision, mauvais tableau. Utiliser la release officielle initiale, pas une estimation média. Capturer le tableau et l'horodatage de publication.

### 7. Baisse du taux de dépôt ECB à la réunion de juin 2026

Question live: `Will the ECB cut its deposit facility rate at its June 2026 monetary policy meeting?`

Fenêtre de clôture: 2026-06-30T23:59:59Z. Source: ECB monetary policy decisions.

Ce qui tranche: Yes si la décision de politique monétaire associée à la réunion de juin 2026 annonce un taux de dépôt plus bas. No si le taux est maintenu ou relevé. Un forward guidance dovish ne compte pas.

Ambiguïté possible: plusieurs taux ECB changent mais pas le deposit facility rate. Ne regarder que le taux de dépôt, dans la décision officielle de juin.

### 8. S&P 500 au-dessus de 7 000 avant le 1er juillet

Question live: `Will the S&P 500 close above 7,000 on any trading day before July 1, 2026?`

Fenêtre de clôture: 2026-06-30T23:59:59Z. Source: S&P Dow Jones Indices.

Ce qui tranche: Yes si le niveau de clôture officiel est strictement supérieur à 7 000,00 sur une journée de trading du 15 mai au 30 juin inclus. No si le plus haut est intraday seulement, ou si la clôture est exactement 7 000,00.

Ambiguïté possible: fournisseur de données avec un close différent. La source officielle S&P Dow Jones Indices prime. Une capture secondaire peut aider, mais ne doit pas trancher seule.

### 9. Ethereum clôture au-dessus de 5 000 dollars sur Coinbase avant le 1er juillet

Question live: `Will Ethereum close above $5,000 on Coinbase before July 1, 2026?`

Fenêtre de clôture: 2026-06-30T23:59:59Z. Source: Coinbase ETH-USD, fallback CoinGecko si Coinbase est indisponible.

Ce qui tranche: Yes si ETH-USD a une clôture quotidienne officielle strictement au-dessus de 5 000,00 dollars sur Coinbase entre le 15 mai et le 30 juin UTC. No pour une mèche intraday, une clôture exactement à 5 000,00, ou une clôture après le cutoff.

Ambiguïté possible: définition de la clôture quotidienne en marché crypto. Utiliser le jour UTC comme écrit dans la question. Si Coinbase ne donne pas une clôture exploitable, documenter l'indisponibilité avant d'utiliser CoinGecko.

## Checklist de résolution sans casser Blind Consensus

Avant la clôture, ne rien publier qui donne la température Baycast. On peut dire qu'une question approche sa résolution, citer la source officielle et inviter à faire une prévision. On ne cite pas le nombre de forecasts, pas la distribution, pas une moyenne, pas `les gens pensent que`. Les AI forecast writes restent coupés tant que `blind_until` n'est pas live.

Au moment du cutoff, ouvrir la question dans l'admin ou via la base, confirmer `status = open` ou `status = closed`, vérifier `closes_at`, `question_type = binary`, `resolution_source`, `description`, et l'absence de résolution existante. Ne pas modifier le texte de la question. Ne pas modifier les anciens batch files.

Ensuite, ouvrir la source officielle depuis le lien live de la question. Sauver une preuve minimale: URL, titre de page ou document, heure UTC de consultation, citation courte qui tranche le critère, capture si possible. Si la source primaire est indisponible et que la question prévoit un fallback, noter pourquoi le fallback est utilisé. Sinon, attendre la source primaire.

Décider Yes ou No uniquement depuis le texte live de la question. Si deux lecteurs raisonnables peuvent encore diverger, ne pas résoudre. Écrire d'abord une note interne d'ambiguïté avec la partie exacte du texte qui bloque. La vitesse compte moins que la confiance.

Quand le résultat est clair, résoudre par le flux admin avec `outcome: yes` ou `outcome: no`. Le endpoint actuel écrit `status = resolved`, `resolution = { outcome, value }`, `resolved_at`, puis calcule les Brier scores et log scores pour les forecasts existants. Après soumission, vérifier que la question est résolue, que les scores existent pour les forecasts de cette question, et que l'audit log a reçu l'action `resolve_question`.

Après résolution seulement, vérifier les vues publiques: page question, Activity, Leaderboard. C'est à ce moment que les forecasts, scores et détails peuvent devenir visibles selon les règles produit. Si une page ouverte avant résolution exposait déjà une probabilité agrégée à un viewer qui n'a pas forecasté, stopper la communication et traiter ça comme bug Blind Consensus.

Copy publique autorisée après résolution: `Resolved: [question]. Source: [source officielle]. Baycast scored the forecasts attached to this question.` C'est suffisant. Ne pas transformer ça en promesse de rendement ou en classement trop précoce. Avec 11 forecasts et 4 profils, l'objectif est un premier score propre, pas un signal de supériorité.

## Ordre conseillé pour le prochain scoring cycle

Commencer par Apple Mac Pro et la tempête nommée Atlantique, parce que les dates arrivent les premières et les sources sont fortes. Puis traiter le bloc fin juin en deux passes: Cannes, CPI, ECB et World Cup pour les résolutions événementielles ou institutionnelles, puis OpenAI, S&P 500 et ETH pour les cas où la preuve peut apparaître n'importe quel jour avant le cutoff.

Le livrable attendu du cycle n'est pas plus de volume. C'est une trace propre: source, décision, score, puis contrôle public. Si cette chaîne tient une fois, Baycast peut montrer son intérêt sans casser la confiance qui fait tout le produit.
