import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { ProductId } from '../cart/types'

const STORAGE_KEY = 'velvora.wishlist.v2' // v2: product slugs (v1 used numeric ids)

type WishlistContextValue = {
  ids: ProductId[]
  has: (id: ProductId) => boolean
  toggle: (id: ProductId) => void
  remove: (id: ProductId) => void
}

const WishlistContext = createContext<WishlistContextValue | null>(null)

const read = (): ProductId[] => {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
    return Array.isArray(parsed) ? parsed.filter((n): n is string => typeof n === 'string') : []
  } catch {
    return []
  }
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<ProductId[]>(read)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
  }, [ids])

  const toggle = useCallback(
    (id: ProductId) => setIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [id, ...prev])),
    [],
  )
  const remove = useCallback((id: ProductId) => setIds((prev) => prev.filter((x) => x !== id)), [])

  const value = useMemo(
    () => ({ ids, has: (id: ProductId) => ids.includes(id), toggle, remove }),
    [ids, toggle, remove],
  )
  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used inside <WishlistProvider>')
  return ctx
}
