import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useCatalog } from '../catalog/CatalogContext'
import { applyFilters, countActive, filtersToHash, parseFilters, type Filters } from '../catalog/filters'
import { sortProducts } from '../catalog/selectors'
import { COLLECTION_LABELS, SORT_LABELS, type SortKey } from '../catalog/types'
import { categories } from '../data'
import { useMediaQuery } from '../hooks/useMediaQuery'
import MobileSheet from './MobileSheet'
import FiltersPanel from './FiltersPanel'
import { CloseIcon, EmptyBoxIcon, FilterIcon, SearchLensIcon, SidebarCloseIcon, SidebarOpenIcon } from './Icons'
import ProductCard from './ProductCard'
import ProductSkeletons from './ProductSkeletons'
import Seo from './Seo'
import SortSelect from './SortSelect'

const categoryName = Object.fromEntries(categories.map((c) => [c.slug, c.name])) as Record<string, string>
const PAGE_SIZE = 24

type Chip = { key: string; label: string; remove: Partial<Filters> }

export default function ShopPage({ params }: { params: URLSearchParams }) {
  const { products, status, reload } = useCatalog()
  const desktop = useMediaQuery('(min-width: 993px)')
  const [filtersOpen, setFiltersOpen] = useState(() => localStorage.getItem('velvora.shop.filters') !== 'closed')
  const toggleFilters = () =>
    setFiltersOpen((open) => {
      localStorage.setItem('velvora.shop.filters', open ? 'closed' : 'open')
      return !open
    })

  const [drawerOpen, setDrawerOpen] = useState(false)

  // The URL is the single source of truth, so every filtered view can be shared or bookmarked.
  const filters = useMemo(() => parseFilters(params), [params])
  const update = useCallback(
    (patch: Partial<Filters>) => window.location.replace(filtersToHash({ ...filters, ...patch })),
    [filters],
  )
  const clearAll = () => {
    setQuery('')
    window.location.replace(filtersToHash({ ...parseFilters(new URLSearchParams()), sort: filters.sort }))
  }

  const [query, setQuery] = useState(filters.q)
  const searchRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (query.trim() === filters.q.trim()) return
    const t = setTimeout(() => update({ q: query }), 250)
    return () => clearTimeout(t)
  }, [query, filters.q, update])

  // The header's search icon links here with ?search=1.
  useEffect(() => {
    if (params.has('search')) searchRef.current?.focus()
  }, [params])

  const results = useMemo(() => sortProducts(applyFilters(products, filters), filters.sort), [products, filters])
  const active = countActive(filters)

  const chips: Chip[] = [
    ...filters.category.map((c) => ({ key: `c-${c}`, label: categoryName[c] ?? c, remove: { category: filters.category.filter((x) => x !== c) } })),
    ...filters.sub.map((s) => ({ key: `s-${s}`, label: s, remove: { sub: filters.sub.filter((x) => x !== s) } })),
    ...filters.collection.map((c) => ({ key: `col-${c}`, label: COLLECTION_LABELS[c] ?? c, remove: { collection: filters.collection.filter((x) => x !== c) } })),
    ...filters.brand.map((b) => ({ key: `b-${b}`, label: b, remove: { brand: filters.brand.filter((x) => x !== b) } })),
    ...filters.concern.map((c) => ({ key: `cn-${c}`, label: c, remove: { concern: filters.concern.filter((x) => x !== c) } })),
    ...filters.finish.map((f) => ({ key: `f-${f}`, label: `${f} finish`, remove: { finish: filters.finish.filter((x) => x !== f) } })),
    ...filters.undertone.map((u) => ({ key: `u-${u}`, label: `${u[0].toUpperCase()}${u.slice(1)} undertone`, remove: { undertone: filters.undertone.filter((x) => x !== u) } })),
    ...(filters.min !== undefined || filters.max !== undefined
      ? [{ key: 'price', label: `$${filters.min ?? '0'} – ${filters.max !== undefined ? `$${filters.max}` : 'any'}`, remove: { min: undefined, max: undefined } }]
      : []),
    ...(filters.rating ? [{ key: 'rating', label: `${filters.rating}★ & up`, remove: { rating: undefined } }] : []),
    ...(filters.inStock ? [{ key: 'stock', label: 'In stock', remove: { inStock: false } }] : []),
    ...(filters.vegan ? [{ key: 'vegan', label: 'Vegan', remove: { vegan: false } }] : []),
  ]

  const title =
    filters.category.length === 1 && !filters.collection.length ? categoryName[filters.category[0]]
    : filters.collection.length === 1 && !filters.category.length ? COLLECTION_LABELS[filters.collection[0]] ?? 'All'
    : 'All'

  const seoDescription =
    filters.category.length === 1 && !filters.collection.length
      ? (categories.find((c) => c.slug === filters.category[0])?.tagline ?? '') + ` – shop Velvora ${title.toLowerCase()}: clean formulas, natural ingredients, free shipping over $100.`
      : 'Browse the full Velvora collection: skincare, lips, hair, eye, makeup and fragrance. Filter by brand, price, rating and more.'
  const singleCategory = filters.category.length === 1 && !filters.collection.length && !filters.sub.length ? filters.category[0] : undefined
  // Only plain category views are worth indexing; arbitrary filter and search combinations are duplicates.
  const indexable = !filters.q && (active === 0 || (active === 1 && !!singleCategory))

  const ready = status === 'ready'

  // "Load more" state is kept per view (filters + sort) so coming back from a product page restores how far you had scrolled.
  const viewKey = filtersToHash(filters)
  const readStored = (key: string) => {
    const n = Number(sessionStorage.getItem(`velvora.shop.shown:${key}`))
    return Number.isFinite(n) && n >= PAGE_SIZE ? n : PAGE_SIZE
  }
  const [shown, setShown] = useState({ key: viewKey, n: readStored(viewKey) })
  const visibleCount = shown.key === viewKey ? shown.n : readStored(viewKey)
  const visible = results.slice(0, visibleCount)
  const remaining = results.length - visible.length
  const loadMore = () => {
    const n = visibleCount + PAGE_SIZE
    sessionStorage.setItem(`velvora.shop.shown:${viewKey}`, String(n))
    setShown({ key: viewKey, n })
  }

  return (
    <section className="shop">
      <Seo
        title={title === 'All' ? 'Shop all products' : `Shop ${title}`}
        description={seoDescription}
        path={singleCategory ? `#/shop?category=${singleCategory}` : '#/shop'}
        noindex={!indexable}
      />
      <header className="shop-head">
        <span className="eyebrow">The full collection</span>
        <h1>{title} <em>products</em></h1>
      </header>

      <div className={`shop-layout ${desktop && !filtersOpen ? 'is-collapsed' : ''}`}>
        {desktop && (
          <aside className="filters" id="shop-filters" aria-label="Product filters" inert={!filtersOpen}>
            <FiltersPanel products={products} filters={filters} onChange={update} onClear={clearAll} />
          </aside>
        )}

        <div className="shop-main">
          <div className="shop-toolbar">
            {desktop && (
              <button type="button" className="filter-toggle" aria-expanded={filtersOpen} aria-controls="shop-filters" onClick={toggleFilters}>
                {filtersOpen ? <SidebarCloseIcon size={16} aria-hidden="true" /> : <SidebarOpenIcon size={16} aria-hidden="true" />}
                {filtersOpen ? 'Hide filters' : 'Show filters'}
                {!filtersOpen && active > 0 && <b>{active}</b>}
              </button>
            )}
            <label className="search">
              <SearchLensIcon size={18} aria-hidden="true" />
              <input
                ref={searchRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, brands, concerns…"
                aria-label="Search products"
              />
              {query && (
                <button type="button" aria-label="Clear search" onClick={() => { setQuery(''); update({ q: '' }) }}><CloseIcon size={16} /></button>
              )}
            </label>

            {!desktop && (
              <button type="button" className="filter-btn" onClick={() => setDrawerOpen(true)}>
                <FilterIcon size={16} aria-hidden="true" /> Filters
                {active > 0 && <b>{active}</b>}
              </button>
            )}

            <SortSelect
              label="Sort products"
              prefix="Sort: "
              value={filters.sort}
              options={(Object.keys(SORT_LABELS) as SortKey[]).map((k) => ({ value: k, label: SORT_LABELS[k] }))}
              onChange={(sort) => update({ sort })}
            />
          </div>

          <div className="shop-meta" aria-live="polite">
            <span>{ready ? <><b>{results.length}</b> of {products.length} products</> : status === 'loading' ? 'Loading the collection…' : 'Products unavailable'}</span>
            <AnimatePresence initial={false}>
              {chips.map((chip) => (
                <motion.button
                  key={chip.key}
                  type="button"
                  className="achip"
                  layout
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 32 }}
                  aria-label={`Remove filter ${chip.label}`}
                  onClick={() => update(chip.remove)}
                >
                  {chip.label} <CloseIcon size={12} aria-hidden="true" />
                </motion.button>
              ))}
            </AnimatePresence>
            {active > 0 && ready && <button type="button" className="link-btn" onClick={clearAll}>Clear all</button>}
          </div>

          {status === 'error' && (
            <div className="shop-state" role="alert">
              <h2>We couldn’t load the products</h2>
              <p>The product API isn’t reachable. Start it with <code>npm run dev:all</code> (or <code>npm run dev:api</code>) and try again.</p>
              <button className="btn" onClick={reload}>Try again</button>
            </div>
          )}

          {status !== 'error' && (
            <div className="grid grid--shop">
              {status === 'loading' && <ProductSkeletons count={9} />}
              <AnimatePresence mode="popLayout" initial>
                {visible.map((p, i) => (
                  <motion.div
                    className="grid__item"
                    key={p.slug}
                    layout
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0, transition: { duration: 0.45, delay: Math.min(i % PAGE_SIZE, 8) * 0.03, ease: [0.2, 0.7, 0.2, 1] } }}
                    exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.18 } }}
                  >
                    <ProductCard product={p} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {ready && results.length > PAGE_SIZE && (
            <div className="loadmore" role="status">
              <p>Showing <b>{visible.length}</b> of <b>{results.length}</b> products</p>
              <div className="loadmore__bar" aria-hidden="true">
                <motion.i initial={false} animate={{ width: `${(visible.length / results.length) * 100}%` }} transition={{ type: 'spring', stiffness: 120, damping: 24 }} />
              </div>
              {remaining > 0 && (
                <button type="button" className="btn btn--ghost" onClick={loadMore}>
                  Load {Math.min(PAGE_SIZE, remaining)} more
                </button>
              )}
            </div>
          )}

          {ready && results.length === 0 && (
            <div className="shop-state">
              <span className="cart-empty__icon"><EmptyBoxIcon size={28} /></span>
              <h2>Nothing matches those filters</h2>
              <p>Try removing a filter or two to see more of the collection.</p>
              <button className="btn" onClick={clearAll}>Clear all filters</button>
            </div>
          )}
        </div>
      </div>

      {!desktop && (
        <MobileSheet
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          label="Filters"
          title={<>Filter <em>products</em></>}
          count={active}
          footer={
            <div className="drawer__actions">
              <button className="btn btn--block" onClick={() => setDrawerOpen(false)}>Show {results.length} {results.length === 1 ? 'product' : 'products'}</button>
            </div>
          }
        >
          <FiltersPanel products={products} filters={filters} onChange={update} onClear={clearAll} />
        </MobileSheet>
      )}
    </section>
  )
}
