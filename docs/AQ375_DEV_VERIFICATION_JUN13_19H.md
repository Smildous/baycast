# AQ-375 vérification technique, 13 juin 19h

La vérification a été faite sur `main` après fast-forward de `/root/baycast-dev` vers `origin/main` au commit `a233f3ea309f42ed75f9147b5c4cf166f899a04e`.

Le point à vérifier après AQ-374 était simple: la page publique d'une question résolue ne doit plus afficher le payload brut de résolution. Dans `app/questions/[id]/page.tsx`, le rendu résolu utilise `formatResolutionOutcome(q.resolution)` pour produire uniquement `Yes`, `No` ou `Unknown`. Le bloc visible affiche cette valeur formatée dans `Outcome`, puis la date et la source éventuelle. Il n'y a pas de rendu direct de `q.resolution`, pas de `JSON.stringify`, et le JSON-LD reprend aussi le libellé formaté via `Resolved: ${resolutionOutcome}`.

J'ai aussi relu `lib/resolution.ts`. Le helper accepte les formes courantes du payload, dont `outcome`, `result`, `answer`, `resolved_to` et les booléens ou valeurs 0/1. S'il ne trouve pas d'issue binaire, il renvoie `Unknown` au lieu d'exposer le contenu brut. Le test `__tests__/resolution.test.ts` couvre les formes attendues et le fallback propre.

Résultat des gates lancés depuis le dépôt:

```text
git diff --check: pass
npm test: pass, 12 fichiers, 110 tests
npm run verify:public-bcp: pass sur /, /questions, une page question publique, /leaderboard et /activity
rm -rf .next && npm run build: pass, Next.js 14.2.16 compile et génère les routes
```

Aucun bug n'est apparu pendant la vérification. Je n'ai pas touché aux données Supabase, je n'ai pas lu de forecasts de questions ouvertes, et la seule modification prévue pour AQ-375 est ce document.
