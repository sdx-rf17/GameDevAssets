// The ONLY place that touches localStorage. The UI never does.
import { SEED_ASSETS, SEED_STORES, SEED_TEMPLATES, SEED_UPDATES, SEED_BUNDLES } from '../data/seedData.js'

const STORAGE_KEY = 'gdac-data-v1'

function seedState() {
  return {
    assets: SEED_ASSETS,
    stores: SEED_STORES,
    templates: SEED_TEMPLATES,
    updates: SEED_UPDATES,
    bundles: SEED_BUNDLES,
    createdAt: new Date().toISOString()
  }
}

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      const state = seedState()
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
      return state
    }
    const parsed = JSON.parse(raw)
    // Defensive merge: if a newer seed added fields, keep user edits but
    // fall back to seed data for missing top-level collections.
    return { ...seedState(), ...parsed }
  } catch {
    return seedState()
  }
}

export function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export function resetState() {
  const state = seedState()
  saveState(state)
  return state
}

export function exportState(state) {
  return JSON.stringify(state, null, 2)
}

export function importState(json) {
  const parsed = JSON.parse(json)
  if (!parsed || !Array.isArray(parsed.assets)) {
    throw new Error('Invalid file: expected a Game Dev Asset Command Center export with an "assets" array.')
  }
  const state = { ...seedState(), ...parsed }
  saveState(state)
  return state
}

// --- Asset CRUD (pure helpers; the caller saves via saveState) ---

export function addAsset(state, asset) {
  const id = 'asset-' + Date.now().toString(36)
  const created = {
    id,
    name: asset.name || 'Untitled Asset',
    engine: asset.engine || 'Unity C#',
    category: asset.category || 'Template',
    marketplaces: asset.marketplaces || ['Unity Asset Store'],
    price: asset.price === '' || asset.price == null ? null : Number(asset.price),
    version: asset.version || '0.1.0',
    stage: asset.stage || 'idea',
    uploadStatus: 'Not uploaded',
    checklist: { cleanCode: false, demoScene: false, readme: false, thumbnail: false, pricing: asset.price != null },
    notes: asset.notes || ''
  }
  return { ...state, assets: [...state.assets, created] }
}

export function updateAsset(state, id, patch) {
  return { ...state, assets: state.assets.map((a) => (a.id === id ? { ...a, ...patch } : a)) }
}

export function toggleChecklist(state, id, itemId) {
  return {
    ...state,
    assets: state.assets.map((a) =>
      a.id === id ? { ...a, checklist: { ...a.checklist, [itemId]: !a.checklist[itemId] } } : a
    )
  }
}

export function addUpdate(state, update) {
  const created = {
    id: 'upd-' + Date.now().toString(36),
    date: update.date || new Date().toISOString().slice(0, 10),
    source: update.source || 'Note',
    breaking: Boolean(update.breaking),
    title: update.title || 'Untitled update',
    body: update.body || '',
    url: update.url || ''
  }
  return { ...state, updates: [created, ...state.updates] }
}

export function addBundle(state, bundle) {
  const created = { id: 'bundle-' + Date.now().toString(36), ...bundle }
  return { ...state, bundles: [...state.bundles, created] }
}
