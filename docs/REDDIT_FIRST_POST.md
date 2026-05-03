# Reddit First Post — r/predictionmarkets

**Status:** READY TO PUBLISH  
**Target:** r/predictionmarkets  
**Timing:** Wednesday, 9:00 AM ET  
**Title character count:** 92 / 300  

---

## Title

I built a prediction platform where you CAN'T see the crowd before you predict. Here's why that matters.

---

## Body

I've been researching prediction markets for the past year, and there's a problem that keeps bugging me: **every major platform shows you the current odds before you place your prediction.**

Polymarket shows the market price. Metaculus shows the community median. Manifold shows the odds. They all let you see the crowd before you commit your own judgment.

This seems harmless, but the research says otherwise. When people see the aggregate before predicting, their answers shift 10-20% toward the consensus. That's not wisdom of crowds — that's anchoring. The independent signal that makes crowds smart gets systematically destroyed.

The IARPA-funded Good Judgment Project demonstrated that blind, structured forecasting (where you can't see others' estimates until after committing) outperformed prediction markets by 25%.

So I built a prototype that implements this: **[Baycast](https://baycast-p.vercel.app)**. It uses a "Blind Consensus Protocol" inspired by the Delphi method:

1. You submit your prediction *without* seeing what others think  
2. After the blind phase closes, the aggregate is revealed  
3. You can revise once with full context  

No money involved. No gambling. Just scored collective intelligence using Brier scores.

It's early — right now there are ~35 live questions covering topics like:
- Will OpenAI announce GPT-5 before May 15, 2026?
- Will the Federal Reserve hold rates steady at the May 2026 FOMC meeting?
- Will Bitcoin close above $100,000 on any day before May 15, 2026?
- Will SpaceX successfully launch Starship on an orbital test flight by May 20, 2026?

I'm looking for feedback from this community. Does the herding problem resonate with you? Would you use a platform that prevents it? What am I missing?

Happy to discuss the methodology, the tech, or anything else. The project is open source: [GitHub](https://github.com/Smildous/baycast).

---

## Posting Checklist

- [ ] Account has karma > 10 (Reddit minimum for posts in some subs)
- [ ] Post on Wednesday 9:00 AM ET
- [ ] Stay online for 2 hours after posting — reply to every comment
- [ ] Upvote thoughtful comments (even critical ones)
- [ ] Do NOT ask for upvotes
- [ ] Do NOT cross-post identical content — customize per subreddit
- [ ] Monitor referral traffic from Reddit (UTM parameters)

## Response Templates

**For "how is this different from Metaculus?":**
> Metaculus is great — they're our closest methodological cousin. The key difference is that Metaculus shows you the community median before you predict. We don't. It's a small UX change with significant impact on prediction quality (research shows 10-20% anchoring effect).

**For "this is just a poll":**
> Fair point — it IS polling, but with a key difference. Traditional polls aggregate opinions. BCP uses proper scoring rules (Brier scores) to measure accuracy over time, and the blind-first mechanism prevents the anchoring effect. The Good Judgment Project used similar methods and outperformed prediction markets by 25%.

**For "how do you make money?":**
> Right now we don't — this is a prototype. Long-term, we're exploring B2B partnerships, premium features, and potentially an API for AI forecasting benchmarks. But the core platform will always be free and open.

**For skeptics:**
> I appreciate the skepticism! The evidence base is strong — the Good Judgment Project (IARPA-funded) used methods very similar to BCP and beat prediction markets by 25%. The Delphi method has been validated across 70+ years of research. That said, the proof is in the data — we'll see how accuracy looks after a few months.
