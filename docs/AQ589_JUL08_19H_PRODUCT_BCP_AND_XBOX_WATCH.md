# AQ-589, produit questions, 8 juillet 19h UTC

Verdict: GO pour le watch Xbox. Verdict settlement: NO, pas de settlement maintenant.

La prod publique `https://baycast-p.vercel.app` était joignable pendant le contrôle. J'ai vérifié en navigateur les surfaces publiques suivantes: `/`, `/questions`, `/questions/5cc9fe74-5306-49d9-bec3-251ad276a779`, `/activity`, `/leaderboard`. Le contrôle HTTP a repris les mêmes routes côté HTML public.

Sur ces surfaces, je n'ai pas vu de fuite BCP. Les champs `aggregate_probability`, `forecasters_count`, `settled_by` et `evidence_doc` ne sont pas présents dans le HTML inspecté. La page question Xbox garde le signal de communauté verrouillé et affiche seulement le message de verrouillage avant forecast. Aucun raw JSON public avec ces champs n'a été trouvé dans les scripts de page ni dans les marqueurs HTML contrôlés.

Le script public BCP confirme le même état:

```text
Verifying public BCP surfaces at https://baycast-p.vercel.app
ok /
ok /questions
ok /questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248
ok /leaderboard
ok /activity
Public BCP surface verification passed.
```

Le spot-check HTTP sur les routes publiques demandées a répondu 200 partout:

```text
/ status=200 bytes=57402 hits=none raw_json_marker=False
/questions status=200 bytes=49909 hits=none raw_json_marker=False
/questions/5cc9fe74-5306-49d9-bec3-251ad276a779 status=200 bytes=48176 hits=none raw_json_marker=False
/leaderboard status=200 bytes=47578 hits=none raw_json_marker=False
/activity status=200 bytes=25394 hits=none raw_json_marker=False
```

Watch settlement suivant: Microsoft Xbox handheld, question `5cc9fe74-5306-49d9-bec3-251ad276a779`, clôture publique affichée au 2026-07-31. La page de prod montre le titre attendu, la règle de résolution et `Jul 31, 2026` comme clôture. La question est encore en phase ouverte côté public avec forecast à saisir, donc rien à régler maintenant.

Je n'ai pas lu la table `forecasts`. Le contrôle local `verify:next-settlement-watch` n'a pas pu tourner dans `/root/baycast-product` faute d'environnement Supabase, avec l'échec exact suivant:

```text
next settlement watch: FAIL
Supabase env unavailable: Missing SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL or SUPABASE_ANON_KEY/NEXT_PUBLIC_SUPABASE_ANON_KEY
```

Conclusion: BCP public propre sur les routes vérifiées, Xbox reste le prochain watch, GO pour continuer la surveillance, NO settlement now.
