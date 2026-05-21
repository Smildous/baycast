# AQ-236 direct outreach channel plan, May 21

AQ-233 did not fail because the copy was weak. It was blocked because there was no safe way to send it.

`x-cli` is installed on the VPS, but it is not authenticated. The X API variables needed by the tool are missing. Email is also not ready: `mail`, `mailx`, `mutt`, `msmtp`, `sendmail`, and `swaks` were not available. Discord and Slack CLIs were not present either. Telegram had environment hints, but no clear marketing target list and no dedicated safe send path.

The other blocker was just as important: there is no validated human target list on the VPS. Sending without that list would mean guessing names, handles, emails, or intent. That is not acceptable for Baycast outreach.

No message was sent in AQ-233. No reply was received. Nothing should be written as if it happened.

## Private target list

Create the target list outside git. A good location is:

`/root/private_baycast_targets/aq236_warm_targets_may21.csv`

Do not commit it. Do not paste it into docs, issues, or logs. Keep it to ten people for this run.

CSV header:

```csv
target_id,person_name,relationship,channel,handle_or_email,why_this_person,question_fit,preferred_variant,consent_context,last_contacted_at,status,notes
```

Field notes:

`target_id`: short local id, for example `aq236_01`.

`person_name`: real person name if already known. Leave blank only if the handle is the normal contact identity.

`relationship`: why this is warm, for example friend, investor contact, founder peer, researcher contact, journalist met before, policy contact, forecaster.

`channel`: one channel only for the first pass. Use X DM, email, Discord DM, Slack DM, Telegram, or another authenticated private channel.

`handle_or_email`: the exact private destination. This file is private because this field is sensitive.

`why_this_person`: one sentence on why their judgment would be useful.

`question_fit`: the live Baycast question area that fits them. Do not include private participation data or consensus reads.

`preferred_variant`: one of variants 1 to 6 below.

`consent_context`: why a direct message is reasonable, such as prior conversation, mutual project, previous feedback, or explicit permission to send product notes.

`last_contacted_at`: ISO date if known, blank if not.

`status`: draft, ready, sent, replied, skipped. Only use sent or replied after it is true.

`notes`: operational notes only. No speculation about replies.

## Ten target warm outreach workflow

Start with ten people you can name without scraping. The right target is a human who already knows you, Baycast, or the problem space well enough that a short private ask is normal.

Pick people who can make a real forecast, not people who will only like a launch post. Good sources are founder peers, product builders, AI safety or evals people, journalists, policy and civic tech contacts, researchers, forecasters, and direct friends who will say when a question is confusing.

For each target, choose one live Baycast question that fits their context. The ask is simple: open Baycast, pick a live question, submit one forecast, add a short reason if they can, and notice the first scoring cycle. Baycast is prediction polling. Do not describe it as betting, a market, a wager, or a trading product.

Do not post publicly. Do not depend on X search, public replies, community posts, or a launch thread. This run works through private warm channels only.

The flow:

1. Build the private CSV with ten targets outside git.
2. Remove anyone where the contact context feels cold or unclear.
3. Match each person to one live question area, not to a claimed consensus.
4. Pick one message variant per person.
5. Authenticate exactly one channel before sending anything.
6. Send to the first three targets.
7. Wait at least fifteen minutes or until a natural reply window passes.
8. If replies show confusion, adjust the next seven messages for clarity without adding traction claims.
9. Send the remaining seven only if the channel is clean and the first messages were appropriate.
10. Log only true operational facts: target id, channel, variant, sent time, reply status, and any product feedback they actually gave.

## Six ready to send variants

Variant 1, broad warm DM:

Hey, quick Baycast ask. We have live prediction questions up and I am trying to get thoughtful human forecasts before the first scoring cycle. Could you pick one question, make the forecast you actually believe, and add a short reason if you have time?

https://baycast-p.vercel.app

Variant 2, friend or close peer:

Small favor. Can you try Baycast for five minutes today? Pick any live question where you have a real view, forecast it, and tell me if the question or source context feels unclear.

https://baycast-p.vercel.app

Variant 3, product builder:

I would value your product read on Baycast. It is prediction polling, not a betting product or market. If you have five minutes, make one forecast on a live question and note anything that slows you down before the first scoring cycle.

https://baycast-p.vercel.app

Variant 4, researcher or forecaster:

Could I get one serious forecast from you on Baycast today? Choose a live question where you have enough context, give the probability you would stand behind later, and add a sentence on why.

https://baycast-p.vercel.app

Variant 5, journalist or policy contact:

I am asking a few people with good judgment to test Baycast on live public questions. No need for a take or a post. One private forecast on a question you understand would be useful, especially before the first scoring cycle.

https://baycast-p.vercel.app

Variant 6, email version:

Subject: quick Baycast forecast ask

Hi [Name],

Could I ask you for one Baycast forecast today? Baycast is prediction polling, not betting or a market. The useful action is simple: open a live question, make the forecast you actually believe, and add a short reason if you can.

I am trying to get more thoughtful human reads in before the first scoring cycle. If anything feels confusing, that feedback helps too.

https://baycast-p.vercel.app

Thanks,
[Sender]

## Fifteen minute operator runbook once a channel is authenticated

Minute 0 to 2: confirm the authenticated account is the intended sender. Send no test message to a real target. Check the display name, account, and command that will send.

Minute 2 to 4: open the private CSV outside git. Confirm there are ten or fewer rows, every row has a warm relationship, and every row has one selected variant.

Minute 4 to 6: open Baycast and confirm live questions are available. Do not copy exact consensus, forecast counts, participant counts, or any participation metadata into outreach.

Minute 6 to 8: send variants to the first three targets only. Use the exact private destination in the CSV. Do not improvise claims about adoption, urgency, or who else is participating.

Minute 8 to 10: update the private CSV status for those three rows. If a separate send log is needed, log only target ids and true status. Do not paste private handles into git.

Minute 10 to 12: scan for delivery errors. If authentication fails, stop. If a person replies with confusion, do not argue. Clarify that the ask is one forecast on a live prediction question.

Minute 12 to 15: decide whether to continue with the remaining seven. Continue only if the channel worked, no target was obviously wrong, and the copy still matches Baycast positioning.

## BCP safe copy rules

Say Baycast is prediction polling. Do not call it betting, a market, a sportsbook, trading, investing, or anything that implies money at risk.

Point people to live Baycast questions and the first scoring cycle. Do not reveal exact consensus, forecast counts, participation counts, or private user activity.

Ask for one forecast and a short reason. Do not ask for a public endorsement, quote, repost, or community blast.

Use only warm contacts with a clear reason to hear from you. Do not scrape, buy, infer, or invent a target list.

Write as one person to another person. No hype, no growth jargon, no fake scarcity, no claim that others have already joined unless it is public and approved for use.

Do not include fake sent messages, fake replies, invented outcomes, or cleaned up stories after the fact. If nothing was sent, say nothing was sent.

If someone asks for more context, keep it plain: Baycast collects human forecasts on live questions and later scores them against outcomes. If they ask whether it is a market or betting product, answer no.
