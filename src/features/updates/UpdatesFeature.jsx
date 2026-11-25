import { useState } from 'react'
import { SectionTitle, Badge } from '../../shared/components/ui.jsx'
import { addUpdate } from '../../services/store.js'

export default function UpdatesFeature({ state, onChange }) {
  const [form, setForm] = useState({ title: '', source: 'Unity', body: '', url: '', breaking: false, date: new Date().toISOString().slice(0, 10) })

  const submit = (e) => {
    e.preventDefault()
    if (!form.title.trim()) return
    onChange(addUpdate(state, form))
    setForm({ title: '', source: 'Unity', body: '', url: '', breaking: false, date: new Date().toISOString().slice(0, 10) })
  }

  return (
    <div>
      <SectionTitle
        title="Engine & Marketplace Update Monitor"
        sub="Curated update notes with links to the official changelogs. This static build does not live-scrape anything — updates here are notes you add yourself, plus the official changelog links to check."
      />
      <div className="notice">
        Honest note: no live feed is connected. Check the official sources below and add a note when something affects your assets (a breaking API change, a new Unity LTS, a store fee change).
      </div>

      <div className="card">
        <h3>Official changelog hubs</h3>
        <ul>
          <li><a href="https://unity.com/releases/editor/archive" target="_blank" rel="noreferrer">Unity editor releases &amp; LTS archive</a></li>
          <li><a href="https://create.roblox.com/docs/creator-changelog" target="_blank" rel="noreferrer">Roblox Creator changelog</a></li>
          <li><a href="https://www.fab.com" target="_blank" rel="noreferrer">Fab (Epic Games marketplace)</a></li>
          <li><a href="https://itch.io" target="_blank" rel="noreferrer">itch.io</a></li>
        </ul>
      </div>

      <form className="card form-grid" onSubmit={submit}>
        <input className="input" placeholder="Update title *" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <select className="input" value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value })}>
          <option>Unity</option><option>Roblox</option><option>Fab</option><option>itch.io</option><option>Gumroad</option><option>Other</option>
        </select>
        <input className="input" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
        <input className="input" placeholder="Source link (https://…)" value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} />
        <input className="input" placeholder="What changed and why it matters" value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} />
        <label className="check-row"><input type="checkbox" checked={form.breaking} onChange={(e) => setForm({ ...form, breaking: e.target.checked })} /> Breaking change</label>
        <button className="btn btn-primary" type="submit">Add update note</button>
      </form>

      <div className="update-list">
        {state.updates.map((u) => (
          <article className="card update-card" key={u.id}>
            <div className="update-head">
              <strong>{u.title}</strong>
              {u.breaking && <Badge tone="red">Breaking change</Badge>}
            </div>
            <div className="muted">{u.date} · {u.source}</div>
            <p>{u.body}</p>
            {u.url && <a href={u.url} target="_blank" rel="noreferrer">{u.url}</a>}
          </article>
        ))}
      </div>
    </div>
  )
}
