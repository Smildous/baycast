# AQ-229 source review gate, May 20

Scope: exactly the 10 live questions flagged as missing a usable resolution URL. No Supabase write was made. Each proposed change touches only `questions.resolution_source` and is scoped by the live row id plus the current value.

## 1. COVID variant WHO PHEIC 2026

Live row: `0908aa9e-f1dd-46bb-b86f-5ea364072a65`
Question: `Will a new COVID variant trigger WHO PHEIC in 2026?`
Current source: `who.int`

Canonical URL to use: `https://www.who.int/emergencies/disease-outbreak-news`

This is objective enough because WHO is the body that declares a Public Health Emergency of International Concern under the International Health Regulations. Disease Outbreak News and linked emergency committee statements are official WHO records, not market commentary.

Wording is still safe. It says WHO, PHEIC, SARS-CoV-2, and calendar year 2026. The only note for resolution is to require a new PHEIC declaration related to SARS-CoV-2, not a routine variant designation or risk update.

BCP-safe proposed row update:

```sql
update questions
set resolution_source = 'https://www.who.int/emergencies/disease-outbreak-news'
where id = '0908aa9e-f1dd-46bb-b86f-5ea364072a65'
  and resolution_source = 'who.int';
```

## 2. China military action against Taiwan before 2028

Live row: `1ebe526f-b5b0-475a-af3b-b90935dde955`
Question: `Will China initiate military action against Taiwan before 2028?`
Current source: `Reuters / UN Security Council`

Canonical URL to use: `https://apnews.com/hub/taiwan`

This is objective enough for a public live question because AP gives dated, attributable reporting on Taiwan and cross-strait military escalation. It is a single durable URL and avoids a vague mixed source that points users nowhere.

Wording is still usable, but it is the weakest of the 10. `Military action` can include too much. The description narrows it to invasion, blockade, or sustained military engagement, which keeps it resolvable. Routine air defense zone crossings, exercises, speeches, sanctions, cyber activity, or one-off harassment should not count unless the AP record describes an invasion, blockade, or sustained engagement against Taiwan.

BCP-safe proposed row update:

```sql
update questions
set resolution_source = 'https://apnews.com/hub/taiwan'
where id = '1ebe526f-b5b0-475a-af3b-b90935dde955'
  and resolution_source = 'Reuters / UN Security Council';
```

## 3. EU AI Act fully enforced by mid-2027

Live row: `2e65e27f-2142-4d67-b7c2-5ec46d0f8961`
Question: `Will the EU AI Act be fully enforced by mid-2027?`
Current source: `Official Journal of the European Union`

Canonical URL to use: `https://eur-lex.europa.eu/eli/reg/2024/1689/oj`

This is objective for the legal part because EUR-Lex is the official text of Regulation (EU) 2024/1689. It gives the application dates and entry-into-force mechanics from the law itself.

Wording is not fully safe. `Fully enforced` and `actively enforced across all member states` are broader than the legal application date. The source can settle whether all provisions are in force before July 1, 2027. It cannot cleanly prove active enforcement in every member state without extra national sources. If kept live, resolve on the narrower legal meaning: all provisions applicable under the AI Act by the deadline.

BCP-safe proposed row update:

```sql
update questions
set resolution_source = 'https://eur-lex.europa.eu/eli/reg/2024/1689/oj'
where id = '2e65e27f-2142-4d67-b7c2-5ec46d0f8961'
  and resolution_source = 'Official Journal of the European Union';
```

## 4. Fed cut rates before Q3 2027

Live row: `4f67ba46-a86a-4f2c-94c6-8ddbfad50406`
Question: `Will the Fed cut rates before Q3 2027?`
Current source: `federalreserve.gov`

Canonical URL to use: `https://www.federalreserve.gov/monetarypolicy/fomccalendars.htm`

This is objective because the Federal Reserve posts each FOMC statement and implementation note from the calendar page. The target range is explicit, dated, and official.

Wording is safe. A reduction of at least 25 basis points before July 1, 2027 is directly checkable against the target range in the official statements. Forward guidance does not count.

BCP-safe proposed row update:

```sql
update questions
set resolution_source = 'https://www.federalreserve.gov/monetarypolicy/fomccalendars.htm'
where id = '4f67ba46-a86a-4f2c-94c6-8ddbfad50406'
  and resolution_source = 'federalreserve.gov';
```

## 5. Brent crude exceed $120 per barrel in 2026

Live row: `4fb51e69-ceed-4362-b55a-d5b28118885c`
Question: `Will Brent crude exceed $120/barrel in 2026?`
Current source: `ICE / Bloomberg`

Canonical URL to use: `https://www.ice.com/products/219/Brent-Crude-Futures`

This is objective because ICE is the exchange for Brent crude futures and publishes the contract specification plus market data path for the product. The question uses a settlement threshold, so the exchange record is the right anchor.

Wording is safe if resolution uses the official daily settlement for the relevant front-month Brent futures contract. The title is a little short, but the description has the needed `settle above $120 USD per barrel on any trading day during 2026` test.

BCP-safe proposed row update:

```sql
update questions
set resolution_source = 'https://www.ice.com/products/219/Brent-Crude-Futures'
where id = '4fb51e69-ceed-4362-b55a-d5b28118885c'
  and resolution_source = 'ICE / Bloomberg';
```

## 6. Commercial fusion net energy gain by 2030

Live row: `81986c55-181f-4780-a584-416216b26f3e`
Question: `Will commercial fusion achieve net energy gain by 2030?`
Current source: `Nature / Science / DOE`

Canonical URL to use: `https://www.energy.gov/science/fes/fusion-energy-sciences`

This is objective enough as the canonical gate because DOE Fusion Energy Sciences is the official US government program page for fusion energy science and links to DOE statements on fusion milestones. It is more stable than a bundle of journal names.

Wording is only partly safe. `Commercial entity`, `sustained`, and `Q > 1` need strict handling. The source should be used for DOE confirmation or DOE-linked documentation of a commercial fusion system producing sustained fusion energy gain above Q greater than 1 before January 1, 2030. A single physics shot, a private press claim with no independent confirmation, or non-commercial lab-only gain should not count.

BCP-safe proposed row update:

```sql
update questions
set resolution_source = 'https://www.energy.gov/science/fes/fusion-energy-sciences'
where id = '81986c55-181f-4780-a584-416216b26f3e'
  and resolution_source = 'Nature / Science / DOE';
```

## 7. Global average temperature exceed +1.5C in 2026

Live row: `9098d36d-b61e-488f-bb85-62b3df5c049f`
Question: `Will global average temperature exceed +1.5C in 2026?`
Current source: `NASA GISS / Copernicus`

Canonical URL to use: `https://climate.copernicus.eu/climate-bulletins`

This is objective because Copernicus publishes monthly and annual global climate bulletins with explicit anomalies relative to pre-industrial baselines. The annual 2026 summary should state whether the full calendar year exceeded 1.5°C above 1850 to 1900.

Wording is safe. It asks for full-year global mean surface temperature anomaly above pre-industrial levels, not a single month or rolling 12-month period. Resolve from the first Copernicus annual 2026 statement, then ignore later minor revisions unless the product owner decides otherwise before writing.

BCP-safe proposed row update:

```sql
update questions
set resolution_source = 'https://climate.copernicus.eu/climate-bulletins'
where id = '9098d36d-b61e-488f-bb85-62b3df5c049f'
  and resolution_source = 'NASA GISS / Copernicus';
```

## 8. India crewed Moon landing before 2028

Live row: `93221d0c-5099-48cd-b756-1607e2ae880d`
Question: `Will India land a crewed spacecraft on the Moon before 2028?`
Current source: `ISRO official communications`

Canonical URL to use: `https://www.isro.gov.in/Press.html`

This is objective because ISRO is the mission operator and its press releases are the official record for launches, mission status, and landing results.

Wording is safe enough. The event is high-signal and binary: an ISRO crewed mission must land on the lunar surface before January 1, 2028. Crewed orbit, uncrewed landing, international passenger status without ISRO mission control, or a planned launch that does not land should not count.

BCP-safe proposed row update:

```sql
update questions
set resolution_source = 'https://www.isro.gov.in/Press.html'
where id = '93221d0c-5099-48cd-b756-1607e2ae880d'
  and resolution_source = 'ISRO official communications';
```

## 9. GPT-5 before end 2026

Live row: `d451ce46-a8da-46a1-8452-6d49f73cc636`
Question: `Will GPT-5 be released before end of 2026?`
Current source: `openai.com`

Canonical URL to use: `https://openai.com/news/rss.xml`

This is objective because OpenAI's own news feed is an official place for public model release announcements. A model name, availability, and date can be checked there without relying on rumors or secondary coverage.

Wording is not fully safe. `Officially named GPT-5` is clean, but `(or equivalent next-gen successor)` creates room for argument if OpenAI ships a differently branded frontier model. For BCP, use the strict reading unless the product owner rewrites before resolution: YES only for a public OpenAI release that is named GPT-5 before December 31, 2026.

BCP-safe proposed row update:

```sql
update questions
set resolution_source = 'https://openai.com/news/rss.xml'
where id = 'd451ce46-a8da-46a1-8452-6d49f73cc636'
  and resolution_source = 'openai.com';
```

## 10. Bitcoin exceed $200,000 before 2027

Live row: `f106f845-82ad-4137-aa11-09b497e92848`
Question: `Will Bitcoin exceed $200,000 before 2027?`
Current source: `CoinGecko`

Canonical URL to use: `https://api.coingecko.com/api/v3/coins/bitcoin`

This is objective enough because CoinGecko gives a public BTC data endpoint with market data and all-time high fields. It is accessible without choosing a private terminal.

Wording is slightly mismatched but still usable. The description says any major exchange, naming Binance, Coinbase, and Kraken, while the source is an aggregate. To stay BCP-safe with a single source URL, resolve YES if CoinGecko records BTC above $200,000 before January 1, 2027. If only one exchange briefly prints above $200,000 and CoinGecko does not, that should go to manual review rather than an automatic YES.

BCP-safe proposed row update:

```sql
update questions
set resolution_source = 'https://api.coingecko.com/api/v3/coins/bitcoin'
where id = 'f106f845-82ad-4137-aa11-09b497e92848'
  and resolution_source = 'CoinGecko';
```
