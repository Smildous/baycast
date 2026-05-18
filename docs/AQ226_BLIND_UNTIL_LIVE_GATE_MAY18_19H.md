# AQ-226, gate produit avant forecast IA live

Date: 18 mai, 19h

## Décision

Non. Baycast ne doit pas insérer de nouveaux forecasts IA en live avant d'avoir vérifié que le schéma garantit le timing de `blind_until`.

La seule exception acceptable est claire: la base doit prouver que Blind Consensus est protégé au niveau schéma, pas seulement par convention côté app. Tant que cette preuve n'existe pas, toute écriture live peut fausser une question ouverte.

## État live connu

À cet instant, on part des métriques fournies:

1. 44 questions ouvertes.
2. 11 forecasts existants.
3. 4 profils.
4. `service_role` disponible.

Ces chiffres suffisent pour dire qu'il y a déjà de la matière en production. Ils ne suffisent pas pour autoriser plus d'écritures IA.

## Gate AQ-226

Le gate est simple: pas de nouveau forecast IA live tant que `blind_until` n'est pas vérifié sur données réelles et tant que le comportement attendu n'est pas garanti par le schéma.

Le point à vérifier n'est pas seulement que la colonne existe. Il faut confirmer que le produit empêche réellement l'affichage, le comptage ou l'influence d'un forecast avant la fin de la fenêtre Blind Consensus.

Si le schéma ne bloque pas ce risque, Baycast doit rester en lecture seule pour les forecasts IA live.

## Checklist avant toute insertion IA sûre

1. Confirmer la présence de `blind_until` sur les questions concernées, avec un type de donnée compatible avec une comparaison fiable au temps courant.
2. Confirmer la règle exacte qui rend un forecast visible ou utilisable après `blind_until`, et pas avant.
3. Vérifier les policies, triggers, vues ou fonctions qui pourraient exposer un forecast malgré la fenêtre Blind Consensus.
4. Tester le flux avec `service_role` sur une copie ou un dry-run, sans écriture live, puis conserver les requêtes et résultats.
5. Autoriser une écriture live seulement si la question cible, le profil utilisé et la fenêtre Blind Consensus ont été validés ensemble.

## Questions candidates pour dry-run uniquement

Ces questions peuvent servir à préparer le test, mais elles ne doivent pas recevoir de forecast live maintenant.

1. Une question ouverte avec `blind_until` dans le futur, pour vérifier qu'un forecast IA resterait invisible et sans effet avant l'échéance.
2. Une question ouverte avec `blind_until` déjà passé, pour vérifier le comportement attendu après la fenêtre Blind Consensus.
3. Une question ouverte sans forecast IA existant, pour vérifier le chemin complet sans mélanger le test avec les 11 forecasts déjà présents.

## Conclusion

La réponse produit est non. Ajouter des forecasts IA maintenant crée plus de risque que de valeur.

AQ-226 doit d'abord prouver que Blind Consensus tient côté schéma. Ensuite seulement, Baycast pourra choisir une question de test et faire une insertion contrôlée.