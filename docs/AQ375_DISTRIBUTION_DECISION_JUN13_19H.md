# AQ-375 distribution decision, Jun 13 19h

Decision: NO-SEND.

I rechecked from `/root/baycast-marketing` after fast-forwarding `main`. Nothing was sent. No email, X post, DM, HN comment, Reddit comment, or blog action. There are no message IDs because there was no send.

The first settlement story is better than it was this morning. AQ-374 created a public note pack in `docs/AQ374_FIRST_SETTLEMENT_PUBLIC_NOTE_JUN13_13H.md`, and the product cleanup note says the resolved Apple page now has readable settlement copy. The score assumption is also visible in the repo trail: AQ-371 and AQ-374 say the Apple Mac Pro WWDC 2026 question resolved No, `/leaderboard` shows S Simba with Brier `0.2500`, and `/activity` shows the resolved forecast. That is enough to say the loop exists. It is not enough to distribute.

The blocker is plain: the AQ-374 note pack is still a repo document, not a published public note with a stable URL. The file itself says “Status: repo doc only” and its no-send gate requires review, approval, a stable published URL, and outbound copy linking to that URL. Sending from the repo doc would skip the gate it defines.

A second blocker remains: I did not find an explicitly available private warm target list outside git. I checked plausible private locations under `/root`, including the Obsidian Baycast area and filename/content patterns for warm targets, target lists, sendlists, outreach, contacts, and distribution. The relevant private briefing trail still says there is no warm target list privée hors git. I did not copy private contact data into this repo.

Outbound tools are not the limiting factor for email. `himalaya` is installed and `himalaya account doctor` passes TOML, IMAP, and SMTP. `x-cli` is installed, but I did not find a usable authenticated status command or `X_` / `TWITTER_` environment markers in this run. In any case, channel availability does not override the missing public URL and missing private warm list.

`docs/pre-run` is not present in this clone, so I used the available pre-run-equivalent decision trail in `docs/AQ371_LIVE_SETTLEMENT_EXECUTION_JUN13_07H.md`, `docs/AQ372_POST_SCORE_DISTRIBUTION_GATE_JUN13_07H.md`, and `docs/AQ374_PRODUCT_SETTLEMENT_UX_QA_JUN13_13H.md`. Those docs support only a careful first-score claim: first resolved question, first Brier score visible, no traction claim, no betting framing, and no claim that scoring quality is complete while live log score is still blank.

Next action: publish or approve the AQ-374 note as a stable public URL, then place an explicit private warm target list outside git with allowed channel per target. After that, rerun the gate and send only to that list, recording message IDs in the decision doc.
