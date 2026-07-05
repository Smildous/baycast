# AQ559 Jul 5 13h product gate: BCP public et settlement watch

Timestamp: 2026-07-05 13h UTC

## Décision

Pas de nouvelles questions ce run.

Pas d'insert IA live ce run.

La porte produit reste fermée pour l'ajout de contenu tant que le prochain settlement n'est pas surveillé avec une source claire et que le mode public BCP reste propre sur les routes ouvertes.

## Supabase

`.env.local` n'est pas présent dans `/root/baycast-product`, donc `node scripts/supabase-admin.mjs status` n'a pas été lancé localement avec des secrets Supabase.

État de référence transmis pour ce créneau:

| Signal | Valeur |
| --- | ---: |
| questions | 44 |
| open | 35 |
| forecasts | 12 |
| profiles | 6 |

Note stricte: la table `forecasts` n'a pas été lue pendant ce run.

## BCP public, production

Commande lancée:

```bash
npm run verify:public-bcp
```

Résultat: PASS.

Routes production vérifiées par le script sur `https://baycast-p.vercel.app`:

| Route | Statut |
| --- | --- |
| `/` | ok |
| `/questions` | ok |
| `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248` | ok |
| `/leaderboard` | ok |
| `/activity` | ok |

Contrôle attendu: aucune fuite publique de `aggregate_probability`, `forecasters_count`, consensus ou métadonnées de participation sur les surfaces ouvertes.

Ce contrôle a été fait sur les routes publiques de production. Aucun accès direct à la table `forecasts` n'a été fait pour cette vérification.

## Next settlement watch

Commande lancée:

```bash
npm run verify:next-settlement-watch
```

Résultat: FAIL local, faute d'environnement Supabase disponible.

Message exact:

```text
next settlement watch: FAIL
Supabase env unavailable: Missing SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL or SUPABASE_ANON_KEY/NEXT_PUBLIC_SUPABASE_ANON_KEY
```

Point de surveillance produit retenu pour le prochain settlement:

| Sujet | Close |
| --- | --- |
| Microsoft Xbox handheld | 2026-07-31 |

Action produit immédiate: surveiller Microsoft Xbox handheld jusqu'à la clôture du 2026-07-31. Ne pas créer de nouvelle question et ne pas insérer de contenu IA live sur ce créneau.

## Gate final

Public BCP production: PASS.

Supabase local: non vérifié, `.env.local` absent.

Next settlement watch: bloqué localement par absence d'env Supabase, sujet à suivre identifié.

Décision AQ559 13h UTC: pas de nouvelles questions, pas de live AI insert.
