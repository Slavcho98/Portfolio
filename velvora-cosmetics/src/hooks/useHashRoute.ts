import { useEffect, useMemo, useState } from 'react'

export type Route = 'home' | 'cart' | 'shop' | 'product'

export function useHashRoute() {
  const [hash, setHash] = useState(() => window.location.hash)

  useEffect(() => {
    const onChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  const route: Route = hash.startsWith('#/cart')
    ? 'cart'
    : hash.startsWith('#/shop')
      ? 'shop'
      : hash.startsWith('#/product/')
        ? 'product'
        : 'home'
  const params = useMemo(() => new URLSearchParams(hash.includes('?') ? hash.slice(hash.indexOf('?') + 1) : ''), [hash])
  const slug = useMemo(() => {
    if (route !== 'product') return ''
    try {
      return decodeURIComponent(hash.slice('#/product/'.length).split('?')[0])
    } catch {
      return ''
    }
  }, [route, hash])
  return { route, hash, params, slug }
}
