# AQ-332, recheck distribution post-score, 6 juin 13h UTC

Verdict: NO-SEND.

Contrôle fait depuis `/root/baycast-marketing` après mise à jour de `main` par `git fetch origin main`, `git checkout main`, puis `git pull --ff-only origin main`. Rien n'a été envoyé. Pas d'email, pas de X, pas de Reddit, pas de HN, pas de DM, pas de test sortant.

Le gate ne peut pas ouvrir à 13h UTC. Les prérequis ne sont pas tous vrais en même temps. Le canal email est authentifié, mais il manque encore les preuves publiques qui rendent une distribution post-score défendable.

Note publique de settlement: absente. J'ai retesté les routes publiques `https://baycast-p.vercel.app/settlements`, `/settlement`, `/resolutions`, `/resolution`, `/resolved`, `/updates`, `/blog` et `/notes`. Elles répondent en 404. `https://baycast-p.vercel.app/questions/resolved` répond en 200 mais affiche `Question not found`. `https://baycast-p.vercel.app/questions?status=resolved` répond en 200 mais affiche `Questions(44 open)` et `No match`. Je n'ai pas trouvé de note de settlement publique et stable à citer.

Scores visibles: absents. Dans le navigateur, `https://baycast-p.vercel.app/leaderboard` affiche encore `Scores appear after questions resolve`. `https://baycast-p.vercel.app/activity` affiche encore `Activity appears after questions resolve`. Les pages existent, mais elles ne montrent aucun score post-résolution.

Route resolved ou settlement utile: absente. Les routes directes de settlement ou de resolution sont en 404. La vue `questions?status=resolved` est atteignable, mais elle ne montre aucun item résolu. Elle n'est donc pas utilisable comme preuve marketing.

Liste privée de warm targets hors git: absente sur cette machine. Le scan sous `/root` avec les noms `target`, `warm`, `outreach`, `lead` et les fichiers `*.csv` ne remonte aucun candidat Baycast privé hors dépôt. Le seul CSV trouvé hors repo Baycast reste `/root/obsidian-vault/Smil/Baycast/Metrics.csv`, qui n'est pas une warm target list.

Canal sortant authentifié: oui pour l'email. `himalaya account list` voit le compte `gmail` par défaut avec IMAP et SMTP. `himalaya account doctor` passe TOML, IMAP et SMTP en OK. `gh auth status` est OK pour GitHub, mais GitHub n'est pas un canal de distribution pour cette opération. `x-cli me` ne prouve pas une session X prête à publier, il affiche seulement l'aide des sous-commandes.

Vérifications repo: `npm run verify:public-bcp` passe sur `/`, `/questions`, la question Apple, `/leaderboard` et `/activity`. `npm run verify:first-settlement-evidence` échoue faute de variables Supabase locales: `Missing SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL or SUPABASE_ANON_KEY/NEXT_PUBLIC_SUPABASE_ANON_KEY`. Ce résultat ne débloque pas le gate.

Conclusion: NO-SEND maintenu. Ne pas distribuer AQ-332 maintenant. Le public ne peut pas encore voir une note de settlement, un score, ni une route resolved ou settlement utile. L'auth email seule ne suffit pas.
