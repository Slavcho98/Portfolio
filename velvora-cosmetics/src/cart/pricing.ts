import { unitPrice } from '../catalog/selectors'
import type { Product } from '../catalog/types'
import type { CartLine, CartState } from './types'

export const FREE_SHIPPING_THRESHOLD = 100
export const FLAT_SHIPPING = 8
export const MAX_QTY = 10

export const PROMOS: Record<string, { percent: number; label: string }> = {
  VELVORA10: { percent: 10, label: '10% off' },
  WELCOME15: { percent: 15, label: '15% off your first order' },
}

export const normalizePromo = (code: string) => code.trim().toUpperCase()

export const lineIdFor = (productId: CartLine['productId'], variant?: string) =>
  `${productId}${variant ? `:${variant}` : ''}`

export type PricedLine = CartLine & { product: Product; unitPrice: number; lineTotal: number }

export type PricedCart = {
  lines: PricedLine[]
  count: number
  subtotal: number
  discount: number
  shipping: number
  total: number
  promoLabel?: string
  remainingForFreeShipping: number
  freeShippingProgress: number
}

const cents = (n: number) => Math.round(n * 100) / 100

/**
 * `ready` is false while the catalogue is still loading: lines can't be priced yet, but the bag
 * count should not flicker to zero, so it falls back to the raw quantities.
 */
export function priceCart(cart: CartState, lookup: (slug: string) => Product | undefined, ready: boolean): PricedCart {
  const lines: PricedLine[] = []
  for (const l of cart.lines) {
    const product = lookup(l.productId)
    if (!product) continue
    const price = unitPrice(product, l.variant)
    lines.push({ ...l, product, unitPrice: price, lineTotal: cents(price * l.qty) })
  }

  const count = ready ? lines.reduce((n, l) => n + l.qty, 0) : cart.lines.reduce((n, l) => n + l.qty, 0)
  const subtotal = cents(lines.reduce((s, l) => s + l.lineTotal, 0))
  const promo = cart.promoCode ? PROMOS[cart.promoCode] : undefined
  const discount = promo ? cents((subtotal * promo.percent) / 100) : 0
  const afterDiscount = cents(subtotal - discount)
  const shipping = lines.length === 0 || afterDiscount >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING

  return {
    lines,
    count,
    subtotal,
    discount,
    shipping,
    total: cents(afterDiscount + shipping),
    promoLabel: promo?.label,
    remainingForFreeShipping: Math.max(0, cents(FREE_SHIPPING_THRESHOLD - afterDiscount)),
    freeShippingProgress: Math.min(1, afterDiscount / FREE_SHIPPING_THRESHOLD),
  }
}

export const money = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n)
