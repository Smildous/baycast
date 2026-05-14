# Seed and publish micro-script, May 14 exec3

Smil, do this in 10 minutes. The blocker today is simple: Baycast has 271+ prepared questions, but only 10 are live because the seed has not run. Seed first, then post once. Do not rewrite positioning. Do not make a thread.

## Minute 0 to 4: seed the questions

From the repo root:

```bash
cd /root/baycast
npm install
```

Add Supabase values in the shell. Use the production project from Supabase Dashboard, Settings, API:

```bash
export SUPABASE_URL="https://YOUR-PROJECT.supabase.co"
export SUPABASE_ANON_KEY="YOUR-ANON-PUBLIC-KEY"
npx tsx scripts/seed-questions.ts
```

Good enough success signal:

```text
SEED COMPLETE
Inserted: more than 0
Errors: 0
```

If it says everything already exists, that is fine. Go publish.

## Minute 4 to 6: pick one live link

Open:

```text
https://baycast-p.vercel.app
```

Pick the strongest live question, ideally AI, developer tooling, markets, or startup related. Copy that question URL. If you cannot find a question page URL quickly, use the homepage.

## Minute 6 to 8: post this on X

Replace only the link.

```text
Baycast is live, but the honest blocker today was not launch copy. It was question supply.

There are 271+ prepared forecasting questions. Only 10 were live because I had not run the seed.

Fixed that today.

If you like forecasting or calibration, try one question blind before seeing the crowd. I need blunt feedback on question quality more than praise.

Start here: [LIVE QUESTION LINK]
```

If someone replies, answer with this:

```text
Thank you. Best help is small: answer 2 or 3 questions, then tell me which one felt unclear, boring, or hard to resolve. That is the signal I need today.
```

## Minute 8 to 10: HN comment or update

Use this only on an existing Baycast Show HN, launch thread, or a clearly relevant discussion about forecasting, prediction markets, calibration, polling, AI evaluation, or collective intelligence.

```text
Founder update on Baycast: the main blocker today was not another feature or a better launch post. It was seeding the prepared questions.

Baycast has 271+ prepared forecasting questions, but only 10 were live because the seed step had not been run. I am fixing that first so a new visitor can actually answer a few good questions in one sitting.

The product is free prediction polling, not gambling: forecast blind, then see the crowd, then get scored over time.

If you try it, the most useful feedback is question quality: which question felt unclear, uninteresting, or badly resolvable?

Link: [LIVE QUESTION LINK]
```

## If Supabase seed fails

Do not get stuck. Spend 3 minutes on the fallback, then post with the truth.

First rerun with visible env checks:

```bash
cd /root/baycast
node -e 'console.log({ hasUrl: !!process.env.SUPABASE_URL, hasKey: !!process.env.SUPABASE_ANON_KEY })'
npx tsx scripts/seed-questions.ts
```

If `hasUrl` or `hasKey` is false, export the values again and rerun.

If credentials are present but insert fails, open Supabase SQL Editor and run the first 3 to 5 rows from:

```text
/root/baycast/docs/questions_batch_may14_shortterm.sql
```

Then use the best new live question link.

If even manual SQL fails, still post today with this X text instead:

```text
Baycast is live, and I hit the real blocker today: question seeding.

There are 271+ prepared forecasting questions, but only 10 are live while I sort out Supabase insert permissions.

I am sharing it anyway because the core loop is testable now: forecast blind, then see the crowd, then get scored over time.

If you like forecasting or calibration, try one live question and tell me which part feels off.

Start here: https://baycast-p.vercel.app
```

HN fallback:

```text
Founder update: I hit Supabase insert permissions while trying to seed the full prepared question set. Baycast has 271+ prepared questions, but only 10 are live until I fix that.

The current product is still usable enough to test the core loop: answer blind, see the crowd after, and build calibration over time. If anyone tries it, I would value feedback on whether the live questions are clear and resolvable.

Link: https://baycast-p.vercel.app
```

## Stop condition

Once X is posted and one HN update or comment is made, stop. Reply only to people who tried the product or gave specific criticism.
