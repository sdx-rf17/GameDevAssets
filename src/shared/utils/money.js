import { UNITY_NET_RATE, BUNDLE_DISCOUNT } from '../../data/seedData.js'

export const formatMoney = (n) => {
  if (n == null || Number.isNaN(Number(n))) return 'TBD'
  return '$' + Number(n).toFixed(2)
}

export const formatPrice = (n) => (n == null ? 'TBD' : '$' + Number(n))

export const grossTotal = (assets) =>
  assets.reduce((sum, a) => sum + (a.price || 0), 0)

export const netTotal = (assets) => grossTotal(assets) * UNITY_NET_RATE

export function bundleMath(assetIds, assets) {
  const picked = assets.filter((a) => assetIds.includes(a.id))
  const sum = grossTotal(picked)
  const bundlePrice = Math.round(sum * (1 - BUNDLE_DISCOUNT) * 100) / 100
  const net = Math.round(bundlePrice * UNITY_NET_RATE * 100) / 100
  return { picked, sum, bundlePrice, net, discountPct: Math.round(BUNDLE_DISCOUNT * 100) }
}

export const checklistDone = (asset) =>
  Object.values(asset.checklist || {}).filter(Boolean).length

export const checklistTotal = () => 5
