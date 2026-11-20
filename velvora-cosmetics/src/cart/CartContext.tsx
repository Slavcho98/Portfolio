import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { useCatalog } from '../catalog/CatalogContext'
import { cartApi } from './cartApi'
import { priceCart, type PricedCart } from './pricing'
import type { AddItemInput, CartState } from './types'

export type Notice = { id: number; text: string; action?: { label: string; panel: 'cart' | 'wishlist' } }

type CartContextValue = {
  cart: CartState
  priced: PricedCart
  loading: boolean
  notice: Notice | null
  add: (input: AddItemInput) => Promise<void>
  setQty: (lineId: string, qty: number) => Promise<void>
  remove: (lineId: string) => Promise<void>
  applyPromo: (code: string) => Promise<string | null>
  removePromo: () => Promise<void>
  setNote: (note: string) => Promise<void>
  clear: () => Promise<void>
  notify: (text: string, action?: Notice['action']) => void
  dismissNotice: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartState>({ lines: [] })
  const [loading, setLoading] = useState(true)
  const [notice, setNotice] = useState<Notice | null>(null)
  const noticeId = useRef(0)
  const { get: getProduct, status: catalogStatus } = useCatalog()

  const notify = useCallback((text: string, action?: Notice['action']) => {
    setNotice({ id: ++noticeId.current, text, action })
  }, [])
  const dismissNotice = useCallback(() => setNotice(null), [])

  useEffect(() => {
    cartApi
      .get()
      .then(setCart)
      .catch(() => notify("We couldn't load your bag"))
      .finally(() => setLoading(false))
  }, [notify])

  // Runs a mutation; returns an error message instead of throwing so callers can show it inline.
  const run = useCallback(async (fn: () => Promise<CartState>): Promise<string | null> => {
    try {
      setCart(await fn())
      return null
    } catch (e) {
      return e instanceof Error ? e.message : 'Something went wrong'
    }
  }, [])

  const value = useMemo<CartContextValue>(() => {
    const report = async (fn: () => Promise<CartState>) => {
      const error = await run(fn)
      if (error) notify(error)
    }

    return {
      cart,
      priced: priceCart(cart, getProduct, catalogStatus === 'ready'),
      loading,
      notice,
      add: async (input) => {
        const error = await run(() => cartApi.addItem(input))
        if (error) return notify(error)
        const name = getProduct(input.productId)?.name ?? 'Item'
        notify(`${name} added to your bag`, { label: 'View bag', panel: 'cart' })
      },
      setQty: (lineId, qty) => report(() => cartApi.setQty(lineId, qty)),
      remove: (lineId) => report(() => cartApi.removeItem(lineId)),
      applyPromo: (code) => run(() => cartApi.applyPromo(code)),
      removePromo: () => report(() => cartApi.removePromo()),
      setNote: (note) => report(() => cartApi.setNote(note)),
      clear: () => report(() => cartApi.clear()),
      notify,
      dismissNotice,
    }
  }, [cart, loading, notice, run, notify, dismissNotice, getProduct, catalogStatus])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>')
  return ctx
}
