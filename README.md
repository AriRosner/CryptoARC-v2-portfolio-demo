# CryptoARC v2 Portfolio Demo

This repository is a portfolio-safe showcase build of CryptoARC v2.

It is intentionally separated from the private working repository and uses curated mock data only. The goal is to let reviewers explore the product experience without exposing the production backend, strategy implementation, operational code, or live-trading internals.

## What This Demo Shows

- Live Monitor experience with token queue, watchlist, P&L card, and token detail view
- Analysis workspace with readiness, diagnostics, strategy performance, and tuning suggestions
- Replay Lab / Backtests workspace with representative historical runs
- Trade Review workspace with timeline, decision context, and labeling flow
- Data & Intelligence workspace with audit-style surfaces, health, readiness, and operations summaries
- Live Wallet showcase modal illustrating the manual browser-wallet direction at a product level

## What This Demo Does Not Include

- No real backend
- No private keys or wallet signing
- No live execution
- No private strategy logic
- No real data feeds
- No production auth or deployment internals

## Tech

- React
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Recharts

## Easiest Way To Open It

For most Windows users:

1. Make sure [Node.js LTS](https://nodejs.org/) is installed once on the computer.
2. Double-click [Open CryptoARC Demo.cmd](./Open%20CryptoARC%20Demo.cmd).
3. Wait a few seconds while the demo starts.
4. Your browser should open automatically.

The first launch may take a little longer because it installs the demo dependencies.

## Developer Run

```powershell
npm install
npm run dev -- --host 127.0.0.1 --port 4173
```

## Build

```powershell
npm run build
```

## Notes

This demo is meant for portfolio review, interviews, and product walkthroughs. It is not intended to represent the full internal architecture or production safety implementation of the private CryptoARC v2 codebase.
