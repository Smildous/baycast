# AQ-462, outbound gate 13h UTC, Jun 23

Verdict: NO SEND

Run checked at 2026-06-23 13:02 UTC from `/root/baycast-marketing` after a fast-forward pull on `main`.

Distribution is ready enough for copy review, but outbound is still blocked. Email is usable through Himalaya. X is not authenticated. The private warm list has 2 rows and 0 complete sendable rows. That matches the pre-run state, so nothing gets sent.

## Distribution checks

`npm run verify:distribution-gate` passed.

Checked public pages:

- settlement page for Apple Mac Pro at WWDC 2026
- resolved questions page
- home page

`npm run verify:public-bcp` passed.

Checked public BCP surfaces:

- home
- questions
- open question detail
- leaderboard
- activity

No public BCP leak was flagged by the verifier.

## Channel checks

Himalaya account check passed locally. The account list command exited cleanly.

X CLI exists locally, but the safe authenticated read check failed because the required X environment variables are missing. No tweet, reply, like, retweet, bookmark, DM, or public action was attempted.

Private outreach files under `/root/baycast-private/outreach` were counted without printing target details. One non-example target file was found, with 2 rows and 0 complete sendable rows.

## Why this is blocked

A safe send needs two things at the same time: an authenticated channel and a complete warm target row. Email has a usable channel, but the warm list has no complete sendable row. X does not have auth. Sending now would mean guessing the recipient or the channel, so the gate stays closed.

## Ready copy, not sent

These snippets are ready to use once there is a complete approved target row and an authenticated channel. They were not sent.

### Email

Subject: Baycast first resolved market

Hi {{name}},

Quick note because you follow prediction markets and product launches.

Baycast has its first resolved question: Apple did not announce a Mac Pro at WWDC 2026. The public settlement page is live here:

https://baycast-p.vercel.app/settlements/apple-mac-pro-wwdc-2026

What I think is worth a look is not just the result. It is the way the blind phase keeps the crowd signal hidden until resolution, then makes the settlement easy to check.

If this is useful, I would value a blunt read: does the settlement page make the product feel credible enough to try?

{{sender}}

### X short post

Baycast has its first resolved question.

Apple did not announce a Mac Pro at WWDC 2026, so the market resolved No.

The interesting part is the blind phase: forecasts stay hidden until resolution, then the public settlement gives the evidence trail.

https://baycast-p.vercel.app/settlements/apple-mac-pro-wwdc-2026

### X reply or DM

Thought this might fit your prediction-market radar. Baycast just published its first resolved question, with the settlement evidence in public and the crowd signal kept blind until resolution:

https://baycast-p.vercel.app/settlements/apple-mac-pro-wwdc-2026

Would be glad for a sharp read on whether the settlement page earns trust.

## Decision

NO SEND until at least one private warm target row is complete and approved for a specific usable channel. If using X, authenticate X first. If using email, complete the target row before sending.
