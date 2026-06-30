# AQ-526, gate live BCP et preuves Jun 30, 19h UTC

Run effectué le 2026-06-30T19:01:08Z sur le clone produit `/root/baycast-product`. Le clone a d'abord été remis à jour depuis `origin/main` avec `git fetch origin main`, `git checkout main`, puis `git merge --ff-only origin/main`.

Forecasts lus: non. Je n'ai pas ouvert la table `forecasts` et je n'ai pas interrogé de lignes de forecast. Les contrôles sont passés par les routes publiques Baycast et par les sources officielles affichées sur les pages question.

Je n'ai pas utilisé de sous-agent niveau 2. Le contrôle était court, séquentiel et vérifiable par `requests`, navigateur et git dans le seul clone demandé. Un sous-agent n'aurait pas ajouté de garantie matérielle.

## Commandes et URLs contrôlées

Base publique: https://baycast-p.vercel.app

Commandes utilisées, sans accès base de données:

```bash
git -C /root/baycast-product status --short
git -C /root/baycast-product fetch origin main
git -C /root/baycast-product checkout main
git -C /root/baycast-product merge --ff-only origin/main
date -u +'%Y-%m-%dT%H:%M:%SZ'
python3 <script requests sur les routes publiques Baycast>
python3 <script HTML/DOM text scan des termes BCP>
python3 <script reachability des sources officielles>
```

Routes publiques requises:

| Route | Résultat |
| --- | --- |
| `/` | 200, `Baycast - Predict Real Events` |
| `/questions` | 200, `Browse Prediction Questions - Baycast` |
| `/questions?sort=closing-soon` | 200, `Browse Prediction Questions - Baycast` |
| `/questions?status=resolved` | 200, `Browse Prediction Questions - Baycast` |
| `/leaderboard` | 200, `Forecaster Leaderboard - Baycast` |
| `/activity` | 200, `Recent Forecasting Activity - Baycast` |

Les deux questions Jun 30 ont été retrouvées depuis les listes publiques:

- FIFA: https://baycast-p.vercel.app/questions/5745e845-94e9-4802-bbeb-850c982e1276
- OpenAI: https://baycast-p.vercel.app/questions/d3338e47-11ec-4568-942e-42bb19be0f5e

## BCP public

Termes cherchés dans le HTML public et, pour la page OpenAI, dans le DOM navigateur: `aggregate_probability`, `forecasters_count`, `settled_by`, `evidence_doc`, `consensus`, comptes publics de forecasts, comptes de forecasters, pourcentages de consensus.

Résultat du scan:

- Pas de `aggregate_probability` dans le body ni dans le HTML des surfaces contrôlées.
- Pas de `forecasters_count` dans le body ni dans le HTML des surfaces contrôlées.
- Pas de `settled_by` dans le body ni dans le HTML des surfaces contrôlées.
- Pas de `evidence_doc` dans le body ni dans le HTML des surfaces contrôlées.
- Pas de pourcentage de consensus public sur les listes, le leaderboard, ni les deux pages ouvertes.
- Pas de compte public d'open-question forecasts ou de forecasters sur les listes ni les deux pages Jun 30.
- `consensus` apparaît seulement sur la home dans du texte de positionnement produit, pas comme champ de question ou donnée BCP.
- `/activity` affiche de l'activité historique de forecasting et des pourcentages sur une question résolue. Ce n'est pas un signal d'open-question BCP pour les deux questions Jun 30 contrôlées.

Les deux pages question affichent bien le verrouillage avant appel utilisateur: `Lock your forecast before the crowd can shape it` et `Community signal locked`. Les boutons de saisie utilisateur `5%`, `10%`, `25%`, `50%`, `75%`, `90%`, `95%` sont visibles, mais ce sont des contrôles de saisie, pas des pourcentages de consensus.

## État Jun 30 avant clôture

FIFA, page publique:

- Titre: `Will the 2026 FIFA World Cup opening match have at least three total goals?`
- État visible: `1 d left`, `Jun 30, 2026`, `Closes`.
- Résolution affichée: score officiel final du match d'ouverture, trois buts ou plus en temps réglementaire plus arrêts de jeu.
- Source affichée: `FIFA official match centre: https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026`.
- Aucun état public `resolved`, `settled` ou résultat final n'a été vu sur la page Baycast.

OpenAI, page publique:

- Titre: `Will OpenAI release a new public video generation model before July 1, 2026?`
- État visible: `1 d left`, `Jun 30, 2026`, `Closes`.
- Résolution affichée: release publique d'un modèle vidéo nouveau ou matériellement amélioré avant 2026-07-01 00:00 UTC. Démo de recherche, waitlist-only, note de sécurité, changement de prix ou mise à jour UI mineure exclus.
- Sources affichées: `https://openai.com/news/` et `https://help.openai.com/en/articles/6825453-chatgpt-release-notes`.
- Aucun état public `resolved`, `settled` ou résultat final n'a été vu sur la page Baycast.

L'horloge du run était `2026-06-30T19:01:08Z`, donc avant `2026-06-30T23:59:59Z`. Il n'y a pas de règlement à faire avant close sur ce contrôle.

## Sources officielles

Contrôles HTTP directs avec user-agent navigateur:

- FIFA official tournament hub, `https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026`: 200, HTML reçu. Le navigateur a aussi chargé la page FIFA après rejet de la bannière cookies et a montré la navigation World Cup, les menus `MATCHES`, `STANDINGS`, `TEAMS & STATS` et des cartes de match. Source officielle disponible pour un contrôle de résultat.
- OpenAI news, `https://openai.com/news/`: 403 Cloudflare challenge depuis ce runner. L'URL officielle existe et répond, mais l'accès automatisé est bloqué.
- OpenAI Help Center release notes, `https://help.openai.com/en/articles/6825453-chatgpt-release-notes`: 403 Cloudflare challenge depuis ce runner. L'URL officielle existe et répond, mais l'accès automatisé est bloqué.

Pour OpenAI, la préparation est suffisante pour l'evidence watch: les deux sources officielles sont identifiées sur la page Baycast et joignables au niveau réseau, mais elles devront être relues via navigateur humain ou autre point de sortie si Cloudflare bloque encore le runner au moment de la résolution.

## Verdict exact

Evidence watch only. Pas de settlement avant close.

Gate BCP public OK à 19h UTC. Les routes publiques répondent, les deux questions Jun 30 sont découvrables, ouvertes publiquement et verrouillent le signal communautaire. Aucun champ BCP interne ni compte d'open-question forecasts n'a été vu dans le body ou le HTML pratique. FIFA est disponible comme source officielle. OpenAI est identifié comme source officielle, mais le runner reçoit un challenge Cloudflare sur les deux URLs OpenAI.
