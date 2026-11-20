import { useState } from 'react'
import { motion } from 'motion/react'
import { useCart } from '../cart/CartContext'
import { useUi } from '../ui/UiContext'
import { useWishlist } from '../wishlist/WishlistContext'
import { useScrollPosition } from '../hooks/useScrollPosition'
import { BagIcon, ChevronDown, CloseIcon, HeartIcon, MenuIcon, SearchIcon, UserIcon } from './Icons'

const nav = [
  { label: 'Home', href: '#/' },
  { label: 'Shop', href: '#/shop' },
  { label: 'Collections', href: '#collections' },
  { label: 'Journal', href: '#top' },
  { label: 'Contact', href: '#contact' },
]

const bump = {
  initial: { scale: 1.7 },
  animate: { scale: 1 },
  transition: { type: 'spring', stiffness: 500, damping: 14 },
} as const

export default function Header() {
  const [menu, setMenu] = useState(false)
  const scrollY = useScrollPosition()
  const { priced } = useCart()
  const { ids } = useWishlist()
  const { open } = useUi()

  const isScrolled = scrollY > 50
  const scale = isScrolled ? 0.9 : 1
  const iconSize = isScrolled ? 19 : 19

  return (
    <>
      <div className="announce" id="top">
        <p>Free shipping over $100 · Natural, cruelty-free formulas</p>
        <span className="announce__lang">
          USD · English <ChevronDown size={12} />
        </span>
      </div>

      <motion.header
        className={isScrolled ? 'header header--scrolled' : 'header'}
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1, scale }}
        transition={{
          y: { type: 'spring', stiffness: 260, damping: 26, delay: 0.1 },
          opacity: { type: 'spring', stiffness: 260, damping: 26, delay: 0.1 },
          scale: { type: 'spring', stiffness: 300, damping: 30 }
        }}
        style={{ transformOrigin: 'top center' }}
      >
        <a href="#top" className="logo" aria-label="Velvora home">
          Velvora<i>.</i>
        </a>

        <nav className={`nav ${menu ? 'nav--open' : ''}`} aria-label="Main">
          <ul>
            {nav.map((n) => (
              <li key={n.label}>
                <a href={n.href} onClick={() => setMenu(false)}>{n.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header__icons">
          <button aria-label="Search products" className="icon-btn" onClick={() => { window.location.hash = '#/shop?search=1' }}><SearchIcon size={iconSize} /></button>
          <button aria-label="My account" className="icon-btn hide-sm"><UserIcon size={iconSize} /></button>
          <motion.button
            aria-label={`Wishlist, ${ids.length} saved`}
            aria-haspopup="dialog"
            className="icon-btn"
            whileTap={{ scale: 0.88 }}
            onClick={() => open('wishlist')}
          >
            <HeartIcon size={iconSize} />
            {ids.length > 0 && (
              <motion.b key={ids.length} className="dot" {...bump}>{ids.length}</motion.b>
            )}
          </motion.button>
          <motion.button
            className="icon-btn bag-btn"
            aria-label={`Open bag, ${priced.count} items`}
            aria-haspopup="dialog"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => open('cart')}
          >
            <BagIcon size={iconSize} />
            {priced.count > 0 && (
              <motion.b key={priced.count} className="dot" {...bump}>{priced.count}</motion.b>
            )}
          </motion.button>
          <button
            className="icon-btn header__burger"
            aria-label={menu ? 'Close menu' : 'Open menu'}
            aria-expanded={menu}
            onClick={() => setMenu((v) => !v)}
          >
            {menu ? <CloseIcon size={isScrolled ? 28 : 22} /> : <MenuIcon size={isScrolled ? 30 : 24} />}
          </button>
        </div>
      </motion.header>
    </>
  )
}
