# AQ-198, source map news context, 17 mai

État produit à garder en tête: 44 questions ouvertes, 11 forecasts, 4 profils. Le bloc news context doit aider quelqu'un à comprendre une question avant de prévoir. Il ne doit jamais montrer le consensus, le nombre de forecasts, ni suggérer ce que les autres pensent.

## Règle BCP

Le contexte affiché sur une question est une aide de lecture, pas un signal social. Il peut montrer des titres récents, des sources officielles, des communiqués, des calendriers et des articles factuels. Il ne peut pas afficher `aggregate_probability`, un forecast count, une phrase du type “community thinks”, ni une formulation qui transforme Baycast en pari.

Le bon test: si le bloc disparaît, la page reste forecastable. Si le bloc apparaît, il rend la question plus claire sans orienter la réponse.

## Source map par thème live

### Apple WWDC, Mac Pro, Siri, iPhone pliable

Sources utilisables:

- Apple Newsroom et pages WWDC Apple, pour annonces officielles, keynote, communiqués et transcript vidéo quand disponible.
- Bloomberg Mark Gurman, The Verge ou 9to5Mac, pour contexte produit et calendrier attendu.
- MacRumors, seulement comme agrégateur de rumeurs clairement sourcées, jamais comme preuve de résolution.

À afficher: titre factuel, source, date. Ne pas écrire “Apple est favori pour annoncer X”. Préférer “Apple confirme les dates de WWDC 2026” ou “Bloomberg décrit les plans logiciels attendus”.

### Microsoft Xbox handheld et hardware gaming

Sources utilisables:

- Xbox Wire et Microsoft Investor Relations, pour annonces officielles.
- The Verge, Windows Central ou IGN, pour contexte hardware, dev kits et signaux de lancement.
- Documents publics liés aux événements Xbox Showcase, quand ils existent.

À éviter: tout titre qui ressemble à un conseil d'achat ou à une cote. Le contexte doit expliquer l'état des annonces, pas donner une probabilité implicite.

### OpenAI, Anthropic et nouveaux modèles publics

Sources utilisables:

- OpenAI News, Anthropic News et changelogs API officiels.
- Reuters, The Information ou The Verge, pour annonces rapportées et contexte industriel.
- Pages de statut ou documentation développeur quand la question porte sur disponibilité API.

À afficher seulement si la source distingue clairement annonce, preview, disponibilité API et disponibilité grand public. Un teaser ou un post social isolé ne suffit pas comme contexte fort.

### NVIDIA earnings et guidance IA

Sources utilisables:

- NVIDIA Investor Relations, earnings release, shareholder letter et call transcript.
- SEC EDGAR, pour 8-K, 10-Q ou dépôt lié aux résultats.
- Reuters, CNBC ou Bloomberg, pour résumé factuel après publication.

Le bloc peut rappeler la date des résultats et la métrique visée. Il ne doit pas afficher de consensus analyste comme s'il s'agissait d'un signal Baycast.

### Inflation US, CPI, PCE et Fed

Sources utilisables:

- Bureau of Labor Statistics pour CPI.
- Bureau of Economic Analysis pour PCE.
- Federal Reserve, FOMC calendar, statements, speeches et minutes.
- Reuters ou AP pour articles de contexte si la source officielle n'a pas de titre lisible.

Le contexte doit séparer “donnée publiée” et “interprétation”. Ne pas écrire que les utilisateurs “attendent” une hausse ou une baisse. Ne pas mélanger prévisions externes et prévisions Baycast.

### ECB et décisions de taux zone euro

Sources utilisables:

- European Central Bank, monetary policy decisions, press conference et calendrier officiel.
- Eurostat pour inflation et données macro utilisées en contexte.
- Reuters ou Financial Times pour comptes rendus factuels.

À afficher: la date de réunion, le dernier communiqué, une donnée macro récente. Pas de phrase du type “le consensus penche pour”.

### Coupe du Monde, FA Cup, NBA, NHL, F1, Roland-Garros

Sources utilisables:

- FIFA, FA, NBA.com, NHL.com, FIA, Formula1.com, Roland-Garros, selon le sport.
- ESPN, BBC Sport ou AP Sports pour previews, résultats et blessures confirmées.
- Pages officielles de calendrier, draw, bracket, classification ou box score.

Le contexte sportif doit rester informationnel: calendrier, score de série, classement, format, résultat officiel. Pas de langage de pari, pas de “odds”, pas de “favori” sauf si c'est une citation dans un titre externe qui ne peut pas être reformulée. Si possible, choisir un autre titre.

### Hurricane season, named storms et NOAA

Sources utilisables:

- NOAA, National Hurricane Center et National Weather Service.
- Tropical Weather Outlook et advisories NHC.
- Reuters ou AP pour synthèse quand l'événement est déjà public.

C'est un bon cas pour privilégier la source officielle. Le bloc peut montrer l'outlook NOAA, un advisory ou la définition opérationnelle d'une tempête nommée. Il ne doit jamais suggérer que l'activité météo rend une réponse plus probable pour Baycast.

### SpaceX Starship et FAA launch notices

Sources utilisables:

- SpaceX updates officiels.
- FAA launch operations, temporary flight restrictions, environmental or launch license notices.
- NASA Spaceflight ou Ars Technica pour suivi technique, avec source officielle en priorité.

À afficher: fenêtre de lancement, statut FAA, annonce SpaceX. À éviter: rumeurs de compte à rebours sans source primaire.

### Crypto prix, Bitcoin, Ethereum, Solana et Clarity Act

Sources utilisables:

- Coinbase, Kraken, Binance, Bitstamp ou CoinGecko pour données prix, selon la question.
- Solana Status, Solana Foundation ou Anza blog pour upgrade Solana.
- Senate Banking, Senate Agriculture, Congress.gov, C-SPAN et Politico pour audience ou texte de loi.

Le contexte crypto ne doit pas utiliser “trade idea”, “bullish”, “bearish”, “pump”, “long”, “short” ou “bet”. Pour les prix, afficher source et date du snapshot, pas de recommandation et pas de lien vers trading.

### Géopolitique, UN Security Council, Gaza, US-China, Iran

Sources utilisables:

- UN Security Council, meeting records, draft and adopted resolutions.
- White House, China MFA, US State Department, IRNA ou autres communiqués officiels selon la question.
- Reuters, AP, BBC ou Al Jazeera pour contexte factuel, avec préférence aux dépêches sourcées.

Le contexte doit éviter les formulations militantes. Il doit aider à vérifier l'événement: adoption d'une résolution, communiqué conjoint, cessez-le-feu annoncé, transit maritime confirmé.

### Box office et culture, Lilo & Stitch

Sources utilisables:

- Box Office Mojo et The Numbers pour chiffres de week-end.
- Disney press releases pour date de sortie et périmètre domestique.
- Variety ou Hollywood Reporter pour contexte de sortie, seulement si le chiffre final vient d'une source de box office.

Afficher le type de chiffre: estimate, actual, 3-day, 4-day. Si le titre ne précise pas le périmètre, ne pas l'utiliser.

## Règles UX pour la page détail

Le bloc doit être court. Maximum 3 headlines par question, triées du plus récent au plus utile. Chaque ligne affiche le titre, la source et la date visible. La date doit être compréhensible sans ouvrir l'article.

Interdits stricts:

- `aggregate_probability`.
- Nombre de forecasts ou nombre de forecasters.
- “community thinks”, “users expect”, “Baycast consensus”, “market says” ou équivalent.
- Langage de pari: odds, bet, wager, stake, payout, book, line, edge.
- Incitation financière ou trading, surtout sur crypto et marchés.
- Tout contenu qui révèle une tendance interne avant que la personne ait forecast.

Copie recommandée pour le header du bloc:

“Context to read before your forecast”

Copie fallback si aucun contexte fiable n'existe:

“No recent context source is attached yet. Use the question wording, resolution criteria, and official source before forecasting.”

Si une source existe mais n'est pas assez fiable, ne pas afficher de headline. Mieux vaut un fallback propre qu'un contexte faible qui biaise la prévision.

## Notes d'implémentation produit

La source map peut être codée par thème ou par catégorie au départ. Le matching doit rester conservateur: une question Apple reçoit Apple et presse tech, une question Fed reçoit Federal Reserve et données officielles, une question sport reçoit l'autorité sportive concernée.

Pour AQ-198, la première version peut être statique et manuelle. La qualité compte plus que la couverture. Avec 44 questions ouvertes et seulement 11 forecasts sur 4 profils, la priorité est de donner confiance au lecteur sans casser Blind Consensus.