# AQ-402, gate live BCP et prochaine settlement, matin du 17 juin

Contrôle fait le 2026-06-17 à 07:09 UTC sur `https://baycast-p.vercel.app`, depuis `/root/baycast-product`. J'ai commencé par remettre la copie locale à jour depuis `origin/main`. Je n'ai pas ouvert ni interrogé la table des forecasts, et je n'ai lu aucune prévision sur les questions encore ouvertes.

## Commandes passées

```bash
cd /root/baycast-product
git pull --ff-only origin main
```

Résultat: `Already up to date.`

Contrôle HTTP des pages publiques et des chaînes à risque BCP:

```bash
python - <<'PY'
import requests,re
base='https://baycast-p.vercel.app'
routes=['/','/questions','/questions?status=resolved','/leaderboard','/activity','/settlements/apple-mac-pro-wwdc-2026','/questions/5745e845-94e9-4802-bbeb-850c982e1276','/questions/d3338e47-11ec-4568-942e-42bb19be0f5e']
terms=['aggregate_probability','forecasters_count','forecastCount','fcCount','consensus probability','consensus_probability','community consensus','settled_by','evidence_doc']
count_pat=re.compile(r'\b\d{1,3}(?:,\d{3})*\s+(?:forecasters?|forecasts?|predictions?)\b',re.I)
for route in routes:
    r=requests.get(base+route,headers={'user-agent':'AQ402-gate/1.0','accept':'text/html'},timeout=30,allow_redirects=True)
    text=r.text
    hits={term: len(re.findall(re.escape(term), text, re.I)) for term in terms}
    counts=count_pat.findall(text)
    print(f'{route} status={r.status_code} final={r.url} bytes={len(text)} bcp_hits={sum(hits.values())} exact_count_hits={len(counts)}')
    if any(hits.values()) or counts:
        print('  hits', hits, counts[:10])
PY
```

Résultat:

```text
/ status=200 final=https://baycast-p.vercel.app/ bytes=57400 bcp_hits=0 exact_count_hits=0
/questions status=200 final=https://baycast-p.vercel.app/questions bytes=56615 bcp_hits=0 exact_count_hits=0
/questions?status=resolved status=200 final=https://baycast-p.vercel.app/questions?status=resolved bytes=35541 bcp_hits=0 exact_count_hits=0
/leaderboard status=200 final=https://baycast-p.vercel.app/leaderboard bytes=45275 bcp_hits=0 exact_count_hits=0
/activity status=200 final=https://baycast-p.vercel.app/activity bytes=22674 bcp_hits=0 exact_count_hits=0
/settlements/apple-mac-pro-wwdc-2026 status=200 final=https://baycast-p.vercel.app/settlements/apple-mac-pro-wwdc-2026 bytes=30531 bcp_hits=0 exact_count_hits=0
/questions/5745e845-94e9-4802-bbeb-850c982e1276 status=200 final=https://baycast-p.vercel.app/questions/5745e845-94e9-4802-bbeb-850c982e1276 bytes=48387 bcp_hits=0 exact_count_hits=0
/questions/d3338e47-11ec-4568-942e-42bb19be0f5e status=200 final=https://baycast-p.vercel.app/questions/d3338e47-11ec-4568-942e-42bb19be0f5e bytes=44243 bcp_hits=0 exact_count_hits=0
```

Contrôle navigateur du DOM rendu:

```js
(() => {
  const t=document.documentElement.innerText+'\n'+document.documentElement.outerHTML;
  const terms=['aggregate_probability','forecasters_count','forecastCount','fcCount','consensus probability','consensus_probability','community consensus','settled_by','evidence_doc'];
  return {
    url:location.href,
    title:document.title,
    terms:Object.fromEntries(terms.map(x=>[x,(t.match(new RegExp(x.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'gi'))||[]).length])),
    exactForecastCounts:(t.match(/\b\d{1,3}(?:,\d{3})*\s+forecasters?\b|\b\d{1,3}(?:,\d{3})*\s+forecasts?\b|\b\d{1,3}(?:,\d{3})*\s+predictions?\b/gi)||[]).slice(0,20)
  }
})()
```

J'ai passé ce contrôle sur `/questions`, `/questions?status=resolved`, `/settlements/apple-mac-pro-wwdc-2026`, la page FIFA et la page OpenAI. Résultat: zéro hit pour tous les noms de champs et toutes les copies à risque listées ci-dessus, et aucune occurrence de nombre exact de forecasts, forecasters ou predictions.

## URLs vérifiées

`https://baycast-p.vercel.app/` charge en 200. Aucun champ BCP ni nombre exact trouvé dans le HTML public.

`https://baycast-p.vercel.app/questions` charge en 200. La page affiche `Questions(43 open)`. Les deux prochaines questions à settlement sont visibles en haut de liste avec `14d left` et la copie `Lock your call before the crowd can shape it`. Aucun consensus, aucune probabilité agrégée, aucun nombre exact de participation.

`https://baycast-p.vercel.app/questions?status=resolved` charge en 200. La page montre la question Apple résolue. Aucun champ interne `settled_by` ou `evidence_doc` ne fuit dans le HTML ou le DOM.

`https://baycast-p.vercel.app/leaderboard` charge en 200. Aucun champ BCP ni nombre exact trouvé.

`https://baycast-p.vercel.app/activity` charge en 200. Aucun champ BCP ni nombre exact trouvé.

`https://baycast-p.vercel.app/settlements/apple-mac-pro-wwdc-2026` charge en 200. La note de settlement Apple est lisible, avec outcome `No`, date `June 13, 2026`, explication et sources Apple publiques. La page dit aussi clairement que Baycast est du prediction polling, sans trade ni récompense financière. Aucun `settled_by`, aucun `evidence_doc`, aucun champ BCP brut.

## Pages directes découvertes depuis le live

Depuis `/questions`, le DOM rendu donne ces liens directs:

`https://baycast-p.vercel.app/questions/5745e845-94e9-4802-bbeb-850c982e1276`

Cette page est la question FIFA: `Will the 2026 FIFA World Cup opening match have at least three total goals?` Elle est encore ouverte, affiche `14d left`, `Jun 30, 2026` comme clôture, `Community signal locked`, et `Add your forecast`. La source de résolution publique affichée est le match centre FIFA. Rien à régler maintenant.

`https://baycast-p.vercel.app/questions/d3338e47-11ec-4568-942e-42bb19be0f5e`

Cette page est la question OpenAI: `Will OpenAI release a new public video generation model before July 1, 2026?` Elle est encore ouverte, affiche `14d left`, `Jun 30, 2026` comme clôture, `Community signal locked`, et `Add your forecast`. La source de résolution publique affichée est OpenAI News et les release notes ChatGPT. Rien à régler maintenant.

## BCP

Les chaînes cherchées étaient `aggregate_probability`, `forecasters_count`, `forecastCount`, `fcCount`, `consensus probability`, `consensus_probability`, `community consensus`, `settled_by`, `evidence_doc`, plus les copies avec nombres exacts du type `N forecasters`, `N forecasts`, `N predictions`.

Résultat: zéro hit dans les surfaces publiques contrôlées. Le Blind Consensus reste protégé sur les questions ouvertes. Les pages montrent une invitation à faire sa propre prévision avant de voir le signal collectif, pas le signal collectif lui-même.

## Prochaine settlement

FIFA et OpenAI sont toutes les deux encore ouvertes jusqu'au 2026-06-30. Le live affiche `Jun 30, 2026` sur les deux pages et `14d left` au moment du contrôle. Il n'y a pas de settlement à lancer ce matin. Le prochain vrai passage settlement doit attendre la clôture et l'évidence publique prévue par les règles de chaque question.

## Décision

GO pour AQ-402.

Les surfaces publiques chargent, la note Apple est accessible, les questions FIFA et OpenAI sont découvrables et restent ouvertes, et je n'ai trouvé aucune fuite BCP publique dans le HTML ou le DOM rendu. No-go seulement si une autre vérification séparée trouve une fuite côté API privée ou une régression après ce commit.
