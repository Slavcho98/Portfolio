import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Product } from './types'

type Status = 'loading' | 'ready' | 'error'

type CatalogContextValue = {
  status: Status
  products: Product[]
  get: (slug: string) => Product | undefined
  reload: () => void
}

const CatalogContext = createContext<CatalogContextValue | null>(null)

async function fetchCatalog(signal: AbortSignal): Promise<Product[]> {
  const res = await fetch('/api/products?limit=200', { signal })
  if (!res.ok) throw new Error(`The product API responded with ${res.status}`)
  const data = (await res.json()) as { items: Product[] }
  return data.items
}

/** Loads the whole catalogue once (100 products is a single small request) and shares it with the app. */
export function CatalogProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([])
  const [status, setStatus] = useState<Status>('loading')
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    fetchCatalog(controller.signal)
      .then((items) => {
        setProducts(items)
        setStatus('ready')
      })
      .catch((error) => {
        if (error?.name !== 'AbortError') setStatus('error')
      })
    return () => controller.abort()
  }, [attempt])

  const bySlug = useMemo(() => new Map(products.map((p) => [p.slug, p])), [products])
  const get = useCallback((slug: string) => bySlug.get(slug), [bySlug])
  const reload = useCallback(() => {
    setStatus('loading')
    setAttempt((n) => n + 1)
  }, [])

  const value = useMemo(() => ({ status, products, get, reload }), [status, products, get, reload])
  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>
}

export function useCatalog() {
  const ctx = useContext(CatalogContext)
  if (!ctx) throw new Error('useCatalog must be used inside <CatalogProvider>')
  return ctx
}
