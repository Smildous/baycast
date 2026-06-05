# AQ-325 product live gate recheck, 2026-06-05 13h UTC

Verdict: pass.

Recheck fait sur `baycast-p.vercel.app` à `2026-06-05T13:03:05Z`. Je n'ai pas lu la table `forecasts`, je n'ai appelé aucune API de forecast, et je n'ai pas ouvert de surface privée. Les constats ci-dessous viennent des pages publiques rendues dans le navigateur.

Pages vérifiées:

- `https://baycast-p.vercel.app/`
- `https://baycast-p.vercel.app/questions`
- `https://baycast-p.vercel.app/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`
- `https://baycast-p.vercel.app/leaderboard`
- `https://baycast-p.vercel.app/activity`

La protection BCP tient sur les surfaces publiques vérifiées. La home montre 44 questions live, met en avant le principe d'appel indépendant, et les cartes visibles disent `Lock your call before the crowd can shape it`. Je n'ai vu ni probabilité de consensus, ni nombre exact de forecasters, ni détail d'activité sur question ouverte. La page questions affiche `Questions(44 open)`, trie par `Closing Soon`, et la première carte est bien `Will Apple announce a new Mac Pro at WWDC 2026?` avec `8d left`. Là aussi, pas de consensus, pas de compte exact, pas de flux d'activité ouvert.

La page détail Apple Mac Pro reste ouverte. Elle affiche:

- `Technology`
- `8d left`
- `Will Apple announce a new Mac Pro at WWDC 2026?`
- `Lock your forecast before the crowd can shape it`
- `Community signal locked`
- `Jun 13, 2026` comme date de clôture
- un formulaire public `Add your forecast` avec inscription ou login requis pour sauvegarder

Je n'ai vu aucun bouton ou état de settlement sur cette page. Au moment du contrôle, `2026-06-05T13:03:05Z` est avant `2026-06-13T00:00:00+00:00`, donc la candidate de premier settlement n'est pas settleable maintenant. La résolution visible dit que le Yes dépend d'une annonce Apple pendant WWDC 2026 ou d'un post Apple Newsroom daté du 2026-06-08 au 2026-06-12. Les seuls liens de contexte visibles sont:

- Apple WWDC, `https://developer.apple.com/wwdc26/`
- Apple Newsroom, `https://www.apple.com/newsroom/`

La page leaderboard affiche `Scores appear after questions resolve`. Elle ne montre pas de classement exploitable avant résolution, pas de comptes exacts liés aux questions ouvertes, et pas de probabilité de consensus.

La page activity affiche `Public forecasting activity appears after questions resolve` et précise: `Open-question forecasts stay hidden until resolution so every forecaster starts blind. Check back after the first outcomes are settled.` C'est le point le plus direct pour BCP: aucune activité de question ouverte n'est exposée.

Côté framing, les surfaces restent sur prediction polling, forecast, score, Brier score, crowd signal et collective intelligence. Je n'ai pas vu de vocabulaire de pari comme bet, wager, odds, stake, cashout, payout, bookmaker, casino ou gambling. La home dit `Free to play`, mais sans argent, mise, cote ou gain. Le framing public reste donc prediction polling, pas gambling.
