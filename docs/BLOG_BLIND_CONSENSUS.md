# Blind Consensus: Why Seeing Predictions Ruins Your Judgment

**By Smil | May 2026**

---

Here is a fact that should disturb anyone who trusts crowd-sourced forecasts: knowing what other people think before you make your own prediction can reduce your accuracy by 15–30%. Not improve it. *Reduce* it.

This isn't fringe theory. It's been replicated across decades of judgment and decision-making research. When forecasters are exposed to the group's estimate before submitting their own, they shift toward the crowd — and the aggregate gets *worse*, not better. The very thing that platforms like Polymarket, Kalshi, and Metaculus treat as a feature — showing you what everyone else thinks in real time — is a methodological flaw with a name.

---

## The Anchoring Problem

In 1974, Tversky and Kahneman identified one of the most robust biases in human cognition: **anchoring**. When people are exposed to a number — any number, even a random one — their subsequent estimates are pulled toward it. Ask people whether Gandhi was older or younger than 140 when he died, and their average guess is dramatically higher than if you asked whether he was older or younger than 9. The anchor doesn't even need to be plausible. It just needs to exist.

Now consider what happens in forecasting. You visit a prediction platform and see a question: *"Will the Fed cut rates in June?"* The current market price sits at 73%. Before you've engaged a single neuron of independent analysis, your brain has already registered 73% as the center of gravity. Your forecast will be pulled toward it. Not because 73% is right, but because it's *there*.

The Delphi method — developed at RAND in the 1950s and validated across hundreds of studies over 50+ years — was specifically designed to neutralize this. In classical Delphi, participants submit estimates independently and anonymously. The aggregate is computed. Then — and only then — are the results shared, and participants revise. The key insight: the first estimate must be blind. If it isn't, you're not collecting independent judgments. You're collecting contaminated ones.

A meta-analysis by Rowe and Wright (1999) across 27 Delphi studies found that structured anonymous estimation consistently outperformed face-to-face group judgment. The effect wasn't small. Studies on forecasting accuracy show that removing social influence improves aggregate accuracy by 15–30%. When you can see what the group thinks, you don't add your information to the pool — you surrender it.

---

## How Blind Consensus Works

The Blind Consensus Protocol (BCP) operationalizes these insights into a two-phase system:

**Phase A — The Blind Phase.** Every forecaster sees the question, the resolution criteria, and a probability slider. Nothing else. No market price. No community median. No hint about what anyone else thinks. You research, reason, and submit your independent probability estimate. It's locked in with a timestamp. This phase is designed to capture each participant's raw, uncontaminated judgment — the independent signal that makes collective intelligence actually work.

**Phase B — The Revision Phase.** After the blind phase closes (or after a minimum threshold of forecasts is collected), the aggregate is revealed. Now you can see what the community thinks. You also see arguments and reasoning from other forecasters. You're allowed to revise your estimate exactly once. This isn't unlimited trading. It's a single, deliberate update — the same structured revision that the Delphi method prescribes.

This two-phase design has a property that no real-time market can claim: it produces *two* datasets. You can measure who had the best independent judgment (Phase A) and who was best at integrating community information (Phase B). These are distinct skills. Some people are excellent original thinkers but poor at updating. Others are mediocre out of the gate but superb synthesizers. The Delphi literature has known this for decades. Baycast simply measures it.

The Good Judgment Project — the IARPA-funded tournament that revolutionized the field — demonstrated that prediction polling with structured aggregation outperformed prediction markets by roughly 25%. The methodology was, in essence, what BCP implements digitally: collect independent forecasts, aggregate intelligently, allow structured revision.

---

## Baycast's Implementation

Baycast is the first consumer-facing platform to implement Blind Consensus as a core mechanic. Here's how it works in practice.

When you open a question, you see the prompt and a probability slider. You *don't* see the consensus. You submit your forecast blind. Only after submission does the community aggregate appear — the median estimate, the distribution of forecasts, and the reasoning from other participants.

Then you choose: do you revise? Maybe the crowd knows something you don't. Maybe you missed a consideration. Or maybe you think the crowd is wrong and you stand your ground. Either way, your blind prediction is preserved and scored independently. Your revision (if you make one) is scored separately.

Contrast this with prediction markets. On Polymarket or Kalshi, you always see the current price before you act. The price *is* the crowd's opinion. It's visible, continuously updated, and psychologically irresistible. Your forecast is never truly independent because the anchor is always present. You're not contributing fresh information to the system. You're reacting to information the system already has.

This is why prediction markets can feel efficient but produce systematically biased aggregates. They're not computing the wisdom of independent crowds. They're computing the wisdom of sequentially anchored crowds — each participant influenced by every participant who came before. The order of arrival determines the shape of the aggregate. That's not collective intelligence. That's informational cascade.

Baycast eliminates the cascade by design. The consensus is hidden until you commit. Independence is structurally guaranteed, not assumed.

---

## Why This Matters

Forecasting accuracy isn't an academic curiosity. It's the foundation of consequential decisions — policy, investment, strategy, preparedness. When intelligence agencies overestimate WMD threats, when financial models miss systemic risk, when pandemics catch governments off guard, the root cause is often the same: contaminated information aggregation. People who should have been thinking independently were anchored to what others believed.

The research is clear: collective intelligence beats individual expert judgment — *but only when independence is preserved*. Surowiecki's *Wisdom of Crowds* identified four conditions for smart crowds: diversity of opinion, independence, decentralization, and aggregation. Independence is the one most frequently violated in practice. Every platform that shows you the crowd before you answer is breaking it.

Blind Consensus Protocol restores it. Not through rules or exhortations to "think independently" — cognitive biases don't yield to willpower — but through structural design. You literally cannot see the consensus until after you've committed. The architecture does the work.

Better forecasts mean better decisions. That's the promise. And the evidence suggests that blind, structured aggregation delivers on it more reliably than any alternative.

---

## Try It

Submit your first blind forecast at [baycast-p.vercel.app](https://baycast-p.vercel.app). Pick any question. Commit to a probability before you see what anyone else thinks. Then see the consensus. Decide for yourself whether it changes your mind.

The blind phase is open.

---

*Where Bayes meets the crowd.*
