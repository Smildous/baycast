# AQ-396, live BCP and settlement gate, Jun 16 13h UTC

Check run: 2026-06-16T13:04:17Z.

I synced `main` first, then checked the live public proto at `https://baycast-p.vercel.app`. I did not open forecast records, did not query private data, and did not touch app code.

## Live BCP check

BCP leak terms checked on every page: `aggregate_probability`, `forecasters_count`, `forecast count`, `forecast_count`, `forecasts_count`, `forecasts`, `consensus`, `settled_by`, `evidence_doc`.

| Surface | URL checked | HTTP/result | BCP result |
| --- | --- | --- | --- |
| Home | `https://baycast-p.vercel.app/` | HTTP 200, HTML, title `Baycast - Predict Real Events` | No forbidden field names found. `consensus` appears only in public marketing copy: `...instead of copying consensus.` It is not a question result, count, aggregate, or field leak. |
| Questions index | `https://baycast-p.vercel.app/questions` | HTTP 200, HTML, title `Browse Prediction Questions — Baycast` | Clean for the checked leak terms. The page shows public question cards and open status only. |
| FIFA candidate detail | `https://baycast-p.vercel.app/questions/5745e845-94e9-4802-bbeb-850c982e1276` | HTTP 200, HTML, title `Will the 2026 FIFA World Cup opening match have at least three total goals? - Baycast` | Clean for the checked leak terms. |
| OpenAI candidate detail | `https://baycast-p.vercel.app/questions/d3338e47-11ec-4568-942e-42bb19be0f5e` | HTTP 200, HTML, title `Will OpenAI release a new public video generation model before July 1, 2026? - Baycast` | Clean for the checked leak terms. |
| Xbox next candidate detail | `https://baycast-p.vercel.app/questions/5cc9fe74-5306-49d9-bec3-251ad276a779` | HTTP 200, HTML, title `Will Microsoft announce a new first-party Xbox handheld before August 1, 2026? - Baycast` | Clean for the checked leak terms. |

Result: the live public open surfaces checked do not expose `aggregate_probability`, `forecasters_count`, forecast counts, consensus data, `settled_by`, or `evidence_doc`. The only `consensus` hit is explanatory homepage copy, not BCP data.

## Next settlement candidates

The public questions index shows these relevant open records:

| Candidate | Public ID | Close time on live site | Status seen | Settlement decision |
| --- | --- | --- | --- | --- |
| FIFA World Cup opening match total goals | `5745e845-94e9-4802-bbeb-850c982e1276` | `2026-06-30T23:59:59+00:00` | `open` | Hold. Do not settle on Jun 16. Capture settlement evidence only after the close time. |
| OpenAI public video generation model before July 1, 2026 | `d3338e47-11ec-4568-942e-42bb19be0f5e` | `2026-06-30T23:59:59+00:00` | `open` | Hold. Do not settle on Jun 16. Capture settlement evidence only after the close time. |
| Microsoft Xbox handheld before August 1, 2026 | `5cc9fe74-5306-49d9-bec3-251ad276a779` | `2026-07-31T23:59:59+00:00` | `open` | Not a June 30 settlement. Keep it behind the two June 30 candidates. |

Gate decision: AQ-396 passes the 13h live public BCP check. No settlement action is due for FIFA or OpenAI today because both are still open and both close at the end of Jun 30 UTC.
