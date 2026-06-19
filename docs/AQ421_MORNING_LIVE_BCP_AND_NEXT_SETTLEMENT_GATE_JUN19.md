# AQ421 morning live BCP and next settlement gate, Jun 19

Passage fait le 2026-06-19 07:03 UTC sur `https://baycast-p.vercel.app` depuis `/root/baycast-product`.

J'ai commencé par `git fetch origin && git pull --ff-only origin main`. Le repo était déjà à jour. Les contrôles live ont été faits en HTTP public et au navigateur. Côté base, j'ai lu uniquement `questions` en read-only pour les métadonnées, statuts et dates de fermeture. Je n'ai pas lu `forecasts`.

## Verdict

GO pour le BCP public.

Les pages publiques ne montrent pas de consensus ouvert, pas d'`aggregate_probability`, pas de `forecasters_count`, pas de `settled_by`, pas d'`evidence_doc`, pas de raw JSON visible, pas de `forecastCount`, pas de `fcCount`, pas de compteur exact de participation et pas de copie `consensus probability`.

GO aussi pour la watch settlement, avec une contrainte simple: ne pas traiter une nouvelle résolution aujourd'hui. Aucun open question n'est past close au 2026-06-19 00:00 UTC. Les prochains candidats ferment le 2026-06-30.

## Pages publiques vérifiées

`/` répond 200. La home charge la liste live avec des liens vers des questions ouvertes. Le scan HTML plus texte visible ne remonte aucun terme BCP bloquant.

`/questions` répond 200. Le navigateur affiche `Questions(42 open)`, puis des cartes `Closing Soon`. Les premières cartes visibles sont FIFA, OpenAI, CPI, Apple foldable, Xbox handheld. Les cartes gardent la copie `Lock your call before the crowd can shape it`, sans signal communautaire publié.

`/questions?status=resolved` répond 200. La page liste les questions résolues, dont Apple Mac Pro et named storm Atlantic hurricane season. Aucun champ privé de settlement n'est exposé dans le HTML public.

`/leaderboard` répond 200. La page affiche les colonnes publiques de score, dont `Brier`, `Log Score`, `Predictions`, `Resolved`. Rien ne révèle le consensus ou l'activité des questions ouvertes.

`/activity` répond 200. La page charge l'activité publique liée aux questions résolues. Le scan ne trouve pas de données BCP d'open questions.

`/settlements/apple-mac-pro-wwdc-2026` répond 200. La note publique affiche `Apple Mac Pro at WWDC 2026 settled No` et reste dans le cadrage prediction polling. Aucun `settled_by`, `evidence_doc`, raw JSON ou champ privé n'est visible.

Page détail ouverte vérifiée au navigateur: `/questions/5745e845-94e9-4802-bbeb-850c982e1276`. La page FIFA affiche `Sports`, `12 d left`, `Community signal locked`, `Jun 30, 2026`, la source FIFA, le slider de saisie et les CTA de connexion. Les pourcentages visibles sont les contrôles de saisie utilisateur, pas un consensus public.

Les scripts repo confirment le même état pour les surfaces couvertes: `npm run verify:public-bcp` PASS et `npm run verify:distribution-gate` PASS. `npm run verify:next-settlement-watch` ne peut pas utiliser l'env locale parce que les variables Supabase ne sont pas présentes dans le shell, donc j'ai fait la lecture REST read-only de `questions` avec la config publique embarquée côté client, sans toucher à `forecasts`.

## Supabase questions only

Lecture effectuée: `id,title,status,closes_at,created_at,resolved_at,resolution_source` sur `questions`, ordre `closes_at.asc`.

État lu:

- total questions: 44
- open: 42
- resolved: 2
- open past close au 2026-06-19 00:00 UTC: 0

Résolues:

- `13aa9f2f-3226-4213-a04f-0cc2b87ad248`, resolved, close `2026-06-13T00:00:00+00:00`, resolved_at `2026-06-13T07:06:50.32+00:00`, Apple Mac Pro at WWDC 2026
- `9345891c-192a-4915-acad-8bed7c554333`, resolved, close `2026-06-15T00:00:00+00:00`, resolved_at `2026-06-17T19:06:47.535+00:00`, 2026 Atlantic hurricane season named storm before June 15

Prochains candidats à surveiller, tous open et tous close `2026-06-30T23:59:59+00:00`:

- `9df06e86-a3f4-4550-8381-c6be33ea48a7`, Cannes Palme d'Or female director
- `3682dcd2-3680-4a58-bf06-4762f26b4541`, Ethereum above $5,000 before July 1
- `54f7e8b0-0dd6-4052-a5f3-2752c133083c`, S&P 500 above 7,000 before July 1
- `9beb8cd0-474d-4ab4-b52c-e2c83820350b`, ECB deposit facility rate cut in June 2026 meeting
- `d3338e47-11ec-4568-942e-42bb19be0f5e`, OpenAI public video generation model before July 1
- `cff593cd-e4f7-424f-b468-c8412edc3c6c`, US core CPI May 2026 at least 0.3 percent MoM
- `5745e845-94e9-4802-bbeb-850c982e1276`, FIFA opening match at least three total goals

## Decision

Public BCP: GO.

Next settlement watch: GO, but no new settlement action today. Keep watching the Jun 30 batch. If there is outbound copy today, it should stay on already resolved public material, not on a new settlement claim.
