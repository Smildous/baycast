# AQ-267 dev verifier recheck, 26 mai 2026 13h UTC

Recheck fait dans `/root/baycast-dev` après `git pull --rebase origin main`. Le pull a fast-forward sur `origin/main` avant les vérifications.

`npm run verify:public-bcp` passe.

Sortie utile :

```text
Verifying public BCP surfaces at https://baycast-p.vercel.app
ok /
ok /questions
ok /questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248
ok /leaderboard
ok /activity
Public BCP surface verification passed.
```

Je n'ai pas lancé `npm run verify:first-settlement-evidence` dans ce clone, parce que l'environnement Supabase n'est pas disponible ici. Il manque les variables lues par `scripts/supabase-admin.mjs` pour un client en lecture : `SUPABASE_URL` ou `NEXT_PUBLIC_SUPABASE_URL`, et `SUPABASE_ANON_KEY` ou `NEXT_PUBLIC_SUPABASE_ANON_KEY`. Il n'y a qu'un `.env.example` dans ce clone. Je ne marque donc pas ce gate comme réussi côté dev.

Inspection du script `scripts/first-settlement-evidence.mjs` : le verifier annonce explicitement qu'il lit seulement `questions`, puis ses accès Supabase sont `client.from('questions')` pour les probes de colonnes et pour la requête June candidates. Je n'ai trouvé aucun `from('forecasts')` ni autre requête vers `forecasts` dans ce verifier.

Statut AQ-267 côté dev : surface publique BCP OK. Le contrôle first-settlement evidence reste à faire dans le clone canonique avec env Supabase, sans lire `forecasts`. La question Apple Mac Pro doit rester ouverte jusqu'à son close time, donc pas de settlement avant close.
