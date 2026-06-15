# AQ-392 19h outbound gate et intake targets

Date de contrôle: 2026-06-15 19:01 UTC

## Verdict outbound

NO SEND.

Aucun outbound public ou privé ne part à 19h. Pas d'email, pas de X, pas de Reddit, pas de HN, pas de Discord, pas de Slack, pas de Telegram.

## Channel status

- Email: himalaya est installé et répond. `himalaya account list` voit le compte `gmail` en IMAP et SMTP, défaut oui. Une lecture limitée de la boîte via himalaya a aussi fonctionné sans envoyer. Statut technique utilisable, mais bloqué par la gate targets.
- X: auth indiquée comme en échec dans le contexte de gate. Aucun essai d'envoi.
- Reddit, HN, Discord, Slack, Telegram: aucun canal ouvert pour cette gate. Aucun essai d'envoi.

## Private target list status

Dossier local vérifié: `/root/baycast-private/outreach`.

Fichiers présents:

- `warm_targets_jun14_19h.csv`
- `warm_targets.example.csv`

Statut: il n'y a pas de vraie cible chaude exploitable. Le fichier du 14 juin contient seulement des lignes `TODO` marquées `blocked`, sans contact, sans canal, sans contexte réel et sans prochaine action prête. L'exemple est vide hors en-tête. Rien de privé n'est repris dans ce document.

## Raison exacte du no-send

La règle de distribution Baycast bloque tout outbound tant qu'il n'existe pas au moins une vraie cible chaude privée, hors git, avec ces quatre éléments remplis: contact, channel, context, next action.

Au contrôle 19h, cette cible n'existe pas. Donc NO SEND, même si email est techniquement utilisable.

## Template intake privé à remplir par Smil hors git

À copier dans un fichier privé hors repo, par exemple sous `/root/baycast-private/outreach/`.

```text
1. target_id:
2. name:
3. contact:
4. channel:
5. relationship:
6. context:
7. why_relevant:
8. next_action:
9. opt_in_status:
10. owner_and_review_date:
```

## Ready first-score email variant, NO SEND

Statut: brouillon prêt, ne pas envoyer tant que la gate targets reste rouge.

```text
Subject: Baycast first score sur [leur contenu]

Salut [Prénom],

J'ai pensé à toi en testant Baycast sur un angle simple: prendre un contenu déjà publié et sortir un premier score lisible en moins de deux minutes.

Si tu es ok, je peux passer [lien ou contenu] dans le scoreur et te renvoyer seulement le résultat brut avec 2 lignes de lecture. Pas de pitch long, pas de demande de call.

Contexte: je te contacte parce que [relation réelle ou dernier échange]. Si ce n'est pas le bon moment, je n'insiste pas.

Smil
```
