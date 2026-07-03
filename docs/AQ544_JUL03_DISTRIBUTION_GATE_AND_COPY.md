# AQ-544 Jul 3 distribution gate and copy

## Gate result

Verdict: NO SEND.

Live site gate: passed. `npm run verify:distribution-gate` checked the live site at `https://baycast-p.vercel.app` and passed.

Outbound status checked without printing secrets:

- Private warm targets: `/root/baycast-private/outreach/warm_targets_jun14_19h.csv` exists, 2 rows, 0 complete target rows.
- X: `x-cli` is installed, but not authenticated.
- Email: `himalaya` is installed and usable, but email auth alone is not enough.

Exact blocker: no send because there is no complete private warm target list and X is not authenticated. Current complete private warm target count is 0.

Nothing was sent.

Current live state, if needed: 6 users, 44 questions, 12 forecasts, 35 open questions.

## Short email variant 1

Subject: Quick prediction polling test

Hey {{first_name}},

I’m working on Baycast, a small prediction polling app. It is for asking concrete questions, collecting forecasts, and checking back when the answer is known.

No stakes, no odds, no betting. Just a cleaner way to see what people expect and what actually happened.

If you have 2 minutes, I’d love a blunt read on whether the question flow makes sense:
{{link}}

Thanks,
{{sender_name}}

## Short email variant 2

Subject: Would you try this polling format?

Hey {{first_name}},

Baycast is a lightweight way to run prediction polls. People forecast yes/no or multiple-choice outcomes, then the question can be resolved later.

I’m keeping it away from gambling. The point is better questions and visible forecasts, not wagers.

Could you try one question and tell me what feels unclear?
{{link}}

Thanks,
{{sender_name}}

## X post 1

Testing Baycast: prediction polling for real-world questions.

Ask a clear question, collect forecasts, resolve it when the answer is known.

No bets. No odds. No gambling layer.

Just a simple way to see what people think will happen.

## X post 2

Most polls ask what people prefer.

Baycast asks what people think will happen.

It’s a small prediction polling app: questions, forecasts, then resolution when the outcome is known. No money involved.

## Reddit/HN comment draft

I’ve been working on Baycast, which is closer to prediction polling than a prediction market.

The idea is simple: someone asks a concrete question, people make forecasts, and the question gets resolved when the answer is known. There are no stakes, odds, payouts, or trading mechanics. I’m trying to keep the focus on better question wording and a public record of what people expected.

If you use polls for product, news, sports, policy, or community topics, I’d be curious where this format feels useful and where it breaks down.
