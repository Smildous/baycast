# AQ-269 Apple Mac Pro context cleanup, 26 mai 2026 19h

J'ai nettoye la logique des liens de contexte pour la question `Will Apple announce a new Mac Pro at WWDC 2026?`.

Fichiers changes:

- `lib/news-context.ts`
- `__tests__/news-context.test.ts`

Source gardees pour Apple Mac Pro:

- Apple WWDC, `https://developer.apple.com/wwdc26/`
- Apple Newsroom, `https://www.apple.com/newsroom/`

Les liens NIST et OpenAI ne sont plus selectionnes pour cette question. Le contexte reste statique et ne contient pas de consensus, count de forecasters, odds, sentiment de marche, activite ouverte ou metadata de forecast.

Validation lancee:

- `git diff --check`, passe
- `npm test`, passe avec 11 fichiers et 108 tests
- `npm run build`, passe
- `npm run verify:public-bcp`, passe sur `/`, `/questions`, `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`, `/leaderboard` et `/activity`
