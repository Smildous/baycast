# AQ-369 dev verifier recheck, Jun 12 19h

Recheck fait depuis `/root/baycast-dev` après `git fetch origin && git pull --ff-only origin main`. Le dépôt était déjà à jour.

Commandes exécutées et résultat:

```text
git diff --check
OK, aucune erreur de whitespace.

npm run verify:public-bcp
OK. Les surfaces publiques BCP répondent pour /, /questions, la question Apple Mac Pro, /leaderboard et /activity.

npm run verify:first-settlement-evidence
OK. Le script est en mode readonly, il lit la table questions et confirme le candidat Apple Mac Pro avec closes_at 2026-06-13T00:00:00+00:00.

npm run verify:aq231-june-resolution-hygiene
OK. Le contrôle de préparation de juin passe: 44 questions ouvertes, 9 questions bientôt fermées, 9 prêtes, 0 non prête.
```

Point important pour AQ-369: le vérificateur de première settlement lit `questions`, pas `forecasts`. Je n'ai pas lu Supabase `forecasts` pendant ce recheck.

Conclusion: la gate technique est verte pour le contrôle demandé. Cela ne déclenche pas de settlement avant la clôture Apple Mac Pro du 2026-06-13T00:00:00+00:00.
