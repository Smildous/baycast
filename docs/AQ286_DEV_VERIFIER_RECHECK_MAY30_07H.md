# AQ-286 DEV verifier recheck, May 30 07h

Recheck fait depuis `/root/baycast-dev` après remise au propre sur `origin/main`.

Commandes lancées et résultat :

`git fetch origin && git reset --hard origin/main`

Pass. Sortie :

```text
From https://github.com/Smildous/baycast
   a0bbd3b..06157ea  main       -> origin/main
HEAD is now at 06157ea docs(AQ-284): add product live recheck at 19h
```

`git diff --check`

Pass. Sortie vide.

`npm run verify:public-bcp`

Pass. Sortie :

```text
> baycast@0.1.0 verify:public-bcp
> node scripts/verify-public-bcp-surfaces.mjs

Verifying public BCP surfaces at https://baycast-p.vercel.app
ok /
ok /questions
ok /questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248
ok /leaderboard
ok /activity
Public BCP surface verification passed.
```

`test -f .env.local`

Fail. `/root/baycast-dev/.env.local` est absent.

`npm run verify:first-settlement-evidence`

Non lancé depuis `/root/baycast-dev`, parce que l'env repo est absent et il ne faut pas le fabriquer. Odin doit relancer ce contrôle depuis `/root/baycast`.

Je n'ai pas lu la table `forecasts` pendant ce recheck.
