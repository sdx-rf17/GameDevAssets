import { useEffect, useState } from 'react'
import AssetsFeature from './features/assets/AssetsFeature.jsx'
import StoresFeature from './features/stores/StoresFeature.jsx'
import UpdatesFeature from './features/updates/UpdatesFeature.jsx'
import BundlesFeature from './features/bundles/BundlesFeature.jsx'
import AnalyzerFeature from './features/analyzer/AnalyzerFeature.jsx'
import { loadState, saveState, resetState, exportState, importState } from './services/store.js'
import { grossTotal, netTotal, formatMoney } from './shared/utils/money.js'
import { Stat } from './shared/components/ui.jsx'

const TABS = [
  { id: 'assets', label: 'Asset Pipeline' },
  { id: 'stores', label: 'Storefront & Profiles' },
  { id: 'updates', label: 'Update Monitor' },
  { id: 'bundles', label: 'Bundles & Income' },
  { id: 'analyzer', label: 'Code Analyzer' }
]

export default function App() {
  const [state, setState] = useState(() => loadState())
  const [tab, setTab] = useState('assets')

  useEffect(() => { saveState(state) }, [state])

  const priced = state.assets.filter((a) => a.price != null)
  const live = state.assets.filter((a) => a.stage === 'live').length

  const handleImport = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      const text = await file.text()
      setState(importState(text))
    } catch (err) {
      alert('Import failed: ' + err.message)
    }
    e.target.value = ''
  }

  const handleExport = () => {
    const blob = new Blob([exportState(state)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'gamedev-assets-backup.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>Game Dev Asset Command Center</h1>
          <p className="muted">Unity C# &amp; Roblox Luau assets — from idea to storefront. Demo data — replace with your own assets. Data is stored locally in your browser; export a backup before clearing it.</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-ghost btn-sm" type="button" onClick={handleExport}>Export JSON</button>
          <label className="btn btn-ghost btn-sm file-label">
            Import JSON
            <input type="file" accept="application/json" hidden onChange={handleImport} />
          </label>
          <button className="btn btn-ghost btn-sm" type="button" onClick={() => { if (window.confirm('Reset all data to the original seed data? Your edits will be lost.')) setState(resetState()) }}>Reset data</button>
        </div>
      </header>

      <div className="stats-row">
        <Stat label="Assets" value={state.assets.length} sub={`${priced.length} priced · ${live} live`} />
        <Stat label="Catalogue gross" value={formatMoney(grossTotal(priced))} sub="Sum of set prices (12 Unity systems = $318)" />
        <Stat label="Net at 70%" value={formatMoney(netTotal(priced))} sub="Unity Asset Store split, before tax/refunds" />
        <Stat label="Sales so far" value="$0" sub="0 orders, 0 reviews — nothing sold yet" />
        <Stat label="Stores tracked" value={state.stores.length} sub="Add your store profiles" />
      </div>

      <nav className="tabs">
        {TABS.map((t) => (
          <button key={t.id} type="button" className={'tab ' + (tab === t.id ? 'tab-active' : '')} onClick={() => setTab(t.id)}>
            {t.label}
          </button>
        ))}
      </nav>

      <main>
        {tab === 'assets' && <AssetsFeature state={state} onChange={setState} />}
        {tab === 'stores' && <StoresFeature state={state} />}
        {tab === 'updates' && <UpdatesFeature state={state} onChange={setState} />}
        {tab === 'bundles' && <BundlesFeature state={state} onChange={setState} />}
        {tab === 'analyzer' && <AnalyzerFeature />}
      </main>

      <footer className="footer">
        <p>
          Demo data: the 13 sample assets are examples, not a real catalogue. No store listing, sale, order or review
          exists here — replace the demo data with your own assets. The update feed is curated notes, not a live
          scraper. The code analyzer is a client-side heuristic, not AI.
        </p>
      </footer>
    </div>
  )
}
