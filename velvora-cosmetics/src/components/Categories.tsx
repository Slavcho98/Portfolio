import { useState, type PointerEvent } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'motion/react'
import { useCatalog } from '../catalog/CatalogContext'
import { shopHref } from '../catalog/selectors'
import { categories } from '../data'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { reveal } from '../ui/motion'
import { ArrowRight } from './Icons'

const spring = { type: 'spring', stiffness: 210, damping: 30 } as const

type Category = (typeof categories)[number]

type CardProps = {
  category: Category
  index: number
  count?: number
  active: boolean
  expandable: boolean
  onActivate: () => void
}

function CategoryCard({ category: c, index, count, active, expandable, onActivate }: CardProps) {
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const x = useSpring(px, { stiffness: 120, damping: 22 })
  const y = useSpring(py, { stiffness: 120, damping: 22 })

  // Photo drifts opposite to the pointer for a subtle depth effect.
  const onMove = (e: PointerEvent<HTMLLIElement>) => {
    if (!active || e.pointerType === 'touch') return
    const r = e.currentTarget.getBoundingClientRect()
    px.set(-((e.clientX - r.left) / r.width - 0.5) * 28)
    py.set(-((e.clientY - r.top) / r.height - 0.5) * 28)
  }
  const onLeave = () => {
    px.set(0)
    py.set(0)
  }

  return (
    <motion.li
      className={`cat ${active ? 'is-active' : ''}`}
      animate={expandable ? { flexGrow: active ? 3 : 1 } : undefined}
      transition={spring}
      onMouseEnter={onActivate}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <a href={shopHref({ category: c.slug })} onFocus={onActivate} aria-label={`${c.name}${count !== undefined ? `, ${count} products` : ''}`}>
        <motion.img
          className="cat__img"
          src={c.image}
          alt=""
          loading="lazy"
          style={{ x, y }}
          animate={{ scale: active ? 1.12 : 1.3 }}
          transition={{ type: 'spring', stiffness: 90, damping: 20 }}
        />
        <motion.span className="cat__dim" animate={{ opacity: active ? 0 : 0.38 }} transition={{ duration: 0.4 }} />

        <span className="cat__top">
          <span className="chip chip--glass">{String(index + 1).padStart(2, '0')}</span>
          <motion.span
            className="cat__go"
            animate={active ? { scale: 1, rotate: 0, opacity: 1 } : { scale: 0.4, rotate: -60, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 380, damping: 24 }}
          >
            <ArrowRight size={18} />
          </motion.span>
        </span>

        <span className="cat__bottom">
          <h3>{c.name}</h3>
          <AnimatePresence initial={false}>
            {active && (
              <motion.span
                className="cat__meta"
                initial={{ opacity: 0, height: 0, y: 10 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: 6 }}
                transition={{ duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
              >
                <span>{c.tagline}</span>
                {count !== undefined && <span className="cat__count">{count} products</span>}
              </motion.span>
            )}
          </AnimatePresence>
        </span>
      </a>
    </motion.li>
  )
}

export default function Categories() {
  const [active, setActive] = useState(0)
  const expandable = useMediaQuery('(min-width: 993px)')
  const { products, status } = useCatalog()

  return (
    <section className="categories" aria-labelledby="categories-title">
      <motion.div className="section-head" {...reveal}>
        <div>
          <span className="eyebrow">Shop by category</span>
          <h2 id="categories-title">Find your <em>ritual</em></h2>
        </div>
        <a href="#/shop" className="btn btn--ghost">Browse everything <ArrowRight size={16} /></a>
      </motion.div>
      <motion.ul
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
      >
        {categories.map((c, i) => (
          <CategoryCard
            key={c.slug}
            category={c}
            index={i}
            count={status === 'ready' ? products.filter((p) => p.category === c.slug).length : undefined}
            active={expandable ? active === i : true}
            expandable={expandable}
            onActivate={() => setActive(i)}
          />
        ))}
      </motion.ul>
    </section>
  )
}
