// Mirrors src/cart/pricing.ts on the storefront. The server is authoritative: totals are always recomputed here.
export const FREE_SHIPPING_THRESHOLD = 100
export const FLAT_SHIPPING = 8
export const MAX_QTY = 10

export const PROMOS = {
  VELVORA10: { percent: 10, label: '10% off' },
  WELCOME15: { percent: 15, label: '15% off your first order' },
}

export const cents = (n) => Math.round(n * 100) / 100

export function totalsFor(subtotal, promoCode) {
  const promo = promoCode ? PROMOS[promoCode] : undefined
  const discount = promo ? cents((subtotal * promo.percent) / 100) : 0
  const afterDiscount = cents(subtotal - discount)
  const shipping = subtotal === 0 || afterDiscount >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING
  return { discount, shipping, total: cents(afterDiscount + shipping) }
}
