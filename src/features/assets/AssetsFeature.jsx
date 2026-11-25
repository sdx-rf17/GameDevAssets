import { useMemo, useState } from 'react'
import { STAGES, CHECKLIST_ITEMS, ENGINES, CATEGORIES } from '../../data/seedData.js'
import { formatPrice, checklistDone } from '../../shared/utils/money.js'
import { Badge, SectionTitle } from '../../shared/components/ui.jsx'
import { toggleChecklist, updateAsset, addAsset } from '../../services/store.js'

const stageTone = { idea: 'muted', coding: 'blue', demo: 'amber', docs: 'violet', live: 'green' }

export default function AssetsFeature({ state, onChange }) {
  const [query, setQuery] = useState('')
  const [engineFilter, setEngineFilter] = useState('All')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [view, setView] = useState('kanban')
  const [selectedId, setSelectedId] = useState(null)
  const [showAdd, setShowAdd] = useState(false)
  const [form, setForm] = useState({ name: '', engine: 'Unity C#', category: 'Template', price: '', version: '0.1.0', notes: '' })

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return state.assets.filter((a) => {
      if (engineFilter !== 'All' && a.engine !== engineFilter) return false
      if (categoryFilter !== 'All' && a.category !== categoryFilter) return false
      if (q && !(a.name + ' ' + a.category + ' ' + a.engine).toLowerCase().includes(q)) return false
      return true
    })
  }, [state.assets, query, engineFilter, categoryFilter])

  const selected = state.assets.find((a) => a.id === selectedId) || null

  const commit = (next) => onChange(next)

  const moveStage = (asset, dir) => {
    const idx = STAGES.findIndex((s) => s.id === asset.stage)
    const next = STAGES[Math.min(STAGES.length - 1, Math.max(0, idx + dir))]
    if (next.id !== asset.stage) commit(updateAsset(state, asset.id, { stage: next.id }))
  }

  const submitAdd = (e) => {
    e.preventDefault()
    if (!form.name.trim()) return
    commit(addAsset(state, { ...form, price: form.price === '' ? null : Number(form.price) }))
    setForm({ name: '', engine: 'Unity C#', category: 'Template', price: '', version: '0.1.0', notes: '' })
    setShowAdd(false)
  }

  return (
    <div>
      <SectionTitle
        title="Asset Pipeline & Upload Tracker"
        sub="13 assets. Move each one through the stages, tick the 5-item pre-upload checklist, and keep price and version current. Demo data — replace with your own assets. Nothing here is live on a store."
      />

      <div className="toolbar">
        <input className="input" placeholder="Search assets…" value={query} onChange={(e) => setQuery(e.target.value)} />
        <select className="input" value={engineFilter} onChange={(e) => setEngineFilter(e.target.value)}>
          <option>All</option>
          {ENGINES.map((e) => <option key={e}>{e}</option>)}
        </select>
        <select className="input" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          <option>All</option>
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
        <div className="toolbar-spacer" />
        <button className={'btn ' + (view === 'kanban' ? 'btn-primary' : 'btn-ghost')} onClick={() => setView('kanban')} type="button">Kanban</button>
        <button className={'btn ' + (view === 'table' ? 'btn-primary' : 'btn-ghost')} onClick={() => setView('table')} type="button">Table</button>
        <button className="btn btn-primary" onClick={() => setShowAdd(!showAdd)} type="button">+ Add asset</button>
      </div>

      {showAdd && (
        <form className="card form-grid" onSubmit={submitAdd}>
          <input className="input" placeholder="Asset name *" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <select className="input" value={form.engine} onChange={(e) => setForm({ ...form, engine: e.target.value })}>
            {ENGINES.map((e) => <option key={e}>{e}</option>)}
          </select>
          <select className="input" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
          <input className="input" type="number" min="0" step="1" placeholder="Price $ (blank = TBD)" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
          <input className="input" placeholder="Version" value={form.version} onChange={(e) => setForm({ ...form, version: e.target.value })} />
          <input className="input" placeholder="Notes (optional)" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
          <button className="btn btn-primary" type="submit">Add asset</button>
        </form>
      )}

      {view === 'kanban' ? (
        <div className="kanban">
          {STAGES.map((stage) => (
            <div className="kanban-col" key={stage.id}>
              <div className="kanban-head">{stage.label} <span className="count">{filtered.filter((a) => a.stage === stage.id).length}</span></div>
              {filtered.filter((a) => a.stage === stage.id).map((a) => (
                <AssetCard key={a.id} asset={a} onSelect={() => setSelectedId(a.id)} onMove={(dir) => moveStage(a, dir)} />
              ))}
              {filtered.filter((a) => a.stage === stage.id).length === 0 && <div className="empty">No assets here yet.</div>}
            </div>
          ))}
        </div>
      ) : (
        <div className="card table-wrap">
          <table className="table">
            <thead>
              <tr><th>Asset</th><th>Engine</th><th>Category</th><th>Marketplaces</th><th>Price</th><th>Version</th><th>Stage</th><th>Checklist</th><th>Upload status</th></tr>
            </thead>
            <tbody>
              {filtered.map((a) => (
                <tr key={a.id} onClick={() => setSelectedId(a.id)} className="row-click">
                  <td><strong>{a.name}</strong></td>
                  <td>{a.engine}</td>
                  <td>{a.category}</td>
                  <td>{a.marketplaces.join(', ')}</td>
                  <td>{formatPrice(a.price)}</td>
                  <td>{a.version}</td>
                  <td><Badge tone={stageTone[a.stage]}>{STAGES.find((s) => s.id === a.stage)?.label}</Badge></td>
                  <td>{checklistDone(a)}/5</td>
                  <td>{a.uploadStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <div className="empty">No assets match the filters.</div>}
        </div>
      )}

      {selected && (
        <AssetDetail
          asset={selected}
          onClose={() => setSelectedId(null)}
          onToggle={(itemId) => commit(toggleChecklist(state, selected.id, itemId))}
          onPatch={(patch) => commit(updateAsset(state, selected.id, patch))}
        />
      )}
    </div>
  )
}

function AssetCard({ asset, onSelect, onMove }) {
  return (
    <div className="asset-card" onClick={onSelect}>
      <div className="asset-name">{asset.name}</div>
      <div className="asset-meta">{asset.engine} · {asset.category}</div>
      <div className="asset-meta">{formatPrice(asset.price)} · v{asset.version} · {checklistDone(asset)}/5 checklist</div>
      <div className="asset-actions">
        <button type="button" onClick={(e) => { e.stopPropagation(); onMove(-1) }}>← Back</button>
        <button type="button" onClick={(e) => { e.stopPropagation(); onMove(1) }}>Forward →</button>
      </div>
    </div>
  )
}

function AssetDetail({ asset, onClose, onToggle, onPatch }) {
  const [price, setPrice] = useState(asset.price == null ? '' : String(asset.price))
  const [version, setVersion] = useState(asset.version)
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <h3>{asset.name}</h3>
          <button className="btn btn-ghost btn-sm" onClick={onClose} type="button">Close</button>
        </div>
        <p className="muted">{asset.engine} · {asset.category} · {asset.marketplaces.join(', ')}</p>
        <p>{asset.notes}</p>
        <p className="muted">Upload status: {asset.uploadStatus}</p>

        <h4>Pre-upload checklist ({checklistDone(asset)}/5)</h4>
        <div className="checklist">
          {CHECKLIST_ITEMS.map((item) => (
            <label key={item.id} className="check-row">
              <input type="checkbox" checked={Boolean(asset.checklist?.[item.id])} onChange={() => onToggle(item.id)} />
              {item.label}
            </label>
          ))}
        </div>

        <h4>Edit price & version</h4>
        <div className="form-row">
          <label>Price ($)<input className="input" type="number" min="0" step="1" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="TBD" /></label>
          <label>Version<input className="input" value={version} onChange={(e) => setVersion(e.target.value)} /></label>
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => onPatch({ price: price === '' ? null : Number(price), version: version || '0.1.0' })}
          >
            Save
          </button>
        </div>

        <h4>Stage</h4>
        <div className="stage-row">
          {STAGES.map((s) => (
            <button
              key={s.id}
              type="button"
              className={'btn btn-sm ' + (asset.stage === s.id ? 'btn-primary' : 'btn-ghost')}
              onClick={() => onPatch({ stage: s.id })}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
