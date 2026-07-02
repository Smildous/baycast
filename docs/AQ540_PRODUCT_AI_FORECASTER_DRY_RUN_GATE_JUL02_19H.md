# AQ-540 Product AI forecaster dry-run gate, Jul 02 19h

Contrôle fait depuis `/root/baycast-product` le 2026-07-02 à 19h UTC. Je n'ai inséré aucun forecast. Je n'ai pas lu les forecasts existants, le consensus public, les probabilités agrégées, ni les comptes de votes. Les accès live ont été limités à la table `questions` avec des colonnes de question seulement.

Question choisie: `66f9ef22-71ff-40b7-936c-5f32e1b9f8f0`, `Will US nonfarm payrolls for June 2026 be below 100,000?`

Pourquoi cette question: elle est ouverte, binaire, proche dans le calendrier, avec une clôture au `2026-07-31T23:59:59+00:00`. Elle convient au contrôle BCP côté produit sans avoir besoin de regarder les forecasts des utilisateurs.

Vérifications faites:

1. Inspection de `app/api/agent/forecast/route.ts`.
   Le handler exige `AGENT_ENDPOINT_SECRET`, charge la question côté serveur avec Supabase service role, et sélectionne seulement `id,title,description,category,status,question_type,resolution_source,blind_until,closes_at`. Il ne prend pas de texte de question fourni par le client pour construire le prompt. Il appelle ensuite le modèle, construit une prediction, puis sort immédiatement si `dry_run` est vrai.

2. Inspection de `lib/ai-forecaster.ts`.
   Le prompt système interdit d'inférer le consensus Baycast, les counts, l'activité utilisateur, les rankings ou les autres forecasts. La validation refuse les questions non ouvertes, non binaires, déjà fermées, sans `blind_until`, ou hors phase blind active.

3. Test unitaire existant.
   Commande: `npx vitest run __tests__/agent-forecast-route.test.ts`.
   Résultat: 1 test passé. Le test `keeps dry runs read-only after reading the canonical question and calling the model` vérifie que `dry_run` ne touche que `questions`, ne lit pas `auth.admin.listUsers`, ne crée pas d'utilisateur, ne touche pas `profiles`, ne touche pas `forecasts`, ignore le texte client, et retourne `user_id: dry-run:product_radar`.

4. Recherche d'une question live ouverte.
   Requête Supabase REST limitée à `questions`, colonnes `id,title,category,status,question_type,closes_at,resolution_source,description`, `status=eq.open`, tri `closes_at.asc`, limite 10. Aucune table de forecasts ou de consensus n'a été lue. La question choisie est sortie comme ouverte dans cette liste.

5. Probe dry_run live sans écriture.
   J'ai appelé le handler Next localement via Vitest, avec les variables Supabase locales chargées depuis `/root/baycast/.env.local`, un secret endpoint local jetable, et un faux endpoint LLM localement intercepté. Corps de requête: `{ "question_id": "66f9ef22-71ff-40b7-936c-5f32e1b9f8f0", "dry_run": true }`.
   Résultat observé: `status: 404`, body `{ "ok": false, "error": "Question not found" }`, `llm_calls: 0`, `total_fetch_calls: 1`. Le handler s'est arrêté sur la lecture canonique de la question. Il n'a pas appelé le LLM et n'a pas atteint le chemin d'écriture.

Point bloquant trouvé:

La route live sélectionne `blind_until`, mais la table live `questions` ne l'expose pas dans le schéma utilisé par l'API REST. Une vérification REST directe sur `questions?select=id,title,description,category,status,question_type,resolution_source,blind_until,closes_at` retourne `HTTP 400` avec le message `column questions.blind_until does not exist`. Comme le handler masque cette erreur en `Question not found`, le dry_run live ne peut pas produire de payload synthétique aujourd'hui, même sur une question ouverte.

Conclusion BCP:

`dry_run` est read-only dans le code après lecture de la question et appel modèle. La preuve unitaire le couvre clairement: pas de création auth, pas d'upsert profile, pas de check duplicate dans `forecasts`, pas d'insert. Dans le probe live, le chemin s'arrête encore plus tôt, donc aucune écriture n'est possible.

La route utilise bien la donnée canonique de question dans le design: elle lit la question serveur et ignore le texte client. En live, cette lecture canonique échoue à cause du champ `blind_until` absent côté REST.

L'endpoint peut produire un payload synthétique en environnement de test avec question canonique mockée: `user_id` vaut `dry-run:<agent_id>` et la prediction est construite sans insert. L'endpoint ne peut pas produire ce payload sur la base live actuelle tant que la lecture `blind_until` échoue.

GO/NO-GO pour un futur insert live AI forecast: NO-GO.

Raison: le dry_run réel ne passe pas sur une question ouverte live. Avant de permettre un insert live, il faut aligner le schéma live et la route sur `blind_until`, ou ajuster la route vers le champ canonique réellement présent, puis refaire ce gate jusqu'à obtenir un dry_run 200 avec payload synthétique, sans lecture de consensus et sans écriture.