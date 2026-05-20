# AQ-232 live E2E smoke, Product / Questions

Prepared May 20, 2026, 19:04 UTC.

Target: https://baycast-p.vercel.app

Scope was the live public app in a browser session. I checked the visible body and the browser DOM for page title, meta description, OG tags, Twitter tags, and JSON-LD where present. I did not touch app code.

## Result

Pass.

The homepage, questions listing, one question detail, forecast gate, and leaderboard pending state all loaded. I did not find a concrete BCP leak or broken flow that needed a code fix.

## Routes tested

### `/`

URL tested: `https://baycast-p.vercel.app/`

Pass.

Visible evidence:

- Main heading: `How well can you predict the future?`
- Live count card: `44 Questions live now`
- CTA copy: `Start forecasting`, `Browse Questions →`
- Live question cards showed category, days left, question title, and `Lock your call before the crowd can shape it`
- First-run onboarding appeared and used safe BCP framing: `Blind Forecasts`, `Your prediction is hidden until Phase B, so the crowd cannot anchor you.`

DOM evidence:

- `document.title`: `Baycast - Predict Real Events`
- Meta description: `Make predictions on real events and see independent judgments become collective intelligence. Baycast uses wisdom of the crowds to compare humans, AI models, and experts. Free to use.`
- OG tags present for title, description, url, site name, locale, image, image size, image alt, and type `website`
- Twitter tags present for card, title, description, and image
- JSON-LD present, 2 blocks: `WebSite` and `Organization`

BCP check:

- No visible consensus value, aggregate probability, exact forecaster count, user count, vote count, or participation metadata appeared on the question cards.
- The words `probability`, `consensus`, and `forecaster` appeared only in explanatory product copy, not as live crowd data.

Screenshot evidence: `/root/.hermes/cache/screenshots/browser_screenshot_46f93ae1f83e4e5ab4786384ca9ac5a1.png`

### `/questions`

URL tested: `https://baycast-p.vercel.app/questions`

Pass.

Visible evidence:

- Main heading: `Questions(44 open)`
- Subtitle: `Every forecast you add sharpens the collective estimate.`
- Search field: `Search questions...`
- Filters: `All`, `Politics`, `Technology`, `Economy`, `Science`, `Sports`, `Other`, `Open`, `Closed`, `Resolved`, `Closing Soon`, `Newest`, `Most Active`
- Pagination visible: pages 1 through 5
- Question cards showed category, days left, title, and `Lock your call before the crowd can shape it`

DOM evidence:

- `document.title`: `Browse Prediction Questions — Baycast`
- Meta description: `Browse open forecasting questions. Submit your probability estimates and get scored on accuracy.`
- OG tags present for title, description, url, site name, locale, image, image size, image alt, and type `website`
- Twitter tags present for card, title, description, and image
- JSON-LD count: 0

BCP check:

- DOM scan found no `consensus`, `aggregate`, `community signal`, `forecaster`, `participant`, `vote`, or exact count leak terms in body text.
- The `Most Active` sort label is visible, but cards do not expose activity counts or participation metadata.

Screenshot evidence: `/root/.hermes/cache/screenshots/browser_screenshot_39686d420ea1450b857c13b307195928.png`

### `/questions/4db2190d-8bf0-44e7-87ae-9e9b7e26a557`

URL tested: `https://baycast-p.vercel.app/questions/4db2190d-8bf0-44e7-87ae-9e9b7e26a557`

Question tested: `Will Apple announce a foldable iPhone before September 30, 2026?`

Pass.

Visible evidence:

- Category and deadline chip: `Technology`, `134d left`
- Detail criteria rendered clearly.
- Context links rendered: `NIST AI Resource Center`, `OpenAI news and research updates`, `Apple Newsroom`
- Forecast gate copy: `Lock your forecast before the crowd can shape it`
- Gate support copy: `Sign up to save your probability, unlock the comparison after your call, and start building a streak and profile score.`
- Community panel showed locked state only: `—`, `Community signal`, `—`, `Community signal locked`
- Forecast control rendered with slider default at `50%` and quick buttons `5%`, `10%`, `25%`, `50%`, `75%`, `90%`, `95%`
- Auth gate copy: `Sign up to lock this forecast, unlock comparison after your call, and start your profile score.`
- CTAs: `Sign up to forecast`, `Log in`

DOM evidence:

- `document.title`: `Will Apple announce a foldable iPhone before September 30, 2026? - Baycast`
- Meta description begins: `tech · Open · Forecast before the crowd can shape your call.` and then includes the resolution criteria.
- OG tags present for title, description, url, site name, image, image size, image alt, and type `article`
- Twitter tags present for card, title, description, and image
- JSON-LD present, 1 block: schema.org `Question` with `acceptedAnswer.text` set to `Forecast before the crowd can shape your call.`

BCP check:

- Community signal displayed as locked dashes only. No aggregate probability, distribution, exact forecaster count, user count, vote count, or participation metadata appeared before a forecast.
- The word `probability` appeared in the forecast input and sign-up copy because the user is choosing their own probability. It was not a crowd probability.

Screenshot evidence: `/root/.hermes/cache/screenshots/browser_screenshot_d67b754cda354850b7b24169da3685b1.png`

### `/leaderboard`

URL tested: `https://baycast-p.vercel.app/leaderboard`

Pass.

Visible evidence:

- Main heading: `Leaderboard`
- Calibration copy: `Ranked by calibration. A Brier score near 0 means your predictions matched what actually happened.`
- Time filters: `All time`, `This month`, `This week`
- Pending state heading: `Scores appear after questions resolve`
- Pending state copy: `Forecasts are live now, but leaderboard scores start once a question has a final outcome. Add your forecast today so it counts when resolution happens.`
- CTA: `Sign Up to Forecast`

DOM evidence:

- `document.title`: `Forecaster Leaderboard — Baycast`
- Meta description: `Top forecasters ranked by Brier score. See who has the most accurate predictions on Baycast.`
- OG tags present for title, description, url, site name, locale, image, image size, image alt, and type `website`
- Twitter tags present for card, title, description, and image
- JSON-LD count: 0

BCP check:

- DOM scan found no `consensus`, `aggregate`, `community signal`, `probability`, `forecaster`, `participant`, `vote`, or exact count leak terms in body text.
- Pending state is correct for no resolved scores.

Screenshot evidence: `/root/.hermes/cache/screenshots/browser_screenshot_6793b2764a3d461b859567dd800f2b24.png`

## Bugs

No AQ-232 blocker found.

One minor content note, not treated as a bug in this run: the tested Apple foldable iPhone detail page includes generic context links for NIST and OpenAI alongside Apple Newsroom. They are not a BCP leak and do not break the forecast flow, but they are less relevant than the named resolution source.

## Final check

No app code was modified for this smoke test. The required deliverable is this doc only.
