import { AnimatePresence, motion } from 'motion/react'
import { useCart } from '../cart/CartContext'
import { money } from '../cart/pricing'
import { useCatalog } from '../catalog/CatalogContext'
import { productHref } from '../catalog/selectors'
import type { Product } from '../catalog/types'
import { slideChild, staggerParent } from '../ui/motion'
import { useUi } from '../ui/UiContext'
import { useWishlist } from '../wishlist/WishlistContext'
import MobileSheet from './MobileSheet'
import { ArrowRight, HeartIcon, PlusIcon } from './Icons'
import ProductImage from './ProductImage'

export default function WishlistDrawer() {
  const { panel, close, open } = useUi()
  const { ids, remove } = useWishlist()
  const { add } = useCart()
  const { get } = useCatalog()

  const items = ids.map((slug) => get(slug)).filter((p): p is Product => !!p)
  const buyable = items.filter((p) => p.inStock)

  const addAll = async () => {
    for (const p of buyable) {
      const variant = p.variants.find((v) => v.stock > 0)
      await add({ productId: p.slug, variant: variant?.name })
    }
    open('cart')
  }

  const footer = items.length > 0 && (
    <div className="drawer__actions">
      <button className="btn btn--block" onClick={addAll} disabled={buyable.length === 0}>
        Add all to bag <ArrowRight size={16} />
      </button>
    </div>
  )

  return (
    <MobileSheet open={panel === 'wishlist'} onClose={close} label="Wishlist" title={<>Your <em>wishlist</em></>} count={items.length} footer={footer}>
      {items.length === 0 ? (
        <div className="drawer__empty">
          <span className="cart-empty__icon"><HeartIcon size={28} /></span>
          <h3>Nothing saved yet</h3>
          <p>Tap the heart on any product to keep it here for later.</p>
          <a href="#/shop" className="btn" onClick={close}>Browse products <ArrowRight size={16} /></a>
        </div>
      ) : (
        <motion.ul className="drawer-list" variants={staggerParent(0.06, 0.12)} initial="hidden" animate="show">
          <AnimatePresence mode="popLayout" initial={false}>
            {items.map((p) => (
              <motion.li
                key={p.slug}
                className="drawer-item"
                layout
                variants={slideChild}
                exit={{ opacity: 0, x: 60, transition: { duration: 0.25 } }}
              >
                <ProductImage product={p} compact className="drawer-item__img" />
                <div className="drawer-item__info">
                  <h3><a href={productHref(p.slug)} onClick={close}>{p.name}</a></h3>
                  <span className="drawer-item__price">
                    {p.priceMax ? `${money(p.price)} – ${money(p.priceMax)}` : money(p.price)}
                  </span>
                  {!p.inStock ? (
                    <span className="pill">Sold out</span>
                  ) : p.variants.length > 0 ? (
                    <div className="drawer-item__shades" role="group" aria-label={`Add ${p.name}`}>
                      {p.variants.map((v) => (
                        <motion.button key={v.sku} disabled={v.stock === 0} whileTap={{ scale: 0.92 }} onClick={() => add({ productId: p.slug, variant: v.name })}>
                          + {v.name}
                        </motion.button>
                      ))}
                    </div>
                  ) : (
                    <motion.button className="drawer-item__add" whileTap={{ scale: 0.94 }} onClick={() => add({ productId: p.slug })}>
                      <PlusIcon size={14} /> Add to bag
                    </motion.button>
                  )}
                </div>
                <button className="cart-line__remove" aria-label={`Remove ${p.name} from wishlist`} onClick={() => remove(p.slug)}>
                  <HeartIcon size={17} filled />
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      )}
    </MobileSheet>
  )
}
