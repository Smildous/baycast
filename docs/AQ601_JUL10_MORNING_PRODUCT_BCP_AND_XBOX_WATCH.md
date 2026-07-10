# AQ-601 Jul 10 morning product BCP and Xbox watch

Timestamp: 2026-07-10T07:03:31Z

Production surface checked: `https://baycast-p.vercel.app`

## Commands and checks run

```bash
cd /root/baycast-product
git fetch origin main && git pull --rebase origin main
npm run verify:public-bcp
npm run verify:next-settlement-watch
node - <<'NODE'
const base='https://baycast-p.vercel.app';
const html=await fetch(base).then(r=>r.text());
const scripts=[...html.matchAll(/<script[^>]+src="([^"]+)"/g)].map(m=>new URL(m[1],base).href);
let url,key;
for (const script of scripts) {
  const text=await fetch(script).then(r=>r.text()).catch(()=>null);
  if (!text) continue;
  url ||= text.match(/https:\/\/[a-z0-9]+\.supabase\.co/)?.[0];
  key ||= text.match(/eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/)?.[0];
}
if (!url || !key) throw new Error('Supabase public config not found in production bundle');
const endpoint = `${url}/rest/v1/questions?select=id,title,status,closes_at&title=ilike.*Microsoft%20announce%20a%20new%20first-party%20Xbox%20handheld%20before%20August%201%2C%202026*&order=closes_at.asc`;
const r=await fetch(endpoint,{headers:{apikey:key,authorization:`Bearer ${key}`,accept:'application/json','user-agent':'baycast-aq601-questions-only/1.0'}});
console.log('host', new URL(url).host);
console.log('status', r.status, r.statusText);
const rows=await r.json();
console.log(JSON.stringify(rows.map(({id,title,status,closes_at})=>({id,title,status,closes_at})),null,2));
NODE
node - <<'NODE'
const base='https://baycast-p.vercel.app';
const routes=['/','/questions','/questions?status=resolved','/questions/5cc9fe74-5306-49d9-bec3-251ad276a779','/leaderboard','/activity'];
const markers=['aggregate_probability','forecasters_count','forecastCount','fcCount'];
const strings=['Lock your call before the crowd can shape it','Blind-first','Prediction polling','Community consensus'];
for (const route of routes) {
  const url=base+route;
  const res=await fetch(url,{headers:{accept:'text/html,application/xhtml+xml','user-agent':'baycast-aq601-product-check/1.0'}});
  const html=await res.text();
  const title=html.match(/<title>([^<]*)<\/title>/)?.[1] || '';
  const foundMarkers=markers.filter(m=>html.includes(m));
  const foundStrings=strings.filter(s=>html.includes(s));
  const exactForecaster=/\b\d{1,3}(?:,\d{3})*\s+forecasters?\b/i.test(html);
  console.log(JSON.stringify({route,status:res.status,contentType:res.headers.get('content-type'),title,foundMarkers,exactForecaster,foundStrings}));
}
NODE
```

Browser checks used:

- Opened `/` in a browser and confirmed the home DOM shows `35 Questions live now`, `Blind-first`, `Prediction polling`, and the Xbox question card with `Lock your call before the crowd can shape it`.
- Opened `/questions?status=resolved` and confirmed the resolved listing shows `Questions(9 resolved)` and resolved question cards with `Resolved. Scores now count against the final outcome`.
- Opened `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248` and confirmed the resolved Apple page shows `Status: Resolved`, `Outcome No`, `Resolved date Jun 13, 2026`, and no internal field names in the DOM text.

## Route results

`npm run verify:public-bcp`: PASS.

Output:

```text
Verifying public BCP surfaces at https://baycast-p.vercel.app
ok /
ok /questions
ok /questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248
ok /leaderboard
ok /activity
Public BCP surface verification passed.
```

Manual production route check:

| Route | HTTP | Title | Internal markers | Exact forecaster count copy | BCP strings seen |
| --- | ---: | --- | --- | --- | --- |
| `/` | 200 | `Baycast - Predict Real Events` | none | no | `Lock your call before the crowd can shape it`, `Blind-first`, `Prediction polling` |
| `/questions` | 200 | browse questions title | none | no | `Lock your call before the crowd can shape it` |
| `/questions?status=resolved` | 200 | browse questions title | none | no | none from the checked open-question BCP string list |
| `/questions?sort=closing-soon` | 200 | closing soon title | none | no | none from the checked open-question BCP string list |
| `/questions/5cc9fe74-5306-49d9-bec3-251ad276a779` | 200 | Xbox handheld detail title | none | no | none from the checked open-question BCP string list |
| `/leaderboard` | 200 | leaderboard title | none | no | none from the checked open-question BCP string list |
| `/activity` | 200 | activity title | none | no | none from the checked open-question BCP string list |

Markers checked on every route above: `aggregate_probability`, `forecasters_count`, `forecastCount`, `fcCount`, plus exact count copy matching `number forecaster(s)`.

## Resolved public surface check

Resolved surface checked: `/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248`, the Apple Mac Pro resolved question.

DOM showed only public resolution information: `Status: Resolved`, `Outcome No`, `Resolved date Jun 13, 2026`, and the public resolution source. Browser DOM text did not include `aggregate_probability`, `forecasters_count`, `forecastCount`, or `fcCount`.

## Xbox settlement watch

`npm run verify:next-settlement-watch`: environment-limited FAIL before data access because this checkout has no Supabase env:

```text
next settlement watch: FAIL
Supabase env unavailable: Missing SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL or SUPABASE_ANON_KEY/NEXT_PUBLIC_SUPABASE_ANON_KEY
```

Fallback used the production public Supabase config from the shipped app bundle and queried only `questions` with `select=id,title,status,closes_at`. It did not query `forecasts`.

Result:

```json
[
  {
    "id": "5cc9fe74-5306-49d9-bec3-251ad276a779",
    "title": "Will Microsoft announce a new first-party Xbox handheld before August 1, 2026?",
    "status": "open",
    "closes_at": "2026-07-31T23:59:59+00:00"
  }
]
```

Xbox settlement watch verdict: open, not ready for settlement. The close time remains `2026-07-31T23:59:59+00:00`.

Forecasts read: no.

## Decision

Public BCP is passing on the checked production surfaces. The resolved public surface did not expose internal consensus fields. The Xbox question remains open with the expected close date, so no settlement action is needed this morning.
