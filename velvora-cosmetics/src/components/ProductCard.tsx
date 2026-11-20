import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useCart } from '../cart/CartContext'
import { money } from '../cart/pricing'
import type { Product } from '../catalog/types'
import { cardBadge, cardTags, finishesOf, productHref, unitPrice } from '../catalog/selectors'
import { useWishlist } from '../wishlist/WishlistContext'
import { CheckIcon, HeartIcon, PlusIcon } from './Icons'
import ProductImage from './ProductImage'

const MAX_DOTS = 6

export default function ProductCard({ product: p }: { product: Product }) {
  const { add } = useCart()
  const wishlist = useWishlist()
  const wished = wishlist.has(p.slug)
  const [picking, setPicking] = useState(false)
  const [added, setAdded] = useState(false)
  const [shade, setShade] = useState<string | undefined>()

  useEffect(() => {
    if (!added) return
    const t = setTimeout(() => setAdded(false), 1400)
    return () => clearTimeout(t)
  }, [added])

  const hasVariants = p.variants.length > 0
  const swatches = p.variants.filter((v) => v.swatch)
  const hasShades = swatches.length > 0
  const chosen = swatches.find((v) => v.name === shade)
  const price = unitPrice(p, chosen?.name)
  const badge = cardBadge(p)
  const tags = cardTags(p)
  const label = (p.variantLabel ?? 'option').toLowerCase()

  const quickAdd = async (variant?: string) => {
    await add({ productId: p.slug, variant })
    setPicking(false)
    setAdded(true)
  }

  // A shade picked with the dots is added straight away; otherwise the button opens the chooser.
  const onQuick = () => {
    if (!hasVariants) return quickAdd()
    if (chosen) return quickAdd(chosen.name)
    setPicking((v) => !v)
  }

  const chooseFromPicker = (name: string) => {
    if (swatches.some((v) => v.name === name)) setShade(name)
    return quickAdd(name)
  }

  const quickLabel = added ? 'Added to bag' : hasVariants && !chosen ? `Select ${label}` : 'Add to bag'

  return (
    <article className="card">
      <div className="card__imgwrap">
        <a href={productHref(p.slug)} className="card__media" aria-label={`View ${p.name}`}>
          <ProductImage product={p} tint={chosen?.swatch} texture={finishesOf(p)[0] ? `Texture · ${finishesOf(p)[0]}` : 'Texture'} />
        </a>

        {badge && <span className={`card__badge ${badge.startsWith('-') ? 'is-sale' : ''}`}>{badge}</span>}

        <div style={{ position: 'relative' }}>
          <motion.button
            className={`card__wish ${wished ? 'is-on' : ''}`}
            aria-label={wished ? `Remove ${p.name} from wishlist` : `Add ${p.name} to wishlist`}
            aria-pressed={wished}
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.85 }}
            onClick={() => wishlist.toggle(p.slug)}
          >
            <motion.span
              key={String(wished)}
              className="icon-swap"
              initial={{ scale: wished ? 0.4 : 1 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 600, damping: 12 }}
            >
              <HeartIcon size={16} filled={wished} />
            </motion.span>
          </motion.button>
          <AnimatePresence>
            {wished && (
              <motion.div
                initial={{ scale: 0.8, opacity: 1 }}
                animate={{ scale: 1.4, opacity: 0 }}
                exit={{ scale: 1.4, opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  border: '2px solid var(--rose-deep)',
                  pointerEvents: 'none',
                }}
              />
            )}
          </AnimatePresence>
        </div>

        {!p.inStock ? (
          <span className="card__quick is-soldout">Sold out</span>
        ) : (
          <div style={{ position: 'relative' }}>
            <motion.button
              className={`card__quick ${added ? 'is-added' : ''} ${picking ? 'is-open' : ''}`}
              aria-label={chosen ? `Add ${p.name} in ${chosen.name} to bag` : `${quickLabel}: ${p.name}`}
              aria-expanded={hasVariants && !chosen ? picking : undefined}
              whileTap={{ scale: 0.97 }}
              onClick={onQuick}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={quickLabel + picking}
                  className="card__quick-label"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ duration: 0.16 }}
                >
                  {added ? <CheckIcon size={16} /> : <PlusIcon size={16} style={{ transform: picking ? 'rotate(45deg)' : undefined, transition: 'transform .2s' }} />}
                  {quickLabel}
                </motion.span>
              </AnimatePresence>
            </motion.button>
            <AnimatePresence>
              {added && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 1 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  exit={{ scale: 1.5, opacity: 0 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '8px',
                    border: '2px solid var(--rose-deep)',
                    pointerEvents: 'none',
                  }}
                />
              )}
            </AnimatePresence>
          </div>
        )}

        <AnimatePresence>
          {picking && hasVariants && !chosen && (
            <motion.div
              className="card__picker"
              role="group"
              aria-label={`Choose ${label}`}
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 500, damping: 32 }}
            >
              <div>
                {p.variants.map((v) => (
                  <motion.button key={v.sku} disabled={v.stock === 0} whileTap={{ scale: 0.94 }} onClick={() => chooseFromPicker(v.name)}>
                    {v.swatch && <i className="swatch" style={{ background: v.swatch }} />}
                    {v.name}
                    {v.price !== undefined && v.price !== p.price ? ` · ${money(v.price)}` : ''}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="card__body">
        <div className="card__top">
          <span className="card__brand">{p.brand}</span>
          {p.rating ? (
            <span className="card__rating" aria-label={`Rated ${p.rating} out of 5${p.reviewCount ? ` from ${p.reviewCount} reviews` : ''}`}>
              <span aria-hidden="true">★</span> {p.rating.toFixed(1)}
              {p.reviewCount ? <small>({p.reviewCount})</small> : null}
            </span>
          ) : null}
        </div>
        <h3><a href={productHref(p.slug)}>{p.name}</a></h3>

        {tags.length > 0 ? (
          <ul className="card__tags">{tags.map((t) => <li key={t}>{t}</li>)}</ul>
        ) : (
          <p className="card__sub">{p.subcategory}</p>
        )}

        {hasShades && (
          <div className="card__shades" role="group" aria-label="Shades">
            {swatches.slice(0, MAX_DOTS).map((v) => (
              <button
                key={v.sku}
                type="button"
                className={`shade-dot ${shade === v.name ? 'is-on' : ''}`}
                style={{ background: v.swatch }}
                disabled={v.stock === 0}
                title={v.name}
                aria-label={`${v.name}${v.undertone ? `, ${v.undertone} undertone` : ''}${v.stock === 0 ? ', sold out' : ''}`}
                aria-pressed={shade === v.name}
                onClick={() => setShade((s) => (s === v.name ? undefined : v.name))}
              />
            ))}
            {swatches.length > MAX_DOTS && <a className="dot-more" href={productHref(p.slug)} aria-label={`See all ${swatches.length} shades`}>+{swatches.length - MAX_DOTS}</a>}
            <span className="card__shade-name" aria-live="polite">{chosen ? chosen.name : `${swatches.length} shades`}</span>
          </div>
        )}

        <div className="card__meta">
          <div className="card__price">
            <span>{p.priceMax && !chosen ? `${money(p.price)} – ${money(p.priceMax)}` : money(price)}</span>
            {p.oldPrice && !chosen && <del>{money(p.oldPrice)}</del>}
            {p.size && <small className="card__size">{p.size}</small>}
          </div>
        </div>
      </div>
    </article>
  )
}
