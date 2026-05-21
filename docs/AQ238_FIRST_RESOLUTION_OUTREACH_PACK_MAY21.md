# AQ-238 first resolution outreach pack, May 21

This is an asset for warm, private outreach only. Nothing here has been sent. Do not paste invented names, handles, replies, or outcomes into this file.

The story is simple: Baycast has live prediction polling questions now, and the first June resolutions are coming soon. Ask people who already know you to make one honest forecast before those resolutions land.

Use a direct question link when there is a clear fit. Use the homepage only when the person should choose their own question.

Homepage:

https://baycast-p.vercel.app

Question link placeholder:

[question_link]

## Safe use

Keep this human and small. Send only from an authenticated private channel, to people with a real warm context, after the private target sheet exists outside git.

Do not ask anyone to post publicly. Do not route them to public feeds. Do not mention user counts, question counts, forecast counts, consensus, or adoption. The useful action is one forecast before the first June resolutions.

## Six ready messages for warm human targets

### 1. Close friend or founder peer

Hey [Name], small Baycast ask.

The first June resolutions are coming up, and I want a few thoughtful forecasts in before the scoring starts. Could you pick one live question and put in the probability you actually believe?

If the wording feels off, tell me that too. No need to post about it.

[question_link]

### 2. Product builder

Hey [Name], could I get your product read on one Baycast question?

The ask is not a review or a launch boost. Just make one forecast before the first June resolutions and notice if anything gets in the way: question wording, source context, sign up, confidence, anything like that.

[question_link]

### 3. Researcher, analyst, or policy person

Hi [Name], I have a Baycast question that feels close to your lane.

Before the first June resolutions, I am asking a few warm contacts for one serious forecast and a short reason if they have time. Your read would be useful because you actually think about this area.

No public post needed. Just the forecast you would stand behind later.

[question_link]

### 4. Forecaster or rationalist friend

Hey [Name], I would value one clean forecast from you on Baycast.

Pick the probability you believe today, before the first June resolutions, and add a sentence on what would change your mind if you can. I am mostly testing whether the question and context make it easy to think clearly.

[question_link]

### 5. Journalist or newsletter friend

Hi [Name], quick private ask.

Baycast is collecting forecasts on live public questions before the first June resolutions. If one question matches your beat, could you make a forecast and tell me if the evidence shown is enough to form a view?

No quote, no post, no coverage ask.

[question_link]

### 6. General warm email

Subject: quick Baycast forecast ask

Hi [Name],

Could I ask you for one Baycast forecast this week?

The first June resolutions are coming soon, so the useful moment is before they resolve. Open one live question, put in the probability you actually believe, and add a short reason if you have time.

If a direct question is a fit, use this:
[question_link]

If you would rather choose your own:
https://baycast-p.vercel.app

Thanks,
[Sender]

## Two follow-ups

### Follow-up after two or three days

Hey [Name], quick nudge on the Baycast ask. The useful part is getting a forecast in before the first June resolutions, so it is still worth doing now if you have five minutes.

No pressure if the timing is bad.

[question_link]

### Follow-up when they said they would look

Thanks again for being open to it. If you do try Baycast, the only thing I need is one honest forecast before the first June resolutions. A short note on what confused you would help too.

[question_link]

## Short founder note

I am building Baycast because I want prediction polling to feel like a normal civic and research habit: read a clear question, make a probability forecast, give a reason, then see how it resolved later.

The next useful step is modest. I want warm humans to forecast before the first June resolutions, so the first scoring cycle has real judgment behind it instead of launch noise.

## Private target CSV schema

Create this file outside git. Suggested path:

`/root/private_baycast_targets/aq238_first_resolution_warm_targets_may21.csv`

Header:

```csv
target_id,person_name,relationship,channel,handle_or_email,consent_context,why_this_person,question_link,question_fit,message_variant,followup_variant,last_contacted_at,status,sent_at,replied_at,feedback_notes,operator_notes
```

Field guidance:

`target_id`: local id only, such as `aq238_01`.

`person_name`: known name. Do not invent names.

`relationship`: why this is warm, such as friend, founder peer, researcher contact, journalist contact, former coworker, policy contact.

`channel`: one private channel that is already authenticated and appropriate.

`handle_or_email`: exact private destination. Keep this file private.

`consent_context`: why it is reasonable to message them.

`why_this_person`: why their judgment could improve the forecast set.

`question_link`: direct Baycast question URL when possible. Use the homepage only if they should choose.

`question_fit`: plain note on why the question matches them.

`message_variant`: one of 1, 2, 3, 4, 5, 6.

`followup_variant`: blank, `two_day`, or `said_would_look`.

`last_contacted_at`: ISO date if known.

`status`: draft, ready, sent, replied, skipped. Do not use sent or replied until true.

`sent_at`: ISO timestamp only after a real send.

`replied_at`: ISO timestamp only after a real reply.

`feedback_notes`: product feedback they actually gave. No guesses.

`operator_notes`: private operational notes only.

## Operator rule

This pack does not authorize sending. It only prepares copy and the private list shape. Before any send, confirm the channel, the target sheet, and the exact question link. If any part is missing, stop.
