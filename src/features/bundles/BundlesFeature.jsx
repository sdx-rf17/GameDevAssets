import { useMemo, useState } from 'react'
import { GAP_SUGGESTIONS } from '../../data/seedData.js'
import { bundleMath, formatMoney } from '../../shared/utils/money.js'
import { SectionTitle } from '../../shared/components/ui.jsx'
import { addBundle } from '../../services/store.js'

export default function BundlesFeature({ state, onChange }) {
  const [picked, setPicked] = useState(['unity-inventory', 'unity-quest', 'unity-dialogue', 'unity-npc'])
  const [name, setName] = useState('')

  const math = useMemo(() => bundleMath(picked, state.assets), [picked, state.assets])

  const toggle = (id) => {
    setPicked((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id)
      if (prev.length >= 4) return prev // bundles are 3–4 assets
      return [...prev, id]
    })
  }

  const saveBundle = () => {
    if (!name.trim() || picked.length < 3) return
    onChange(addBundle(state, { name: name.trim(), assetIds: [...picked], description: 'Custom bundle built in the planner.' }))
    setName('')
  }

  return (
    <div>
      <SectionTitle
        title="Passive Income & Bundle Planner"
        sub="Build a Genre Starter Kit from 3–4 assets. Suggested bundle price = sum minus 28%. Net = 70% of the bundle price (Unity Asset Store split). Prices are suggestions — set the real price in the store."
      />

      <div className="grid-2">
        <div className="card">
          <h3>Build a bundle (pick 3–4)</h3>
          <div className="pick-list">
            {state.assets.filter((a) => a.price != null).map((a) => (
              <label key={a.id} className="check-row">
                <input type="checkbox" checked={picked.includes(a.id)} onChange={() => toggle(a.id)} disabled={!picked.includes(a.id) && picked.length >= 4} />
                {a.name} — ${a.price} ({a.engine})
              </label>
            ))}
          </div>
          <div className="bundle-math">
            <div>Sum of picked assets: <strong>{formatMoney(math.sum)}</strong></div>
            <div>Suggested bundle price (−{math.discountPct}%): <strong>{formatMoney(math.bundlePrice)}</strong></div>
            <div>Your net at 70%: <strong>{formatMoney(math.net)}</strong> per sale</div>
            <div className="muted">Picked: {math.picked.map((a) => a.name).join(', ') || 'none'}</div>
          </div>
          <div className="form-row">
            <input className="input" placeholder="Bundle name (e.g. RPG Starter Kit)" value={name} onChange={(e) => setName(e.target.value)} />
            <button className="btn btn-primary" type="button" onClick={saveBundle} disabled={picked.length < 3 || !name.trim()}>Save bundle</button>
          </div>
          {picked.length < 3 && <p className="muted">Pick at least 3 assets to save a bundle.</p>}
        </div>

        <div>
          <h3>Saved bundles</h3>
          {state.bundles.map((b) => {
            const m = bundleMath(b.assetIds, state.assets)
            return (
              <div className="card bundle-card" key={b.id}>
                <strong>{b.name}</strong>
                <p className="muted">{b.description}</p>
                <div>{m.picked.map((a) => a.name).join(' + ')}</div>
                <div>Sum {formatMoney(m.sum)} → Bundle {formatMoney(m.bundlePrice)} → Net {formatMoney(m.net)} / sale</div>
              </div>
            )
          })}
        </div>
      </div>

      <h3>New-system suggestions (gaps in the catalogue)</h3>
      <p className="muted">These are suggestions based on what the catalogue is missing — not built systems, and not sales claims.</p>
      <div className="grid-2">
        {GAP_SUGGESTIONS.map((g) => (
          <div className="card" key={g.name}>
            <strong>{g.name}</strong> <span className="muted">· {g.category} · suggested ${g.suggestedPrice}</span>
            <p>{g.reason}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
