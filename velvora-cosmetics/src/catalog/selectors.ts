import type { Product, SortKey, Undertone } from './types'

const num = (n: number | undefined) => n ?? 0

export function sortProducts(list: Product[], key: SortKey): Product[] {
  const copy = [...list]
  switch (key) {
    case 'popular':
      return copy.sort((a, b) => b.popularity - a.popularity)
    case 'newest':
      return copy.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    case 'price-asc':
      return copy.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return copy.sort((a, b) => b.price - a.price)
    case 'rating':
      return copy.sort((a, b) => num(b.rating) - num(a.rating) || num(b.reviewCount) - num(a.reviewCount))
    case 'name':
      return copy.sort((a, b) => a.name.localeCompare(b.name))
    default:
      return copy.sort((a, b) => Number(b.featured) - Number(a.featured) || b.popularity - a.popularity)
  }
}

export const newest = (list: Product[], n = 12) => sortProducts(list, 'newest').slice(0, n)
export const popular = (list: Product[], n = 12) => sortProducts(list, 'popular').slice(0, n)
export const featured = (list: Product[], n = 12) => list.filter((p) => p.featured).sort((a, b) => b.popularity - a.popularity).slice(0, n)
export const onSale = (list: Product[], n = 12) =>
  list.filter((p) => p.discountPercent).sort((a, b) => num(b.discountPercent) - num(a.discountPercent)).slice(0, n)

/** Price used for a given variant (variants can override the product price). */
export const unitPrice = (product: Product, variant?: string) =>
  product.variants.find((v) => v.name === variant)?.price ?? product.price

export const imageUrl = (src: string) => (/^https?:\/\//.test(src) ? src : `${import.meta.env.VITE_IMAGE_BASE ?? ''}${src}`)

export const productHref = (slug: string) => `#/product/${encodeURIComponent(slug)}`

/** "Matte & satin" counts as both finishes. */
export const finishesOf = (p: Product): string[] =>
  p.finish ? p.finish.split(/\s*&\s*|\s*,\s*/).map((f) => f.trim()).filter(Boolean).map((f) => f[0].toUpperCase() + f.slice(1).toLowerCase()) : []

export const undertonesOf = (p: Product): Undertone[] => [...new Set(p.variants.map((v) => v.undertone).filter((u): u is Undertone => !!u))]

const SKIN_TYPES = ['Dry', 'Oily', 'Combination', 'Normal', 'Sensitive', 'Reactive']

/** One or two scannable tags for a card, e.g. ["Dullness", "Dry skin"] or ["Matte finish"]. */
export function cardTags(p: Product): string[] {
  const tags: string[] = []
  const finish = finishesOf(p)[0]
  if (p.concerns?.length) tags.push(p.concerns[0])
  else if (finish) tags.push(`${finish} finish`)

  const skin = (p.suitableFor ?? []).filter((s) => SKIN_TYPES.includes(s))
  if (skin.length) tags.push(`${skin.slice(0, 2).join(' / ')} skin`)
  else if (p.suitableFor?.includes('All skin types')) tags.push('All skin types')
  else if (p.concerns?.length && finish) tags.push(`${finish} finish`)
  return tags.slice(0, 2)
}

/** The single badge shown on a card: a discount beats Bestseller, then New, then anything else. */
export function cardBadge(p: Product): string | undefined {
  return p.badges.find((b) => b.startsWith('-')) ?? (p.bestseller ? 'Bestseller' : undefined) ?? p.badges.find((b) => b === 'New') ?? p.badges[0]
}

export const shopHref = (params: Record<string, string | undefined> = {}) => {
  const qs = new URLSearchParams(Object.entries(params).filter((e): e is [string, string] => !!e[1])).toString()
  return `#/shop${qs ? `?${qs}` : ''}`
}
