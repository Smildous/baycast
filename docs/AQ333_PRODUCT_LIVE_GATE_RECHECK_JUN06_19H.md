# AQ-333 product live gate recheck, Jun 06 19h UTC

Verdict settlement: NO-GO.

Check fait le 2026-06-06T19:02:22Z depuis `/root/baycast-product`, après fetch origin, checkout main, puis pull fast-forward only sur origin main. La branche était déjà à jour avec `origin/main`.

Je n'ai pas lu la table `forecasts`. Je n'ai pas lu de données de forecast ouvert. Le contrôle est passé par les pages publiques Baycast et par le script readonly `scripts/first-settlement-evidence.mjs`, relu avant usage. Ce script annonce `Reads questions only`, utilise seulement `client.from('questions')`, et ne contient pas de lecture de `forecasts` ni d'écriture Supabase. Son exécution locale a échoué avant lecture métier car les variables Supabase ne sont pas configurées ici.

Pages publiques vérifiées sur `https://baycast-p.vercel.app/`:

`/` charge en 200 avec le titre `Baycast - Predict Real Events`. La home montre `44 Questions live now`, le wording `Free to play`, et la carte Apple Mac Pro. La carte dit `Lock your call before the crowd can shape it`. Aucun chiffre de consensus, aucun nombre exact de forecasters, aucune activité de forecast ouvert, aucun wording de pari ou gambling vu dans le rendu public.

`/questions` charge en 200 avec le titre Browse Prediction Questions, Baycast. La page indique `Questions (44 open)`, liste Apple Mac Pro en premier dans `Closing Soon`, avec `7 d left` et `Lock your call before the crowd can shape it`. Pas de probabilité de consensus, pas de compte exact de forecasters, pas d'activité publique de forecasts ouverts, pas de copy gambling.

`/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248` charge en 200 avec le titre `Will Apple announce a new Mac Pro at WWDC 2026? - Baycast`. Le détail affiche `Technology`, `7 d left`, la question Apple Mac Pro, la règle de résolution pour WWDC et Apple Newsroom du 2026-06-08 au 2026-06-12, `Community signal locked`, `Jun 13, 2026` comme close date, et `Add your forecast` avec un slider et les liens `Sign up to forecast` et `Log in`. Le HTML public contient aussi `2026-06-13T00:00:00+00:00`. Je n'ai vu ni état resolved, ni résultat, ni bouton ou indication de settlement.

`/leaderboard` charge en 200 avec le titre Forecaster Leaderboard, Baycast. La page dit `Scores appear after questions resolve` et `Forecasts are live now, but leaderboard scores start once a question has a final outcome`. Elle ne publie pas d'activité sur les questions ouvertes, pas de consensus, pas de compte exact de forecasters par question, pas de wording gambling.

`/activity` charge en 200 avec le titre Recent Forecasting Activity, Baycast. La page dit `Activity appears after questions resolve` et `Open-question forecasts stay hidden until resolution so every forecaster starts blind`. C'est le comportement attendu pour BCP: pas d'activité publique sur les forecasts ouverts.

J'ai aussi lancé `npm run verify:public-bcp`. Résultat: PASS sur `/`, `/questions`, la route détail Apple Mac Pro, `/leaderboard` et `/activity`.

J'ai lancé `npm run verify:first-settlement-evidence` seulement après relecture du script. Résultat local: échec de configuration, `Missing SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL or SUPABASE_ANON_KEY/NEXT_PUBLIC_SUPABASE_ANON_KEY`. Ce résultat ne contredit pas le contrôle public. Il dit seulement que le verifier readonly ne peut pas interroger `questions` dans cet environnement sans variables Supabase.

Conclusion: BCP public surface reste OK. Le signal communautaire reste verrouillé sur les questions ouvertes, les comptes exacts et probabilités de consensus ne sont pas exposés, l'activité publique attend la résolution, et le copy reste orienté prediction polling, pas gambling.

Apple Mac Pro reste ouvert. La page publique montre la clôture au 13 juin 2026 et le HTML public porte `2026-06-13T00:00:00+00:00`. Il n'y a donc pas de settlement à faire avant `2026-06-13T00:00:00+00:00`.
