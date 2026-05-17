# AQ-222 production propagation QA, May 17 19h

Run time: 2026-05-17 19:03 UTC
Target: https://baycast-p.vercel.app
Scope: verify that the AQ-221 pre-forecast consensus-copy fix is live in production. The check was done signed out, from the public UI.

## Result

Pass. The production site shows the AQ-221 fix on the public pre-forecast question surfaces I checked. The questions list and the question detail page now use lock-first copy instead of pre-forecast consensus copy. The detail page does not expose aggregate probability, exact forecaster count, or consensus wording before a visitor makes a forecast.

One note: the public activity feed still shows individual historical forecasts. I did not treat that as an AQ-222 blocker because it is a history/activity surface, not the pre-forecast detail surface. I could not reach a public profile page from the UI during this pass.

## URLs checked

| URL | What I checked | Result |
| --- | --- | --- |
| https://baycast-p.vercel.app/questions | List cards, page title, meta description, OG and Twitter tags | Pass |
| https://baycast-p.vercel.app/questions/4db2190d-8bf0-44e7-87ae-9e9b7e26a557 | Question detail before forecasting, title, meta description, OG and Twitter tags, JSON-LD | Pass |
| https://baycast-p.vercel.app/activity | Public history reachable from nav | Pass with note |
| https://baycast-p.vercel.app/leaderboard | Public profile discovery from UI | Pass |

## Evidence

### Questions list

URL: https://baycast-p.vercel.app/questions

Visible title in browser: `Browse Prediction Questions — Baycast`

Public cards showed lock-first copy, for example:

`Will Apple announce a foldable iPhone before September 30, 2026? Lock your call before the crowd can shape it`

No aggregate probability, exact forecaster count, or consensus phrase was visible on the list cards checked.

Metadata captured from the page:

| Field | Value |
| --- | --- |
| document.title | `Browse Prediction Questions — Baycast` |
| meta description | `Browse open forecasting questions. Submit your probability estimates and get scored on accuracy.` |
| og:title | `Browse Prediction Questions — Baycast` |
| og:description | `Browse open forecasting questions. Submit your probability estimates and get scored on accuracy.` |
| og:url | `https://baycast-p.vercel.app/questions` |
| og:image | `https://baycast-p.vercel.app/opengraph-image` |
| twitter:card | `summary_large_image` |
| twitter:title | `Browse Prediction Questions — Baycast` |
| twitter:description | `Browse open forecasting questions. Submit your probability estimates and get scored on accuracy.` |
| twitter:image | `https://baycast-p.vercel.app/opengraph-image` |
| JSON-LD | none found |

### Detail page before forecasting

URL: https://baycast-p.vercel.app/questions/4db2190d-8bf0-44e7-87ae-9e9b7e26a557

Question: `Will Apple announce a foldable iPhone before September 30, 2026?`

Visible pre-forecast copy included:

`Lock your forecast before the crowd can shape it`

`Community signal locked`

`Try it. Set your probability before the crowd can shape your call:`

`Sign up to lock this forecast, unlock comparison after your call, and start your profile score.`

I saw the forecast input controls and preset buttons from 5 percent to 95 percent. Those are user input options, not community values. I did not see public consensus copy, aggregate probability, or exact forecaster count before forecasting.

Metadata captured from the page:

| Field | Value |
| --- | --- |
| document.title | `Will Apple announce a foldable iPhone before September 30, 2026? - Baycast` |
| meta description | `tech · Open · Forecast before the crowd can shape your call. Resolves Yes if Apple publicly announces an iPhone model with a foldable display before 2026-10-01 00:00 UTC. The announcement must come from Apple, not a leak or analyst note. A foldable iPad, Mac, prototype, patent filing, or developer-only concept does not count. If Apple announces the product but says it ships later, it still counts. Otherwise resolves No.` |
| og:title | `Will Apple announce a foldable iPhone before September 30, 2026? - Baycast` |
| og:description | same as meta description |
| twitter:title | `Will Apple announce a foldable iPhone before September 30, 2026? - Baycast` |
| twitter:description | same as meta description |

JSON-LD found on the detail page:

```json
{
  "@context": "https://schema.org",
  "@type": "Question",
  "acceptedAnswer": {
    "@type": "Answer",
    "text": "Forecast before the crowd can shape your call."
  },
  "dateCreated": "2026-05-15T00:00:00+00:00",
  "dateModified": "2026-09-30T23:59:59+00:00",
  "name": "Will Apple announce a foldable iPhone before September 30, 2026?",
  "text": "Resolves Yes if Apple publicly announces an iPhone model with a foldable display before 2026-10-01 00:00 UTC. The announcement must come from Apple, not a leak or analyst note. A foldable iPad, Mac, prototype, patent filing, or developer-only concept does not count. If Apple announces the product but says it ships later, it still counts. Otherwise resolves No."
}
```

This JSON-LD is safe for the BCP guardrail. It does not reveal aggregate probability, exact forecaster count, or consensus copy.

### Public activity and profile/history reachability

URL: https://baycast-p.vercel.app/activity

The Activity nav link was reachable. It shows individual historical forecast entries, for example `Simba forecasted 4% on Will Bitcoin exceed $200,000 before 2027?` and AI baseline/scout entries. These rows link to question detail pages, not public profile pages. I did not find a reachable public profile/history route from the visible UI.

URL: https://baycast-p.vercel.app/leaderboard

The leaderboard was reachable from nav. It showed `Scores appear after questions resolve` and did not expose profile links in this pass.

## Pass/fail table

| Check | Result | Evidence |
| --- | --- | --- |
| /questions list does not reveal pre-forecast consensus | Pass | Cards use `Lock your call before the crowd can shape it` |
| Detail page before forecasting does not reveal aggregate probability | Pass | `Community signal locked`, no community percent shown |
| Detail page before forecasting does not reveal exact forecaster count | Pass | No count visible near the community signal or CTA |
| Detail page before forecasting does not show consensus copy | Pass | Copy says `Forecast before the crowd can shape your call` |
| Page title checked | Pass | Titles recorded for list and detail |
| Meta description checked | Pass | Safe descriptions recorded for list and detail |
| OG meta tags checked | Pass | Safe title and description recorded |
| Twitter meta tags checked | Pass | Safe title and description recorded |
| JSON-LD scripts checked | Pass | Detail JSON-LD uses safe acceptedAnswer text |
| Public profile/history checked if reachable | Pass with note | Activity is reachable and shows history rows. Public profile links were not found from UI |

## Bugs

No AQ-222 blocker found.

Non-blocking note: `/activity` is public and shows individual historical forecast percentages. If the product intent is to hide all forecast history until after a visitor forecasts on the same question, that would need a separate product decision. It does not appear to be the AQ-221 pre-forecast consensus-copy issue.
