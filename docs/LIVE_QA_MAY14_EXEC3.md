# Live QA May 14 Exec 3

Run: 2026-05-14 15:12 UTC  
Target: https://baycast-p.vercel.app  
Scope: homepage, questions list, filtered questions, signup, login, compare, one live question detail for blind consensus behavior. Screenshots not taken.

## Verdict rapide

La prod est navigable et le nouveau positionnement homepage tient debout. Le message est clair: Baycast vend un forecast indépendant avant consensus, gratuit, scoré par la réalité, avec comparaison humain et IA. Ça se répète assez pour être compris sans devenir contradictoire.

Le consensus BCP reste bien masqué dans l'UI avant forecast sur la question Bitcoin testée. Je n'ai pas vu de pourcentage consensus dans les cartes, le détail, les meta OG/Twitter ou le payload Next côté page. Il reste tout de même une fuite de niveau activité: les meta affichent `1 forecaster`, donc le volume de participation reste public.

AQ-210 est visible live. Sur `Technology + closing-soon`, le header annonce `Questions(2 open)` alors que l'état vide affiche `No match`. Ce n'est donc pas encore déployé ou pas corrigé sur ce cas.

## Table pass/fail

| Zone | URL exacte | Résultat | Notes |
|---|---|---:|---|
| Homepage | https://baycast-p.vercel.app/ | PASS | Hero cohérent: `How well can you predict the future?`, promesse indépendante puis crowd/AI après forecast, CTA signup et questions visibles. Les cartes live ne montrent pas de BCP. |
| Questions | https://baycast-p.vercel.app/questions | PASS | 10 questions ouvertes chargent, filtres et tri visibles, cartes sans consensus numérique avant forecast. Header `Questions(10 open)` cohérent avec la liste. |
| Questions filtrées | https://baycast-p.vercel.app/questions?category=Technology&sort=closing-soon | FAIL | AQ-210 visible: header `Questions(2 open)` mais contenu vide `No match`. Le compteur donne l'impression que deux questions devraient être affichées. |
| Signup | https://baycast-p.vercel.app/auth/signup | PASS | Formulaire email/password et Google présents. Le texte explique bien pourquoi s'inscrire. Les questions ouvertes sont listées sans consensus. |
| Login | https://baycast-p.vercel.app/auth/login | PASS | Page simple, lien signup présent, promesse `See blind consensus and compare after you forecast` alignée avec le produit. |
| Compare | https://baycast-p.vercel.app/compare | PASS | Positionnement clair contre marchés de prédiction: pas d'argent, forecast caché d'abord, scoring. Le ton `crypto gambling` pour Polymarket est agressif mais compréhensible. |
| Détail question BCP | https://baycast-p.vercel.app/questions/f106f845-82ad-4137-aa11-09b497e92848 | PASS avec réserve | UI: `Sign in to forecast and see the community consensus`, `— Consensus —`, pas de pourcentage consensus. Meta: `1 forecaster` visible dans description/OG/Twitter. Pas de clé évidente `consensusAverage`, `aggregateProbability` ou `bcp` dans le payload page. |

## Vérifications ciblées

Homepage positioning: cohérent. Le triptyque `forecast indépendant`, `crowd signal`, `scored by reality` est lisible sur le hero, le how-it-works, les cartes de valeur et le CTA final. Le message `No sign-up card` est étrange à côté de `30-second sign-up`: je comprends l'intention low-friction, mais le libellé peut être perçu comme une typo ou une promesse contradictoire avec le CTA signup.

BCP consensus hidden before forecasting: OK côté UI sur les pages testées. Les cartes disent `Be the first to forecast` ou `Join the forecast`, pas de pourcentage. Le détail Bitcoin masque la valeur avec `— Consensus —`. Les meta OG/Twitter ne révèlent pas de probabilité, mais elles révèlent le nombre de forecasters.

AQ-210: toujours visible live sur l'URL filtrée Technology + closing-soon. Le compteur du header semble compter les questions Technology ouvertes, pas le résultat réellement affiché après tri/filtre, ou alors la liste se vide à tort.

## 3 actions produit prioritaires

1. Corriger AQ-210 en prod sur les états vides filtrés. Si la liste est vide, le header ne doit pas annoncer `2 open` sans afficher les deux questions. Option simple: `Questions(0 shown)` ou un empty state qui dit clairement `2 open questions exist, none match this sort/filter` si c'est vraiment le comportement voulu.

2. Durcir le blind consensus au-delà du pourcentage. Garder le consensus numérique masqué, mais décider si `1 forecaster` doit rester public avant forecast. Si l'objectif est de réduire l'ancrage, le volume de participation peut aussi influencer l'utilisateur, surtout avec une seule prédiction.

3. Nettoyer la microcopy homepage autour de la friction signup. Remplacer `No sign-up card` par un bénéfice clair, par exemple `No payment required` ou `Free account`, pour éviter la contradiction avec `Start forecasting` et `30-second sign-up`.
