import { lineIdFor, MAX_QTY, normalizePromo, PROMOS } from './pricing'
import type { CartApi, CartState } from './types'

const STORAGE_KEY = 'velvora.cart.v2' // v2: lines reference product slugs (v1 used numeric ids)
const empty = (): CartState => ({ lines: [] })

const clampQty = (n: number) => Math.max(0, Math.min(MAX_QTY, Math.floor(n)))

/** Browser-only implementation. Works offline and needs no backend. */
function createLocalCartApi(): CartApi {
  const read = (): CartState => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? { ...empty(), ...(JSON.parse(raw) as CartState) } : empty()
    } catch {
      return empty()
    }
  }

  const commit = async (fn: (s: CartState) => CartState) => {
    const next = fn(read())
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    return next
  }

  return {
    get: async () => read(),

    addItem: ({ productId, variant, qty = 1 }) =>
      commit((s) => {
        const lineId = lineIdFor(productId, variant)
        const existing = s.lines.find((l) => l.lineId === lineId)
        const lines = existing
          ? s.lines.map((l) => (l === existing ? { ...l, qty: clampQty(l.qty + qty) } : l))
          : [...s.lines, { lineId, productId, variant, qty: clampQty(qty) }]
        return { ...s, lines }
      }),

    setQty: (lineId, qty) =>
      commit((s) => ({
        ...s,
        lines: s.lines
          .map((l) => (l.lineId === lineId ? { ...l, qty: clampQty(qty) } : l))
          .filter((l) => l.qty > 0),
      })),

    removeItem: (lineId) => commit((s) => ({ ...s, lines: s.lines.filter((l) => l.lineId !== lineId) })),

    applyPromo: async (code) => {
      const normalized = normalizePromo(code)
      if (!PROMOS[normalized]) throw new Error("That code isn't valid")
      return commit((s) => ({ ...s, promoCode: normalized }))
    },

    removePromo: () => commit((s) => ({ ...s, promoCode: undefined })),
    setNote: (note) => commit((s) => ({ ...s, note })),
    clear: () => commit(() => empty()),
  }
}

/**
 * REST implementation for when the Mongo-backed API exists.
 * Expected contract (every endpoint responds with the full CartState):
 *   GET    /cart
 *   POST   /cart/items            { productId, variant?, qty }
 *   PATCH  /cart/items/:lineId    { qty }
 *   DELETE /cart/items/:lineId
 *   PUT    /cart/promo            { code }      DELETE /cart/promo
 *   PUT    /cart/note             { note }
 *   DELETE /cart
 */
function createHttpCartApi(base: string): CartApi {
  const request = async (path: string, method = 'GET', body?: unknown): Promise<CartState> => {
    const res = await fetch(`${base}${path}`, {
      method,
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: body === undefined ? undefined : JSON.stringify(body),
    })
    if (!res.ok) {
      const data = (await res.json().catch(() => null)) as { message?: string } | null
      throw new Error(data?.message ?? res.statusText)
    }
    return (await res.json()) as CartState
  }

  const item = (lineId: string) => `/cart/items/${encodeURIComponent(lineId)}`

  return {
    get: () => request('/cart'),
    addItem: (input) => request('/cart/items', 'POST', input),
    setQty: (lineId, qty) => request(item(lineId), 'PATCH', { qty }),
    removeItem: (lineId) => request(item(lineId), 'DELETE'),
    applyPromo: (code) => request('/cart/promo', 'PUT', { code }),
    removePromo: () => request('/cart/promo', 'DELETE'),
    setNote: (note) => request('/cart/note', 'PUT', { note }),
    clear: () => request('/cart', 'DELETE'),
  }
}

// Set VITE_CART_BACKEND=http (and optionally VITE_API_URL) in .env to switch to the server.
export const cartApi: CartApi =
  import.meta.env.VITE_CART_BACKEND === 'http'
    ? createHttpCartApi(import.meta.env.VITE_API_URL ?? '/api')
    : createLocalCartApi()
