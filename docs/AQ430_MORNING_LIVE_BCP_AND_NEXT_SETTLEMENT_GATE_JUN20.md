# AQ430 morning live BCP and next settlement gate, Jun 20

Passage fait le 2026-06-20 a 07:03 UTC sur `https://baycast-p.vercel.app`, depuis `/root/baycast-product`.

J'ai d'abord synchronise le clone avec `git fetch origin && git pull --ff-only origin main`. Le depot etait deja a jour. Les controles ont ensuite ete faits avec le navigateur public, les scripts existants et des fetchs HTTP publics. Je n'ai pas lu `forecasts`, je n'ai pas interroge la table `forecasts`, je n'ai pas ouvert de donnees admin et je n'ai rien ecrit dans Supabase.

## Verdict

GO pour le BCP public.

Les surfaces publiques testees ne montrent pas d'`aggregate_probability`, `forecasters_count`, `forecastCount`, `fcCount`, `consensus probability`, nombre exact de forecasters, `settled_by`, `evidence_doc`, ni payload JSON prive de resolution. Le detail FIFA ouvert garde le signal communautaire verrouille et ne montre que les presets de saisie utilisateur.

GO aussi pour la gate settlement. L'app publique affiche `Questions(42 open)`. Le contexte autorise avant run reste coherent avec `44 questions`, `42 open`, `2 resolved`, `12 forecasts`, `6 profiles`. Les pages publiques paginees exposent 39 cartes open avec metadonnees `status=open` et fermeture future. Les 3 cartes `Closing Soon` de tete, FIFA, OpenAI et CPI, completent les 42 open visibles. Aucun open controle n'est past close au moment du gate. La prochaine fenetre de settlement reste Jun 30.

## Surfaces publiques verifiees

`/` repond 200. La home affiche `42 Questions live now`, `Blind-first`, `Prediction polling` et cinq questions live. Les cartes visibles sont FIFA, OpenAI, CPI, ECB et S&P 500, toutes a `11d left`, avec `Lock your call before the crowd can shape it`.

`/questions` repond 200. La page affiche `Questions(42 open)`, les filtres, `Closing Soon`, puis les cartes ouvertes. La premiere page montre notamment FIFA, OpenAI, CPI, Apple foldable, Xbox handheld, Meta Llama, Google DeepMind IMO, US payrolls, ECB, S&P 500, Bank of Japan, NATO et G7. Les cartes ne publient pas de signal communautaire.

`/questions?status=resolved` repond 200. Le filtre resolved montre Apple Mac Pro et Atlantic hurricane season. Le libelle visible est `Resolved. Scores now count against the final outcome`. C'est une surface resolue, pas une fuite de consensus sur question ouverte.

`/leaderboard` repond 200. La page affiche les colonnes publiques `Forecaster`, `Brier`, `Log Score`, `Predictions`, `Resolved`. Le compteur `Predictions` vu ici appartient au scoring public resolu, pas a une question ouverte.

`/activity` repond 200. Le flux public montre une activite sur Apple Mac Pro, deja resolue. Je n'ai pas vu d'activite de question ouverte.

`/settlements/apple-mac-pro-wwdc-2026` repond 200. La note affiche `Apple Mac Pro at WWDC 2026 resolved No`, outcome `No`, settled `June 13, 2026`, les sources Apple WWDC et Apple Newsroom, puis le cadrage du premier score. Les champs internes `settled_by` et `evidence_doc` ne sont pas exposes.

La page detail ouverte decouverte depuis `/questions` est `/questions/5745e845-94e9-4802-bbeb-850c982e1276`. Elle repond 200 et affiche la question FIFA, `Sports`, `11 d left`, `Community signal locked`, `Jun 30, 2026`, la source de resolution FIFA, le slider et les boutons de saisie. Les pourcentages visibles sont les presets de forecast pour l'utilisateur non connecte, pas un consensus.

## Scan BCP visible et HTML

J'ai scanne le texte visible et le HTML des routes demandees, plus la note Apple settlement et le detail FIFA. Resultat: aucun hit pour les termes bloquants.

```text
/                                                       200 leak_terms none
/questions                                              200 leak_terms none
/questions?status=resolved                              200 leak_terms none
/leaderboard                                            200 leak_terms none
/activity                                               200 leak_terms none
/settlements/apple-mac-pro-wwdc-2026                    200 leak_terms none
/questions/5745e845-94e9-4802-bbeb-850c982e1276         200 leak_terms none
```

Termes cherches dans le HTML: `aggregate_probability`, `forecasters_count`, `forecastCount`, `fcCount`, `consensus probability`, nombres exacts de forecasters, `settled_by`, `evidence_doc`, `raw JSON`, `private resolution payload`, `resolution_payload`.

Le script existant donne aussi le meme signal sur son perimetre:

```text
npm run verify:public-bcp
ok /
ok /questions
ok /questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248
ok /leaderboard
ok /activity
Public BCP surface verification passed.
```

Et le controle distribution confirme la note Apple et le filtre resolved:

```text
npm run verify:distribution-gate
ok /settlements/apple-mac-pro-wwdc-2026
ok /questions?status=resolved
ok /
Distribution gate verification passed.
```

## Supabase read only et next settlement watch

`npm run verify:next-settlement-watch` est bien un script read only qui ne lit que `questions`, mais il ne peut pas se connecter dans ce shell parce que les variables Supabase ne sont pas presentes:

```text
next settlement watch: FAIL
Supabase env unavailable: Missing SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL or SUPABASE_ANON_KEY/NEXT_PUBLIC_SUPABASE_ANON_KEY
```

Je n'ai pas compense par une lecture de `forecasts`. J'ai utilise les pages publiques rendues par l'app. Les routes `/questions`, `/questions?page=2`, `/questions?page=3` et `/questions?page=4` exposent 39 objets open avec `closes_at` et `status=open`. Les 3 cartes closing soon repetees en tete, FIFA, OpenAI et CPI, affichent aussi `11d left`; le detail FIFA affiche `Jun 30, 2026`. Avec `Questions(42 open)`, cela couvre les 42 questions ouvertes visibles.

Controle date fait a 2026-06-20T07:03:12Z: aucun open controle n'a une fermeture passee. Les premieres fermetures visibles restent:

```text
5745e845-94e9-4802-bbeb-850c982e1276 | open | sports  | Jun 30, 2026 | FIFA opening match at least three total goals
d3338e47-11ec-4568-942e-42bb19be0f5e | open | tech    | Jun 30, 2026 | OpenAI public video generation model before July 1
cff593cd-e4f7-424f-b468-c8412edc3c6c | open | economy | Jun 30, 2026 | US core CPI for May 2026 at least 0.3 percent MoM
9beb8cd0-474d-4ab4-b52c-e2c83820350b | open | economy | 2026-06-30T23:59:59+00:00 | ECB deposit facility rate cut in June 2026 meeting
54f7e8b0-0dd6-4052-a5f3-2752c133083c | open | economy | 2026-06-30T23:59:59+00:00 | S&P 500 above 7,000 before July 1
3682dcd2-3680-4a58-bf06-4762f26b4541 | open | economy | 2026-06-30T23:59:59+00:00 | Ethereum above $5,000 before July 1
9df06e86-a3f4-4550-8381-c6be33ea48a7 | open | other   | 2026-06-30T23:59:59+00:00 | Cannes Palme d'Or female director
```

Decision finale: public BCP GO, next settlement gate GO. La prochaine surveillance concrete reste le lot Jun 30. Ne pas lire `forecasts` pour cette gate.
