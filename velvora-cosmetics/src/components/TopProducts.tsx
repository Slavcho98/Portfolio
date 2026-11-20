import { useState } from 'react'
import { motion } from 'motion/react'
import { useCatalog } from '../catalog/CatalogContext'
import { featured, newest, onSale, popular } from '../catalog/selectors'
import { reveal, riseChild, staggerParent } from '../ui/motion'
import { ArrowRight } from './Icons'
import ProductCard from './ProductCard'
import ProductSkeletons from './ProductSkeletons'

type Tab = 'newest' | 'popular' | 'featured' | 'sale'

const tabs: { key: Tab; label: string; sort: string }[] = [
  { key: 'newest', label: 'Newest', sort: 'newest' },
  { key: 'popular', label: 'Popular', sort: 'popular' },
  { key: 'featured', label: 'Featured', sort: 'featured' },
  { key: 'sale', label: 'On sale', sort: 'featured' },
]

export default function TopProducts() {
  const [tab, setTab] = useState<Tab>('newest')
  const { products, status } = useCatalog()

  const list = tab === 'newest' ? newest(products) : tab === 'popular' ? popular(products) : tab === 'featured' ? featured(products) : onSale(products)
  const current = tabs.find((t) => t.key === tab)!

  return (
    <motion.section className="top-products" id="products" {...reveal}>
      <div className="section-head">
        <div>
          <span className="eyebrow">The essentials</span>
          <h2>Top <em>products</em></h2>
        </div>
        <div className="tabs" role="tablist" aria-label="Product filter">
          {tabs.map((t) => (
            <button
              key={t.key}
              role="tab"
              aria-selected={tab === t.key}
              className={tab === t.key ? 'is-active' : ''}
              onClick={() => setTab(t.key)}
            >
              {tab === t.key && (
                <motion.span
                  layoutId="tab-pill"
                  className="tabs__pill"
                  transition={{ type: 'spring', stiffness: 500, damping: 36 }}
                />
              )}
              <span className="tabs__label">{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      <motion.div
        className="grid"
        key={tab + status}
        variants={staggerParent(0.05)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      >
        {status === 'loading' && <ProductSkeletons count={8} />}
        {status === 'error' && (
          <p className="grid__error">Products couldn’t be loaded. Start the API with <code>npm run dev:all</code>.</p>
        )}
        {list.map((p) => (
          <motion.div className="grid__item" key={`${tab}-${p.slug}`} variants={riseChild}>
            <ProductCard product={p} />
          </motion.div>
        ))}
      </motion.div>

      <div className="center">
        <a href={`#/shop${current.sort !== 'featured' ? `?sort=${current.sort}` : ''}${tab === 'sale' ? '?collection=sale' : ''}`} className="btn btn--ghost">
          View all {products.length || ''} products <ArrowRight size={16} />
        </a>
      </div>
    </motion.section>
  )
}
