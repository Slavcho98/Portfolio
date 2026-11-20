import { useCallback, useEffect, useState } from 'react'
import type { ProductDetail } from './types'

type State = { status: 'loading' | 'ready' | 'missing' | 'error'; detail?: ProductDetail }

// Details are immutable for a session, so revisiting a product is instant.
const cache = new Map<string, ProductDetail>()

/** Loads the complete product document. The page is keyed by slug, so state starts fresh per product. */
export function useProductDetail(slug: string) {
  const [state, setState] = useState<State>(() => {
    const hit = cache.get(slug)
    return hit ? { status: 'ready', detail: hit } : { status: 'loading' }
  })
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    if (cache.has(slug)) return
    const controller = new AbortController()
    fetch(`/api/products/${encodeURIComponent(slug)}`, { signal: controller.signal })
      .then(async (res) => {
        if (res.status === 404) return setState({ status: 'missing' })
        if (!res.ok) throw new Error(String(res.status))
        const detail = (await res.json()) as ProductDetail
        cache.set(slug, detail)
        setState({ status: 'ready', detail })
      })
      .catch((error) => {
        if (error?.name !== 'AbortError') setState({ status: 'error' })
      })
    return () => controller.abort()
  }, [slug, attempt])

  const retry = useCallback(() => {
    setState({ status: 'loading' })
    setAttempt((n) => n + 1)
  }, [])

  return { ...state, retry }
}
