# AQ441 morning outbound gate, Jun 21

Controle fait le 2026-06-21T07:02:28Z depuis `/root/baycast-marketing`, apres fetch de `origin/main`. Aucun message envoye. Pas d'email, pas de post X, pas de DM, pas de test d'envoi.

Verdict: NO SEND.

Le point bloquant reste simple: le public passe et l'email local est utilisable, mais la liste chaude privee sous `/root/baycast-private/outreach` a 2 lignes de travail et 0 ligne complete et sendable. X n'est pas authentifie dans ce run. La regle demande les trois pieces en meme temps: gates publics verts, au moins un canal outbound authentifie, et au moins une cible chaude privee complete hors git. La derniere condition echoue, donc rien ne part.

## Controle public

Commandes lancees sans envoi:

```sh
npm run verify:public-bcp
npm run verify:distribution-gate
curl -L -s -o /tmp/baycast_home.html -w '%{http_code} %{url_effective}\n' https://baycast-p.vercel.app
```

Resultat:

`verify:public-bcp` passe sur `https://baycast-p.vercel.app` pour `/`, `/questions`, `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`, `/leaderboard` et `/activity`.

`verify:distribution-gate` passe sur `/settlements/apple-mac-pro-wwdc-2026`, `/questions?status=resolved` et `/`.

La home publique repond `200` sur `https://baycast-p.vercel.app/`. Le HTML recu fait 57 438 octets. Scan simple de la home: aucun terme bloquant trouve parmi `forecasters_count`, `aggregate_probability`, `odds`, `wager`, `payout`, `betting`, `gambling`.

Conclusion publique: PASS.

## Canaux outbound

Email: Himalaya est present. `himalaya account doctor` passe avec configuration TOML OK, IMAP OK et SMTP OK. Aucun email n'a ete envoye.

X: `x-cli` est present, mais le probe de lecture sans publication echoue faute de variables d'environnement X. Je n'ai imprime aucun secret et je n'ai lance aucune commande d'ecriture. X non utilisable pour ce gate.

Conclusion canal: un canal authentifie est present via email. X reste bloque.

## Cibles chaudes privees

Repertoire verifie: `/root/baycast-private/outreach`. Je n'ai imprime aucun nom, email, handle, URL personnelle ou detail de contact.

Fichiers trouves: 2.

`warm_targets_jun14_19h.csv`: 2 lignes, 0 ligne complete et sendable.

`warm_targets.example.csv`: 0 ligne, 0 ligne complete et sendable.

Total utile pour ce gate: 2 lignes de travail, 0 ligne complete et sendable.

Le repertoire verifie n'est pas lui-meme un depot git autonome dans ce run. Les donnees restent hors du depot marketing et aucun contenu prive n'a ete copie dans ce rapport.

Conclusion cibles: FAIL. Il manque au moins une cible chaude avec contact non placeholder, relation claire, contexte recent, opt-in ou permission exploitable, note personnelle, et statut non bloquant.

## Decision

NO SEND pour AQ441 ce matin.

Les gates publics passent. L'email est utilisable. Mais la liste chaude privee n'a aucune ligne complete et sendable. Tant que ce point reste a 0, aucun outbound public ou prive ne doit partir.

Prochaine action utile: completer la liste hors git, sans copier les identites dans le depot marketing, puis relancer ce gate avant tout envoi.
