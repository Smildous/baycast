# AQ-335 product live gate recheck, 7 juin 2026, 07h UTC

Recheck fait le 2026-06-07T07:02:34Z sur `https://baycast-p.vercel.app`. Scope tenu volontairement côté public BCP. Je n'ai pas lu ni interrogé la table `forecasts`.

Côté repo, le point de départ est propre et aligné avec `origin/main`.

```text
$ git fetch origin, puis statut court et refs main
status court: aucune sortie
branche: main
HEAD: 8a36a9f104d46544fa54c941a0f6649894e355c3
origin/main: 8a36a9f104d46544fa54c941a0f6649894e355c3

$ git pull origin main en mode fast forward only, puis statut court
From https://github.com/Smildous/baycast
 * branch            main       -> FETCH_HEAD
Already up to date.
status court: aucune sortie
```

Sur `/`, la page annonce 44 questions live, présente Baycast comme des prédictions et du scoring par la réalité. Les libellés importants restent dans le cadre BCP public: `Live now: predictions from the crowd`, `Make your call first, then see what the crowd and AI predicted`, `Independent first calls`, `Scored by reality`, `Make your call before seeing the crowd`. Je n'ai pas vu de probabilité de consensus, pas de nombre exact de forecasters, pas de framing gambling. Les textes visibles parlent de gratuité, de forecast, de calibration et de score, pas de mise, cote, pari, gain financier ou paiement.

Sur `/questions`, la page affiche `Questions(44 open)`. Les cartes visibles affichent la catégorie, le temps restant et le message `Lock your call before the crowd can shape it`. La question Apple Mac Pro est en première position: `Technology`, `6d left`, `Will Apple announce a new Mac Pro at WWDC 2026?`. Là aussi, pas de consensus probability, pas d'exact forecaster count, pas d'activité d'open question publiée, pas de vocabulaire gambling.

J'ai ouvert la page détail Apple depuis `/questions`: `https://baycast-p.vercel.app/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`.

Texte de résolution visible:

```text
Resolves Yes if Apple announces a new Mac Pro model during WWDC 2026 or in an Apple Newsroom post dated from 2026-06-08 through 2026-06-12. A spec bump to Mac Studio, MacBook, iMac, or Mac mini does not count. A Mac Pro with any new Apple silicon generation counts, whether it ships immediately or later. If no new Mac Pro is announced in that window, resolves No.
```

Les surfaces BCP publiques sont correctes sur cette page. La zone `Community signal` affiche seulement des tirets et `Community signal locked`. Le bloc forecast invite à choisir sa propre probabilité avant de voir le crowd signal. La page affiche `Jun 13, 2026` avec le libellé `Closes`; le statut fourni avant run donne le close time exact `2026-06-13T00:00:00+00:00`. La question est encore ouverte, `6d left`, donc rien n'indique un settlement avant `2026-06-13T00:00:00+00:00`.

Extrait DOM utile relevé sur la page détail:

```text
Community signal
Community signal locked
Jun 13, 2026
Closes
Resolution source: Apple WWDC and Apple Newsroom: https://developer.apple.com/wwdc26/ and https://www.apple.com/newsroom/
Sign up to lock this forecast, unlock comparison after your call, and start your profile score.
```

Sur `/leaderboard`, la page reste vide tant que les questions ne sont pas résolues:

```text
Scores appear after questions resolve
Forecasts are live now, but leaderboard scores start once a question has a final outcome. Add your forecast today so it counts when resolution happens.
```

Cela confirme qu'il n'y a pas de score public prématuré ni de settlement visible avant le premier close.

Sur `/activity`, le comportement public est aussi aligné BCP:

```text
Public forecasting activity appears after questions resolve.
Activity appears after questions resolve
Open-question forecasts stay hidden until resolution so every forecaster starts blind. Check back after the first outcomes are settled.
```

Ce point est important: je n'ai pas vu d'activité d'open question publiée.

Console navigateur après les parcours: `console_messages: []`, `js_errors: []`, `total_errors: 0`.

Conclusion: gate public BCP passé pour ce recheck. Les surfaces publiques visitées ne révèlent ni consensus probability, ni exact forecaster count, ni activité sur questions ouvertes. Le wording reste prediction polling et scoring, sans gambling framing. Apple Mac Pro est visible comme question ouverte, clôture publique `Jun 13, 2026`, close time exact attendu `2026-06-13T00:00:00+00:00`, sans settlement public avant cette date.
