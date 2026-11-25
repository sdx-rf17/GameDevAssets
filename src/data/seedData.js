// Demo data — replace with your own assets.
// Everything below is sample data for a fictional catalogue: sample system
// names, sample prices, sample statuses. No sales, orders or reviews exist.
// Delete or edit these entries and add your own assets from the app.

export const STAGES = [
  { id: 'idea', label: 'Idea' },
  { id: 'coding', label: 'Architecture & Coding' },
  { id: 'demo', label: 'Demo Scene / Test Place' },
  { id: 'docs', label: 'Documentation' },
  { id: 'live', label: 'Uploaded & Live' }
]

export const CHECKLIST_ITEMS = [
  { id: 'cleanCode', label: 'Clean zero-dependency code' },
  { id: 'demoScene', label: 'Demo scene / place included' },
  { id: 'readme', label: 'README / docs written' },
  { id: 'thumbnail', label: 'Store thumbnail & video recorded' },
  { id: 'pricing', label: 'Pricing set' }
]

export const ENGINES = ['Unity C#', 'Roblox Luau', 'Cross-Engine']
export const CATEGORIES = ['Combat', 'Movement', 'Inventory', 'Data/Save', 'Editor Plugin', 'Template']

export const UNITY_NET_RATE = 0.7 // Unity Asset Store 70/30 split
export const BUNDLE_DISCOUNT = 0.28 // bundle price = sum minus 28%

const checklist = (cleanCode, demoScene, readme, thumbnail, pricing) => ({
  cleanCode, demoScene, readme, thumbnail, pricing
})

export const SEED_ASSETS = [
  {
    id: 'unity-inventory', name: 'Inventory', engine: 'Unity C#', category: 'Inventory',
    marketplaces: ['Unity Asset Store', 'itch.io', 'Gumroad'],
    price: 25, version: '0.1.0', stage: 'docs', uploadStatus: 'Draft — not submitted',
    checklist: checklist(true, true, true, false, true),
    notes: 'Sample asset. A draft listing is the next step once the demo scene is tested.'
  },
  {
    id: 'unity-secure-save', name: 'Secure Save', engine: 'Unity C#', category: 'Data/Save',
    marketplaces: ['Unity Asset Store', 'itch.io', 'Gumroad'],
    price: 19, version: '0.1.0', stage: 'coding', uploadStatus: 'Not uploaded',
    checklist: checklist(true, false, true, false, true),
    notes: 'Sample save system with encryption.'
  },
  {
    id: 'unity-combat', name: 'Combat', engine: 'Unity C#', category: 'Combat',
    marketplaces: ['Unity Asset Store', 'itch.io', 'Gumroad'],
    price: 29, version: '0.1.0', stage: 'coding', uploadStatus: 'Not uploaded',
    checklist: checklist(true, false, true, false, true),
    notes: 'Sample combat framework.'
  },
  {
    id: 'unity-npc', name: 'NPC', engine: 'Unity C#', category: 'Combat',
    marketplaces: ['Unity Asset Store', 'itch.io', 'Gumroad'],
    price: 25, version: '0.1.0', stage: 'coding', uploadStatus: 'Not uploaded',
    checklist: checklist(true, false, true, false, true),
    notes: 'Sample NPC system.'
  },
  {
    id: 'unity-quest', name: 'Quest', engine: 'Unity C#', category: 'Template',
    marketplaces: ['Unity Asset Store', 'itch.io', 'Gumroad'],
    price: 25, version: '0.1.0', stage: 'coding', uploadStatus: 'Not uploaded',
    checklist: checklist(true, false, true, false, true),
    notes: 'Sample quest framework.'
  },
  {
    id: 'unity-dialogue', name: 'Dialogue', engine: 'Unity C#', category: 'Template',
    marketplaces: ['Unity Asset Store', 'itch.io', 'Gumroad'],
    price: 29, version: '0.1.0', stage: 'coding', uploadStatus: 'Not uploaded',
    checklist: checklist(true, false, true, false, true),
    notes: 'Sample dialogue system.'
  },
  {
    id: 'unity-matchmaking', name: 'Matchmaking', engine: 'Unity C#', category: 'Template',
    marketplaces: ['Unity Asset Store', 'itch.io', 'Gumroad'],
    price: 35, version: '0.1.0', stage: 'coding', uploadStatus: 'Not uploaded',
    checklist: checklist(true, false, true, false, true),
    notes: 'Sample matchmaking system.'
  },
  {
    id: 'unity-multiplayer', name: 'Multiplayer', engine: 'Unity C#', category: 'Template',
    marketplaces: ['Unity Asset Store', 'itch.io', 'Gumroad'],
    price: 39, version: '0.1.0', stage: 'coding', uploadStatus: 'Not uploaded',
    checklist: checklist(true, false, true, false, true),
    notes: 'Sample multiplayer architecture (Netcode package required in real Unity).'
  },
  {
    id: 'unity-ui', name: 'UI', engine: 'Unity C#', category: 'Editor Plugin',
    marketplaces: ['Unity Asset Store', 'itch.io', 'Gumroad'],
    price: 19, version: '0.1.0', stage: 'coding', uploadStatus: 'Not uploaded',
    checklist: checklist(true, false, true, false, true),
    notes: 'Sample UI system.'
  },
  {
    id: 'unity-admin', name: 'Admin', engine: 'Unity C#', category: 'Editor Plugin',
    marketplaces: ['Unity Asset Store', 'itch.io', 'Gumroad'],
    price: 19, version: '0.1.0', stage: 'coding', uploadStatus: 'Not uploaded',
    checklist: checklist(true, false, true, false, true),
    notes: 'Sample admin tools.'
  },
  {
    id: 'unity-terrain-tools', name: 'Terrain Tools', engine: 'Unity C#', category: 'Editor Plugin',
    marketplaces: ['Unity Asset Store', 'itch.io', 'Gumroad'],
    price: 29, version: '0.1.0', stage: 'coding', uploadStatus: 'Not uploaded',
    checklist: checklist(true, false, true, false, true),
    notes: 'Sample terrain tools.'
  },
  {
    id: 'unity-dev-plugin', name: 'Developer Plugin', engine: 'Unity C#', category: 'Editor Plugin',
    marketplaces: ['Unity Asset Store', 'itch.io', 'Gumroad'],
    price: 25, version: '0.1.0', stage: 'coding', uploadStatus: 'Not uploaded',
    checklist: checklist(true, false, true, false, true),
    notes: 'Sample developer productivity plugin.'
  },
  {
    id: 'roblox-datastore-inventory', name: 'Secure DataStore + Inventory', engine: 'Roblox Luau', category: 'Inventory',
    marketplaces: ['Roblox Creator Store', 'BuiltByBit', 'itch.io', 'Gumroad'],
    price: null, version: '0.1.0', stage: 'coding', uploadStatus: 'Not uploaded',
    checklist: checklist(true, false, true, false, false),
    notes: 'Sample Luau bundle. Price not set yet. Nothing for sale until it is built and tested in Roblox Studio.'
  }
]

// Storefronts: generic marketplace list. Fill in your own profile details
// (public name, publisher page, payout status) in the app — nothing here
// is pre-filled with anyone's account.
export const SEED_STORES = [
  { name: 'Unity Asset Store', url: 'https://assetstore.unity.com', type: 'Marketplace', fee: '30% (you keep 70%)', status: 'Not set up', notes: 'Add your publisher profile details in the Storefront tab.' },
  { name: 'itch.io', url: 'https://itch.io', type: 'Marketplace', fee: '10% default (adjustable)', status: 'Not set up', notes: 'Good for bundles and pay-what-you-want. 90% revenue share by default.' },
  { name: 'Gumroad', url: 'https://gumroad.com', type: 'Direct sales', fee: '10% + processing', status: 'Not set up', notes: 'Direct sales page per asset or bundle.' },
  { name: 'LemonSqueezy', url: 'https://www.lemonsqueezy.com', type: 'Direct sales', fee: '5% + processing', status: 'Not set up', notes: 'Checkout + licensing for digital products.' },
  { name: 'GitHub', url: 'https://github.com', type: 'Code hosting / Sponsors', fee: '0% on Sponsors (fees vary)', status: 'Not set up', notes: 'Host your code and use GitHub Sponsors.' },
  { name: 'GameDevMarket', url: 'https://www.gamedevmarket.net', type: 'Marketplace', fee: '30%', status: 'Not set up', notes: 'Game assets marketplace.' },
  { name: 'CGTrader', url: 'https://www.cgtrader.com', type: 'Marketplace', fee: 'Varies by licence', status: 'Not set up', notes: 'Mainly 3D models; code/tools are a smaller fit.' },
  { name: 'Roblox Creator Store', url: 'https://create.roblox.com/store', type: 'Marketplace', fee: 'Roblox takes a share; creator share varies', status: 'Not set up', notes: 'Main channel for the Roblox Luau bundle once tested in Studio.' },
  { name: 'BuiltByBit', url: 'https://builtbybit.com', type: 'Marketplace', fee: 'Varies', status: 'Not set up', notes: 'Minecraft/Roblox resources marketplace.' },
  { name: 'Payhip', url: 'https://payhip.com', type: 'Direct sales', fee: '5% free plan', status: 'Not set up', notes: 'Simple storefront for digital downloads.' },
  { name: 'Roblox Talent Hub', url: 'https://create.roblox.com/talent', type: 'Jobs / hiring', fee: '—', status: 'Not set up', notes: 'Find contract work, not asset sales.' },
  { name: 'DevForum', url: 'https://devforum.roblox.com', type: 'Community', fee: '—', status: 'Not set up', notes: 'Roblox developer community — showcase and feedback, not a store.' },
  { name: 'Fab', url: 'https://www.fab.com', type: 'Marketplace', fee: '12% (you keep 88%)', status: 'Not set up', notes: 'Epic Games marketplace, successor to Unreal Marketplace.' },
  { name: 'Codester', url: 'https://www.codester.com', type: 'Marketplace', fee: '30%', status: 'Not set up', notes: 'Scripts, plugins and code market.' },
  { name: 'CodeCanyon', url: 'https://codecanyon.net', type: 'Marketplace', fee: 'Varies (author fee)', status: 'Not set up', notes: 'Envato code marketplace.' }
]

export const SEED_TEMPLATES = [
  {
    id: 'feature-list', title: 'Feature List',
    body: 'FEATURES\n- [Feature 1 — what it does, in one line]\n- [Feature 2]\n- [Feature 3]\n\nWHAT YOU GET\n- Full source code, no DLLs\n- Demo scene / test place included\n- README and setup guide\n\nREQUIREMENTS\n- Unity 2022.3 LTS or newer / Roblox Studio\n- No third-party dependencies'
  },
  {
    id: 'technical-specs', title: 'Technical Specs',
    body: 'TECHNICAL DETAILS\n- Engine: Unity 2022.3 LTS+ / Roblox Studio\n- Language: C# / Luau\n- Dependencies: None\n- Lines of code: [number]\n- Files: [number]\n- Tested on: [Unity version / Studio version]\n- Platforms: PC, Mac, Mobile (where applicable)'
  },
  {
    id: 'setup-instructions', title: 'Setup Instructions',
    body: 'SETUP (5 minutes)\n1. Import the package into your project.\n2. Open the demo scene / test place.\n3. Drag the [Main Prefab / Module] into your scene.\n4. Press Play — the demo works out of the box.\n5. Read the README for API and configuration.'
  },
  {
    id: 'changelog-format', title: 'Changelog Format',
    body: 'CHANGELOG\n\n## [1.0.0] - YYYY-MM-DD\n### Added\n- First release.\n\n## [Unreleased]\n### Added\n- \n### Fixed\n- '
  },
  {
    id: 'store-bio', title: 'Store Bio',
    body: 'I build game development tools for Unity and Roblox — inventory, save systems, combat, NPCs, quests and editor plugins. Every asset ships with clean, dependency-free code, a working demo and clear documentation. [Replace this with your own bio.]'
  },
  {
    id: 'readme-template', title: 'README Template',
    body: '# [Asset Name]\n\nOne-line description of what it does.\n\n## Features\n- \n\n## Requirements\n- Unity 2022.3 LTS+ / Roblox Studio, no dependencies.\n\n## Quick start\n1. Import.\n2. Open the demo.\n3. Press Play.\n\n## API\n- \n\n## Changelog\nSee CHANGELOG.md.\n\n## Licence\nSingle-project licence per store terms.'
  }
]

// Curated update notes. This static build does NOT live-scrape any changelog.
// Add new notes manually; each links to the official changelog hub so the
// reader can verify the real release notes.
export const SEED_UPDATES = [
  {
    id: 'upd-unity-lts', date: '2026-11-20', source: 'Unity', breaking: false,
    title: 'Unity 2022.3 LTS remains the submission baseline',
    body: 'Asset Store submissions target Unity 2022.3 LTS or newer. Keep packages on LTS for the widest buyer compatibility.',
    url: 'https://unity.com/releases/editor/archive'
  },
  {
    id: 'upd-unity-6', date: '2026-11-20', source: 'Unity', breaking: true,
    title: 'Unity 6: check deprecated APIs before submitting',
    body: 'Unity 6 renamed/deprecated some APIs (e.g. FindObjectOfType — use FindFirstObjectByType instead). Re-check every system on import.',
    url: 'https://unity.com/releases/editor/archive'
  },
  {
    id: 'upd-roblox-changelog', date: '2026-11-20', source: 'Roblox', breaking: false,
    title: 'Roblox Creator changelog — check before Studio testing',
    body: 'Roblox ships Studio and API changes weekly. Read the official creator changelog before testing a Luau bundle.',
    url: 'https://create.roblox.com/docs/creator-changelog'
  },
  {
    id: 'upd-fab', date: '2026-11-20', source: 'Fab', breaking: false,
    title: 'Fab (Epic) — 88% creator share',
    body: 'Fab pays 88% to creators. Worth listing Unity tools there after the Asset Store, once a package is tested and packaged.',
    url: 'https://www.fab.com'
  },
  {
    id: 'upd-itch', date: '2026-11-20', source: 'itch.io', breaking: false,
    title: 'itch.io — 90% default share, good for bundles',
    body: 'itch.io lets the seller set the revenue share (default 10% to itch.io). A good home for Starter Kit bundles.',
    url: 'https://itch.io'
  }
]

export const SEED_BUNDLES = [
  {
    id: 'bundle-rpg', name: 'RPG Starter Kit', assetIds: ['unity-inventory', 'unity-quest', 'unity-dialogue', 'unity-npc'],
    description: 'Everything for an RPG core loop: inventory, quests, dialogue and NPCs.'
  },
  {
    id: 'bundle-combat', name: 'Combat & Multiplayer Kit', assetIds: ['unity-combat', 'unity-multiplayer', 'unity-matchmaking', 'unity-admin'],
    description: 'Combat plus online play: combat framework, multiplayer, matchmaking and admin tools.'
  },
  {
    id: 'bundle-essentials', name: 'Creator Essentials Kit', assetIds: ['unity-inventory', 'unity-secure-save', 'unity-ui', 'unity-dev-plugin'],
    description: 'The everyday toolkit: inventory, secure saves, UI and developer tools.'
  }
]

// Gaps the catalogue has today — used for new-system suggestions.
export const GAP_SUGGESTIONS = [
  { name: 'Movement / Character Controller', reason: 'No movement system exists yet; it pairs with Combat and NPC.', category: 'Movement', suggestedPrice: 25 },
  { name: 'Save/Load Cloud Sync', reason: 'Secure Save is local-only; a cloud-sync add-on fills the gap.', category: 'Data/Save', suggestedPrice: 19 },
  { name: 'Shop / Economy System', reason: 'Inventory has no shop or currency layer; a shop system completes the RPG kit.', category: 'Template', suggestedPrice: 29 },
  { name: 'Achievement System', reason: 'No achievements/stats tracker; small system, easy bundle add-on.', category: 'Template', suggestedPrice: 19 }
]
