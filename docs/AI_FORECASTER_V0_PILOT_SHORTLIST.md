# AI Forecaster v0 pilot shortlist

Contrôle fait le 2026-05-18T10:35:30Z depuis `/root/baycast`.

État live lu sans écriture Supabase:

- 44 questions au total
- 44 questions ouvertes
- 11 forecasts existants
- 4 profils

Ce document sert à choisir le premier petit lot de questions pour le pilote AI Forecaster v0. Il ne contient aucun forecast à insérer.

## Règles de sélection

J'ai gardé seulement les questions qui passent ces filtres:

- statut `open` au moment du contrôle
- résolution binaire claire
- source publique nommée
- horizon court ou moyen, idéalement avant fin juillet 2026
- résultat vérifiable sans jugement éditorial
- seuil simple, ou événement officiel simple
- pas de sujet trop sensible pour un premier test public
- assez de contexte public pour écrire une justification propre plus tard
- pas de question trop longue, trop vague, ou trop dépendante d'informations privées

J'ai écarté pour ce lot les questions très longues comme fusion commerciale d'ici 2030, Inde sur la Lune avant 2028, Chine et Taïwan avant 2028. Elles peuvent être bonnes un jour, mais elles ne donnent pas de feedback rapide pour un v0.

## Les 3 questions retenues

### 1. Will the 2026 Atlantic hurricane season have a named storm before June 15?

- question_id: `9345891c-192a-4915-acad-8bed7c554333`
- catégorie: science
- closes_at: `2026-06-15T00:00:00+00:00`
- source: National Hurricane Center
- pourquoi elle est bonne: horizon très court, règle nette, source officielle, base rates climatologiques faciles à vérifier. C'est un bon test de calibration sans bruit politique ni interprétation produit.
- point de vigilance: il faut bien utiliser le critère NHC, pas un article de presse sur une dépression tropicale non nommée.

### 2. Will US core CPI for May 2026 be 0.3 percent month over month or higher?

- question_id: `cff593cd-e4f7-424f-b468-c8412edc3c6c`
- catégorie: economy
- closes_at: `2026-06-30T23:59:59+00:00`
- source: US Bureau of Labor Statistics CPI release
- pourquoi elle est bonne: seuil numérique simple, publication officielle, première valeur publiée binding. Les agents peuvent utiliser inflation récente, nowcasts et base rates sans inventer d'info privée.
- point de vigilance: ne pas parler de conseil financier. La justification doit rester une prévision sur une statistique publique.

### 3. Will OpenAI release a new public video generation model before July 1, 2026?

- question_id: `d3338e47-11ec-4568-942e-42bb19be0f5e`
- catégorie: tech
- closes_at: `2026-06-30T23:59:59+00:00`
- source: OpenAI News and ChatGPT release notes
- pourquoi elle est bonne: sujet naturel pour un pilote AI Forecaster, horizon court, critère public release assez précis. Elle teste la capacité à distinguer annonce, démo, waitlist et vraie disponibilité publique.
- point de vigilance: ne pas compter un teaser, une vidéo de recherche, une note de sécurité, ou un accès waitlist-only.

## Pourquoi pas les autres pour ce premier lot

- Apple Mac Pro à WWDC 2026: très propre et court, mais moins utile pour tester des styles de raisonnement différents si on garde déjà OpenAI côté tech.
- ECB cut en juin 2026: bon candidat de remplacement si on veut deux questions macro, mais CPI est plus mécanique à résoudre.
- FIFA opening match total goals: bon candidat, mais moins riche pour une première explication agent que météo, macro et tech.
- S&P 500, Ethereum, Solana ETF, pétrole: objectifs, mais plus exposés au langage trading. Pas idéal pour le tout premier lot public.
- questions santé, géopolitique lourde, sécurité: à garder pour plus tard, après affichage clair des agents et modération de ton.

## Trois personas d'agents

### 1. Baycast Climatology Scout

- rôle: base rates, météo, science appliquée, événements saisonniers
- ton public: court, factuel, prudent
- sources typiques: agences officielles, séries historiques, calendriers de saison, rapports techniques
- force: part d'un taux historique avant d'ajouter les signaux récents
- faiblesse à surveiller: peut sous-réagir à une anomalie récente si elle n'est pas déjà dans les données
- question prioritaire: ouragan Atlantique avant le 15 juin
- bio proposée: `Agent de prévision Baycast. Utilise surtout des base rates publics et des sources officielles. Pas un humain.`

### 2. Baycast Macro Tape

- rôle: statistiques économiques, banques centrales, marchés seulement comme signal public
- ton public: chiffré, sobre, sans conseil
- sources typiques: BLS, Fed, ECB, nowcasts publics, séries de données économiques
- force: transforme un seuil officiel en problème de distribution
- faiblesse à surveiller: peut donner trop de poids aux dernières surprises mensuelles
- question prioritaire: core CPI May 2026 à 0,3 pour cent ou plus
- bio proposée: `Agent de prévision Baycast orienté macro. Cite des données publiques et évite tout conseil financier.`

### 3. Baycast Product Radar

- rôle: annonces tech, cadence produit, définitions de release publique
- ton public: concret, centré sur le critère de résolution
- sources typiques: blogs officiels, release notes, dépôts publics, pages produit
- force: sépare rumeur, démo, waitlist et disponibilité réelle
- faiblesse à surveiller: peut trop extrapoler à partir de cycles de lancement passés
- question prioritaire: nouveau modèle vidéo public OpenAI avant le 1 juillet 2026
- bio proposée: `Agent de prévision Baycast pour les annonces produit tech. Raisonne depuis des sources publiques, pas depuis des fuites.`

## Répartition suggérée pour le pilote

Pour v0, je ne mettrais pas les trois agents sur toutes les questions. Le but est de voir si les profils lisent différemment, pas de remplir l'activité d'un coup.

- Baycast Climatology Scout sur la question ouragan
- Baycast Macro Tape sur la question CPI
- Baycast Product Radar sur la question OpenAI vidéo

Option si on veut tester le désaccord contrôlé: ajouter un second agent sur une seule question, mais pas plus au premier passage.

## Gate avant insertion de forecasts

À valider avant toute écriture Supabase:

- confirmer à nouveau que chaque question est encore `open`
- confirmer que `question_type` vaut `binary`
- confirmer que `closes_at` n'est pas passé
- relire la description et la source de résolution dans la base live
- vérifier que chaque compte agent existe, ou créer les comptes dans une étape séparée validée
- vérifier que le profil affiche clairement que c'est un agent, pas un utilisateur humain
- vérifier qu'un même agent n'a pas déjà forecasté la même question
- ne pas lire le consensus Baycast avant de produire le forecast
- garder un journal local: question_id, agent_id, prompt_version, modèle, probabilité proposée, raison courte, timestamp
- bloquer toute probabilité hors 1 à 99
- bloquer les valeurs absurdes par rapport au raisonnement écrit
- éviter les formulations `buy`, `sell`, `trade`, `bet`, `odds`, `stake`
- éviter toute phrase qui ressemble à un conseil financier, médical, légal, ou d'urgence
- vérifier que l'UI affiche bien le label agent dans profil, activité et carte de forecast
- vérifier que l'activité n'affiche pas une probabilité transformée par erreur
- vérifier que le leaderboard gère les agents comme prévu, ou les exclut clairement si c'est le choix produit
- insérer un seul forecast de test en staging ou environnement validé avant prod
- après insertion prod, contrôler question page, activity feed, profile et leaderboard
- arrêter les inserts si un affichage est confus ou faux

## Décision

Ces trois questions sont adaptées au pilote v0. Elles couvrent météo scientifique, macro officielle et produit tech. Elles sont ouvertes, proches, publiques et résolubles.

Ne pas insérer maintenant depuis ce document. La prochaine étape doit être une passe dédiée d'insertion, avec le gate ci-dessus coché et un diff clair sur les comptes agents utilisés.
