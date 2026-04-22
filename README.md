# Baycast — The Prediction Polling Protocol

> Harnessing collective intelligence and AI agents to outperform prediction markets.

---

## What is Baycast?

Baycast is a **decentralized prediction polling protocol** that combines the wisdom of the crowd with AI-powered forecasting agents to deliver calibrated probability estimates — consistently outperforming traditional prediction markets.

Unlike prediction markets (Polymarket, Kalshi), Baycast is **not a gambling platform**. It is a collective intelligence protocol that rewards expertise, calibration, and intellectual rigor — not capital size or risk appetite.

### Why prediction polling?

Research from the IARPA-funded **Good Judgment Project** demonstrated that structured prediction polling outperforms prediction markets by **25%**. Baycast translates these scientific findings into a live protocol:

- **Proper scoring rules** (Brier + logarithmic) make honesty the dominant strategy
- **Blind consensus protocol** (Delphi-inspired) eliminates anchoring bias
- **AI agents** participate as first-class citizens alongside human forecasters
- **On-chain reputation** creates tamper-proof, portable track records

---

## Features (Current MVP)

- [x] User authentication (Supabase Auth)
- [x] Binary question creation (admin)
- [x] Probability forecasting with slider (1%–99%)
- [x] Aggregate consensus display (geometric mean)
- [x] Brier score calculation on resolution
- [x] Leaderboard with time-period filters (all / month / week)
- [x] Profile pages with calibration charts
- [x] Category filtering (Politics, Technology, Economy, Science, Sports, Culture)
- [x] Auto-close expired questions
- [x] Admin dashboard with audit log
- [x] Responsive dark-theme UI

---

## Roadmap

| Phase | Timeline | Milestones |
|-------|----------|------------|
| **1. Foundation** | Q3–Q4 2026 | Landing page, community channels, free play MVP with leaderboard |
| **2. Testnet** | Q1 2027 | Polygon testnet, smart contract audit, community beta, AI agent API spec |
| **3. Mainnet** | Q2 2027 | BAY token IDO, paid question blocks, NFT membership, AI agent registration |
| **4. AI Integration** | Q3–Q4 2027 | Baycast Benchmark, sponsored challenges, enterprise data API |
| **5. Scale** | 2028+ | L2 deployment, DeFi oracle integrations, progressive DAO decentralization |

---

## Tech Stack

- **Frontend:** Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **Backend/DB:** Supabase (PostgreSQL + Auth + RLS)
- **Charts:** Recharts
- **Hosting:** Vercel

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm
- A [Supabase](https://supabase.com) project

### Setup

```bash
# Clone the repo
git clone https://github.com/Smildous/baycast.git
cd baycast

# Install dependencies
npm install

# Create your environment file
cp .env.example .env.local
```

### Environment Variables

Create a `.env.local` file with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### Database Setup

Run the SQL schema in your Supabase SQL Editor:

```bash
# The schema file is at the root of the project
# Copy the contents of baycast_supabase_schema.sql into Supabase SQL Editor
```

### Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
baycast/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Landing / home
│   ├── questions/         # Question listing + detail
│   ├── leaderboard/       # Brier score rankings
│   ├── profile/           # User profiles
│   ├── settings/          # User settings
│   ├── admin/             # Admin dashboard
│   └── auth/              # Login / signup
├── components/            # React components
│   ├── QuestionCard.tsx
│   ├── ForecastForm.tsx
│   ├── ForecastSlider.tsx
│   ├── CalibrationChart.tsx
│   └── ...
├── lib/
│   ├── types.ts           # TypeScript interfaces
│   ├── utils.ts           # Scoring + helpers
│   └── supabase/          # Supabase client (server + client)
├── baycast_supabase_schema.sql  # Full DB schema
└── sql/                   # DB migrations
```

---

## Scoring

Baycast uses **proper scoring rules** to ensure honest forecasting:

- **Brier Score (Quadratic):** `(prediction - outcome)^2` — lower is better (0 = perfect)
- **Logarithmic Score:** `ln(prediction)` — rewards bold correct calls, penalizes overconfidence

The protocol aggregates forecasts using the **geometric mean** of probabilities, which naturally weights confident agreement.

---

## Contributing

Baycast is in early development. Contributions, ideas, and feedback are welcome.

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## License

Proprietary — All rights reserved. Open-source licensing to be determined as the protocol matures.

---

## Links

- **Live prototype:** [baycast-p.vercel.app](https://baycast-p.vercel.app)
- **Whitepaper:** Available upon request / in the repo docs
- **Founder:** Smil ([@Smildous](https://github.com/Smildous))

---

*Baycast — Where Bayes meets the crowd.*
