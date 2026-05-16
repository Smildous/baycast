# Live QA et readiness résolution, 16 mai exec2

Horodatage du run: 2026-05-16T19:02:40Z

Proto testé: https://baycast-p.vercel.app

Verdict court: prêt pour une première activation humaine ciblée, pas encore prêt pour une activation large. Le produit tient la route pour envoyer quelques humains vers des questions précises, enregistrer leurs prévisions, puis préparer la première résolution. Il ne faut pas ajouter de nouvelles questions par défaut. La priorité est de transformer les 44 questions ouvertes et les 11 prévisions existantes en premier score vérifiable.

Le point important: la première résolution peut être tentée quand la fenêtre ferme, mais elle doit rester accompagnée. Il faut vérifier la source officielle, appliquer les critères écrits sur la page, puis contrôler que le score apparaît sans casser le consensus aveugle ni donner un parfum de pari.

## Routes vues en live

`/` répond 200. La page d'accueil charge, garde les liens vers Questions, Activity, Leaderboard et Get Started Free, et pousse vers `Add your forecast`. C'est suffisant pour une entrée froide.

`/questions` répond 200 et affiche `Questions(44 open)`. Les cartes montrent catégorie, temps restant, titre et `Add your forecast`. La pagination est visible. Le premier écran contient notamment Apple foldable iPhone, Apple Mac Pro WWDC 2026, Microsoft Xbox handheld, World Cup opening match, OpenAI video model, CPI et ECB.

`/questions?sort=closing-soon` répond 200 et affiche maintenant un état vide propre: `No questions closing in the next 14 days`. C'est cohérent avec le filtre à 14 jours. Ce n'est pas un blocage, mais ça peut surprendre car plusieurs questions ferment dans 28 à 46 jours.

`/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248` répond 200 pour `Will Apple announce a new Mac Pro at WWDC 2026?`. La page montre les critères de résolution, la source Apple WWDC et Apple Newsroom, le verrou de consensus signé-out, le slider à 50 pour essayer, puis les CTA signup/login. Aucune erreur console n'a été vue sur ce check.

`/activity` répond 200 et montre 11 prévisions récentes. Le feed prouve que le pipeline de forecast existe, mais il est presque entièrement porté par Baycast AI Baseline et Baycast AI Scout, avec Simba plus bas. C'est utile en prototype, moins convaincant comme preuve sociale humaine.

`/leaderboard` répond 200. La table est présente avec les colonnes Brier, Log Score, Predictions et Resolved, mais il n'y a pas encore d'entrée scorée. C'est normal avant la première résolution, et c'est aussi le trou produit le plus visible.

## Prêt pour première activation humaine ?

Oui, si l'activation est petite et dirigée. Le parcours signé-out permet de comprendre une question, de tester une probabilité, puis de s'inscrire. Les questions ont assez de surface pour inviter 3 à 5 humains sur un set proche de la résolution. L'objectif du run suivant ne doit pas être plus de volume. Il doit être une activation précise: amener des humains sur les questions qui vont scorer, pas remplir encore le catalogue.

## Prêt pour première résolution ?

Presque. Les pages ont les éléments nécessaires: critères, date de fermeture, source de résolution, statut de question et scoring attendu après résolution. Ce qui manque n'est pas une route publique, c'est une procédure courte et stricte au moment de résoudre: capture de la source, choix Yes/No selon le texte de la question, vérification du score, puis contrôle de l'activity et du leaderboard.

## Trois risques à garder ouverts

Le premier risque est la solitude du produit. Avec 44 questions ouvertes, 11 forecasts et 4 profils, la démo fonctionne, mais l'activity ressemble encore à une amorce AI. La première activation humaine doit corriger ça avant toute communication plus large.

Le deuxième risque est le moment de résolution. Les questions les plus proches ne ferment pas dans les 14 jours, donc `Closing Soon` reste vide. Si personne ne sait quoi surveiller, la première fenêtre réelle peut être ratée ou résolue trop tard.

Le troisième risque est la confiance. Baycast doit rester prediction polling, pas gambling. Pour la première résolution, il faut montrer les critères et la source officielle, éviter toute copie orientée gain, et ne pas faire croire que le consensus est disponible avant forecast ou signup.

## Watchlist résolution courte

À surveiller en premier: `Will Apple announce a new Mac Pro at WWDC 2026?`, fermeture 13 juin 2026. Source: Apple WWDC 2026 et Apple Newsroom. C'est le meilleur candidat parce que le critère est net et le détail page est propre.

Ensuite: `Will the 2026 Atlantic hurricane season have a named storm before June 15?`, fermeture 15 juin 2026. Source: National Hurricane Center. À traiter avec prudence car la date et la définition de named storm doivent être appliquées sans interprétation large.

Puis le bloc fin juin: match d'ouverture de la Coupe du Monde avec au moins trois buts, CPI core US de mai 2026 à 0,3 pour cent m/m ou plus, et décision ECB de juin 2026. Ces trois questions donnent des sources officielles ou quasi officielles et peuvent créer les premiers scores visibles sans ajouter de bruit.

En réserve proche: OpenAI public video model avant le 1er juillet, S&P 500 au-dessus de 7 000 avant le 1er juillet, Ethereum au-dessus de 5 000 avant le 1er juillet. Elles sont utiles pour garder de la tension produit, mais elles sont plus faciles à contester si la source ou le moment exact n'est pas verrouillé.

## Décision produit pour le prochain run

Ne pas créer de nouvelles questions. Le prochain run doit choisir un petit pack d'activation humaine, idéalement Apple Mac Pro, hurricane named storm, World Cup opener, CPI et ECB, puis vérifier que chaque détail page donne envie de forecast et que la résolution pourra être faite depuis une source claire. La mesure à viser n'est pas 50 questions. C'est le premier humain activé et le premier score public propre.
