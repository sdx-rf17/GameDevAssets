# Setup & Deployment

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
```

Requires Node.js 18+. No server, no database, no API keys.

## Deploy to Vercel

1. Push this repo to GitHub (already done — this is the repo).
2. In Vercel: **Add New → Project → Import** this repository.
3. Framework preset: **Vite** (auto-detected).
4. Build command: `npm run build` — Output directory: `dist`.
5. No environment variables needed. Click **Deploy**.

Your data lives in each visitor's browser (`localStorage`), so the deployed
site works for any buyer without a backend.

## Replace the demo data

- **Quick way:** open the app, edit/add assets in the Pipeline tab, and use
  Export JSON in the header for backups. Use Reset to restore the demo set.
- **Permanent way:** edit `src/data/seedData.js` — replace `SEED_ASSETS`,
  `SEED_STORES`, `SEED_TEMPLATES`, `SEED_UPDATES` and `SEED_BUNDLES` with
  your own, then rebuild and redeploy. The sample prices and statuses are
  examples only.

## Add a new feature

1. Create `src/features/<name>/<Name>Feature.jsx` — keep its logic inside
   the feature folder.
2. Put persistence in `src/services/store.js` if it needs saving; the UI
   never touches `localStorage` directly.
3. Add a tab in `src/App.jsx`.
4. Run `npm run build` before committing.
