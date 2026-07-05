# AQ-558, 5 juillet matin: no-send et activation en attente

Verdict: NOTHING SENT.

Rien n'a été publié, posté ou envoyé. Ce pack est prêt à rester en attente, pas à partir tant que le gate reste fermé.

## Gate de distribution public

Résultat du contrôle exécuté le 5 juillet depuis le dépôt local:

```text
> baycast@0.1.0 verify:distribution-gate
> node scripts/verify-distribution-gate.mjs

Verifying distribution gate at https://baycast-p.vercel.app
ok /settlements/apple-mac-pro-wwdc-2026
ok /questions?status=resolved
ok /
Distribution gate verification passed.
```

Le site public répond et le gate de distribution public passe sur les routes testées. Cela ne suffit pas à autoriser l'envoi, car les cibles privées et au moins un canal sortant authentifié ne sont pas prêts ensemble.

## État des canaux

X n'est pas authentifié dans les gates précédents. Il reste hors service pour toute publication.

Himalaya email a déjà été vu comme utilisable, mais il ne doit pas être utilisé ici: la liste privée de cibles chaudes n'a aucune ligne complète et envoyable.

Aucun canal n'a été activé pendant ce travail.

## État des cibles chaudes

La liste privée de warm targets contient 0 ligne complète et envoyable. Tant que cette liste n'est pas complète, il n'y a pas de destinataire sûr pour une séquence email warm.

Les métriques de contexte restent plates: 6 users, 44 questions, 12 forecasts, 0 today_forecasts. Cela pousse à préparer l'activation, pas à forcer une distribution.

AQ-546 reste bloqué côté endpoint AI production, secret non aligné. Le dry_run AI ne peut donc pas servir de feu vert tant que le secret n'est pas corrigé et vérifié.

## Email draft 1, warm founder/operator

Objet: Baycast, transformer les paris d'opinion en prévisions suivies

Bonjour [Prénom],

Je te partage Baycast parce que le produit est fait pour un cas simple: poser une question prévisionnelle, laisser le marché d'opinion se former, puis revenir au résultat quand l'événement est réglé.

Le positionnement n'est pas gambling. L'idée est de sortir du commentaire à chaud et de garder une trace vérifiable: qui prévoyait quoi, à quel moment, et avec quel niveau de confiance.

Un bon premier test serait une question que ton équipe suit déjà, par exemple lancement produit, adoption, décision marché ou signal concurrentiel. Baycast peut servir de petit espace public pour cadrer la question et suivre les prévisions jusqu'au règlement.

Si tu veux, je peux te proposer 3 questions prêtes à publier à partir de ton contexte.

À bientôt,
[Signature]

Statut: prêt à envoyer, retenu derrière gate. Aucun envoi effectué.

## Email draft 2, product/growth lead

Objet: Une question Baycast pour tester votre intuition marché

Bonjour [Prénom],

Je pense que Baycast peut être utile à ton équipe pour une chose précise: convertir une intuition marché en question prévisionnelle, puis mesurer comment l'avis évolue avant le résultat.

Exemple: « Est-ce que [événement produit ou marché] arrivera avant [date] ? » Les participants ne déposent pas juste une opinion, ils la rendent traçable dans le temps.

Ce n'est pas un angle betting. C'est de la prévision lisible, avec une question claire, une échéance et un règlement.

Je peux te préparer une première question en 10 minutes si tu me donnes le thème à suivre cette semaine.

À bientôt,
[Signature]

Statut: prêt à envoyer, retenu derrière gate. Aucun envoi effectué.

## X draft 1

Baycast sert à poser une question qui mérite mieux qu'un avis à chaud.

Une échéance, des prévisions, puis un règlement.

Pas du gambling. De la prévision suivie, du betting au forecasting.

Statut: prêt à poster, retenu derrière gate. Aucun post effectué.

## X draft 2

Une bonne question Baycast ressemble à ça:

« Est-ce que [événement vérifiable] arrivera avant [date] ? »

Simple à comprendre, difficile à tricher, utile à relire après coup.

C'est le passage de l'opinion au forecast.

Statut: prêt à poster, retenu derrière gate. Aucun post effectué.

## Unblockers

Les seuls déblocages acceptés sont les suivants:

1. une liste privée de warm targets complète, plus un canal sortant authentifié;
2. ou un dry_run AI passé avec le secret aligné.

Sans l'un de ces deux états, le verdict reste: NOTHING SENT.
