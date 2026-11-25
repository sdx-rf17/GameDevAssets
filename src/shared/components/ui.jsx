export function Stat({ label, value, sub }) {
  return (
    <div className="stat">
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
      {sub ? <div className="stat-sub">{sub}</div> : null}
    </div>
  )
}

export function Badge({ children, tone = 'muted' }) {
  return <span className={'badge badge-' + tone}>{children}</span>
}

export function SectionTitle({ title, sub }) {
  return (
    <div className="section-title">
      <h2>{title}</h2>
      {sub ? <p>{sub}</p> : null}
    </div>
  )
}

export function CopyButton({ text, label = 'Copy' }) {
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      // Clipboard unavailable — user can still select the text manually.
    }
  }
  return (
    <button className="btn btn-ghost btn-sm" onClick={copy} type="button">
      {label}
    </button>
  )
}
