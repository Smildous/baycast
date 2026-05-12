# Reddit Post — r/lesswrong

**Status:** READY TO POST
**Target:** r/lesswrong (primary), r/slatestarcodex (crosspost candidate)
**Topic:** Blind prediction polling, calibration scoring, and why I think forecasting needs a different approach
**Tone:** Genuine contribution, intellectual, not salesy

---

## Title

```
I built a free, open-source prediction platform that forces blind forecasts before showing the crowd aggregate. It scores with full Brier decomposition. Here's why I think the methodology matters.
```

## Body

```
Hi everyone,

Long-time LW reader, first-time poster with a project I think this community might find interesting — or at least might generate productive discussion about forecasting methodology.

## The core problem I'm trying to solve

Most prediction platforms — whether markets (Polymarket, Kalshi) or community-based (Metaculus, Manifold) — show you the crowd's aggregate estimate before you commit your own. On Polymarket, you see the market price. On Metaculus, you see the community median. On Manifold, you see the current odds.

From a forecasting accuracy standpoint, this is problematic. Research on the anchoring effect consistently shows that exposure to a group estimate shifts individual answers by 10-20% toward the consensus. The "wisdom of crowds" effect — which this community is well aware of — requires *independent* judgment to function. Surowiecki's four conditions (diversity, independence, decentralization, aggregation) are explicit about this. When you let people see the crowd before predicting, independence is the first casualty.

This isn't a new insight. The RAND Corporation figured it out in the 1950s with the Delphi method. The IARPA-funded Good Judgment Project built on it. Tetlock's superforecasters operated with structured protocols that minimized herding.

And yet, in 2026, nearly every public forecasting platform still optimizes for engagement (showing odds is engaging) rather than for independent judgment.

## What I built

Baycast is a prediction polling platform that implements what I'm calling a **Blind Consensus Protocol (BCP)**:

1. A binary question goes live with clear resolution criteria and a defined closing date
2. Forecasters submit probability estimates WITHOUT seeing any aggregate
3. After committing, the crowd aggregate is revealed
4. Forecasters can optionally revise with full context
5. Both the blind estimate and the revised estimate are scored independently using Brier scores

There's no money involved. No crypto. No trading. The prototype is at baycast-p.vercel.app and the code is open source (github.com/Smildous/baycast).

## Why I think the scoring matters

We use full Brier score decomposition rather than simple Brier or log score. Specifically, the decomposition into calibration, discrimination, and uncertainty components.

This means we can tell a forecaster not just "your Brier score is 0.18" but diagnose *why*: "you're well-calibrated but not discriminating enough between events" or "you're overconfident on high-probability events." This is the kind of feedback that actually improves forecasting skill over time, and it's something simple accuracy percentages or P&L statements can't provide.

We also score blind and revised predictions separately, which creates two distinct measurements:

- **Independent judgment score**: How accurate are you before seeing anyone else's estimate?
- **Information integration score**: How well do you update when you receive crowd information?

These are genuinely different skills. Some people have excellent raw judgment but update poorly. Others are mediocre predictors but excellent information synthesizers. Tracking both separately seems valuable for anyone serious about improving their calibration.

## The honest state of things

Full transparency: the platform has been live for 8 days and currently has zero users. There are 176+ questions live across AI, geopolitics, markets, and science. The protocol works. The scoring works. But the community doesn't exist yet.

I'm posting here because the LW/SSC community has been thinking and writing about calibration, forecasting, and collective intelligence for longer and more rigorously than almost anyone else on the internet. If the methodology has flaws, I'd rather hear about them now from people who understand this space than discover them later.

## Questions I'd genuinely like feedback on

1. Is the blind-then-reveal protocol actually better than showing aggregates upfront, in practice? The theory is clear, but I haven't seen A/B data comparing the two approaches on the same questions. Has anyone here run or seen such an experiment?

2. Is Brier decomposition the right scoring approach, or should we offer log scoring as an alternative? I know log score has stronger information-theoretic properties, but the decomposition advantage of Brier seems more useful for forecaster development.

3. Is there interest in a platform where AI agents and humans forecast on equal footing with identical scoring? We have GPT-4 and Claude making predictions through the same blind protocol. The comparison data could be interesting for AI capabilities research, but I'm not sure if that's a feature or a gimmick from the community's perspective.

Happy to answer questions about the implementation details, scoring methodology, or anything else. And genuinely interested in pushback — if this approach has fundamental flaws, I want to know.

The prototype is at baycast-p.vercel.app if anyone wants to kick the tires.
```

---

## Posting Instructions

1. **Post to r/lesswrong first** — this community is more aligned with forecasting methodology discussions
2. **Crosspost to r/slatestarcodex** after 24 hours if the r/lesswrong post gets positive engagement
3. **Timing:** Tuesday or Wednesday, 8:00-10:00 AM ET
4. **Engagement:** Reply substantively to every comment. No defensive responses. If someone points out a flaw, acknowledge it honestly.
5. **Do NOT mention signups or growth.** This post is about methodology and ideas.
6. **If the post gets negative feedback:** Thank people for the critique, incorporate valid points, and write a follow-up post about what you changed.
