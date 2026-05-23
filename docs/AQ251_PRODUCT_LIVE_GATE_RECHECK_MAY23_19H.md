# AQ-251 Product live gate recheck, 23 mai 2026 19h UTC

Run lancé depuis `/root/baycast-product` après reset sur `origin/main` à `333d68f`. Heure de contrôle: `2026-05-23T19:01:58Z`. Cible live: `https://baycast-p.vercel.app`.

Je n'ai pas lu la table `forecasts`, je n'ai pas écrit dans Supabase, et je n'ai pas modifié les docs AQ247 ou AQ249. Le contrôle est limité aux surfaces publiques BCP demandées.

## Résultat court

PASS pour la gate publique BCP.

Les cinq routes demandées répondent 200: `/`, `/questions`, `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`, `/leaderboard`, `/activity`.

La page Apple Mac Pro est bien découvrable depuis `/questions` et depuis la home. Elle reste ouverte côté public, affiche `21d left`, `Jun 13, 2026` comme clôture visible, et le JSON-LD public contient `dateModified: 2026-06-13T00:00:00+00:00`. C'est aligné avec la clôture attendue `2026-06-13T00:00:00+00:00`.

## Checks route par route

### `/`

PASS.

Evidence navigateur: titre `Baycast - Predict Real Events`. La home affiche `44 Questions live now`, le bloc `Live questions`, et la carte `Will Apple announce a new Mac Pro at WWDC 2026?` avec le lien public `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`.

BCP: aucun consensus chiffré visible avant forecast. Aucun compteur exact de forecasters visible. Le texte pousse l'indépendance: `Make your call first, then see what the crowd and AI predicted`, `Lock your call before the crowd can shape it`, `Your independent forecast helps create a cleaner collective signal`.

Copy gambling/betting: pas de `betting`, `gambling`, `wager`, `odds` trouvé dans le HTML inspecté. La page utilise `Free to use`, `Free forever`, `No payment required`, `Free to play`. Ce dernier reste dans le registre jeu gratuit, pas dans le pari.

### `/questions`

PASS.

Evidence navigateur: titre `Browse Prediction Questions - Baycast`. H1 `Questions(44 open)`. Les cartes visibles affichent catégorie, temps restant, titre et `Lock your call before the crowd can shape it`. La carte Apple Mac Pro est visible avec `21d left`.

BCP: aucun consensus chiffré visible. Aucun `1 forecaster`, `2 forecasters` ou autre compteur exact trouvé dans le texte ou le HTML inspecté. Aucune copie gambling/betting détectée.

Note: le total public `44 open` reste visible. Ce n'est pas un compteur de forecasters et ne casse pas le blind consensus.

### `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`

PASS.

Evidence navigateur: titre `Will Apple announce a new Mac Pro at WWDC 2026? - Baycast`. La page affiche `Technology`, `21d left`, la question `Will Apple announce a new Mac Pro at WWDC 2026?`, les critères de résolution, `Community signal locked`, `Jun 13, 2026`, et la source `Apple WWDC and Apple Newsroom: https://developer.apple.com/wwdc26/ and https://www.apple.com/newsroom/`.

Statut et clôture: la meta description publique contient `tech · Open · Forecast before the crowd can shape your call`. Le JSON-LD public contient `dateModified: 2026-06-13T00:00:00+00:00`. La clôture visible est donc `Jun 13, 2026`, avec l'horodatage exact disponible dans le JSON-LD public.

BCP: le consensus public n'est pas exposé. La page affiche `Community signal locked` et des tirets à la place d'une valeur. Aucun compteur exact de forecasters n'a été trouvé dans la page, les metas ou le JSON-LD. Les pourcentages visibles sont ceux du slider de saisie, par exemple `50%`, `5%`, `10%`, `25%`, `75%`, `90%`, `95%`; ils ne sont pas présentés comme consensus.

Copy gambling/betting: aucun `betting`, `gambling`, `wager`, `odds` trouvé dans le HTML inspecté.

Point produit hors gate: les context links montrent aussi `NIST AI Resource Center` et `OpenAI news and research updates` sur cette question Apple. Ce n'est pas une fuite BCP, mais ce n'est pas idéal pour la qualité éditoriale de la page.

### `/leaderboard`

PASS.

Evidence navigateur: titre `Forecaster Leaderboard - Baycast`. La page affiche `Scores appear after questions resolve` et `Forecasts are live now, but leaderboard scores start once a question has a final outcome`.

BCP: aucun forecast ouvert, consensus chiffré, probabilité agrégée ou compteur exact de forecasters visible. Aucune copie gambling/betting détectée.

### `/activity`

PASS.

Evidence navigateur: titre `Recent Forecasting Activity - Baycast`. La page affiche `Public forecasting activity appears after questions resolve` et `Open-question forecasts stay hidden until resolution so every forecaster starts blind`.

BCP: l'activité ne liste plus de forecasts ouverts. Aucun détail de forecast, probabilité, nom de question ouverte avec forecast, consensus, ou compteur exact de forecasters n'est visible. Aucune copie gambling/betting détectée.

## Vérification technique rapide

Les status HTTP vérifiés par `curl`:

```text
/ 200
/questions 200
/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248 200
/leaderboard 200
/activity 200
```

Console navigateur: pas d'erreur JS relevée au dernier relevé après les navigations.

## Décision

PASS AQ-251 côté produit public.

La surface live protège le Blind Consensus Protocol pour un visiteur public: pas de consensus avant forecast, pas de counts exacts de forecasters, pas de feed d'activité avec forecasts ouverts, et pas de langage de pari détecté sur les routes demandées. Apple Mac Pro reste le premier candidat de settlement à surveiller, avec route live propre et clôture publique alignée sur `2026-06-13T00:00:00+00:00`.
