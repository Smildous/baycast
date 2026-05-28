# AQ-278 product live gate recheck, May 28 19h UTC

Timestamp: 2026-05-28T19:01:45Z

I reset `/root/baycast-product` to `origin/main` before the check with `git fetch origin && git reset --hard origin/main`.

I checked production at `https://baycast-p.vercel.app` only through public BCP pages. I did not read the forecasts table, any forecast rows, or any private forecast data.

Routes checked:

- `/`
- `/questions`
- `/questions/apple-mac-pro-wwdc-2026`, result: 404, so I used the live Apple Mac Pro link from `/questions`
- `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`
- `/leaderboard`
- `/activity`

Verdict: pass for the AQ-278 public product gate.

What I saw:

- No visible consensus probability on the checked public surfaces.
- No exact forecaster counts on the checked public surfaces.
- No open-question activity feed or open-question activity entries. `/activity` says activity appears after questions resolve.
- No gambling framing seen on the checked public surfaces.
- The Apple Mac Pro detail page is live at `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`.
- The Apple Mac Pro context links are Apple WWDC and Apple Newsroom only.
- The Apple Mac Pro resolution source is Apple WWDC and Apple Newsroom only.

Notes:

- `/questions` shows `Questions (44 open)` and question cards with category and time left.
- `/leaderboard` says scores appear after questions resolve.
- The Apple Mac Pro slug route requested in the ticket is not live. The live route uses the question UUID above.
