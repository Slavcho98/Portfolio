import { AnimatePresence, motion } from 'motion/react'
import { useCart } from '../cart/CartContext'
import { FREE_SHIPPING_THRESHOLD, money } from '../cart/pricing'
import { useCartRemoval } from '../cart/useCartRemoval'
import { productHref } from '../catalog/selectors'
import { slideChild, staggerParent } from '../ui/motion'
import { useUi } from '../ui/UiContext'
import AnimatedMoney from './AnimatedMoney'
import MobileSheet from './MobileSheet'
import { ArrowRight, BagIcon, TrashIcon } from './Icons'
import Stepper from './Stepper'
import ProductImage from './ProductImage'

export default function CartDrawer() {
  const { panel, close } = useUi()
  const { priced, notify } = useCart()
  const { removeLine, changeQty } = useCartRemoval()
  const empty = priced.lines.length === 0

  const footer = !empty && (
    <>
      <div className="ship-meter ship-meter--compact">
        <p>
          {priced.remainingForFreeShipping > 0 ? (
            <>Add <strong>{money(priced.remainingForFreeShipping)}</strong> more for free shipping</>
          ) : (
            <strong>Free shipping unlocked</strong>
          )}
        </p>
        <div
          className="ship-meter__bar"
          role="progressbar"
          aria-label="Progress to free shipping"
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

      <div className="drawer__subtotal">
        <span>Subtotal</span>
        <AnimatedMoney value={priced.subtotal} />
      </div>
      <p className="drawer__hint">Shipping and promo codes are applied in your full bag.</p>

      <div className="drawer__actions">
        <a href="#/cart" className="btn btn--block" onClick={close}>
          View full bag <ArrowRight size={16} />
        </a>
        <button
          className="btn btn--ghost btn--block"
          onClick={() => notify("Checkout isn't connected yet — plug your API in via src/cart/cartApi.ts")}
        >
          Checkout
        </button>
      </div>
    </>
  )

  return (
    <MobileSheet open={panel === 'cart'} onClose={close} label="Shopping bag" title={<>Your <em>bag</em></>} count={priced.count} footer={footer}>
      {empty ? (
        <div className="drawer__empty">
          <span className="cart-empty__icon"><BagIcon size={28} /></span>
          <h3>Your bag is empty</h3>
          <p>Add a few favourites and they'll show up here.</p>
          <a href="#/shop" className="btn" onClick={close}>Start shopping <ArrowRight size={16} /></a>
        </div>
      ) : (
        <motion.ul className="drawer-list" variants={staggerParent(0.06, 0.12)} initial="hidden" animate="show">
          <AnimatePresence mode="popLayout" initial={false}>
            {priced.lines.map((l) => (
              <motion.li
                key={l.lineId}
                className="drawer-item"
                layout
                variants={slideChild}
                exit={{ opacity: 0, x: 60, transition: { duration: 0.25 } }}
              >
                <ProductImage product={l.product} compact className="drawer-item__img" />
                <div className="drawer-item__info">
                  <h3><a href={productHref(l.productId)} onClick={close}>{l.product.name}</a></h3>
                  {l.variant && <span className="pill">{l.variant}</span>}
                  <Stepper name={l.product.name} qty={l.qty} onChange={(q) => changeQty(l, q)} />
                </div>
                <div className="drawer-item__side">
                  <button className="cart-line__remove" aria-label={`Remove ${l.product.name}`} onClick={() => removeLine(l)}>
                    <TrashIcon size={16} />
                  </button>
                  <strong>{money(l.lineTotal)}</strong>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      )}
    </MobileSheet>
  )
}
