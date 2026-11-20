import { useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useCart } from '../cart/CartContext'
import { FREE_SHIPPING_THRESHOLD, money } from '../cart/pricing'
import { useCartRemoval } from '../cart/useCartRemoval'
import { sortProducts, productHref } from '../catalog/selectors'
import { useCatalog } from '../catalog/CatalogContext'
import { slideChild, staggerParent } from '../ui/motion'
import AnimatedMoney from './AnimatedMoney'
import { ArrowLeft, ArrowRight, BagIcon, CloseIcon, LeafIcon, ShieldIcon, TrashIcon, TruckIcon } from './Icons'
import ProductCard from './ProductCard'
import ProductImage from './ProductImage'
import Seo from './Seo'
import Stepper from './Stepper'

export default function CartPage() {
  const { cart, priced, loading, applyPromo, removePromo, setNote, notify } = useCart()
  const { removeLine, changeQty, clearBag } = useCartRemoval()
  const catalog = useCatalog()
  const [code, setCode] = useState('')
  const [promoError, setPromoError] = useState<string | null>(null)
  const [noteDraft, setNoteDraft] = useState<string | null>(null)

  const submitPromo = async (e: FormEvent) => {
    e.preventDefault()
    if (!code.trim()) return
    const error = await applyPromo(code)
    setPromoError(error)
    if (!error) setCode('')
  }

  const inBag = new Set(priced.lines.map((l) => l.productId))
  const bagCategories = new Set(priced.lines.map((l) => l.product.category))
  // Prefer popular products from categories already in the bag, then anything popular.
  const suggestions = sortProducts(catalog.products, 'popular')
    .filter((p) => !inBag.has(p.slug) && p.inStock)
    .sort((a, b) => Number(bagCategories.has(b.category)) - Number(bagCategories.has(a.category)))
    .slice(0, 4)

  const empty = !loading && priced.lines.length === 0

  return (
    <section className="cart-page">
      <Seo title="Your bag" path="#/cart" noindex />
      <a href="#/shop" className="back-link"><ArrowLeft size={16} /> Continue shopping</a>

      <header className="cart-head">
        <h1>Your <em>bag</em></h1>
        {priced.count > 0 && (
          <>
            <span className="cart-head__count">{priced.count} {priced.count === 1 ? 'item' : 'items'}</span>
            <button className="link-btn" onClick={() => clearBag(priced.count)}>Clear bag</button>
          </>
        )}
      </header>

      {loading && <div className="cart-skeleton" aria-busy="true" />}

      {empty && (
        <motion.div className="cart-empty" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="cart-empty__icon"><BagIcon size={30} /></span>
          <h2>Your bag is feeling light</h2>
          <p>Add a few favourites and they'll show up here.</p>
          <a href="#/shop" className="btn">Start shopping <ArrowRight size={16} /></a>
        </motion.div>
      )}

      {priced.lines.length > 0 && (
        <div className="cart-layout">
          <div className="cart-main">
            <div className="ship-meter">
              <p>
                {priced.remainingForFreeShipping > 0 ? (
                  <>You're <strong>{money(priced.remainingForFreeShipping)}</strong> away from free shipping</>
                ) : (
                  <><strong>You've unlocked free shipping</strong> on this order</>
                )}
              </p>
              <div
                className="ship-meter__bar"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={FREE_SHIPPING_THRESHOLD}
                aria-valuenow={Math.round(priced.freeShippingProgress * FREE_SHIPPING_THRESHOLD)}
              >
                <motion.span
                  initial={false}
                  animate={{ width: `${priced.freeShippingProgress * 100}%` }}
                  transition={{ type: 'spring', stiffness: 160, damping: 22 }}
                />
              </div>
            </div>

            <motion.ul className="cart-lines" variants={staggerParent(0.07)} initial="hidden" animate="show">
              <AnimatePresence mode="popLayout" initial={false}>
                {priced.lines.map((l) => (
                  <motion.li
                    className="cart-line"
                    key={l.lineId}
                    layout
                    variants={slideChild}
                    exit={{ opacity: 0, x: 80, transition: { duration: 0.25 } }}
                  >
                    <a href={productHref(l.productId)} className="cart-line__img" aria-label={`View ${l.product.name}`}>
                      <ProductImage product={l.product} compact />
                    </a>

                    <div className="cart-line__info">
                      <h3><a href={productHref(l.productId)}>{l.product.name}</a></h3>
                      {l.variant && <span className="pill">{l.variant}</span>}
                      <span className="cart-line__unit">{money(l.unitPrice)} each</span>
                    </div>

                    <Stepper name={l.product.name} qty={l.qty} onChange={(q) => changeQty(l, q)} />

                    <AnimatedMoney className="cart-line__total" value={l.lineTotal} />

                    <button
                      className="cart-line__remove"
                      aria-label={`Remove ${l.product.name}`}
                      onClick={() => removeLine(l)}
                    >
                      <TrashIcon size={17} />
                    </button>
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>

            <label className="note">
              <span>Order note <em>(optional)</em></span>
              <textarea
                rows={3}
                placeholder="Gift message, delivery instructions…"
                value={noteDraft ?? cart.note ?? ''}
                onChange={(e) => setNoteDraft(e.target.value)}
                onBlur={() => {
                  if (noteDraft !== null && noteDraft !== (cart.note ?? '')) setNote(noteDraft)
                  setNoteDraft(null)
                }}
              />
            </label>
          </div>

          <aside className="cart-summary" aria-label="Order summary">
            <h2>Order summary</h2>

            <AnimatePresence mode="wait" initial={false}>
              {cart.promoCode ? (
                <motion.div
                  key="applied"
                  className="promo-applied"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.18 }}
                >
                  <span><b>{cart.promoCode}</b> · {priced.promoLabel}</span>
                  <button aria-label="Remove promo code" onClick={removePromo}><CloseIcon size={14} /></button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  className="promo"
                  onSubmit={submitPromo}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <motion.input
                    key={promoError ?? 'ok'}
                    value={code}
                    onChange={(e) => { setCode(e.target.value); setPromoError(null) }}
                    placeholder="Promo code"
                    aria-label="Promo code"
                    aria-invalid={!!promoError}
                    animate={promoError ? { x: [0, -8, 8, -5, 5, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                  />
                  <button type="submit">Apply</button>
                  {promoError ? <p className="promo__msg is-error">{promoError}</p> : <p className="promo__msg">Try VELVORA10</p>}
                </motion.form>
              )}
            </AnimatePresence>

            <dl className="totals">
              <div><dt>Subtotal</dt><dd><AnimatedMoney value={priced.subtotal} /></dd></div>
              {priced.discount > 0 && (
                <div className="is-discount"><dt>Discount</dt><dd>−<AnimatedMoney value={priced.discount} /></dd></div>
              )}
              <div><dt>Shipping</dt><dd>{priced.shipping === 0 ? 'Free' : money(priced.shipping)}</dd></div>
              <div className="totals__grand"><dt>Total</dt><dd><AnimatedMoney value={priced.total} /></dd></div>
            </dl>

            <motion.button
              className="btn btn--light btn--block"
              whileTap={{ scale: 0.97 }}
              onClick={() => notify("Checkout isn't connected yet — plug your API in via src/cart/cartApi.ts")}
            >
              Checkout <ArrowRight size={16} />
            </motion.button>

            <ul className="assurances">
              <li><TruckIcon size={16} /> Ships in 1–2 business days</li>
              <li><ShieldIcon size={16} /> 30-day money-back guarantee</li>
              <li><LeafIcon size={16} /> Plastic-free, recyclable packaging</li>
            </ul>
          </aside>
        </div>
      )}

      {!loading && suggestions.length > 0 && (
        <section className="cart-recs">
          <div className="section-head">
            <div>
              <span className="eyebrow">Complete your routine</span>
              <h2>Pairs <em>well</em> with</h2>
            </div>
          </div>
          <div className="grid">
            {suggestions.map((p) => (
              <div className="grid__item" key={p.slug}><ProductCard product={p} /></div>
            ))}
          </div>
        </section>
      )}
    </section>
  )
}
