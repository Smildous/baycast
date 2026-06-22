# AQ-454 19h live BCP and Jun 30 evidence gate, Jun 22

Passage fait le 2026-06-22T19:03:27Z depuis `/root/baycast-product`, après `git fetch origin && git pull --ff-only origin main` sur `17e4382`. Je n'ai pas lu la table `forecasts`. Je n'ai pas imprimé de secret. Les contrôles ci-dessous viennent des pages publiques Baycast et de sources publiques de résolution.

## Verdict

GO pour le gate BCP public.

Les surfaces publiques gardent le consensus ouvert verrouillé. Je n'ai pas vu `aggregate_probability`, `forecasters_count`, `forecastCount`, `fcCount`, compteur exact de forecasters, probabilité de consensus ouverte, `settled_by`, `evidence_doc`, payload brut de résolution, ni JSON interne exposé sur les routes vérifiées.

Les deux prochains candidats Jun 30 sont visibles publiquement, ouverts, clos le 30 juin 2026, avec source de résolution indiquée sur la page détail. La source FIFA est directement joignable depuis ce run. Les deux URLs OpenAI sont bien les sources publiques affichées par Baycast, mais leurs domaines ont renvoyé Cloudflare 403 aux fetchs automatisés et au navigateur de contrôle. Ce n'est pas une fuite Baycast, seulement une limite d'accès bot sur la source externe. À vérifier manuellement au moment du settlement si Cloudflare bloque encore l'automate.

## Surfaces Baycast vérifiées

`npm run verify:public-bcp` passe sur `https://baycast-p.vercel.app`:

```text
ok /
ok /questions
ok /questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248
ok /leaderboard
ok /activity
Public BCP surface verification passed.
```

`npm run verify:distribution-gate` passe aussi:

```text
ok /settlements/apple-mac-pro-wwdc-2026
ok /questions?status=resolved
ok /
Distribution gate verification passed.
```

J'ai ensuite refait un scan public ciblé des routes demandées:

```text
/                                           200 text/html, aucun token sensible
/questions                                  200 text/html, aucun token sensible
/questions?status=resolved                  200 text/html, aucun token sensible
/leaderboard                                200 text/html, aucun token sensible
/activity                                   200 text/html, aucun token sensible pour question ouverte
/settlements/apple-mac-pro-wwdc-2026        200 text/html, aucun token sensible
```

La page `/activity` affiche des pourcentages sur de l'activité résolue. Je ne l'ai pas compté comme fuite BCP ouverte. Sur les questions ouvertes, les pourcentages visibles sont les contrôles d'entrée utilisateur du slider, pas le consensus.

## Questions Jun 30 trouvées depuis `/questions`

Les URLs ont été découvertes depuis les liens publics de `/questions`, sans lecture de table privée:

`/questions/5745e845-94e9-4802-bbeb-850c982e1276`

Question: `Will the 2026 FIFA World Cup opening match have at least three total goals?`

La page détail montre:

```text
Sports, 9 d left
Community signal locked
Jun 30, 2026 Closes
Resolution source: FIFA official match centre: https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026
```

Pas de champ sensible vu dans le HTML public. La page garde le signal communautaire verrouillé.

`/questions/d3338e47-11ec-4568-942e-42bb19be0f5e`

Question: `Will OpenAI release a new public video generation model before July 1, 2026?`

La page détail montre:

```text
Technology, 9 d left
Community signal locked
Jun 30, 2026 Closes
Resolution source: OpenAI News and product release notes: https://openai.com/news/ and https://help.openai.com/en/articles/6825453-chatgpt-release-notes
```

Pas de champ sensible vu dans le HTML public. La page garde le signal communautaire verrouillé.

## Source readiness Jun 30

FIFA: `https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026` répond en public avec HTTP 200 et `text/html; charset=utf-8`. La source est prête pour vérifier le match centre officiel au settlement.

OpenAI: `https://openai.com/news/` et `https://help.openai.com/en/articles/6825453-chatgpt-release-notes` sont bien les sources publiques affichées sur Baycast. Depuis ce run, `curl`, `urllib` et le navigateur ont reçu une page Cloudflare `Just a moment...` ou HTTP 403. Source configurée, mais accès automatisé non fiable. Il faudra une vérification humaine ou un chemin d'accès accepté par OpenAI au moment du settlement.

## Commandes gardées

```bash
git fetch origin && git pull --ff-only origin main
npm run verify:public-bcp
npm run verify:distribution-gate
python3 /tmp/aq454_public_check.py
python3 - <<'PY'
# fetch public detail pages, extract public text and public resolution-source strings only
PY
curl -L -sS -A 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/125 Safari/537.36' https://openai.com/news/
```

Je n'ai pas lancé de requête sur `forecasts`. Je n'ai pas utilisé de service role pour enrichir ce document. Rien à corriger côté BCP public dans ce passage.
