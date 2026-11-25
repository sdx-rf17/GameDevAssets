# Game Dev Asset Command Center

A simple dashboard for indie game developers who sell Unity (C#) and Roblox (Luau) assets — track every asset from idea to storefront, plan bundles, and draft store listings.

**No server. No account. No tracking.** The app runs entirely in the browser and stores your data in `localStorage`. Export a JSON backup any time from the header.

## Who it is for

- Unity developers selling C# systems, tools and templates on the Asset Store, itch.io, Gumroad or Fab.
- Roblox developers selling Luau systems and plugins on the Creator Store, BuiltByBit or itch.io.
- Anyone who wants one place to see what is built, what is tested, what is documented, and what is live.

## Features

- **Asset Pipeline** — Kanban + table. Stages: Idea → Architecture & Coding → Demo Scene / Test Place → Documentation → Uploaded & Live. Each asset has engine, category, marketplaces, price, version, upload status, and a 5-item pre-upload checklist. Move stages, edit price/version, add assets, search and filter.
- **Storefront Hub** — marketplace list (Unity Asset Store, Roblox Creator Store, itch.io, Gumroad, LemonSqueezy, BuiltByBit, Payhip, Fab, GameDevMarket, CGTrader, Codester, CodeCanyon) with space for your own profile details, plus 6 copyable templates: Feature List, Technical Specs, Setup Instructions, Changelog, Store Bio, README.
- **Update Monitor** — curated update notes with links to the official changelogs. It does **not** live-scrape anything: you add notes yourself when a Unity LTS, a Luau change, or a store fee affects your assets.
- **Bundle Planner** — build a Genre Starter Kit from 3–4 assets. Suggested bundle price = sum −28%. Net = 70% of the bundle price (Unity Asset Store split).
- **Code Analyzer** — paste C# or Luau code. A client-side heuristic counts classes/functions, flags TODOs and debug calls, and drafts a README, a store listing, and an edge-case test list. No code leaves the browser, and it is not AI.

## Demo data

The app ships with **sample demo data only**: 12 sample Unity systems and 1 sample Roblox bundle, all v0.1.0, priced $19–$39 (catalogue gross $318). No sales, orders or reviews exist — the header shows $0 / 0 orders. **Replace the demo data with your own assets** (edit `src/data/seedData.js`, or add/edit assets from the app and use Reset to restore the demo set).

## Run locally

```bash
npm install
npm run dev     # http://localhost:5173
npm run build   # production build into dist/
```

Requires Node.js 18+.

## Deploy to Vercel

See [docs/SETUP.md](docs/SETUP.md). Short version: import this repo in Vercel, framework Vite, build command `npm run build`, output directory `dist`. No environment variables needed.

## Project structure

```
src/
  main.jsx            Entry point
  App.jsx             Shell: tabs, stats, import/export/reset
  index.css           All styles (one dark theme)
  data/seedData.js    Demo data — the only place with sample content
  services/store.js   localStorage persistence — the only place that touches it
  features/
    assets/           Pipeline tracker (Kanban + table + detail modal)
    stores/           Storefront hub + listing templates
    updates/          Update monitor (curated notes)
    bundles/          Bundle planner + gap suggestions
    analyzer/         Code analyzer (client-side heuristics)
  shared/
    components/ui.jsx Shared Stat / Badge / SectionTitle / CopyButton
    utils/money.js    Price, total, bundle and checklist math
```

## Licence

MIT — see [LICENSE](LICENSE).
