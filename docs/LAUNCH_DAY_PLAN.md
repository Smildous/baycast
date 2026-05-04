# 🚀 LAUNCH DAY EXECUTION PLAN — Baycast

**100% exécutable. Zéro décision à prendre. Ouvre, suis, copie-colle.**

**Date de lancement :** Mercredi 14 mai 2026  
**URL produit :** https://baycast-p.vercel.app  
**GitHub :** https://github.com/Smildous/baycast  
**Compte Twitter :** @baycast

---

# ═══════════════════════════════════════════
# PHASE 0 — PRE-LAUNCH CHECKLIST (5 min)
# ═══════════════════════════════════════════

Fais ces vérifications AVANT de poster quoi que ce soit.

### ✅ Check 1 — Le site fonctionne

- [ ] Ouvre https://baycast-p.vercel.app dans un onglet incognito
- [ ] La page charge en < 3 secondes
- [ ] Tu peux t'inscrire / te connecter
- [ ] Tu peux soumettre une prédiction (slider fonctionne)
- [ ] Le leaderboard s'affiche
- [ ] **Si bug →** ne lance pas. Corrige d'abord.

### ✅ Check 2 — UTM tracking fonctionne

- [ ] Ouvre https://baycast-p.vercel.app/?utm_source=test&utm_medium=launch
- [ ] Vérifie dans GA4 (Realtime) que la visite apparaît avec les params UTM
- [ ] **Si GA4 pas configuré →** lance quand même, configure GA4 après.

### ✅ Check 3 — Product Hunt draft est prêt

- [ ] Page créée sur Product Hunt (brouillon)
- [ ] Tagline, description, screenshots uploadés
- [ ] Premier comment rédigé (copié-collé depuis Section 2.2 ci-dessous)
- [ ] 10-15 supporters identifiés et prévenus par DM

### ✅ Check 4 — Comptes sociaux accessibles

- [ ] Twitter @baycast : tu es connecté
- [ ] Reddit : karma > 10 sur le compte que tu vas utiliser
- [ ] LinkedIn : accès au profil
- [ ] Product Hunt : maker profile complété (photo, bio, liens)

**→ Si les 4 checks sont OK, passe à la Phase 1.**

---

# ═══════════════════════════════════════════
# PHASE 1 — LAUNCH SEQUENCE (Jour 0)
# ═══════════════════════════════════════════

Toutes les heures sont en **ET (Eastern Time)**.  
Heure de lancement recommandée : **9:00 AM ET** le mercredi 14 mai.

---

## 🔴 H+0:00 — REDDIT POST (r/predictionmarkets)

**Heure cible :** 9:00 AM ET  
**Durée :** 5 min pour poster + rester en ligne 2h pour répondre

### ➡️ COPIER-COLLER CE TITRE :

```
I built a prediction platform where you CAN'T see the crowd before you predict. Here's why that matters.
```

### ➡️ COPIER-COLLER CE CORPS :

```
I've been researching prediction markets for the past year, and there's a problem that keeps bugging me: every major platform shows you the current odds before you place your prediction.

Polymarket shows the market price. Metaculus shows the community median. Manifold shows the odds. They all let you see the crowd before you commit your own judgment.

This seems harmless, but the research says otherwise. When people see the aggregate before predicting, their answers shift 10-20% toward the consensus. That's not wisdom of crowds — that's anchoring. The independent signal that makes crowds smart gets systematically destroyed.

The IARPA-funded Good Judgment Project demonstrated that blind, structured forecasting (where you can't see others' estimates until after committing) outperformed prediction markets by 25%.

So I built a prototype that implements this: Baycast (https://baycast-p.vercel.app). It uses a "Blind Consensus Protocol" inspired by the Delphi method:

1. You submit your prediction without seeing what others think
2. After the blind phase closes, the aggregate is revealed
3. You can revise once with full context

No money involved. No gambling. Just scored collective intelligence using Brier scores.

It's early — right now there are ~35 live questions covering topics like:
- Will OpenAI announce GPT-5 before May 15, 2026?
- Will the Federal Reserve hold rates steady at the May 2026 FOMC meeting?
- Will Bitcoin close above $100,000 on any day before May 15, 2026?
- Will SpaceX successfully launch Starship on an orbital test flight by May 20, 2026?

I'm looking for feedback from this community. Does the herding problem resonate with you? Would you use a platform that prevents it? What am I missing?

Happy to discuss the methodology, the tech, or anything else. The project is open source: GitHub (https://github.com/Smildous/baycast).
```

### ⚠️ RÈGLES REDDIT :

- [ ] Ne demande JAMAIS d'upvotes
- [ ] Reste en ligne 2h après le post
- [ ] Réponds à CHAQUE commentaire sous 30 min
- [ ] Upvote les commentaires constructifs (même critiques)

---

## 🔴 H+0:05 — REDDIT POST (r/superforecasters)

**Heure cible :** 9:05 AM ET  
**Poste juste après le premier post.** Contenu différent, adapté à l'audience.

### ➡️ COPIER-COLLER CE TITRE :

```
Implementing the Delphi method for digital forecasting — seeking feedback on my Blind Consensus Protocol design
```

### ➡️ COPIER-COLLER CE CORPS :

```
Hi all — I'm building a prediction polling platform and I'd love this community's feedback on the protocol design.

The core idea: Before you see the community's aggregate probability estimate, you must commit your own. After commitment, the aggregate is revealed and you can revise.

This is essentially a digitized Delphi method with proper scoring rules. Some design decisions I'm wrestling with:

1. Revision mechanics: Should revisions be unlimited or capped? The Good Judgment Project used 1-2 revision rounds. I'm currently planning 2 rounds (blind → reveal → revise → final).

2. Scoring: Brier scores are the obvious choice, but should I weight early predictions more heavily (to incentivize independent thinking before revision)?

3. Question resolution: How strict should resolution criteria be? I'm leaning toward Metaculus-style precise criteria, but worried about limiting the question pool.

4. Aggregation method: Simple median? Trimmed mean? Log-odds weighted average? Each has trade-offs for different question types.

5. Anti-gaming: Without money, the main incentive is reputation. How do I prevent Sybil attacks or low-effort predictions from degrading the signal?

The prototype is live at baycast-p.vercel.app and open source at GitHub (https://github.com/Smildous/baycast).

I'd especially appreciate feedback from people with experience in structured forecasting tournaments, calibration training, or the Good Judgment Project. What would make this platform genuinely useful to you?
```

---

## 🟡 H+0:30 — PRODUCT HUNT

**Heure cible :** 9:30 AM ET  
**Note :** Si tu as préparé le draft en avance, tu as juste à cliquer "Publish". Si PH est programmé pour minuit PST (3:01 AM ET), publie à ce moment-là et fais le reste de la séquence le matin.

### ➡️ TAGLINE (60 chars max) — COPIER-COLLER :

```
Blind consensus forecasting — humans + AI, scored.
```

### ➡️ SHORT DESCRIPTION (260 chars max) — COPIER-COLLER :

```
Baycast is a prediction polling platform using a Blind Consensus Protocol. Humans and AI forecast together — predict without seeing the crowd, then revise. Scored with Brier scores. No money. No gambling. Just structured forecasting that works.
```

### ➡️ FULL DESCRIPTION (product page body) — COPIER-COLLER :

```
Baycast is a prediction polling platform where humans and AI forecast the future using a blind consensus protocol — no gambling, no herding, just scored collective intelligence.

THE PROBLEM
Every prediction platform shows you the crowd's answer before you commit your own. Polymarket shows the market price. Metaculus shows the community median. This creates a well-documented herding effect: seeing the aggregate shifts your prediction 10-20% toward the consensus, destroying the independent signal that makes crowds smart.

THE SOLUTION
Baycast's Blind Consensus Protocol flips the model:

1. Blind Phase — Submit your probability estimate without seeing what anyone else thinks
2. Reveal Phase — All forecasts are revealed; see the aggregate and distribution
3. Revision Phase — One deliberate revision based on new information from the group

Both your blind and revised predictions are scored independently using Brier scores — a proper scoring rule where honesty is mathematically optimal.

WHY IT MATTERS
• Anti-herding by design — The entire UX prevents anchoring and groupthink
• AI + Human benchmarking — AI agents forecast alongside humans on the same protocol, same scoring, same leaderboard
• Two skill measurements — Independent judgment (blind phase) and information integration (revision phase) tracked separately
• No financial risk — Not gambling. No crypto. No regulatory gray areas.
• Open source — Fully transparent protocol, auditable code

BUILT ON SCIENCE
The protocol is inspired by the Delphi method (RAND Corporation, 1950s) and validated by the IARPA-funded Good Judgment Project, which demonstrated that structured prediction polling outperformed prediction markets by 25%.
```

### ➡️ CATEGORIE :

- **Primary :** Artificial Intelligence
- **Secondary :** Productivity

### ➡️ TOPICS/KEYWORDS — COPIER-COLLER :

```
prediction markets, forecasting, collective intelligence, AI benchmarking, Brier score, Delphi method, blind consensus, prediction polling, superforecasting, probability estimation, AI vs human, scored predictions
```

### ➡️ FIRST COMMENT (poste dans les 30 min) — COPIER-COLLER :

```
Hi Product Hunt! I'm Smil, the founder of Baycast.

Six months ago, I kept running into the same frustration: every time I wanted to test my judgment against the crowd on a prediction platform, I could see everyone else's answer before committing my own.

I'd open Polymarket, see the market at 72%, and think "well, I guess 68% is more reasonable than the 85% I was going to say." I wasn't forecasting — I was anchoring.

Then I read about the Good Judgment Project. An IARPA-funded tournament where 5,000 forecasters predicted geopolitical events. The winners used structured blind polling — predict first, see the crowd after — and outperformed prediction markets by 25%.

I thought: why isn't this the default?

So I built Baycast. A prediction polling platform where you CAN'T see the crowd until after you've committed. Inspired by the Delphi method from the 1950s. Scored with Brier scores. No money, no crypto, no gambling.

What makes Baycast different:
• Blind consensus — you can't see the crowd until after you've committed
• AI + humans — AI agents forecast on the same protocol as humans, scored on the same Brier scale
• No money involved — this is scored collective intelligence, not gambling
• Two-phase scoring — independent judgment and information integration measured separately
• Open source — github.com/Smildous/baycast

What's next: We're building toward the first standardized AI vs Human forecasting benchmark — a Turing Test for prediction accuracy. The API for AI agents is in development (Q3 2026).

👉 Try it: baycast-p.vercel.app — 35+ live questions across AI, geopolitics, markets, and science. Free forever.

I'd love your feedback — especially on the protocol design and what questions you'd want to see. 🚀
```

### ⚠️ RÈGLES PRODUCT HUNT :

- [ ] Réponds à CHAQUE commentaire sous 1h
- [ ] Ne demande JAMAIS d'upvotes sur PH (demande sur Twitter/Discord/email)
- [ ] Personnalise chaque réponse (pas de copier-coller)
- [ ] Surveille le ranking toutes les 2h

---

## 🟡 H+0:35 — UPVOTE ASKS (Twitter + Discord)

### ➡️ TWEET D'ANNONCE — COPIER-COLLER :

```
🚀 We just launched Baycast on Product Hunt!

A prediction polling platform with a blind consensus protocol — humans and AI forecast together, scored with Brier scores.

If you believe forecasting should reward accuracy, not capital, we'd love your support:

[PRODUCT_HUNT_URL]

#Baycast #ProductHunt
```
*(Remplace [PRODUCT_HUNT_URL] par le lien réel)*

### ➡️ MESSAGE DISCORD — COPIER-COLLER :

```
🎉 BAYCAST IS LIVE ON PRODUCT HUNT!

We need your support to get visibility today. Here's the link:
[PRODUCT_HUNT_URL]

Every upvote, comment, and share helps us reach forecasters who've never heard of blind consensus.

If you're already on Product Hunt, an upvote takes 2 seconds and means the world to us. Thank you! 💛
```

---

## 🟢 H+1:00 — TWITTER THREAD (Thread 2 : "The Future of Forecasting")

**Heure cible :** 10:00 AM ET  
**Espace chaque tweet de 2-5 minutes.** Utilise un scheduler si possible.

### ➡️ TWEET 1/11 — COPIER-COLLER :

```
We're entering the age of collective intelligence.

AI can process more data than any human. But humans still outperform AI at forecasting — because we understand context, nuance, and hidden variables that models miss.

The future isn't AI OR humans. It's AI AND humans. 🧵
```

### ➡️ TWEET 2/11 — COPIER-COLLER :

```
Here's the current state of AI forecasting:

🤖 Claude 5 and GPT-5 can crunch enormous datasets
📊 AI agents are entering prediction markets
📈 Platforms are racing to build AI benchmarks

But Vox put it best: "Why humans are still much better than AI at forecasting."
```

### ➡️ TWEET 3/11 — COPIER-COLLER :

```
The reason humans win: we have world models that AI doesn't.

A geopolitical analyst knows that a cabinet reshuffle in Country X changes the probability of Policy Y — not because it's in the data, but because they've spent years understanding the incentives.

AI sees patterns. Humans see stories.
```

### ➡️ TWEET 4/11 — COPIER-COLLER :

```
But humans have a different problem: we herd.

Show a room of experts the crowd's average, and they all converge. We anchor. We second-guess. We suppress the unique perspective that made us valuable in the first place.

This is the hidden tax on collective intelligence.
```

### ➡️ TWEET 5/11 — COPIER-COLLER :

```
Research quantifies this tax: seeing the group estimate shifts your answer by 10-20%.

In a prediction market with millions in volume, that's millions of dollars of distorted signal.

The crowd isn't wise when it's herding. It's just loud.
```

### ➡️ TWEET 6/11 — COPIER-COLLER :

```
So the question becomes: how do you combine the best of AI (data processing, scale, speed) with the best of humans (context, judgment, world models) — while preventing both from herding?

The answer is structural. You change the protocol, not just the participants.
```

### ➡️ TWEET 7/11 — COPIER-COLLER :

```
That's what we built.

Baycast uses a Blind Consensus Protocol:

1️⃣ Humans and AI agents predict WITHOUT seeing each other
2️⃣ After commitment, the aggregate is revealed
3️⃣ Both can revise with full context

Independent signal → then consensus. Always.
```

### ➡️ TWEET 8/11 — COPIER-COLLER :

```
Phase 1 (now): Human-only. Build the protocol. Prove the signal quality. Score accuracy with Brier scores over time.

Phase 2 (next): AI agents join. Same protocol. Same scoring. Now you can compare human vs. AI performance on identical questions, with identical information constraints.
```

### ➡️ TWEET 9/11 — COPIER-COLLER :

```
Imagine a leaderboard where you can see:
- Top human forecasters ranked by Brier score
- Top AI models ranked by Brier score
- Combined human+AI consensus
- Blind vs. revised predictions compared

That's not a prediction market. That's a forecasting intelligence platform.
```

### ➡️ TWEET 10/11 — COPIER-COLLER :

```
The prediction market space is converging on gambling. $15B valuations, CFTC licenses, crypto tokens.

We're building something different: a scored collective intelligence infrastructure. No money. No gambling. No manipulation.

Just the best forecast, structurally guaranteed.
```

### ➡️ TWEET 11/11 — COPIER-COLLER :

```
The future of forecasting isn't a bigger casino. It's a better protocol.

We just launched Baycast — humans first, AI next, scored collective intelligence always.

Try it → baycast-p.vercel.app

Open source: github.com/Smildous/baycast

The future is blind. 🎯

#AI #Forecasting #CollectiveIntelligence #FutureTech
```

---

## 🟢 H+2:00 — LINKEDIN POST

**Heure cible :** 11:00 AM ET

### ➡️ COPIER-COLLER :

```
Excited to share that Baycast — our blind consensus prediction platform — just launched.

We built it on a simple insight: every prediction platform shows you the crowd's answer before you predict. Research shows this creates a 10-20% anchoring effect that destroys the independent signal making crowds smart.

Our fix: predict first, see the crowd after. Scored with Brier scores. No gambling. No crypto. Just structured forecasting.

The protocol is inspired by the Delphi method (RAND Corporation, 1950s) and validated by the IARPA-funded Good Judgment Project, which outperformed prediction markets by 25%.

We're building toward the first standardized AI vs Human forecasting benchmark — same questions, same blind protocol, same scoring.

Try it: baycast-p.vercel.app

Open source: github.com/Smildous/baycast

#Forecasting #CollectiveIntelligence #AI #ProductLaunch
```

---

## 🟢 H+4:00 — EMAIL AUX PREMIERS SUPPORTERS

**Heure cible :** 1:00 PM ET  
**Envoyer à tes 10-15 early supporters + liste de contacts forecasting**

### ➡️ OBJET :

```
We launched on Product Hunt — and we need your help
```

### ➡️ CORPS — COPIER-COLLER :

```
Hi [first_name],

Baycast is live on Product Hunt today, and we need every vote we can get.

If you've ever thought "prediction markets would be better without the gambling," this is the platform for you.

One click to support: [PRODUCT_HUNT_URL]

Thank you for being part of this from the beginning.
— Smil
```

---

## 🟢 H+6:00 — MID-DAY TWEET

**Heure cible :** 3:00 PM ET

### ➡️ COPIER-COLLER :

```
We just launched Baycast — a prediction polling platform where:

✅ No money involved (not gambling)
✅ You can't see the crowd before you predict
✅ Proper scoring (Brier scores)
✅ Your accuracy is tracked over time

Try it → baycast-p.vercel.app

Feedback welcome! 🙏

#Baycast
```

---

## 🟢 H+9:00 — EVENING TWEET + RANKING MILESTONE

**Heure cible :** 6:00 PM ET

### ➡️ COPIER-COLLER (adapte le ranking) :

```
[X] hours left on Product Hunt and Baycast is ranked #[Y] today! 

If you haven't checked it out yet — it's a prediction platform where you CAN'T see the crowd before you predict. No gambling. No crypto. Just scored forecasting.

[PRODUCT_HUNT_URL]

Thank you to everyone who supported us! 🚀
```
*(Remplace [X] par les heures restantes, [Y] par le ranking, [PRODUCT_HUNT_URL] par le lien)*

---

## 🟢 H+12:00 — FINAL SWEEP

**Heure cible :** 9:00 PM ET

- [ ] Réponds à TOUS les commentaires PH restants
- [ ] Réponds à TOUS les commentaires Reddit restants
- [ ] Réponds aux tweets/mentions
- [ ] Screenshot le ranking final PH
- [ ] Note les métriques du jour (voir Phase 2)

---

# ═══════════════════════════════════════════
# PHASE 2 — FIRST 48H MONITORING
# ═══════════════════════════════════════════

## Métriques à vérifier (matin et soir, Jour 1 et Jour 2)

| Métrique | Jour 1 Cible | Jour 2 Cible | Où vérifier |
|----------|-------------|-------------|-------------|
| Visiteurs uniques | 500+ | 200+ | GA4 Realtime |
| Inscrits | 25+ | 15+ | Supabase Dashboard |
| Prédictions soumises | 50+ | 30+ | Supabase / app |
| Upvotes PH | 100+ | (cumulatif) | Product Hunt |
| Ranking PH | Top 5 | — | Product Hunt |
| Commentaires PH | 25+ | 10+ | Product Hunt |
| Upvotes Reddit (total) | 30+ | 20+ | Reddit |
| Impressions Twitter | 5,000+ | 3,000+ | X Analytics |
| Followers @baycast | 50+ | 30+ | X Analytics |

## UTM Tracking — URL templates

| Canal | URL à utiliser |
|-------|---------------|
| Product Hunt | `baycast-p.vercel.app/?utm_source=producthunt&utm_medium=launch&utm_campaign=ph_may2026` |
| Twitter | `baycast-p.vercel.app/?utm_source=twitter&utm_medium=social&utm_campaign=launch_may2026` |
| Reddit | `baycast-p.vercel.app/?utm_source=reddit&utm_medium=social&utm_campaign=launch_may2026` |
| LinkedIn | `baycast-p.vercel.app/?utm_source=linkedin&utm_medium=social&utm_campaign=launch_may2026` |
| Email | `baycast-p.vercel.app/?utm_source=email&utm_medium=newsletter&utm_campaign=launch_may2026` |

## Réponses types aux premiers commentaires

### Sur Product Hunt :

**"How is this different from Metaculus?"**
> Metaculus is great — they're our closest methodological cousin. The key difference: Metaculus shows you the community median before you predict. We don't. It's a small UX change with significant impact — research shows a 10-20% anchoring effect when you see the aggregate first.

**"How do you make money?"**
> Right now we don't — this is a prototype. Long-term: B2B partnerships, premium features, API for AI forecasting benchmarks. Core always free and open.

**"This is just a poll"**
> It's polling with proper scoring rules (Brier scores) + a blind-first mechanism that prevents anchoring. The Good Judgment Project used similar methods and outperformed prediction markets by 25%. So it's polling — but scored and structured.

**"Cool idea, but needs more questions"**
> Totally agree — we're just getting started. 35 questions live now, adding more weekly. What topics would you want to see? We take question suggestions seriously.

### Sur Reddit :

**"How is this different from Metaculus?"**
> Metaculus is great — they're actually our closest methodological cousin. The key difference is that Metaculus shows you the community median before you predict. We don't. It's a small UX change with a significant impact on prediction quality (research shows 10-20% anchoring effect when you see the aggregate first).

**"This is just a poll"**
> Fair point — it IS polling, but with a key difference. Traditional polls aggregate opinions. BCP uses proper scoring rules (Brier scores) to measure accuracy over time, and the blind-first mechanism prevents the anchoring effect. The Good Judgment Project used similar methods and outperformed prediction markets by 25%.

**"How do you make money?"**
> Right now we don't — this is a prototype. Long-term, we're exploring B2B partnerships, premium features, and potentially an API for AI forecasting benchmarks. But the core platform will always be free and open.

**"This will never work"**
> I appreciate the skepticism! The evidence base is strong — the Good Judgment Project (IARPA-funded) used methods very similar to BCP and beat prediction markets by 25%. The Delphi method has been validated across 70+ years of research. That said, the proof is in the data — we'll see how accuracy looks after a few months.

### Sur Twitter :

**Critique générique**
> Great point. What would you change about the approach? We're actively iterating on the protocol design.

**"Why not use crypto/blockchain?"**
> Two reasons: (1) money creates manipulation incentives, (2) the whole point is that prediction quality doesn't require financial skin in the game. Brier scores + reputation > tokenomics for accuracy.

---

# ═══════════════════════════════════════════
# PHASE 3 — FIRST FORECASTS STRATEGY
# ═══════════════════════════════════════════

**Objectif :** 10-50 prédictions dans les premières 48h. Le site vide = aucun visiteur ne s'inscrit.

## Étape 1 — Smil forecast lui-même (Jour 0, H-1h)

**Fais-le AVANT le lancement public.** Prédit sur 15-20 questions.

- [ ] Crée un compte Baycast
- [ ] Prédis sur au moins 15 questions (couvre tous les thèmes : AI, geopolitique, marchés, science)
- [ ] Mets des probabilités réfléchies (pas 50/50 partout)
- [ ] Ça garantit que le leaderboard n'est pas vide et que les visiteurs voient de l'activité

## Étape 2 — Amis et early supporters (Jour 0, matin)

**Envoie ce message à 5-10 personnes de confiance (avant ou pendant le lancement) :**

```
Hey! I'm launching my prediction platform today. I need a huge favor — can you create an account and make 5-10 predictions? Takes 5 minutes. No spam, no money, just forecasting.

Link: baycast-p.vercel.app

It'll help a LOT to have some data when the first visitors arrive. Thank you! 🙏
```

**Objectif :** 5-10 amis × 5-10 prédictions = 25-100 prédictions

## Étape 3 — Communautés forecasting (Jour 1-2)

### Reddit — réponds aux commentaires de ton post avec un CTA :

```
If you want to try the protocol yourself, the prototype is live: baycast-p.vercel.app

I'd especially love to see your predictions on [specific question relevant to the commenter's interest].
```

### Discord/Slack forecasting communities :

- [ ] Metaculus Discord — partage dans #general ou #metaculus-discussion (pas de spam)
- [ ] LessWrong — si tu as un compte, mentionne dans un Open Thread
- [ ] ACX comment section — si un article sur forecasting est récent

## Étape 4 — Email aux forecasters identifiés (Jour 1)

**Utilise le template d'email acquisition (docs/EMAIL_ACQUISITION_TEMPLATE.md) :**

### Objet :
```
You're good at predicting things. We built a protocol that proves it.
```

### Corps :
```
Hi [first_name],

You've probably seen the headlines. Polymarket raised $400M at a $15B valuation. Congress is investigating insider trading. Romania banned 300 prediction market sites.

Here's the thing nobody is talking about: every prediction platform has the same structural flaw. They all show you the crowd's answer before you predict.

That's not forecasting. That's herding. Research shows it shifts your estimate by 10–20% toward the consensus.

We built something different. Baycast uses a Blind Consensus Protocol — you predict before seeing anyone else's answer. The aggregate stays hidden until everyone has committed. Then you can revise with full context.

No crypto. No real money. No gambling. Just scored collective intelligence.

The proto is live with 35+ questions. We're looking for 50 forecasters to stress-test the protocol.

→ Try Baycast: baycast-p.vercel.app

Open source: github.com/Smildous/baycast

Questions? Reply to this email. I read everything.

— Smil, Baycast
```

**Cibles prioritaires :** Metaculus top forecasters, GJP alumni, ACX/LessWrong members actifs, AI researchers.

## Étape 5 — Crée des questions engageantes (Jour 0-1)

Assure-toi que ces types de questions sont présentes :
- **Actualité chaude** (GPT-5, Fed, Bitcoin, élections)
- **AI vs Human** (quand Claude 5/GPT-5 feront X)
- **Controversées** (topics avec une vraie incertitude, pas 95/5)

---

# ═══════════════════════════════════════════
# PHASE 4 — EMERGENCY PLAYBOOK
# ═══════════════════════════════════════════

## 🚨 Scénario 1 : Le site crash

**Symptôme :** baycast-p.vercel.app ne charge plus, erreurs 500, timeout

**Actions immédiates (dans l'ordre) :**

1. **Vérifie Vercel Dashboard** → onglet Deployments. Le dernier deploy est en erreur ?
2. **Vérifie Supabase** → Status page (status.supabase.com). Outage en cours ?
3. **Redeploy :**
   ```bash
   cd /root/baycast
   git pull
   vercel --prod
   ```
4. **Si le problème persiste > 30 min :** poste un message sur tous les canaux actifs :

> ```
> Hey everyone — we're experiencing some technical issues with the site right now. Working on fixing it ASAP. If you tried Baycast and it didn't load, please try again in 30 minutes. Sorry about this!
> ```

5. **Une fois réparé :** poste un update :
> ```
> We're back up! Thanks for your patience. Everything should be working now. Let me know if you see any issues.
> ```

6. **Si crash pendant le pic PH (perte de ranking) :** double les efforts sur Twitter + Reddit le lendemain pour compenser.

---

## 🚨 Scénario 2 : Critique négative virale

**Symptôme :** Un tweet ou commentaire Reddit avec beaucoup d'engagement critique Baycast

**Règle #1 : NE TE DÉFENDS PAS. Réponds avec substance.**

### Si la critique est légitime (bug, UX, manque de features) :

```
You're right — [acknowledge the specific issue]. This is a prototype and we're actively improving it. [Explain what you're doing about it].

What would you want to see improved? Genuinely interested in your feedback.
```

### Si la critique est "this is just a poll / already exists" :

```
Fair point — and it IS polling, but with a key difference. [Use the response template from Phase 2]. The proof will be in the accuracy data over time.

What would convince you that blind consensus adds value over existing approaches?
```

### Si la critique est "the founder is spamming Reddit" :

```
Guilty as charged — I am the founder and I've been posting about my project. I've tried to lead with genuine discussion value in each post and tailor the content to each subreddit's interests.

If the community feels it's too much, I'll step back. That said, I'm genuinely looking for forecasting methodology feedback and I think the protocol design questions are worth discussing.
```

### Si la critique devient personnelle / hostile :

**Ne réponds pas.** Ignore. Concentre-toi sur les commentaires constructifs.

---

## 🚨 Scénario 3 : Zero signups après 12h

**Symptôme :** Le trafic arrive (GA4 montre des visites) mais personne ne s'inscrit

**Diagnostic (dans l'ordre) :**

1. **Le bouton signup est-il visible ?** Ouvre le site en mobile. Le CTA est-il au-dessus de la fold ?
2. **L'inscription fonctionne-t-elle ?** Teste en incognito : signup → email → vérifie que le compte est créé
3. **Est-ce que les visiteurs arrivent sur la bonne page ?** Vérifie les UTM. Est-ce qu'ils atterrissent sur une 404 ?
4. **Le site est-il trop vide ?** Si le leaderboard est vide et aucune prédiction n'existe → retourne à Phase 3 (First Forecasts Strategy). Personne ne s'inscrit sur un site fantôme.

**Actions correctives :**

- [ ] Ajoute un banner CTA plus visible ("Join 50+ forecasters — predict now")
- [ ] Assure-toi qu'il y a au moins 20 prédictions sur le site (Phase 3)
- [ ] Simplifie le signup si possible (OAuth Google/GitHub ?)
- [ ] Si le problème persiste, poste sur Twitter en demandant du feedback sur l'UX :
  ```
  Honest question for anyone who checked out Baycast today: did you try signing up? If not, what stopped you? Genuinely trying to improve the onboarding.
  ```

---

## 🚨 Scénario 4 : Post Reddit downvoted / supprimé

**Symptôme :** Le post sur r/predictionmarkets ou r/superforecasters a plus de downvotes que d'upvotes, ou a été supprimé par un mod

**Actions :**

1. **Ne re-poste PAS immédiatement** (risque de ban)
2. **Si supprimé par un mod :** envoie un message poli au mod :
   ```
   Hi, my post was removed. I believe I followed the subreddit rules (disclosed affiliation, led with discussion value, not just a link). Could you let me know what I need to change? Happy to adjust.
   ```
3. **Si downvoted massivement :** analyse pourquoi. Le titre était-il trop clickbaity ? Le tone était-il trop promotional ?
4. **Pivot :** poste dans un subreddit différent (r/SideProject, r/startups, r/artificial) avec un angle adapté
5. **Note :** un post downvoted n'est pas grave si le traffic PH + Twitter compense

---

## 🚨 Scénario 5 : Product Hunt ranking plonge

**Symptôme :** PH ranking descend en dessous du top 10 après midi

**Actions immédiates :**

1. **Vérifie le nombre de commentaires** → as-tu répondu à tout ? (Les réponses boostent le ranking)
2. **Augmente l'amplification sociale :**
   - Poste le tweet d'upvote ask une deuxième fois
   - Envoie l'email aux supporters (Phase 1, H+4)
   - Demande aux amis de commenter (pas juste upvoter)
3. **Surveille jusqu'à 11:59 PM PST** — le ranking final est ce qui compte

---

# ═══════════════════════════════════════════
# RÉSUMÉ RAPIDE — CHECKLIST IMPRIMABLE
# ═══════════════════════════════════════════

## Jour 0 (Mercredi 14 mai)

- [ ] Pre-launch checklist (5 min)
- [ ] 9:00 AM — Reddit r/predictionmarkets
- [ ] 9:05 AM — Reddit r/superforecasters
- [ ] 9:30 AM — Product Hunt (publish + first comment)
- [ ] 9:35 AM — Tweet upvote ask + Discord ask
- [ ] 10:00 AM — Twitter Thread "Future of Forecasting" (11 tweets, 2-5 min d'écart)
- [ ] 11:00 AM — LinkedIn post
- [ ] 1:00 PM — Email aux supporters
- [ ] 3:00 PM — Mid-day CTA tweet
- [ ] 6:00 PM — Evening ranking tweet
- [ ] 9:00 PM — Final comment sweep (PH + Reddit + Twitter)

## Jour 1 (Jeudi 15 mai)

- [ ] Matin : check métriques (tableau Phase 2)
- [ ] Poste "Thank you" sur tous les canaux
- [ ] Screenshot ranking PH final → partage
- [ ] Réponds aux commentaires restants
- [ ] Email aux forecasters (template Phase 3, Étape 4)
- [ ] Reddit r/technology post (si pas encore fait)
- [ ] Soir : check métriques

## Jour 2 (Vendredi 16 mai)

- [ ] Matin : check métriques
- [ ] Poste "lessons learned" sur Twitter
- [ ] Show HN sur Hacker News (si prêt)
- [ ] Soir : bilan 48h → note ce qui a marché, ce qui n'a pas marché

---

*Document créé : 4 mai 2026. Synthétisé depuis 14+ fichiers docs/. Tout le contenu est prêt à copier-coller. Aucune décision à prendre — exécute dans l'ordre.*  
*Sources : LAUNCH_PLAYBOOK.md, REDDIT_FIRST_POST.md, REDDIT_LAUNCH_STRATEGY.md, TWEET_THREADS_LAUNCH.md, TWEET_TEMPLATES.md, EMAIL_ACQUISITION_TEMPLATE.md, PRODUCT_HUNT_LAUNCH.md, PUBLICATION_CALENDAR.md*
