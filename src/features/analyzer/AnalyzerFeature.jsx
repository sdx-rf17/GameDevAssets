import { useMemo, useState } from 'react'
import { SectionTitle, CopyButton } from '../../shared/components/ui.jsx'

const SAMPLE_CS = `// Example: paste your own C# or Luau code here.
using UnityEngine;

public class Inventory : MonoBehaviour
{
    // TODO: add save support
    public int maxSlots = 20;

    public void AddItem(string itemId)
    {
        Debug.Log("Adding " + itemId);
    }
}`

// Client-side heuristic analysis only. No AI, no server call, no code leaves
// the browser. Results are a starting point — verify them against the code.
function analyse(code, language) {
  const lines = code.split('\n')
  const nonEmpty = lines.filter((l) => l.trim() !== '').length
  const todos = (code.match(/TODO|FIXME|XXX|HACK/gi) || []).length
  const isCs = language === 'C#'
  const classMatches = isCs
    ? code.match(/\bclass\s+([A-Za-z_][A-Za-z0-9_]*)/g) || []
    : code.match(/\blocal\s+function\s+([A-Za-z_][A-Za-z0-9_.]*)/g) || []
  const funcMatches = isCs
    ? code.match(/\b(?:public|private|protected|internal)\s+(?:static\s+)?[\w<>\[\]]+\s+([A-Za-z_][A-Za-z0-9_]*)\s*\(/g) || []
    : code.match(/\bfunction\s+([A-Za-z_][A-Za-z0-9_.:]*)\s*\(/g) || []
  const docComments = isCs
    ? (code.match(/\/\/\//g) || []).length
    : (code.match(/--\[\[/g) || []).length
  const debugCalls = isCs
    ? (code.match(/Debug\.Log/g) || []).length
    : (code.match(/\bprint\s*\(/g) || []).length
  const publicApi = isCs
    ? (code.match(/\bpublic\s+(?:class|void|int|string|float|bool|GameObject|List<)/g) || []).length
    : (code.match(/function\s+\w+\.[\w]+/g) || []).length

  const issues = []
  if (todos > 0) issues.push(`${todos} TODO/FIXME marker(s) left in the code — resolve or remove before publishing.`)
  if (docComments === 0) issues.push('No documentation comments found (/// for C#, --[[ ]] for Luau). Add XML/LuaDoc comments to public members.')
  if (debugCalls > 0) issues.push(`${debugCalls} debug print call(s) (Debug.Log / print) — remove or gate behind a debug flag before release.`)
  if (classMatches.length === 0 && funcMatches.length === 0) issues.push('No classes or functions detected — check the pasted code is complete.')
  if (code.length > 20000) issues.push('Large file — consider splitting into smaller focused files for buyers to navigate.')
  if (isCs && /FindObjectOfType/.test(code)) issues.push('FindObjectOfType is deprecated in Unity 6 — use FindFirstObjectByType instead.')
  if (isCs && /GameObject\.Find\(/.test(code)) issues.push('GameObject.Find is slow and fragile — prefer serialized references.')
  if (!isCs && /:WaitForChild\(/.test(code) === false && /game:GetService/.test(code) === false) {
    // Luau hint only when it looks like a Roblox script with no service use.
  }
  if (issues.length === 0) issues.push('No obvious issues found by the heuristics. Still run the demo scene / test place before uploading.')

  const classNames = classMatches.map((m) => m.replace(/.*\s/, '')).slice(0, 10)
  return { lines: lines.length, nonEmpty, todos, classCount: classMatches.length, funcCount: funcMatches.length, docComments, debugCalls, publicApi, issues, classNames }
}

export default function AnalyzerFeature() {
  const [language, setLanguage] = useState('C#')
  const [code, setCode] = useState(SAMPLE_CS)
  const [assetName, setAssetName] = useState('Inventory')

  const result = useMemo(() => analyse(code, language), [code, language])

  const readme = useMemo(() => {
    const classes = result.classNames.length ? result.classNames.join(', ') : 'the main classes'
    return `# ${assetName}

${assetName} for ${language === 'C#' ? 'Unity' : 'Roblox'} — ${result.classCount} class(es), ${result.funcCount} function(s), ${result.nonEmpty} lines of code.

## Features
- ${classes}
- Clean, dependency-free code (verify before release)

## Requirements
- ${language === 'C#' ? 'Unity 2022.3 LTS or newer' : 'Roblox Studio'}
- No third-party dependencies

## Quick start
1. Import the package.
2. Open the demo scene / test place.
3. Press Play.

## Notes from the code check
${result.issues.map((i) => '- ' + i).join('\n')}

## Changelog
### 0.1.0
- First release (in development).`
  }, [assetName, language, result])

  const listing = useMemo(() => {
    return `${assetName} — a ${language === 'C#' ? 'Unity' : 'Roblox'} system with ${result.classCount} class(es) and ${result.funcCount} function(s), built for developers who want clean, working code with a demo included. No third-party dependencies. Includes full source code and documentation. Currently in development (version 0.1.0) — tested in the editor before release.`
  }, [assetName, language, result])

  const tests = useMemo(() => {
    const list = [
      `Import the package into a clean ${language === 'C#' ? 'Unity 2022.3 LTS' : 'Roblox Studio'} project — no errors or warnings.`,
      'Open the demo scene / test place and press Play — the demo runs with no errors.',
      'Exercise every public function and confirm the expected result.',
      'Test with an empty project and with a project that already has other assets.',
      'Test save/load (if applicable) across a restart.',
      'Test edge cases: empty input, maximum capacity, duplicate entries, missing references.'
    ]
    if (result.todos > 0) list.push('Resolve all TODO/FIXME markers before release.')
    if (result.debugCalls > 0) list.push('Confirm no debug output appears in a release build.')
    return list
  }, [language, result])

  return (
    <div>
      <SectionTitle
        title="Code Analyzer"
        sub="Paste C# or Luau code. The analysis runs entirely in your browser — no code is uploaded anywhere, and this is a heuristic check, not AI. It counts structure, flags TODOs and debug calls, and drafts a README, a store listing and an edge-case test list for you to edit."
      />
      <div className="toolbar">
        <input className="input" placeholder="Asset name for the drafts" value={assetName} onChange={(e) => setAssetName(e.target.value)} />
        <select className="input" value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option>C#</option><option>Luau</option>
        </select>
        <button className="btn btn-ghost" type="button" onClick={() => setCode(SAMPLE_CS)}>Load sample</button>
        <button className="btn btn-ghost" type="button" onClick={() => setCode('')}>Clear</button>
      </div>
      <textarea className="input code-input" rows="14" value={code} onChange={(e) => setCode(e.target.value)} placeholder={'Paste ' + language + ' code here…'} spellCheck="false" />

      <div className="stats-row">
        <div className="stat"><div className="stat-label">Lines</div><div className="stat-value">{result.nonEmpty} / {result.lines}</div></div>
        <div className="stat"><div className="stat-label">Classes</div><div className="stat-value">{result.classCount}</div></div>
        <div className="stat"><div className="stat-label">Functions</div><div className="stat-value">{result.funcCount}</div></div>
        <div className="stat"><div className="stat-label">TODOs</div><div className="stat-value">{result.todos}</div></div>
        <div className="stat"><div className="stat-label">Doc comments</div><div className="stat-value">{result.docComments}</div></div>
        <div className="stat"><div className="stat-label">Debug calls</div><div className="stat-value">{result.debugCalls}</div></div>
      </div>

      <h3>Issues found</h3>
      <ul className="issue-list">
        {result.issues.map((i, idx) => <li key={idx}>{i}</li>)}
      </ul>

      <div className="grid-2">
        <div className="card">
          <div className="template-head"><h4>Draft README</h4><CopyButton text={readme} label="Copy README" /></div>
          <pre className="template-body">{readme}</pre>
        </div>
        <div>
          <div className="card">
            <div className="template-head"><h4>Draft store listing</h4><CopyButton text={listing} label="Copy listing" /></div>
            <p>{listing}</p>
          </div>
          <div className="card">
            <h4>Edge-case test list</h4>
            <ol>{tests.map((t, idx) => <li key={idx}>{t}</li>)}</ol>
          </div>
        </div>
      </div>
    </div>
  )
}
