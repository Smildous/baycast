# AQ427 19h live BCP and next settlement gate, Jun 19

Passage fait le 2026-06-19 à 19:01 UTC sur `https://baycast-p.vercel.app`, depuis `/root/baycast-product`.

J'ai commencé par `git fetch origin && git pull --ff-only origin main`. Le dépôt était déjà à jour. Les contrôles ont été faits avec le navigateur public, des fetchs HTTP publics et la lecture de métadonnées publiques de questions rendues par l'app. Je n'ai pas lu `forecasts`, je n'ai pas interrogé la table `forecasts`, je n'ai pas ouvert de donnée admin et je n'ai rien écrit dans Supabase.

## Verdict

GO pour le BCP public.

Les routes publiques testées ne montrent pas d'`aggregate_probability`, `forecasters_count`, `forecastCount`, `fcCount`, `consensus probability`, nombre exact de forecasters sur question ouverte, `settled_by`, `evidence_doc`, ni JSON brut portant des champs privés BCP. Le HTML Next contient des métadonnées publiques de questions comme `id`, `title`, `category`, `closes_at` et `status`, mais pas de consensus, pas de compte de forecasts et pas de champ de settlement interne.

GO aussi pour la gate settlement. À 19:01 UTC, l'app publique affichait `Questions(42 open)`. Le scan des métadonnées publiques a trouvé 39 open dans les pages paginées plus les 3 cartes `Closing Soon` répétées en tête, toutes avec une fermeture future. Aucun open visible ou présent dans ces métadonnées n'est past `closes_at`. La prochaine fenêtre de settlement reste le 2026-06-30 23:59:59 UTC.

## Routes publiques vérifiées

`/` répond 200. La home affiche `42 Questions live now`, `Blind-first`, `Prediction polling` et cinq cartes live. Les cartes visibles sont FIFA, OpenAI, CPI, ECB et S&P 500, toutes à `12d left`, avec la ligne `Lock your call before the crowd can shape it`.

`/questions` répond 200. Le navigateur affiche `Questions(42 open)`, les filtres, `Closing Soon`, puis les questions ouvertes. La première page montre FIFA, OpenAI, CPI, Apple foldable, Xbox handheld, Meta Llama, Google DeepMind IMO, US payrolls, ECB, S&P 500, Bank of Japan, NATO et G7. Les cartes ne publient pas le signal communautaire.

`/questions?status=resolved` répond 200. Le filtre résolu montre Apple Mac Pro et Atlantic hurricane season. Le libellé visible est `Resolved. Scores now count against the final outcome`. C'est cohérent avec une surface résolue, pas avec une fuite d'open consensus.

`/leaderboard` répond 200. La page affiche `Forecaster`, `Brier`, `Log Score`, `Predictions`, `Resolved`, avec `S Simba`, Brier `0.2500` et `2` predictions. Ce sont des scores publics de questions résolues. Je n'ai pas vu de donnée de consensus sur question ouverte.

`/activity` répond 200. Le flux public montre `S Simba forecasted 50% on Will Apple announce a new Mac Pro at WWDC 2026?`, donc une activité sur question déjà résolue. Je n'ai pas vu d'activité de question ouverte.

`/settlements/apple-mac-pro-wwdc-2026` répond 200. La note affiche `Apple Mac Pro at WWDC 2026 resolved No`, outcome `No`, settled `June 13, 2026`, les sources Apple WWDC et Apple Newsroom, puis le cadrage du premier score. Les champs internes `settled_by` et `evidence_doc` ne sont pas exposés.

La page détail ouverte découverte depuis `/questions` est `/questions/5745e845-94e9-4802-bbeb-850c982e1276`. Elle répond 200 et affiche la question FIFA, `Sports`, `12 d left`, `Community signal locked`, `Jun 30, 2026`, la source de résolution FIFA, le slider et les boutons de saisie utilisateur. Les pourcentages visibles sont les presets de saisie non connectée, pas un consensus.

## Scan BCP visible et HTML

J'ai scanné le texte visible et le HTML des routes demandées, plus la page détail FIFA. Résultat: aucun hit pour les termes bloquants.

```text
/                                             200  leak_terms none
/questions                                    200  leak_terms none
/questions?status=resolved                    200  leak_terms none
/leaderboard                                  200  leak_terms none
/activity                                     200  leak_terms none
/settlements/apple-mac-pro-wwdc-2026          200  leak_terms none
/questions/5745e845-94e9-4802-bbeb-850c982e1276 200 leak_terms none
```

Termes cherchés: `aggregate_probability`, `forecasters_count`, `forecastCount`, `fcCount`, `consensus probability`, nombres exacts de forecasters ou forecasts sur open questions, `settled_by`, `evidence_doc`, raw JSON privé. Le seul compteur visible de type `Predictions` est sur `/leaderboard`, attaché au score résolu de Simba, pas à une question ouverte.

## Next settlement watch

`npm run verify:next-settlement-watch` ne peut toujours pas lire Supabase dans ce shell parce que les variables ne sont pas chargées:

```text
next settlement watch: FAIL
Supabase env unavailable: Missing SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL or SUPABASE_ANON_KEY/NEXT_PUBLIC_SUPABASE_ANON_KEY
```

J'ai donc utilisé les métadonnées publiques rendues par les pages questions, sans table `forecasts`. Les pages paginées `/questions`, `/questions?page=2`, `/questions?page=3` et `/questions?page=4` exposent 39 cartes open avec `closes_at` et `status=open`. Les 3 cartes de tête répétées, FIFA, OpenAI et CPI, sont ouvertes et affichent `12 d left`; leurs pages détail affichent une fermeture `Jun 30, 2026`. Avec l'état public `Questions(42 open)`, cela couvre les 42 questions ouvertes.

Aucun open contrôlé n'a une fermeture passée au moment du gate. La prochaine fenêtre reste:

```text
2026-06-30T23:59:59+00:00
```

Candidats Jun 30 vus dans les métadonnées publiques et les cartes closing soon:

```text
5745e845-94e9-4802-bbeb-850c982e1276 | open | sports  | 2026-06-30 | FIFA opening match at least three total goals
d3338e47-11ec-4568-942e-42bb19be0f5e | open | tech    | 2026-06-30 | OpenAI public video generation model before July 1
cff593cd-e4f7-424f-b468-c8412edc3c6c | open | economy | 2026-06-30 | US core CPI for May 2026 at least 0.3 percent MoM
9beb8cd0-474d-4ab4-b52c-e2c83820350b | open | economy | 2026-06-30T23:59:59+00:00 | ECB deposit facility rate cut in June 2026 meeting
54f7e8b0-0dd6-4052-a5f3-2752c133083c | open | economy | 2026-06-30T23:59:59+00:00 | S&P 500 above 7,000 before July 1
3682dcd2-3680-4a58-bf06-4762f26b4541 | open | economy | 2026-06-30T23:59:59+00:00 | Ethereum above $5,000 before July 1
9df06e86-a3f4-4550-8381-c6be33ea48a7 | open | other   | 2026-06-30T23:59:59+00:00 | Cannes Palme d'Or female director
```

Apple Mac Pro et Atlantic hurricane restent les deux questions résolues visibles par le filtre resolved. Aucune action de settlement n'est due ce soir.

## Commandes utilisées

```bash
git fetch origin && git pull --ff-only origin main
date -u +'%Y-%m-%dT%H:%M:%SZ'
npm run verify:public-bcp
npm run verify:distribution-gate
npm run verify:next-settlement-watch
python3 public-http-route-scan
python3 public-questions-metadata-watch
```

Résultats repo:

```text
npm run verify:public-bcp
ok /
ok /questions
ok /questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248
ok /leaderboard
ok /activity
Public BCP surface verification passed.

npm run verify:distribution-gate
ok /settlements/apple-mac-pro-wwdc-2026
ok /questions?status=resolved
ok /
Distribution gate verification passed.
```

Décision finale: public BCP GO, next settlement gate GO. Continuer la surveillance du lot Jun 30. Ne pas changer la règle: pas de lecture `forecasts` pour ce gate.
