# AQ-546 Product live dry_run BCP gate, Jul 03 19h

Verdict: NO-GO.

Raison simple: le probe live du endpoint agent retourne encore `HTTP 401` sur `/api/agent/forecast` en `dry_run`. Tant que ce point ne passe pas avec le secret de prod attendu, je ne valide pas une tentative agent live, même si les surfaces publiques vues ici restent propres côté BCP.

## Cadre

Repo: `/root/baycast-product`

Base: `origin/main` fast-forward, HEAD `e8c3841`.

Proto vérifié: `https://baycast-p.vercel.app`

Règles suivies:

- pas de write live
- pas d'appel agent en mode écriture
- pas de lecture de table forecasts
- inspection limitée aux surfaces publiques et au HTML/DOM public
- un seul appel endpoint agent en `dry_run`, sans secret local disponible, pour confirmer l'état 401 public

## Surfaces publiques vérifiées

### Homepage

URL: `https://baycast-p.vercel.app/`

Résultat: `HTTP 200`.

La page affiche les questions live et le message de verrouillage du signal avant forecast. Dans le HTML public et le payload RSC, je n'ai pas trouvé:

- `aggregate_probability`
- `forecasters_count`
- `settled_by`
- `evidence_doc`

Pas de `__NEXT_DATA__` exposé. Payload RSC présent, sans les champs sensibles listés.

### Questions

URL: `https://baycast-p.vercel.app/questions`

Résultat: `HTTP 200`.

La liste affiche les questions ouvertes, les catégories et les délais. Elle garde le copy `Lock your call before the crowd can shape it`.

Dans le HTML public et le payload RSC, je n'ai pas trouvé:

- `aggregate_probability`
- `forecasters_count`
- `settled_by`
- `evidence_doc`

Pas de `__NEXT_DATA__` exposé. Payload RSC présent, sans les champs sensibles listés.

### Question ouverte détail

URL: `https://baycast-p.vercel.app/questions/4db2190d-8bf0-44e7-87ae-9e9b7e26a557`

Résultat: `HTTP 200`.

Question utilisée: une question ouverte visible depuis `/questions`. Je n'ai pas ouvert de données privées et je n'ai pas consulté de forecast table.

Constat produit:

- le bloc public indique que le signal communauté est verrouillé
- la page montre le formulaire de forecast et la connexion requise
- le texte public garde l'ordre correct: forecast d'abord, comparaison ensuite

Dans le HTML public et le payload RSC, je n'ai pas trouvé:

- `aggregate_probability`
- `forecasters_count`
- `settled_by`
- `evidence_doc`
- `forecasts`

Le mot `probability` apparaît seulement dans le copy et les contrôles de saisie visibles, pas comme fuite de consensus.

### Activity

URL: `https://baycast-p.vercel.app/activity`

Résultat: `HTTP 200`.

La page dit que l'activité publique apparaît après résolution. Les éléments visibles sont des forecasts de questions résolues, pas des questions ouvertes. Je n'ai pas utilisé cette surface pour lire des forecasts ouverts.

Dans le HTML public et le payload RSC, je n'ai pas trouvé:

- `aggregate_probability`
- `forecasters_count`
- `settled_by`
- `evidence_doc`

Le payload contient du texte lié aux forecasts résolus, ce qui est cohérent avec le comportement annoncé de la page. Je ne vois pas de fuite BCP sur questions ouvertes dans cette surface.

### Leaderboard

URL: `https://baycast-p.vercel.app/leaderboard`

Résultat: `HTTP 200`.

La page affiche le classement public par calibration et les compteurs de prédictions agrégés par forecaster. Ce n'est pas un consensus de question ouverte.

Dans le HTML public et le payload RSC, je n'ai pas trouvé:

- `aggregate_probability`
- `forecasters_count`
- `settled_by`
- `evidence_doc`

Le mot `prediction` apparaît dans le copy public et les libellés du tableau, pas comme JSON de forecast ouvert.

## Probe endpoint agent dry_run

Commande effectuée en POST sur:

`https://baycast-p.vercel.app/api/agent/forecast`

Body:

```json
{"question_id":"4db2190d-8bf0-44e7-87ae-9e9b7e26a557","dry_run":true}
```

Résultat:

```text
HTTP 401
{"ok":false,"error":"Unauthorized agent endpoint"}
```

Je n'ai pas trouvé `AGENT_ENDPOINT_SECRET` dans l'environnement local disponible, donc je n'ai pas pu tester le chemin authentifié avec le secret de production. Pour ce gate produit, ça ne change pas le verdict: le point bloquant connu reste un 401 live sur le endpoint de dry_run.

## BCP

Les surfaces publiques contrôlées ne montrent pas les champs sensibles demandés:

- pas de `aggregate_probability`
- pas de `forecasters_count`
- pas de `settled_by`
- pas de `evidence_doc`
- pas de JSON brut de consensus ouvert vu dans le HTML ou le DOM public inspecté

Le détail de question ouverte garde bien le signal communauté verrouillé. L'activité publique montre seulement de l'activité annoncée comme post-résolution. Le leaderboard expose des scores et des compteurs utilisateur globaux, pas le consensus d'une question ouverte.

## Décision

NO-GO.

Les surfaces publiques BCP regardées sont propres pour ce passage. Le blocage est le endpoint agent: tant que le dry_run live authentifié ne retourne pas un 200 propre avec payload synthétique et sans écriture, je ne recommande pas de tenter un agent live en production.

Prochaine vérification minimale:

1. injecter ou corriger le `AGENT_ENDPOINT_SECRET` de prod côté Vercel et côté runner autorisé
2. refaire un POST `dry_run: true` sur une question ouverte
3. exiger `HTTP 200`, `dry_run: true`, `user_id: dry-run:<agent_id>`
4. confirmer à nouveau qu'aucune surface publique ouverte ne fuit consensus ou count avant forecast
