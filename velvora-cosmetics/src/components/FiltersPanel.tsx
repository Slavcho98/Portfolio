import { useMemo, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { applyFilters, countActive, countBy, type Filters } from '../catalog/filters'
import { finishesOf, undertonesOf } from '../catalog/selectors'
import { COLLECTION_LABELS, UNDERTONES, type CategorySlug, type Product } from '../catalog/types'
import { categories } from '../data'
import { CATEGORY_ICONS, CheckIcon, ChevronDown } from './Icons'

const spring = { type: 'spring', stiffness: 600, damping: 28 } as const
const COLLECTION_ORDER = ['bestsellers', 'new-arrivals', 'sale', 'gift-ideas', 'my-roses', 'travel-friendly']

const toggle = <T,>(list: T[], value: T) => (list.includes(value) ? list.filter((v) => v !== value) : [...list, value])

function FilterGroup({ title, badge, defaultOpen = true, children }: { title: string; badge?: number; defaultOpen?: boolean; children: ReactNode }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <section className="fgroup">
      <h3>
        <button type="button" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
          <span>{title}{badge ? <b>{badge}</b> : null}</span>
          <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}><ChevronDown size={16} /></motion.span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className="fgroup__panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.2, 0.7, 0.2, 1] }}
          >
            <div className="fgroup__body">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

function Check({ label, count, checked, onChange, icon }: { label: string; count?: number; checked: boolean; onChange: () => void; icon?: ReactNode }) {
  const empty = count === 0 && !checked
  return (
    <label className={`check ${checked ? 'is-checked' : ''} ${empty ? 'is-empty' : ''}`}>
      <input type="checkbox" checked={checked} disabled={empty} onChange={onChange} />
      <span className="check__box" aria-hidden="true">
        <AnimatePresence initial={false}>
          {checked && (
            <motion.span key="tick" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={spring}>
              <CheckIcon size={12} />
            </motion.span>
          )}
        </AnimatePresence>
      </span>
      {icon}
      <span className="check__label">{label}</span>
      {count !== undefined && <small>{count}</small>}
    </label>
  )
}

/** Compact toggle for short, visual options (finish, undertone). */
function Pill({ label, count, checked, onChange, dot }: { label: string; count: number; checked: boolean; onChange: () => void; dot?: string }) {
  const empty = count === 0 && !checked
  return (
    <label className={`fpill ${checked ? 'is-checked' : ''} ${empty ? 'is-empty' : ''}`}>
      <input type="checkbox" checked={checked} disabled={empty} onChange={onChange} />
      {dot && <i className={`fpill__dot fpill__dot--${dot}`} aria-hidden="true" />}
      <span>{label}</span>
      <small>{count}</small>
    </label>
  )
}

/** Long option lists show the most common few and expand on demand; ticked options are always visible. */
function ShowMore({ items, limit, force, render }: { items: string[]; limit: number; force: string[]; render: (item: string) => ReactNode }) {
  const [expanded, setExpanded] = useState(false)
  const visible = expanded ? items : items.filter((item, i) => i < limit || force.includes(item))
  const hidden = items.length - visible.length
  return (
    <>
      <ul className="flist">
        {visible.map((item) => <li key={item}>{render(item)}</li>)}
      </ul>
      {(hidden > 0 || expanded) && (
        <button type="button" className="link-btn fmore" onClick={() => setExpanded((v) => !v)}>
          {expanded ? 'Show less' : `Show ${hidden} more`}
        </button>
      )}
    </>
  )
}

function Switch({ label, hint, checked, onChange }: { label: string; hint?: number; checked: boolean; onChange: () => void }) {
  return (
    <label className="switch">
      <span>{label}{hint !== undefined && <small>{hint}</small>}</span>
      <input type="checkbox" checked={checked} onChange={onChange} />
      <i aria-hidden="true" />
    </label>
  )
}

/** Dual-handle range. Moves freely while dragging and only touches the URL when the handle is released. */
function PriceRange({ bounds, value, onCommit }: { bounds: [number, number]; value: [number, number]; onCommit: (min: number, max: number) => void }) {
  const [lo, hi] = bounds
  const [draft, setDraft] = useState<[number, number]>(value)
  const [a, b] = draft
  const pct = (n: number) => ((n - lo) / (hi - lo || 1)) * 100

  const commit = (next: [number, number] = draft) => {
    const min = Math.max(lo, Math.min(next[0], next[1]))
    const max = Math.min(hi, Math.max(next[0], next[1]))
    setDraft([min, max])
    onCommit(min, max)
  }
  const setMin = (n: number) => setDraft([Math.min(n, b), b])
  const setMax = (n: number) => setDraft([a, Math.max(n, a)])

  return (
    <div className="range">
      <div className="range__slider">
        <div className="range__track"><i style={{ left: `${pct(a)}%`, right: `${100 - pct(b)}%` }} /></div>
        <input type="range" min={lo} max={hi} value={a} aria-label="Minimum price" onChange={(e) => setMin(Number(e.target.value))} onPointerUp={() => commit()} onKeyUp={() => commit()} />
        <input type="range" min={lo} max={hi} value={b} aria-label="Maximum price" onChange={(e) => setMax(Number(e.target.value))} onPointerUp={() => commit()} onKeyUp={() => commit()} />
      </div>
      <div className="range__inputs">
        <label><span>$</span><input type="number" inputMode="numeric" min={lo} max={hi} value={a} aria-label="Minimum price in dollars" onChange={(e) => setMin(Number(e.target.value))} onBlur={(e) => commit([Number(e.currentTarget.value), b])} onKeyDown={(e) => e.key === 'Enter' && commit([Number(e.currentTarget.value), b])} /></label>
        <i aria-hidden="true" />
        <label><span>$</span><input type="number" inputMode="numeric" min={lo} max={hi} value={b} aria-label="Maximum price in dollars" onChange={(e) => setMax(Number(e.target.value))} onBlur={(e) => commit([a, Number(e.currentTarget.value)])} onKeyDown={(e) => e.key === 'Enter' && commit([a, Number(e.currentTarget.value)])} /></label>
      </div>
    </div>
  )
}

type Props = {
  products: Product[]
  filters: Filters
  onChange: (patch: Partial<Filters>) => void
  onClear: () => void
}

export default function FiltersPanel({ products, filters, onChange, onClear }: Props) {
  const active = countActive(filters)

  const facets = useMemo(() => {
    const catRows = applyFilters(products, filters, ['category', 'sub'])
    const subRows = applyFilters(products, filters, 'sub')
    const availability = applyFilters(products, filters, 'availability')
    const rated = applyFilters(products, filters, 'rating')
    return {
      category: countBy(catRows, (p) => p.category),
      sub: countBy(subRows, (p) => p.subcategory),
      brand: countBy(applyFilters(products, filters, 'brand'), (p) => p.brand),
      concern: countBy(applyFilters(products, filters, 'concern'), (p) => p.concerns ?? []),
      finish: countBy(applyFilters(products, filters, 'finish'), (p) => finishesOf(p)),
      undertone: countBy(applyFilters(products, filters, 'undertone'), (p) => undertonesOf(p)),
      collection: countBy(applyFilters(products, filters, 'collection'), (p) => p.collections),
      inStock: availability.filter((p) => p.inStock).length,
      vegan: availability.filter((p) => p.collections.includes('vegan')).length,
      rating4: rated.filter((p) => (p.rating ?? 0) >= 4).length,
      rating3: rated.filter((p) => (p.rating ?? 0) >= 3).length,
    }
  }, [products, filters])

  const brands = useMemo(() => [...new Set(products.map((p) => p.brand))].sort(), [products])
  // Options come from the whole catalogue (most common first) so they stay put while other filters change.
  const concerns = useMemo(() => [...countBy(products, (p) => p.concerns ?? [])].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).map(([name]) => name), [products])
  const finishes = useMemo(() => [...countBy(products, (p) => finishesOf(p))].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).map(([name]) => name), [products])
  const hasUndertones = useMemo(() => products.some((p) => undertonesOf(p).length > 0), [products])
  const bounds = useMemo<[number, number]>(() => {
    const prices = products.map((p) => p.price)
    return prices.length ? [Math.floor(Math.min(...prices)), Math.ceil(Math.max(...prices))] : [0, 200]
  }, [products])
  const subsOf = (slug: CategorySlug) =>
    [...new Set(products.filter((p) => p.category === slug).map((p) => p.subcategory))].sort()

  const toggleCategory = (slug: CategorySlug) => {
    const removing = filters.category.includes(slug)
    onChange({
      category: toggle(filters.category, slug),
      sub: removing ? filters.sub.filter((s) => !subsOf(slug).includes(s)) : filters.sub,
    })
  }

  const priceValue: [number, number] = [filters.min ?? bounds[0], filters.max ?? bounds[1]]
  const priceActive = filters.min !== undefined || filters.max !== undefined

  return (
    <div className="fpanel">
      <header className="fpanel__head">
        <h2>Filters</h2>
        <AnimatePresence>
          {active > 0 && (
            <motion.button type="button" className="link-btn" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClear}>
              Clear all ({active})
            </motion.button>
          )}
        </AnimatePresence>
      </header>

      <FilterGroup title="Category" badge={filters.category.length + filters.sub.length}>
        <ul className="flist">
          {categories.map((c) => {
            const Icon = CATEGORY_ICONS[c.slug]
            const checked = filters.category.includes(c.slug)
            return (
              <li key={c.slug}>
                <Check label={c.name} count={facets.category.get(c.slug) ?? 0} checked={checked} onChange={() => toggleCategory(c.slug)} icon={<Icon size={15} aria-hidden="true" className="check__icon" />} />
                <AnimatePresence initial={false}>
                  {checked && (
                    <motion.ul
                      className="flist flist--nested"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.2, 0.7, 0.2, 1] }}
                    >
                      {subsOf(c.slug).map((s) => (
                        <li key={s}><Check label={s} count={facets.sub.get(s) ?? 0} checked={filters.sub.includes(s)} onChange={() => onChange({ sub: toggle(filters.sub, s) })} /></li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
            )
          })}
        </ul>
      </FilterGroup>

      {concerns.length > 0 && (
        <FilterGroup title="Skin & hair concern" badge={filters.concern.length} defaultOpen={filters.concern.length > 0}>
          <ShowMore
            limit={7}
            items={concerns}
            force={filters.concern}
            render={(c) => <Check label={c} count={facets.concern.get(c) ?? 0} checked={filters.concern.includes(c)} onChange={() => onChange({ concern: toggle(filters.concern, c) })} />}
          />
        </FilterGroup>
      )}

      {finishes.length > 0 && (
        <FilterGroup title="Finish" badge={filters.finish.length} defaultOpen={filters.finish.length > 0}>
          <div className="fpills">
            {finishes.map((f) => (
              <Pill key={f} label={f} count={facets.finish.get(f) ?? 0} checked={filters.finish.includes(f)} onChange={() => onChange({ finish: toggle(filters.finish, f) })} />
            ))}
          </div>
        </FilterGroup>
      )}

      {hasUndertones && (
        <FilterGroup title="Undertone" badge={filters.undertone.length} defaultOpen={filters.undertone.length > 0}>
          <div className="fpills">
            {UNDERTONES.map((u) => (
              <Pill key={u} label={u[0].toUpperCase() + u.slice(1)} dot={u} count={facets.undertone.get(u) ?? 0} checked={filters.undertone.includes(u)} onChange={() => onChange({ undertone: toggle(filters.undertone, u) })} />
            ))}
          </div>
          <p className="fhint">Shade-matched makeup and lip colour only.</p>
        </FilterGroup>
      )}

      <FilterGroup title="Price" badge={priceActive ? 1 : 0}>
        <PriceRange key={priceValue.join('-')} bounds={bounds} value={priceValue} onCommit={(min, max) => onChange({ min: min > bounds[0] ? min : undefined, max: max < bounds[1] ? max : undefined })} />
      </FilterGroup>

      <FilterGroup title="Collections" badge={filters.collection.length}>
        <ul className="flist">
          {COLLECTION_ORDER.map((slug) => (
            <li key={slug}><Check label={COLLECTION_LABELS[slug]} count={facets.collection.get(slug) ?? 0} checked={filters.collection.includes(slug)} onChange={() => onChange({ collection: toggle(filters.collection, slug) })} /></li>
          ))}
        </ul>
      </FilterGroup>

      <FilterGroup title="Brand" badge={filters.brand.length}>
        <ul className="flist">
          {brands.map((b) => (
            <li key={b}><Check label={b} count={facets.brand.get(b) ?? 0} checked={filters.brand.includes(b)} onChange={() => onChange({ brand: toggle(filters.brand, b) })} /></li>
          ))}
        </ul>
      </FilterGroup>

      <FilterGroup title="Rating" badge={filters.rating ? 1 : 0} defaultOpen={false}>
        <ul className="flist">
          {[
            { value: 4, count: facets.rating4 },
            { value: 3, count: facets.rating3 },
          ].map(({ value, count }) => (
            <li key={value}>
              <label className={`check check--radio ${filters.rating === value ? 'is-checked' : ''}`}>
                <input type="radio" name="rating" checked={filters.rating === value} onChange={() => onChange({ rating: value })} onClick={() => filters.rating === value && onChange({ rating: undefined })} />
                <span className="check__box" aria-hidden="true"><i /></span>
                <span className="check__stars" aria-hidden="true">{'★'.repeat(value)}<span>{'★'.repeat(5 - value)}</span></span>
                <span className="check__label"><span className="sr-only">{value} stars </span>&amp; up</span>
                <small>{count}</small>
              </label>
            </li>
          ))}
        </ul>
      </FilterGroup>

      <FilterGroup title="Availability">
        <div className="fswitches">
          <Switch label="In stock only" hint={facets.inStock} checked={filters.inStock} onChange={() => onChange({ inStock: !filters.inStock })} />
          <Switch label="Vegan only" hint={facets.vegan} checked={filters.vegan} onChange={() => onChange({ vegan: !filters.vegan })} />
        </div>
      </FilterGroup>
    </div>
  )
}
