# Why I Built a Prediction Platform That Isn't a Betting Market

**The personal story behind Baycast — and why I think forecasting belongs to everyone, not just gamblers.**

*Published May 12, 2026*

---

I need to be honest about something: eight days ago, I launched a product and nobody signed up.

Zero users. One hundred and seventy-six questions live on the platform. A working app. Proper scoring. A protocol I genuinely believe is better than anything else out there. And exactly zero people created an account.

Most founders would spin that. "Early days." "Focusing on product." "Organic growth takes time." And sure, all of that is true. But I don't want to spin it. I want to tell you why I built this thing in the first place — because the reason matters more than the numbers right now.

## Where This Started

A year ago, I fell down a rabbit hole that changed how I think about the future. It started with Philip Tetlock's *Superforecasting* — the book about the Good Judgment Project, a US government-funded experiment that pitted regular people against intelligence analysts at predicting world events.

The findings were extraordinary. A carefully recruited team of volunteers — not spies, not economists, not policy wonks — outperformed intelligence analysts with classified briefings by 30%. They outperformed prediction markets by even more. And they did it without money, without inside information, without anything except a structured process: make a prediction, get scored, get feedback, repeat.

The secret wasn't genius. It was process. These "superforecasters" weren't smarter than everyone else. They were better calibrated. They updated incrementally instead of in big swings. They tracked their accuracy honestly. They treated probabilistic thinking as a skill to be trained, not an opinion to be shouted.

I read that book and thought: *everyone should be able to do this.*

## The Problem With What Exists

Then I looked at the tools available for people who want to forecast, and I got depressed.

On one end, you have prediction markets. Polymarket. Kalshi. They've raised hundreds of millions. Polymarket alone did $3.5 billion in volume in 2024. They're covered by CNN and Bloomberg and cited by congressional committees. And fundamentally, they're gambling platforms.

I don't say that as a judgment. If you want to bet on elections with crypto, that's your business. But the financial incentive changes everything about the data these platforms produce.

When money is on the line, you attract whales — a small number of people with large bankrolls who move markets for reasons that have nothing to do with forecasting accuracy. You attract arbitrageurs who are optimizing for expected monetary return, not expected predictive accuracy. You attract insider trading — Polymarket is currently investigating multiple cases. You attract a regulatory spotlight that makes the entire ecosystem fragile.

And crucially, you exclude the vast majority of people who have genuine domain expertise but zero interest in gambling.

On the other end, you have academic platforms like Metaculus. I have enormous respect for what they've built. But the UX is... academic. The community is small and insular. And they still show you the community median before you predict, which — as Tetlock's own research demonstrates — introduces anchoring bias that undermines the independence that makes collective intelligence work.

There was nothing in the middle. Nothing that took the rigor of the Good Judgment Project and made it accessible, modern, and — critically — free of the distortions introduced by money and social influence.

So I built it.

## What Baycast Actually Is

Baycast is a prediction polling platform. You read a question about a future event — "Will GPT-5 be released before July 2026?", "Will Bitcoin exceed $150,000 before 2027?", "Will a new COVID variant trigger a WHO emergency in 2026?" — and you give a probability estimate.

No money. No crypto wallet. No trading interface. Just your judgment, expressed as a number, scored against reality when the event resolves or doesn't.

But the part I'm most proud of isn't the questions or the scoring. It's the protocol.

It's called the Blind Consensus Protocol, and here's why it matters: when you make a prediction on Baycast, you don't see what anyone else has predicted. You commit your estimate blind. Only after you've locked in your answer does the crowd aggregate get revealed. Then — and only then — you can revise with full context.

Both answers are scored independently.

This is the Delphi method updated for the web. The RAND Corporation figured this out in the 1950s: the best forecasts come from independent judgment followed by structured revision. The Good Judgment Project validated it with a decade of government-funded research. And yet every major prediction platform in 2026 still shows you the answer before you give yours.

Why? Because showing the market price is engaging. It creates a sense of liquidity and activity. It's a design choice driven by engagement metrics, not forecasting accuracy.

Baycast makes the opposite choice. We sacrifice a bit of immediate gratification — the dopamine of seeing how you compare before you commit — in exchange for dramatically cleaner signal. Your first prediction is pure you. Your revised prediction shows how well you update. Two separate skills, both measurable, both trackable over time.

## The Vulnerable Part

Here's what I'm nervous about.

I built Baycast as a solo developer. I'm not a startup with $5 million in seed funding. I don't have a growth team or a PR agency. The prototype runs on Vercel with a Supabase backend. The domain is still a `.vercel.app` subdomain. There are rough edges. The empty leaderboard says "waiting for its champion," which is the most dignified way I could think of to say "nobody has signed up yet."

And I'm okay with all of that — genuinely — because I believe the idea is right. Prediction polling without financial distortion is a better way to measure human judgment. The Blind Consensus Protocol produces cleaner data than any prediction market. Brier score decomposition gives forecasters better feedback than a P&L statement. AI agents forecasting alongside humans creates a benchmark that's never existed before.

These ideas are correct. The research supports them. The prototype proves them. What I can't do alone is reach the people who would benefit from them.

That's the part that keeps me up at night — not the code, not the bugs, not the zero signups. The gap between what I believe this could become and what I can build by myself.

## What I'm Learning

Week one taught me something uncomfortable: building a product people *could* love is not the same as building a product people *will* find. Distribution is its own discipline. The conversion funnel is its own engineering challenge. The empty states on your platform — the leaderboards with no entries, the questions with zero forecasts, the social proof that says "you'd be the first" — those are not minor UX issues. They're existential barriers to adoption.

I spent eight months building the engine and forgot to build the on-ramp. That's on me.

But I'd rather build something true and undiscovered than something false with a million users. The core hypothesis — that free, blind, scored prediction polling produces better collective intelligence than financial markets — is testable. It's falsifiable. And if it's wrong, I want to know. That's the whole point of proper scoring: you can't hide from the results.

## Why This Matters Now

We're living through a moment where prediction markets are being normalized as *the* way to forecast the future. They're raising at billion-dollar valuations. They're being integrated into news coverage. They're shaping public perception of what's likely and what isn't.

And the data they produce is distorted by money, warped by whales, and corrupted by the very thing that makes them exciting — the possibility of profit.

I think we need an alternative. Not because prediction markets are evil, but because they're incomplete. They capture one kind of signal — the signal of people willing to put money on their beliefs. That's a valuable signal, but it's not the only signal, and it's almost certainly not the *best* signal for understanding what's actually going to happen.

The domain expert who's been studying AI safety for a decade but doesn't want to bet crypto on timelines? Her forecast is valuable. The epidemiologist who models disease spread for a living but finds gambling platforms distasteful? His insight matters. The curious 22-year-old who just read *Superforecasting* and wants to start building a track record? She deserves a place to practice.

Baycast is for them. For you, maybe.

## The Ask

I'm not going to pretend this is a polished product or that the road ahead is easy. It's not. The prototype is rough. The community is tiny. The road to something great is long.

But the foundation is solid. The protocol works. The scoring is rigorous. The questions are real and testable. And the vision — a world where anyone can test their judgment against the future, get scored honestly, and build a track record that means something — is worth pursuing.

If you've ever wanted to know how good your judgment really is — not how lucky, not how well-timed your bets are, but how *calibrated* your thinking is — I'd love for you to try Baycast.

Make one prediction. See how it feels to commit to a number without knowing what the crowd thinks. Come back when the question resolves and see how you scored.

That's it. No pressure. No money. Just you and the future.

👉 **[Try it at baycast-p.vercel.app](https://baycast-p.vercel.app)**

---

*This is the second in a series of weekly posts about building Baycast. Read the Week 1 retrospective [here](./BLOG_WEEK1_RETROSPECTIVE.md). Follow the journey on Twitter: [@baycast_](https://twitter.com/baycast_)*
