# AQ-553, Product/Questions gate, 04 juillet 19h

Ce passage couvre le gate Product/Questions demandé pour AQ-553. Il reste limité aux surfaces publiques et au suivi de settlement. Rien n’a été écrit en production.

Production BCP public vérifiée sur https://baycast-p.vercel.app
Le contrôle npm run verify:public-bcp a tourné depuis le clone local et a passé les routes publiques suivantes : /, /questions, une page question publique, /leaderboard, /activity. Le garde-fou BCP attendu reste le même : les pages publiques de questions ne doivent pas exposer aggregate_probability ni forecasters_count.

Pour le settlement watch, le prochain point à surveiller est Microsoft Xbox handheld, dû le 2026-07-31. Je n’ai pas lu la table forecasts. Je n’ai fait aucun live write.

Verdict : NO AI INSERT / NO OUTBOUND / NO NEW QUESTIONS.
