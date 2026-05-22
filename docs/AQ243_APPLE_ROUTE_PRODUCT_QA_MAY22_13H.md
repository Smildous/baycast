# AQ-243 Apple route product QA, 22 May 2026 13h UTC

URL checked live: https://baycast-p.vercel.app/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248

I checked the public question page in the browser after resetting the product clone to `origin/main`. I did not read forecasts from Supabase and did not write to Supabase.

The page loads as the Apple route expected for this QA pass. Browser title is `Will Apple announce a new Mac Pro at WWDC 2026? - Baycast`. The visible H1 matches it: `Will Apple announce a new Mac Pro at WWDC 2026?`

The visible body gives the resolution rule clearly. It says the question resolves Yes if Apple announces a new Mac Pro during WWDC 2026 or in an Apple Newsroom post dated 2026-06-08 through 2026-06-12. It also says Mac Studio, MacBook, iMac, and Mac mini spec bumps do not count, and that no new Mac Pro in that window resolves No.

The public guardrail holds on this route. I did not see a consensus probability, an exact forecaster count, exact forecast counts, serialized BCP field names, odds, betting copy, gambling copy, or market wording in the title, metadata, or visible page body.

The metadata also looks clean. The description and Open Graph description use `tech · Open · Forecast before the crowd can shape your call` followed by the resolution text. The Twitter description follows the same pattern. I saw no aggregate probability, no forecaster count, no consensus language, and no betting or gambling wording in those tags.

The community signal is not leaked. The page shows `Community signal` with placeholder dashes and the label `Community signal locked`. The surrounding copy asks the user to make their own forecast first: `Lock your forecast before the crowd can shape it` and `Sign up to save your probability, unlock the comparison after your call, and start building a streak and profile score.` That is acceptable for the pre-forecast state because it does not reveal a number or a crowd direction.

The forecast CTA is clear. The page shows `Add your forecast`, a probability slider, quick choices from 5% to 95%, and the links `Sign up to forecast` and `Log in`. The CTA copy says `Sign up to lock this forecast, unlock comparison after your call, and start your profile score.`

Result: pass for AQ-243. The Apple question route keeps the public BCP data guarded before forecast or unlock, while still giving a clear action for the user to submit a forecast.
