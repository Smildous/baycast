# AQ-345 product live gate recheck, 2026-06-08 19h UTC

Recheck fait sur Baycast production QA: https://baycast-p.vercel.app. Je n'ai pas lu Supabase `forecasts`, je n'ai pas inspecté de lignes de forecast et je n'ai rien réglé.

Pages vérifiées: `/`, `/questions`, `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248` pour Apple Mac Pro, `/leaderboard`, `/activity`.

Sur `/`, la page d'accueil affiche "Live now: predictions from the crowd", "How well can you predict the future?", "44 Questions live now", "100% Free to play" et les cartes de questions disent "Lock your call before the crowd can shape it". Je n'ai pas vu de probabilité de consensus, pas de nombre exact de forecasters, pas d'activité sur question ouverte et pas de vocabulaire de pari.

Sur `/questions`, la liste affiche "Questions(44 open)" et l'entrée Apple dit "Technology 5d left Will Apple announce a new Mac Pro at WWDC 2026? Lock your call before the crowd can shape it". La question Apple est donc encore présentée comme ouverte dans la liste publique.

Sur la route détail Apple Mac Pro, la page affiche "Will Apple announce a new Mac Pro at WWDC 2026?" avec la règle de résolution: "Resolves Yes if Apple announces a new Mac Pro model during WWDC 2026 or in an Apple Newsroom post dated from 2026-06-08 through 2026-06-12." Elle affiche aussi "Lock your forecast before the crowd can shape it", "Community signal locked", "Jun 13, 2026", "Closes", "Add your forecast" et "Sign up to lock this forecast, unlock comparison after your call, and start your profile score." Cela confirme que le signal public reste verrouillé, que la question est encore ouverte, et qu'il n'y a pas de règlement avant 2026-06-13T00:00:00+00:00.

Sur `/leaderboard`, la page affiche "Scores appear after questions resolve" et "Forecasts are live now, but leaderboard scores start once a question has a final outcome. Add your forecast today so it counts when resolution happens." Je n'ai pas vu de scores exploitables sur questions ouvertes ni de fuite de consensus.

Sur `/activity`, la page affiche "Public forecasting activity appears after questions resolve" et "Open-question forecasts stay hidden until resolution so every forecaster starts blind. Check back after the first outcomes are settled." C'est le bon comportement BCP public: pas d'activité de forecast ouverte exposée.

Verdict pour settlement maintenant: NO-GO. Apple Mac Pro doit rester ouvert jusqu'à la clôture indiquée au 13 juin 2026, sans règlement avant 2026-06-13T00:00:00+00:00.

Verdict BCP public: GO. Les surfaces publiques gardent le consensus verrouillé, ne montrent pas de probabilité de consensus, ne montrent pas de nombre exact de forecasters, ne publient pas d'activité de questions ouvertes et ne cadrent pas le produit comme du gambling.
