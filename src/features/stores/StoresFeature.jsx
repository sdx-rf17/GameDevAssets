import { useState } from 'react'
import { SectionTitle, CopyButton } from '../../shared/components/ui.jsx'

export default function StoresFeature({ state }) {
  const [templateId, setTemplateId] = useState(state.templates[0]?.id)
  const template = state.templates.find((t) => t.id === templateId)

  return (
    <div>
      <SectionTitle
        title="Storefront & Profile Base Hub"
        sub="Every marketplace on the list, plus 6 reusable listing templates. Fill in your own profile details below, copy a template, paste it into the store."
      />

      <div className="card profile-card">
        <h3>Your Unity Asset Store profile</h3>
        <p><strong>Public name:</strong> [your publisher name]</p>
        <p><strong>Publisher page:</strong> [your Asset Store publisher URL]</p>
        <p><strong>Payout:</strong> [not set up — add your payout profile in the Unity Publisher Portal]</p>
        <p className="muted">No profile or payout details are stored in this app — fill them in on the store itself.</p>
      </div>

      <h3>Marketplaces</h3>
      <div className="grid-2">
        {state.stores.map((s) => (
          <div className="card store-card" key={s.name}>
            <div className="store-head">
              <strong><a href={s.url} target="_blank" rel="noreferrer">{s.name}</a></strong>
              <span className="muted">{s.type}</span>
            </div>
            <div className="muted">Fee: {s.fee}</div>
            <div>Status: {s.status}</div>
            <p className="muted">{s.notes}</p>
          </div>
        ))}
      </div>

      <h3>Listing templates</h3>
      <div className="toolbar">
        {state.templates.map((t) => (
          <button
            key={t.id}
            type="button"
            className={'btn ' + (t.id === templateId ? 'btn-primary' : 'btn-ghost')}
            onClick={() => setTemplateId(t.id)}
          >
            {t.title}
          </button>
        ))}
      </div>
      {template && (
        <div className="card">
          <div className="template-head">
            <h4>{template.title}</h4>
            <CopyButton text={template.body} label="Copy template" />
          </div>
          <pre className="template-body">{template.body}</pre>
        </div>
      )}
    </div>
  )
}
