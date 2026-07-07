# AQ-580, Jul 7 19h product BCP and Xbox watch

Run done at 2026-07-07 19:02:20 UTC. Scope was read-only on production and public surfaces. I did not query the forecasts table, did not insert live data, and did not touch AQ577 or AQ574.

## Repo sync

Command:

```sh
git -C /root/baycast-product status --short && git -C /root/baycast-product branch --show-current && git -C /root/baycast-product fetch origin main && git -C /root/baycast-product merge --ff-only origin/main
```

Result:

```text
main
From https://github.com/Smildous/baycast
 * branch            main       -> FETCH_HEAD
Already up to date.
```

Working tree was clean before this doc was created. Branch was `main`. The fast-forward step had nothing to apply.

## Public BCP verifier

Command:

```sh
npm run verify:public-bcp
```

Result:

```text
> baycast@0.1.0 verify:public-bcp
> node scripts/verify-public-bcp-surfaces.mjs

Verifying public BCP surfaces at https://baycast-p.vercel.app
ok /
ok /questions
ok /questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248
ok /leaderboard
ok /activity
Public BCP surface verification passed.
```

This is the repo verifier at `scripts/verify-public-bcp-surfaces.mjs`. It checks public HTML for public BCP leaks including `aggregate_probability`, `forecasters_count`, exact forecaster count copy, and open-question consensus copy. It passed on production.

## Next settlement watch

Command:

```sh
npm run verify:next-settlement-watch
```

Result:

```text
> baycast@0.1.0 verify:next-settlement-watch
> node scripts/verify-next-settlement-watch.mjs

next settlement watch: FAIL
Supabase env unavailable: Missing SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL or SUPABASE_ANON_KEY/NEXT_PUBLIC_SUPABASE_ANON_KEY
```

The script is read-only and selects only `id,title,status,closes_at` from `questions`. It did not run here because the cron shell had no Supabase env. No fallback touched forecasts.

I checked the Xbox question through public production HTML instead. The route is:

```text
https://baycast-p.vercel.app/questions/5cc9fe74-5306-49d9-bec3-251ad276a779
```

HTTP detail check command:

```sh
python3 - <<'PY'
from urllib.request import Request, urlopen
import re
qid='5cc9fe74-5306-49d9-bec3-251ad276a779'
url='https://baycast-p.vercel.app/questions/'+qid
with urlopen(Request(url,headers={'User-Agent':'AQ-580-xbox-detail/1.0','Accept':'text/html'}),timeout=20) as resp:
    html=resp.read().decode('utf-8','replace')
    print(f'status={resp.status} {resp.reason}; content-type={resp.headers.get("content-type","")}')
for needle in ['Will Microsoft announce a new first-party Xbox handheld before August 1, 2026?','2026-07-31T23:59:59+00:00','status\\":\\"open','aggregate_probability','forecasters_count','forecastCount','fcCount']:
    print(f'{needle}:', needle in html)
idx=html.find('Will Microsoft announce')
if idx>=0:
    print(re.sub(r'\s+',' ', html[max(0,idx-400):min(len(html),idx+1000)]))
PY
```

Result:

```text
status=200 OK; content-type=text/html; charset=utf-8
Will Microsoft announce a new first-party Xbox handheld before August 1, 2026?: True
2026-07-31T23:59:59+00:00: True
status\":\"open: False
aggregate_probability: False
forecasters_count: False
forecastCount: False
fcCount: False
```

The same public question page opened in the browser. It showed the Microsoft Xbox handheld title, Technology, 25 d left, closing date Jul 31, 2026, resolution source text for Xbox Wire and Microsoft official announcements, and community signal locked. It did not show a public aggregate probability or forecaster count.

## Public route HTTP check

Command:

```sh
python3 - <<'PY'
from urllib.request import Request, urlopen
routes=['/','/questions','/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248','/leaderboard','/activity']
base='https://baycast-p.vercel.app'
for r in routes:
    url=base + ('' if r=='/' else r)
    req=Request(url, headers={'User-Agent':'AQ-580-public-route-check/1.0','Accept':'text/html'})
    try:
        with urlopen(req, timeout=20) as resp:
            ct=resp.headers.get('content-type','')
            body=resp.read(512)
            print(f'{r} -> {resp.status} {resp.reason}; content-type={ct}; first-bytes={len(body)}')
    except Exception as e:
        print(f'{r} -> ERROR {type(e).__name__}: {e}')
PY
```

Result:

```text
/ -> 200 OK; content-type=text/html; charset=utf-8; first-bytes=512
/questions -> 200 OK; content-type=text/html; charset=utf-8; first-bytes=512
/questions/13aa9f2f-3226-4213-a04f-0cc2b87ad248 -> 200 OK; content-type=text/html; charset=utf-8; first-bytes=512
/leaderboard -> 200 OK; content-type=text/html; charset=utf-8; first-bytes=512
/activity -> 200 OK; content-type=text/html; charset=utf-8; first-bytes=512
```

## Gate call

Production public BCP gate is pass based on the repo verifier and route checks. The Xbox handheld watch is still open on public production, closes Jul 31, 2026, and keeps the community signal locked. The only issue is local env for the read-only Supabase watch script, so I used public production HTML as the fallback and recorded the failure plainly.
