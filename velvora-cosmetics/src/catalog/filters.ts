import { CATEGORY_SLUGS, SORT_LABELS, UNDERTONES, type CategorySlug, type Product, type SortKey, type Undertone } from './types'
import { finishesOf, undertonesOf } from './selectors'

export type Filters = {
  q: string
  category: CategorySlug[]
  sub: string[]
  collection: string[]
  brand: string[]
  concern: string[]
  finish: string[]
  undertone: Undertone[]
  min?: number
  max?: number
  rating?: number
  inStock: boolean
  vegan: boolean
  sort: SortKey
}

/** Which filter group to leave out when computing counts for that group's own options. */
export type Group = 'category' | 'sub' | 'collection' | 'brand' | 'concern' | 'finish' | 'undertone' | 'price' | 'rating' | 'availability'

const list = (v: string | null) => (v ? v.split(',').map((s) => s.trim()).filter(Boolean) : [])

export function parseFilters(params: URLSearchParams): Filters {
  const category = list(params.get('category')).filter((c): c is CategorySlug => (CATEGORY_SLUGS as readonly string[]).includes(c))
  // `subcategory` is the older single-value spelling used by some links.
  const sub = [...new Set([...list(params.get('sub')), ...list(params.get('subcategory'))])]
  let collection = list(params.get('collection'))
  let vegan = params.get('vegan') === '1'
  if (collection.includes('vegan')) {
    collection = collection.filter((c) => c !== 'vegan')
    vegan = true
  }
  const num = (key: string) => {
    const raw = params.get(key)
    const n = raw === null || raw === '' ? NaN : Number(raw)
    return Number.isFinite(n) ? n : undefined
  }
  const sort = params.get('sort')
  return {
    q: params.get('q') ?? '',
    category,
    sub,
    collection,
    brand: list(params.get('brand')),
    concern: list(params.get('concern')),
    finish: list(params.get('finish')),
    undertone: list(params.get('undertone')).filter((u): u is Undertone => (UNDERTONES as string[]).includes(u)),
    min: num('min'),
    max: num('max'),
    rating: num('rating'),
    inStock: params.get('stock') === '1',
    vegan,
    sort: sort && sort in SORT_LABELS ? (sort as SortKey) : 'featured',
  }
}

export function filtersToHash(f: Filters): string {
  const p = new URLSearchParams()
  if (f.q.trim()) p.set('q', f.q.trim())
  if (f.category.length) p.set('category', f.category.join(','))
  if (f.sub.length) p.set('sub', f.sub.join(','))
  if (f.collection.length) p.set('collection', f.collection.join(','))
  if (f.brand.length) p.set('brand', f.brand.join(','))
  if (f.concern.length) p.set('concern', f.concern.join(','))
  if (f.finish.length) p.set('finish', f.finish.join(','))
  if (f.undertone.length) p.set('undertone', f.undertone.join(','))
  if (f.min !== undefined) p.set('min', String(f.min))
  if (f.max !== undefined) p.set('max', String(f.max))
  if (f.rating) p.set('rating', String(f.rating))
  if (f.inStock) p.set('stock', '1')
  if (f.vegan) p.set('vegan', '1')
  if (f.sort !== 'featured') p.set('sort', f.sort)
  const qs = p.toString()
  return `#/shop${qs ? `?${qs}` : ''}`
}

export function countActive(f: Filters): number {
  return (
    f.category.length + f.sub.length + f.collection.length + f.brand.length + f.concern.length + f.finish.length + f.undertone.length +
    (f.min !== undefined || f.max !== undefined ? 1 : 0) + (f.rating ? 1 : 0) + Number(f.inStock) + Number(f.vegan) + (f.q.trim() ? 1 : 0)
  )
}

export function applyFilters(products: Product[], f: Filters, skip?: Group | Group[]): Product[] {
  const skipped = new Set(Array.isArray(skip) ? skip : skip ? [skip] : [])
  const words = f.q.trim().toLowerCase().split(/\s+/).filter(Boolean)
  const subToCategory = new Map(products.map((p) => [p.subcategory, p.category]))
  const subs = new Set(f.sub)

  return products.filter((p) => {
    if (!skipped.has('category') && f.category.length && !f.category.includes(p.category)) return false

    if (!skipped.has('sub') && subs.size) {
      // A category's subcategory selection only narrows that category; with no category ticked it narrows everything.
      const categoryHasSelection = f.sub.some((s) => subToCategory.get(s) === p.category)
      if ((f.category.length === 0 || categoryHasSelection) && !subs.has(p.subcategory)) return false
    }

    if (!skipped.has('collection') && f.collection.length && !f.collection.some((c) => p.collections.includes(c))) return false
    if (!skipped.has('brand') && f.brand.length && !f.brand.includes(p.brand)) return false
    if (!skipped.has('concern') && f.concern.length && !f.concern.some((c) => p.concerns?.includes(c))) return false
    if (!skipped.has('finish') && f.finish.length && !finishesOf(p).some((x) => f.finish.includes(x))) return false
    if (!skipped.has('undertone') && f.undertone.length && !undertonesOf(p).some((u) => f.undertone.includes(u))) return false
    if (!skipped.has('price')) {
      if (f.min !== undefined && p.price < f.min) return false
      if (f.max !== undefined && p.price > f.max) return false
    }
    if (!skipped.has('rating') && f.rating && (p.rating ?? 0) < f.rating) return false
    if (!skipped.has('availability')) {
      if (f.inStock && !p.inStock) return false
      if (f.vegan && !p.collections.includes('vegan')) return false
    }
    if (words.length) {
      const haystack = `${p.name} ${p.brand} ${p.subcategory} ${p.category} ${p.tags.join(' ')} ${p.blurb}`.toLowerCase()
      if (!words.every((w) => haystack.includes(w))) return false
    }
    return true
  })
}

export function countBy<T extends string>(products: Product[], pick: (p: Product) => T | T[]): Map<T, number> {
  const counts = new Map<T, number>()
  for (const p of products) {
    const keys = pick(p)
    for (const key of Array.isArray(keys) ? keys : [keys]) counts.set(key, (counts.get(key) ?? 0) + 1)
  }
  return counts
}
