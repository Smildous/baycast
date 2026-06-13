# AQ371 dev settlement path, Jun 13 07h UTC

Je n'ai pas lu la table `forecasts` et je n'ai pas lancé de règlement live.

J'ai travaillé dans `/root/baycast`. La copie était propre avant écriture du présent runbook.

Commandes passées:

```bash
git status court
git diff check whitespace
npm run verify:public-bcp
npm run verify:first-settlement-evidence
npm run verify:aq231-june-resolution-hygiene
```

La commande de check whitespace de git n'a rien imprimé et a terminé avec code 0.

`npm run verify:public-bcp` passe. Le script a vérifié `https://baycast-p.vercel.app`, `/questions`, la page Apple Mac Pro `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`, `/leaderboard` et `/activity`. Toutes les routes attendues sont `ok`, puis le script conclut `Public BCP surface verification passed`.

`npm run verify:first-settlement-evidence` passe en lecture seule. La sortie annonce `ok: true`, `mode: readonly`, `table: questions`, avec le candidat exact: `Will Apple announce a new Mac Pro at WWDC 2026?`, statut `open`, clôture `2026-06-13T00:00:00+00:00`, source `Apple WWDC and Apple Newsroom: https://developer.apple.com/wwdc26/ and https://www.apple.com/newsroom/`, `resolution_url: null`. Le script rappelle aussi les étapes à faire avant règlement: confirmer le titre, ouvrir la source publique, capturer titre, publisher, URL et timestamp, garder seulement des preuves publiques, puis régler seulement après clôture et réponse directe de la source.

`npm run verify:aq231-june-resolution-hygiene` passe. La sortie annonce `ok: true`, `mode: readonly`, `table: questions`, `open_questions: 44`, `soon_closing_open_questions: 9`, `ready_soon_closing_open_questions: 9`, `not_ready_soon_closing_open_questions: 0`, `missing_by_field: {}`. Le candidat Apple est dans la fenêtre de juin, prêt côté hygiène, sans champ manquant. La colonne live `resolution_date` manque, mais le vérificateur utilise `closes_at`, qui est présent.

Côté commandes de mise à jour, `package.json` ne contient pas de script de settlement. Il contient seulement `update:resolution-sources`, qui ne sert qu'à corriger `resolution_source`, et les verifiers. `scripts/supabase-admin.mjs` expose bien une commande CLI générique `update-question <id> patch.json`. Elle lit un fichier JSON, appelle `getClient({ write: true })`, puis fait `client.from('questions').update(patch).eq('id', id).select('id,title,status').single()`. Les écritures passent par `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_ADMIN_JWT`, ou login admin. Cette commande n'a pas de mode dry run, pas de garde spécialisée settlement, pas de vérification que la question est fermée, pas de capture d'évidence, pas de calcul de scores et pas d'audit explicite.

Verdict: une mise à jour live de la row `questions` n'est pas safe maintenant pour AQ-371. La raison n'est pas la BCP publique, elle passe. Le blocage est opérationnel: ce run n'a pas capturé l'évidence publique Apple requise, et le repo n'a pas de commande de settlement testée bout en bout. Le seul outil d'écriture trouvé est un patch générique sur `questions`. Il peut probablement changer `status`, `resolved_at` et `resolution`, car le schéma déclare ces colonnes, mais ce n'est pas un chemin de settlement validé.

Je ne fournis donc pas de payload final à appliquer. Pour être safe, il faut d'abord capturer une preuve publique non ambiguë depuis Apple WWDC ou Apple Newsroom, avec titre, publisher, URL et timestamp de récupération, puis décider le résultat exact Yes ou No à partir de cette preuve. Ensuite il faut soit ajouter et tester une commande de settlement dédiée, soit accepter explicitement le risque d'utiliser `update-question` pour la seule row `questions` en sachant que les scores ne seront pas calculés par ce chemin.

Les gaps avant live settlement sont clairs: preuve publique Apple non capturée ici, absence de commande dédiée de settlement, absence de dry run pour `update-question`, absence de calcul ou insertion de scores dans le chemin inspecté, absence d'audit spécialisé dans la commande générique, et décision de résultat encore non documentée dans le repo par une evidence note.
