# AQ-499 19h live BCP et gate contexte Jun 30, 27 juin

Run fait le 2026-06-27T19:07Z depuis `/root/baycast-product`, après `git fetch origin main` puis `git pull --ff-only origin main`. HEAD local avant le doc: `be81a58fe25ed554eb997347a6fcd399cc70823e`.

Verdict: GO pour les surfaces publiques BCP. NO SETTLEMENT sur les questions Jun 30. Les pages publiques gardent le signal communautaire verrouillé et les liens de contexte Jun 30 visibles sont officiels seulement.

Je n'ai pas lu la table `forecasts`. Les contrôles ont utilisé le site public `https://baycast-p.vercel.app`, les routes HTML publiques, les réponses RSC publiques avec `?_rsc=aq499`, et les scripts de vérification existants.

## Surfaces publiques

Les routes demandées répondent toutes en 200:

| Route | Résultat | Note |
| --- | --- | --- |
| `/` | 200 | home chargée, pas de fuite des champs privés scannés |
| `/questions` | 200 | `Questions(42 open)`, bloc `Closing Soon`, cartes blind-first |
| `/questions?sort=closing-soon` | 200 | tri closing-soon disponible, pas de consensus affiché |
| `/questions?status=resolved` | 200 | resolved public chargé, pas de champs internes exposés |
| `/leaderboard` | 200 | leaderboard public chargé |
| `/activity` | 200 | activité publique chargée |

Le navigateur confirme `/questions`: FIFA et OpenAI sont en haut du bloc `Closing Soon`, affichées à `4d left`, avec la copie `Lock your call before the crowd can shape it`. Aucun compteur public ni probabilité agrégée n'est visible sur cette surface.

## Scan fuite HTML et RSC

J'ai scanné les termes exacts `aggregate_probability`, `forecasters_count`, `settled_by`, `evidence_doc` dans les surfaces publiques ouvertes et resolved, en HTML de production et en RSC public:

| Surface | HTML | RSC |
| --- | --- | --- |
| `/questions` | aucune occurrence | aucune occurrence |
| `/questions?status=resolved` | aucune occurrence | aucune occurrence |
| `/questions/4db2190d-8bf0-44e7-87ae-9e9b7e26a557` | aucune occurrence | aucune occurrence |
| `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248` | aucune occurrence | aucune occurrence |

Les deux pages détail utilisées pour le scan couvrent une page publique ouverte depuis la liste open et une page publique resolved depuis la liste resolved. Les scans n'ont pas trouvé les noms de colonnes sensibles dans le HTML livré ni dans `text/x-component`.

## Gate contexte Jun 30

FIFA Jun 30 est public à `/questions/5745e845-94e9-4802-bbeb-850c982e1276`. La page contient `Community signal locked`, une fermeture Jun 30 2026, et le seul lien externe de contexte utile est officiel FIFA:

`https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026`

OpenAI Jun 30 est public à `/questions/d3338e47-11ec-4568-942e-42bb19be0f5e`. La page contient `Community signal locked`, une fermeture Jun 30 2026, et les seuls liens externes de contexte utiles sont officiels OpenAI:

`https://openai.com/news/`

`https://help.openai.com/en/articles/6825453-chatgpt-release-notes`

Les autres URL détectées sur ces pages sont du bruit technique du document, comme `schema.org` ou le namespace SVG. Elles ne sont pas des sources de résolution produit.

## Vérifications automatisées

`npm run verify:public-bcp` passe:

```text
ok /
ok /questions
ok /questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248
ok /leaderboard
ok /activity
Public BCP surface verification passed.
```

`npm run verify:distribution-gate` passe:

```text
ok /settlements/apple-mac-pro-wwdc-2026
ok /questions?status=resolved
ok /
Distribution gate verification passed.
```

`npm run verify:next-settlement-watch` n'a pas pu être exploité dans cet environnement parce que les variables Supabase ne sont pas présentes dans le repo local:

```text
next settlement watch: FAIL
Supabase env unavailable: Missing SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL or SUPABASE_ANON_KEY/NEXT_PUBLIC_SUPABASE_ANON_KEY
```

Ce n'est pas une fuite BCP et ça ne lit pas `forecasts`.

## Bug copy ou UX

Je n'ai pas trouvé de petit bug copy ou UX à corriger pendant ce gate. Aucun fichier applicatif n'a été modifié.

## Commandes principales

```text
git -C /root/baycast-product status --short
git -C /root/baycast-product fetch origin main
git -C /root/baycast-product pull --ff-only origin main
python3 live route and leak scan scripts against https://baycast-p.vercel.app
browser navigate https://baycast-p.vercel.app/questions
npm run verify:public-bcp
npm run verify:distribution-gate
npm run verify:next-settlement-watch
date -u +%Y-%m-%dT%H:%M:%SZ
git -C /root/baycast-product rev-parse HEAD
```

Verdict final: gate public propre. Le BCP reste respecté sur open et resolved. Les deux questions Jun 30 ont un contexte officiel-only. Prêt pour commit doc.
