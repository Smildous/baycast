# AQ-250 First score micro launch checklist, May 23 13h

This is for the exact half hour after the first public Baycast score is visible. It is not a send log. Nothing goes out from this VPS unless a real authenticated channel and a private target list exist.

Baycast has 44 questions and 11 forecasts. No new forecast claim today. The move is still the same: wait for one credible public resolution, then make a small human push around that proof.

## Minute 0 to 5: prove the page before writing anything

Open the settled question in a clean signed-out session. The page has to show the original question, the final outcome, the resolution note, and the visible score. If any of those are missing, stop.

Capture one screenshot that proves the loop in one view if possible. It should include:

- Baycast page URL
- question title
- resolved outcome or settlement state
- visible score
- resolution note or evidence text

Save the exact URL and this short proof text next to the screenshot:

> First public Baycast settled question is visible. The page shows the forecast question, the resolved outcome, the settlement note, and the score. Baycast is prediction polling, not gambling.

Do not crop out the URL. Do not use a screenshot that needs private context to make sense. Do not use an admin view.

## Minute 5 to 10: use the right existing pack

Use `docs/AQ248_POST_SCORE_DISTRIBUTION_READINESS_MAY23_07H.md` as the source of truth for the send gate and the safest short copy.

Use `docs/AQ246_POST_SCORE_OUTREACH_SEQUENCE_MAY22_19H.md` only as a backup copy bank for one-to-one notes, and only if there is a real sender, an authenticated outbound channel, and a private target list outside git.

If there is no channel or no target list, the action is not to send. The action is to keep the proof package ready and write down what is blocked.

## Minute 10 to 15: allowed claims

Keep the claim small and verifiable.

Allowed:

- Baycast has a first public settled question, if the page is live and public
- the page shows the original prediction, the outcome, the settlement note, and the score, if all are visible
- Baycast is prediction polling
- the ask is for clarity feedback on the settled page
- no signup is needed, if the page can be read signed out
- this is not a traction claim

Use lines like:

> Baycast has its first public settled prediction poll now. I am checking whether the outcome, settlement note, and score make sense to someone seeing it cold.

> This is the first Baycast page where the full loop is visible: prediction, outcome, settlement note, score.

## Minute 15 to 20: banned claims and banned tone

Do not say or imply:

- users are arriving
- people are sharing it
- there is traction, demand, revenue, growth, community, or conversion
- Baycast is taking off
- the score proves accuracy across the product
- the model works
- the market was right
- the product is validated
- anyone endorsed it
- anything was sent, posted, or received if it was not

Do not use launch theatre. No broad launch post, no fake scarcity, no victory lap. This is one resolved example and one request for a blunt read.

## Gambling language filter

Say prediction polling, forecasts, outcomes, settlement, calibration, public score, resolved question.

Do not say bets, betting, wager, gambling, odds, casino, stake, payout, win money, lock, alpha, moon, edge, sure thing, parlay, bankroll, sharps, degen.

If someone compares Baycast to gambling, answer once:

> Baycast is framed as forecasting and calibration, not gambling. The score is for judging predictions after outcomes, not for payouts.

Then stop if the thread gets noisy.

## Minute 20 to 25: attach proof, not hype

For a human DM, attach the settled question URL and, if the channel supports it, the screenshot. The text should be enough without the screenshot.

Best short DM, adapted from AQ-248:

> Hey, quick one. Baycast has its first public settled prediction now. It is prediction polling: make a call, outcome happens, score settles. If that is your kind of thing, I would value a blunt read on whether the page is clear: [link]

Best public note, if there is a real account that can reply:

> Baycast now has its first settled prediction poll public.
>
> The page shows the original question, the outcome, the settlement note, and the score.
>
> I would value product feedback on whether it is clear to someone seeing it cold.
>
> [link]

Do not attach a dashboard, private admin data, logs, token screens, analytics, or anything that looks like a secret. Do not include recipient names in git.

## Minute 25 to 30: channel check and blocked path

Local outbound CLI check on May 23 at 13h, without logging secrets and without sending anything:

- `x-cli`: present at `/root/.local/bin/x-cli`
- `himalaya`: present at `/root/.local/bin/himalaya`
- `gh`: present at `/usr/bin/gh`
- `mutt`, `mail`, `mailx`, `msmtp`, `sendmail`, `notmuch`, `alot`, `aerc`, `neomutt`: not found
- `toot`, `tut`, `twurl`, `bluesky`, `bsky`, `skeet`, `atproto`, `mastodon`: not found
- `slack`, `slack-cli`, `discord`, `discord-cli`, `telegram`, `telegram-cli`, `tg`: not found
- `reddit`, `reddit-cli`, `tuir`, `rtv`, `hn`, `haxor-news`, `hackernews`: not found
- `aws`, `swaks`, `linkedin-cli`: not found

The presence of `x-cli` and `himalaya` does not make this a send. Do not test auth, do not print config, do not inspect secrets, do not post, do not email. `gh` is for repo work only and is not a launch channel.

If no outbound channel is approved, write this in the operating note and stop:

> First public score proof is ready, but outbound remains blocked on this VPS. No authenticated approved channel and no private target list are available here. Nothing was sent.

That is the correct outcome. A clean no-send is better than a fake launch.
