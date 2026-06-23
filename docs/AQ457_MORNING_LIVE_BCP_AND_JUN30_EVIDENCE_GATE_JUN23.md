# AQ-457 morning live BCP and Jun 30 evidence gate, Jun 23

Passage fait le 2026-06-23T07:02:24Z depuis `/root/baycast-product`, après sync de `main` avec `origin/main` sur `8693355`. Je n'ai pas lu la table `forecasts`. Je n'ai pas imprimé de secret. Les contrôles viennent des pages publiques Baycast et des sources publiques de résolution.

## Verdict

GO pour le gate BCP public ce matin.

Les routes publiques vérifiées ne montrent pas de consensus ouvert ni de participation exacte. Je n'ai pas vu `aggregate_probability`, `forecasters_count`, `forecastCount`, `fcCount`, compteur exact de forecasters, probabilité de consensus précoce, `settled_by`, `evidence_doc`, JSON brut de résolution, ni payload interne exposé.

Les deux questions Jun 30 attendues ont été retrouvées depuis les liens publics de `/questions`, sans lecture de `forecasts`. Les pages détail sont en 200, restent verrouillées côté signal communautaire et affichent une source de résolution utilisable. La source FIFA répond aux fetchs automatisés. Les deux sources OpenAI affichées par Baycast sont bien disponibles comme URLs publiques, mais renvoient 403 Cloudflare aux fetchs automatisés depuis ce run. Pour le settlement, prévoir une vérification humaine ou un accès accepté par OpenAI si ce blocage reste en place.

## Routes publiques contrôlées

`npm run verify:public-bcp` passe sur `https://baycast-p.vercel.app`:

```text
Verifying public BCP surfaces at https://baycast-p.vercel.app
ok /
ok /questions
ok /questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248
ok /leaderboard
ok /activity
Public BCP surface verification passed.
```

`npm run verify:distribution-gate` passe aussi:

```text
Verifying distribution gate at https://baycast-p.vercel.app
ok /settlements/apple-mac-pro-wwdc-2026
ok /questions?status=resolved
ok /
Distribution gate verification passed.
```

Scan public ciblé des routes demandées:

```text
/                                           200 text/html, aucun token sensible
/questions                                  200 text/html, aucun token sensible
/questions?status=resolved                  200 text/html, aucun token sensible
/leaderboard                                200 text/html, aucun token sensible
/activity                                   200 text/html, aucun token sensible
/settlements/apple-mac-pro-wwdc-2026        200 text/html, aucun token sensible
```

Tokens et formes cherchés dans le HTML public: `aggregate_probability`, `forecasters_count`, `forecastCount`, `fcCount`, `settled_by`, `evidence_doc`, compte exact de forecasters, probabilité de consensus précoce, JSON de résolution brut, clé `forecasts` exposée. Rien trouvé sur les routes ci-dessus.

## Questions Jun 30 trouvées publiquement

Les IDs ci-dessous viennent des liens de `/questions` et des pages détail publiques.

`/questions/5745e845-94e9-4802-bbeb-850c982e1276`

Question: `Will the 2026 FIFA World Cup opening match have at least three total goals?`

Page détail publique:

```text
200 text/html
Sports, 8 d left
Community signal locked
Resolution source: FIFA official match centre: https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026
```

Aucun token sensible trouvé dans le HTML de la page détail. Le signal communautaire reste verrouillé.

`/questions/d3338e47-11ec-4568-942e-42bb19be0f5e`

Question: `Will OpenAI release a new public video generation model before July 1, 2026?`

Page détail publique:

```text
200 text/html
Technology, 8 d left
Community signal locked
Resolution source: OpenAI News and product release notes: https://openai.com/news/ and https://help.openai.com/en/articles/6825453-chatgpt-release-notes
```

Aucun token sensible trouvé dans le HTML de la page détail. Le signal communautaire reste verrouillé.

## Readiness des sources Jun 30

FIFA: `https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026` répond en public avec HTTP 200 et `text/html`. La source officielle est prête pour le contrôle du score au settlement.

OpenAI: `https://openai.com/news/` et `https://help.openai.com/en/articles/6825453-chatgpt-release-notes` sont les sources publiques affichées sur Baycast. Les deux URLs ont répondu HTTP 403 `text/html` aux fetchs automatisés de ce run. Cela ne révèle rien côté Baycast et ne bloque pas le gate BCP, mais la collecte d'évidence devra passer par un navigateur ou une vérification humaine si Cloudflare bloque encore l'automate le 30 juin.

## Commandes gardées

```bash
git fetch origin main
git checkout main
git pull --rebase origin main
npm run verify:public-bcp
npm run verify:distribution-gate
python3 /tmp/aq457_public_check.py
```

Je n'ai pas lancé de requête sur `forecasts`. Je n'ai pas utilisé de service role. Rien à corriger côté BCP public dans ce passage.
