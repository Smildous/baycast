# AQ-514 13h live BCP and Jun 30 evidence gate, Jun 29

Date: 2026-06-29
Mode: Product/Questions, 13h UTC
Surface: https://baycast-p.vercel.app

## Scope

Gate the live public BCP surfaces and the two Jun 30 settlement-watch candidates from public pages only.

Forecasts read: no.

No Supabase forecast rows, private forecast tables, aggregate forecast values, admin views, or model outputs were opened for this gate.

## Commands run

```bash
cd /root/baycast-product
git fetch origin && git pull --ff-only origin main
npm run verify:public-bcp
```

Result:

```text
Verifying public BCP surfaces at https://baycast-p.vercel.app
ok /
ok /questions
ok /questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248
ok /leaderboard
ok /activity
Public BCP surface verification passed.
```

I also checked the live public HTML for the main BCP surfaces and the two Jun 30 candidate detail pages:

```bash
node - <<'NODE'
const base='https://baycast-p.vercel.app';
const paths=['/','/questions','/questions?page=2','/questions?page=3','/questions?page=4','/questions/5745e845-94e9-4802-bbeb-850c982e1276','/questions/d3338e47-11ec-4568-942e-42bb19be0f5e','/leaderboard','/activity'];
const terms=['aggregate_probability','forecasters_count','settled_by','evidence_doc'];
for (const path of paths) {
  const res=await fetch(base+path,{headers:{'user-agent':'AQ-514 public surface gate'}});
  const html=await res.text();
  const text=html.replace(/<script[\s\S]*?<\/script>/gi,' ').replace(/<style[\s\S]*?<\/style>/gi,' ').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ');
  const found=terms.filter(t=>html.includes(t));
  const countLeak=/\b\d+\s+(forecasters?|predictions?)\b/i.test(text);
  const consensusLeak=/\b\d{1,3}\s?%\b.{0,60}(consensus|community)|(?:consensus|community).{0,60}\b\d{1,3}\s?%\b/i.test(text);
  console.log(JSON.stringify({path,status:res.status,bytes:html.length,forbidden:found,countLeak,consensusLeak,title:(html.match(/<title>(.*?)<\/title>/)||[])[1]||null}));
}
NODE
```

Result: every checked path returned HTTP 200. Forbidden internal terms were not present. Exact forecaster-count style text was not present. Public consensus percentage text was not present.

## Browser observations

`/questions` loads as the public question index with 42 open questions shown in the heading. The closing-soon section includes both Jun 30 candidates:

- Sports, 2d left: Will the 2026 FIFA World Cup opening match have at least three total goals?
- Technology, 2d left: Will OpenAI release a new public video generation model before July 1, 2026?

The public cards show category, time left, question title, and the locked-call prompt. I did not see aggregate probability, forecaster count, settlement fields, evidence document fields, or consensus percentage on the index.

## Jun 30 candidate checks

### FIFA opening match

Public detail URL:

`https://baycast-p.vercel.app/questions/5745e845-94e9-4802-bbeb-850c982e1276`

Observed public resolution text:

> Resolves Yes if the official final score of the opening match of the 2026 FIFA World Cup includes three or more total goals by the end of regulation plus stoppage time. Extra time and penalty shootout goals do not count if FIFA classifies the opening match as a knockout match for any reason. Own goals count. If the match is abandoned and not completed by 2026-06-30, resolves No.

Observed public resolution source:

`FIFA official match centre: https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026`

The page shows Jun 30, 2026 as the close date, static context links only, and the community signal locked state. No forecast aggregate or exact public crowd count was exposed.

### OpenAI public video generation model

Public detail URL:

`https://baycast-p.vercel.app/questions/d3338e47-11ec-4568-942e-42bb19be0f5e`

Observed public resolution text:

> Resolves Yes if OpenAI publicly releases a new or materially upgraded video generation model to ChatGPT users, API users, or another public paid tier before 2026-07-01 00:00 UTC. A research demo, waitlist-only preview, safety note, pricing change, or minor UI update does not count. The model must generate video from text, image, or video prompts. Otherwise resolves No.

Observed public resolution source:

`OpenAI News and product release notes: https://openai.com/news/ and https://help.openai.com/en/articles/6825453-chatgpt-release-notes`

The page shows Jun 30, 2026 as the close date, static context links only, and the community signal locked state. No forecast aggregate or exact public crowd count was exposed.

## Leak terms checked

Across the public index pages, candidate detail pages, home, leaderboard, and activity, I checked for these internal terms:

- `aggregate_probability`
- `forecasters_count`
- `settled_by`
- `evidence_doc`

I also checked for exact forecaster-count wording and consensus percentage wording. Nothing leaked in the checked public DOM.

## Verdict

GO for watch.

Not a settlement call before close. Both Jun 30 candidates have usable public resolution wording and public evidence sources visible on the live site. The BCP public surface verification passed, and the checked public DOM did not expose internal forecast or settlement fields.

No product bug was found in this gate, so no code change was made.
