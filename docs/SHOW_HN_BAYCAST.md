# Show HN: Baycast – Prediction polling with blind consensus protocol

**Title:** Show HN: Baycast – Prediction polling with blind consensus protocol

**URL:** https://baycast-p.vercel.app

**Source:** https://github.com/Smildous/baycast

---

## Post Body (copy everything below the line)

---

I built an open-source prediction polling platform that forces blind forecasts before revealing the crowd aggregate. No money, no crypto, no trading — just scored collective intelligence.

**The problem:** Every major prediction platform — Polymarket, Metaculus, Manifold — shows you the crowd's estimate before you predict. Research on anchoring bias consistently shows this shifts individual answers 10-20% toward the consensus. The "wisdom of crowds" effect requires independent judgment to function (Surowiecki's four conditions: diversity, independence, decentralization, aggregation). When you show the aggregate first, independence is the first casualty.

**What it does:** Baycast implements what I'm calling a Blind Consensus Protocol (BCP), based on the Delphi method (RAND Corporation, 1950s):

1. A binary question goes live with clear resolution criteria and a closing date
2. Forecasters submit probability estimates WITHOUT seeing any aggregate (Phase A: blind)
3. After committing, the crowd aggregate is revealed (Phase B: revision)
4. Forecasters can revise with full context
5. Both the blind estimate and the revised estimate are scored independently

This gives you two distinct measurements: independent judgment accuracy and information integration skill. These are genuinely different capabilities — some people have excellent raw judgment but update poorly, and vice versa.

**Scoring:** Full Brier score decomposition — not just the raw Brier score, but calibration, discrimination, and uncertainty components. This means we can diagnose *why* a forecaster is off: "you're well-calibrated but not discriminating enough between events" or "you're overconfident on high-probability events." We also compute logarithmic scoring as an alternative. When a question resolves, every forecaster gets scored against reality — not against a market price.

**Tech stack:** Next.js on Vercel, Supabase for auth + Postgres + real-time, TypeScript throughout. The whole thing is open source at github.com/Smildous/baycast. No blockchain, no tokens, no payment processing.

**Why no money/crypto:** Three reasons. (1) Regulatory — prediction markets are under active CFTC enforcement, state-level lawsuits, and congressional investigation. Not a space I want to navigate as a solo developer. (2) Philosophical — Tetlock's Good Judgment Project (IARPA-funded) outperformed prediction markets by 25% using structured scoring without money. The signal is in the methodology, not the capital. (3) Inclusion — an epidemiologist who models disease spread won't gamble on Polymarket, but their forecast is valuable. Removing the financial barrier captures expertise that markets exclude.

**What's next:** AI agents (GPT-4, Claude) forecasting alongside humans on equal footing — same questions, same blind protocol, same scoring. The comparison data between human and machine forecasting accuracy on identical problems could be useful for AI capabilities research. This is partially working now.

**Honest state:** 176+ questions live across AI, geopolitics, markets, science, and sports. The protocol works. The scoring works. Currently at zero users — I'm posting here because I need early forecasters to stress-test the methodology and find the bugs I haven't caught yet.

If you care about calibration, forecasting methodology, or want to see how your judgment compares to an LLM, I'd genuinely appreciate you kicking the tires.

Demo: https://baycast-p.vercel.app
Source: https://github.com/Smildous/baycast

Happy to answer questions about the implementation, scoring methodology, or the blind consensus protocol design.
