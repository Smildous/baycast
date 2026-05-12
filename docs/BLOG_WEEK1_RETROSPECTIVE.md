# One Week of Baycast: What We Learned Building a Prediction Polling Platform

**A brutally honest look at our first 7 days post-launch. The wins, the failures, and what comes next.**

*Published May 12, 2026*

---

Seven days ago, we pushed Baycast live. No launch event. No press release. No Product Hunt campaign (yet). Just a deployed Vercel app, a Supabase backend, and a lot of hope.

Here's what happened — the good, the bad, and the ugly.

## The Launch

We went live around May 5th with a simple premise: what if prediction platforms didn't need money to work? What if you could measure forecasting accuracy the way the intelligence community does — with proper scoring rules, blind submission protocols, and zero gambling?

We seeded the platform with 176+ prediction questions spanning tech, geopolitics, science, crypto, sports, and culture. Each one has a clear resolution source, a testable outcome, and a defined closing date. No vague "Will X happen someday?" questions. Every question resolves within a specific window.

The tech stack held up. Next.js on Vercel with Supabase as the backend. Authentication, question creation, forecast submission, Brier score calculation — all working from day one. We even got AI agents forecasting alongside humans, which was a stretch goal that actually shipped on time.

That's the good news. Now for the real part.

**Zero signups in the first week.**

Not "few." Zero. 176+ questions, a working product, and nobody created an account. If you want proof that building something doesn't mean people will come, here it is.

## What Surprised Us

**The product works better than expected.** This was genuinely surprising. We expected more bugs, more edge cases, more fires. Instead, the core loop — browse questions, make a forecast, see the reveal, get scored — just worked. The Blind Consensus Protocol, our mechanism where forecasts stay hidden until you commit your answer, functioned exactly as designed. No herding. No anchoring to the crowd. Clean, independent predictions.

**The conversion funnel is where we failed.** We ran a full audit on day 6 and the results were sobering. Our conversion score came in at 3.5 out of 10. The questions page showed "Be the first to forecast" on 9 out of 10 cards — the social proof equivalent of a ghost town. The question detail page was a dead end for signed-out users. The leaderboard displayed a lonely "waiting for its champion" message. The landing page showed "2 Forecasters joined" — a number so low it actively discouraged signups.

Every single one of these was fixable. That was the painful part. We had built the engine but forgot to build the on-ramp.

**The content was stronger than the distribution.** Our launch blog post — about why prediction markets are fundamentally broken by herding effects and financial incentives — was honestly good. The comparison page against Polymarket, Metaculus, and Manifold was solid. The "How It Works" page scored 7/10 in our own audit. But good content sitting on an undiscovered website is like writing a great book and leaving it in your desk drawer.

**AI forecasting is a genuine differentiator.** Having AI agents (GPT-4, Claude) predict alongside humans on equal footing isn't a gimmick. It's a real research tool. The Good Judgment Project proved that structured forecasting with proper scoring outperforms unaided judgment. Adding AI agents to that mix creates something genuinely new: a benchmark where humans can measure themselves against machine intelligence on exactly the same problems.

## Technical Wins

Despite the signup numbers, there were real technical achievements worth celebrating:

**The Blind Consensus Protocol shipped and works.** This is the core of what makes Baycast different. When you forecast on Baycast, you don't see what anyone else predicted. You commit your probability estimate blind, and only then does the crowd aggregate get revealed. You can revise with full context, but your blind answer is preserved and scored independently. This is the Delphi method, updated for the web, and it eliminates the herding problem that plagues every other platform in the space.

**Brier scoring is implemented end-to-end.** Not a simplified version. Full Brier score decomposition with calibration, discrimination, and uncertainty components. When a question resolves, every forecaster gets scored properly. Your track record reflects your actual judgment — not your bankroll, not your willingness to gamble.

**176+ questions across 8 batches.** Every question follows a strict quality checklist: testable resolution criteria, clear language, defined closing dates, and resolution sources. We've covered everything from "Will GPT-5 be released before end of 2026?" to "Will Bitcoin exceed $200,000 before 2027?" to "Will a new COVID variant trigger a WHO PHEIC in 2026?"

**AI vs. Human forecasting works.** AI agents submit forecasts through the same interface as human users. Same questions. Same scoring. Same leaderboard. This isn't a bolted-on feature — it's architecturally integrated.

**The stack scaled fine.** Next.js on Vercel with Supabase handled everything we threw at it with zero downtime. Authentication, real-time updates, question management — all smooth. For a solo-builder operation, this stack is hard to beat.

## The Road Ahead

Week 2 starts now, and we're making three major changes:

**1. Fix the conversion funnel.** The audit gave us a clear roadmap. Inline CTAs on question detail pages. Hide low social proof numbers. Add a "try before you sign up" forecasting demo. Make the leaderboard show something — anything — other than an empty state. These are not architecture changes. They're UX changes that should have been day-one priorities.

**2. Go where the people are.** Reddit posts in r/Superforecasters and r/predictionmarkets. Twitter threads. Community engagement. The "build it and they will come" strategy doesn't work. We know that now. Distribution is the product.

**3. Ship more questions, faster.** 176+ is a start, but the best platforms have thousands. We're batching new questions every day — fresh topics tied to current events, tighter resolution windows, more categories. The goal is for every visitor to find at least one question they genuinely care about predicting.

We're also thinking hard about what "success" looks like for week 2. It's not virality. It's not a Product Hunt launch. It's getting the first 10 real users who make forecasts, come back, and tell us what's broken. Ten engaged users are worth more than a thousand drive-by visitors.

---

Baycast is built on a conviction: that prediction markets got the problem right (the world needs better forecasting) but the solution wrong (money corrupts the signal). The Blind Consensus Protocol and proper Brier scoring produce cleaner data than any financial market. The science supports this. The Good Judgment Project proved it.

Now we just need to prove it works on the web, with real people, one week at a time.

**If you're reading this and you've ever wanted to test your judgment against the future — come make your first prediction.** It takes 30 seconds to sign up, and every forecast you make builds your track record.

The leaderboard is waiting for its first champion. That could be you.

👉 **[Start forecasting at baycast-p.vercel.app](https://baycast-p.vercel.app)**

---

*Follow the journey on Twitter: [@baycast_](https://twitter.com/baycast_)*
