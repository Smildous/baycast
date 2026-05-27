# AQ-272 product live gate recheck, May 27 19h UTC

Checked live production at `https://baycast-p.vercel.app/` on 2026-05-27 19:02 UTC with the browser. I did not read, query, or inspect the `forecasts` table. This check stayed on public routes only.

Result: PASS for the AQ-272 public BCP gate.

Routes checked:

| Route | Observation | Result |
| --- | --- | --- |
| `/` | Homepage loaded. The Apple Mac Pro card was visible in Live questions with the copy `Lock your call before the crowd can shape it`. I saw question counts and general marketing copy, but no public consensus probability, no exact forecaster count, and no gambling copy. `100% Free to play` is visible, but it is not a consensus value. | PASS |
| `/questions` | Questions list loaded with `Questions(44 open)`. The Apple Mac Pro question was discoverable at `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`. Cards show category, days left, title, and the blind call prompt. I saw no consensus probability, no exact forecaster count, and no gambling copy. | PASS |
| `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248` | Apple Mac Pro detail page loaded. Close date showed `Jun 13, 2026`. The public community signal area stayed locked and did not reveal a value. The page showed signup and login CTAs before forecast. The visible slider percentages are user input controls, not community consensus. I saw no exact forecaster count and no gambling copy. | PASS |
| `/leaderboard` | Leaderboard loaded with `Scores appear after questions resolve`. No question consensus, no exact forecaster count, and no gambling copy were visible. | PASS |
| `/activity` | Activity feed loaded with `Activity appears after questions resolve`. No question consensus, no exact forecaster count, and no gambling copy were visible. | PASS |

Apple Mac Pro context links:

The detail page showed only Apple related context links:

| Link text | URL |
| --- | --- |
| Apple WWDC | `https://developer.apple.com/wwdc26/` |
| Apple Newsroom | `https://www.apple.com/newsroom/` |

I did not see NIST or OpenAI in the Apple Mac Pro detail page text or context links. OpenAI still appears elsewhere as a separate question title on the homepage and questions list, which is expected and not part of the Apple Mac Pro context block.

Final call: PASS. AQ-269 propagation is visible on the live Apple Mac Pro page, and AQ-272 first settlement gate remains blind on the checked public surfaces.