# AQ-380 first settlement outbound bootstrap

Canonical public URL: https://baycast-p.vercel.app/settlements/apple-mac-pro-wwdc-2026

Purpose: make the first scored Baycast loop usable for careful outreach without sending anything yet. This pack gives Smil a way to build a private warm list outside git, write short notes, and only send after the gate is passed.

Baycast positioning for this page: prediction polling. Not gambling. Not a prediction market. The useful proof point is a public forecast that later settled, with the score visible. Talk about the first scored loop, Brier score, public evidence, and calibration.

## Targets Smil can map privately

Use people already known to Smil or reachable through a normal public context. Do not invent names. Do not scrape random personal emails. The list belongs outside the repo.

1. AI product builders who post about launch quality, calibration, or shipping taste.
2. Forecasting and epistemics people who care about scored predictions, not hype.
3. Indie hackers who run public build logs and understand early feedback loops.
4. Developer tool founders who have talked about trust, benchmarks, or evidence.
5. Product designers who critique UX around claims, receipts, and confidence.
6. Tech newsletter writers who cover Apple, AI hardware, or prediction culture.
7. Community operators who host small technical chats and can react to the format.
8. Researchers or students interested in Brier scores, calibration, or public reasoning.
9. Friendly investors or scouts who already know Smil and can give positioning feedback.
10. Early Baycast observers, repo watchers, or previous commenters who have opted into follow-up.

## Private target list bootstrap

Recommended local path, outside git:

`/root/baycast-private/outreach/warm_targets.csv`

A headers-only example has been created at:

`/root/baycast-private/outreach/warm_targets.example.csv`

CSV schema:

```csv
target_id,archetype,name,handle_or_email,platform,relationship,why_relevant,last_context,opt_in_status,personal_note,status,owner,next_action,source_url,notes
```

Field notes:

| Field | Use |
| --- | --- |
| target_id | Local ID like wt_001. No public meaning. |
| archetype | One of the 10 archetypes above. |
| name | Private name if known. Leave blank if not needed. |
| handle_or_email | Private handle or email. Do not commit. |
| platform | X, LinkedIn, email, Discord, Slack, personal site, other. |
| relationship | friend, previous reply, mutual, public commenter, newsletter, other. |
| why_relevant | One sentence on why this person might care. |
| last_context | Where the relationship or context came from. |
| opt_in_status | known_ok, warm_context, public_only, do_not_contact. |
| personal_note | The one personal sentence to add before any template. |
| status | draft, ready, sent, replied, skipped. Keep as draft until the send gate passes. |
| owner | Person responsible for the row. |
| next_action | What to do next, usually personalize or skip. |
| source_url | Public context URL if useful. No private inbox links. |
| notes | Anything that helps avoid a bad send. |

Minimum quality bar before a row becomes ready:

- There is a real reason this person might care about a scored prediction loop.
- The note has one specific personal sentence.
- The channel is appropriate for the relationship.
- The row does not rely on scraped personal data.
- The person is not marked do_not_contact.

## Ready DM and email variants

These are drafts. Add one real personal sentence before the first line. If there is no honest personal sentence, do not send.

### 1. Short DM for a warm product builder

Hey [name], quick Baycast note because you have talked about shipping with receipts.

We just closed the first public scored loop: a WWDC Mac Pro prediction that settled with evidence and a Brier score.

It is not a market or gambling. It is prediction polling with public calibration.

Page here: https://baycast-p.vercel.app/settlements/apple-mac-pro-wwdc-2026

If you have 2 minutes, I would value a blunt read on whether the settlement page makes the loop clear.

### 2. Email for a forecasting or calibration person

Subject: first public Baycast settlement

Hi [name],

I am sharing this because your work touches forecasting and calibration.

Baycast just published its first scored loop: a public prediction, public settlement evidence, and a Brier score on the result.

Canonical page:
https://baycast-p.vercel.app/settlements/apple-mac-pro-wwdc-2026

The framing is prediction polling, not gambling and not a prediction market. The question I am trying to test is simple: does the page make the scored loop credible without overclaiming?

If you have a quick reaction, especially on the settlement and score language, I would appreciate it.

Thanks,
Smil

### 3. DM for a tech newsletter writer

Hey [name], sending because you often notice small product primitives before they are polished.

Baycast has its first settled prediction page live. It shows the claim, the public evidence, and the Brier score after resolution.

https://baycast-p.vercel.app/settlements/apple-mac-pro-wwdc-2026

No traction claim here. Just the first closed loop for prediction polling. Curious if the page explains itself fast enough for a reader who lands cold.

### 4. Email for a friendly investor, scout, or advisor

Subject: Baycast first scored loop is live

Hi [name],

Small but concrete Baycast update: the first public settlement page is live.

https://baycast-p.vercel.app/settlements/apple-mac-pro-wwdc-2026

It closes the loop from prediction to outcome to Brier score, with public evidence on the page. We are keeping the positioning narrow: prediction polling, not gambling, not a prediction market.

I am not asking you to share it. I would value one read on whether this is understandable as a product proof point.

Thanks,
Smil

### 5. DM for an early observer or previous commenter

Hey [name], following up because you looked at Baycast before.

The first settlement page is now live:
https://baycast-p.vercel.app/settlements/apple-mac-pro-wwdc-2026

It is the first scored loop: prediction, public evidence, result, Brier score.

If you are open to it, I would love a quick reaction on what feels unclear or untrustworthy. No need to be polite.

## Public comment variants

Use only where the thread is already about Baycast, forecasting, scored predictions, WWDC, or public calibration. Do not hijack unrelated posts.

### 1. Direct and factual

Baycast has its first settled prediction page live: prediction, public evidence, result, and Brier score in one place.

https://baycast-p.vercel.app/settlements/apple-mac-pro-wwdc-2026

Useful test for whether prediction polling can show calibration without becoming a market.

### 2. Calibration angle

Small Baycast milestone: first scored loop is public now.

The page shows the original prediction, settlement evidence, and Brier score after the outcome.

https://baycast-p.vercel.app/settlements/apple-mac-pro-wwdc-2026

I am especially interested in whether the calibration language is clear.

### 3. Apple and evidence angle

For anyone tracking WWDC prediction receipts, Baycast closed its Mac Pro question with public evidence and a Brier score.

https://baycast-p.vercel.app/settlements/apple-mac-pro-wwdc-2026

Not a betting product. The point is a scored public prediction loop.

## Banned claims

Do not use these claims in outreach, comments, docs, or posts unless there is later public evidence approved for use.

- The community is growing.
- Users are active.
- People are already using this.
- The market wants this.
- The market is validating this.
- We have traction.
- We have demand.
- This is going viral.
- Everyone missed this.
- Baycast predicted WWDC correctly unless the settlement page explicitly supports that exact wording.
- Baycast is a prediction market.
- Baycast is for betting.
- You can win money.
- This beats other forecasters.
- This proves the product works.
- This is statistically significant.

Safe language:

- First scored loop.
- Public settlement page.
- Public evidence.
- Brier score.
- Calibration.
- Prediction polling.
- Early product proof point.
- Looking for feedback on clarity and trust.

## Send gate

No messages go out until every item below is true.

1. Private list exists at `/root/baycast-private/outreach/warm_targets.csv` or another outside-git path.
2. Every target row was added by Smil or an approved teammate from real private context.
3. No invented contacts, scraped personal emails, or guessed relationships are in the list.
4. Each ready row has an archetype, channel, relationship, why_relevant, and personal_note.
5. Any do_not_contact row is skipped.
6. Each draft uses the canonical URL exactly:
   `https://baycast-p.vercel.app/settlements/apple-mac-pro-wwdc-2026`
7. The message says prediction polling, not gambling and not a prediction market.
8. The message mentions first scored loop, Brier score, public evidence, or calibration without adding traction claims.
9. Public comments are only posted in relevant threads and do not pretend to be organic third-party praise.
10. Final review confirms there is no private data in git and no send has been faked.

If any item fails, keep status as draft or skipped. Do not send.
