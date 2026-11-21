import { useEffect, useState, type MouseEvent, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useCart } from '../cart/CartContext'
import { MAX_QTY, money } from '../cart/pricing'
import { useCatalog } from '../catalog/CatalogContext'
import { shopHref, unitPrice } from '../catalog/selectors'
import { COLLECTION_LABELS, type Product, type ProductDetail } from '../catalog/types'
import { useProductDetail } from '../catalog/useProductDetail'
import { categories } from '../data'
import { SITE_URL, absoluteUrl } from '../seo'
import { reveal, riseChild, staggerParent } from '../ui/motion'
import { useWishlist } from '../wishlist/WishlistContext'
import Accordion, { type AccordionItem } from './Accordion'
import { ArrowRight, CheckIcon, HeartIcon, LeafIcon, ShieldIcon, TruckIcon } from './Icons'
import ProductCard from './ProductCard'
import ProductImage from './ProductImage'
import Seo from './Seo'
import Stepper from './Stepper'

const categoryName = Object.fromEntries(categories.map((c) => [c.slug, c.name])) as Record<string, string>
const LOW_STOCK = 5

function Stars({ value }: { value: number }) {
  return (
    <span className="stars" aria-hidden="true">
      {[1, 2, 3, 4, 5].map((n) => <span key={n} className={n <= Math.round(value) ? 'on' : ''}>★</span>)}
    </span>
  )
}

function Chips({ items }: { items: string[] }) {
  return <ul className="pchips">{items.map((i) => <li key={i}>{i}</li>)}</ul>
}

function Spec({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <dt>{label}</dt>
      <dd>{children}</dd>
    </div>
  )
}

function DetailSkeleton() {
  return (
    <div className="pdetail-skeleton" aria-hidden="true">
      {[100, 92, 96, 70].map((w, i) => <div key={i} className="skeleton skeleton--line" style={{ width: `${w}%` }} />)}
    </div>
  )
}

function ProductView({ product, detail }: { product: Product; detail?: ProductDetail }) {
  const { add } = useCart()
  const wishlist = useWishlist()
  const { get } = useCatalog()

  const firstAvailable = product.variants.find((v) => v.stock > 0) ?? product.variants[0]
  const [variant, setVariant] = useState<string | undefined>(firstAvailable?.name)
  const [qty, setQty] = useState(1)
  const [imageIndex, setImageIndex] = useState(0)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    if (!added) return
    const t = setTimeout(() => setAdded(false), 1600)
    return () => clearTimeout(t)
  }, [added])

  const selected = product.variants.find((v) => v.name === variant)
  const stock = selected ? selected.stock : product.stock
  const inStock = stock > 0
  const maxQty = Math.max(1, Math.min(MAX_QTY, stock))
  const safeQty = Math.min(qty, maxQty)

  const price = unitPrice(product, variant)
  const variantPrices = product.variants.some((v) => v.price !== undefined && v.price !== product.price)
  const showOld = product.oldPrice && !variantPrices
  const wished = wishlist.has(product.slug)
  const images = product.images.length ? product.images : [undefined]
  const current = images[Math.min(imageIndex, images.length - 1)]
  const label = product.variantLabel ?? 'Option'

  const onZoom = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--zx', `${((e.clientX - r.left) / r.width) * 100}%`)
    e.currentTarget.style.setProperty('--zy', `${((e.clientY - r.top) / r.height) * 100}%`)
  }

  const onAdd = async () => {
    await add({ productId: product.slug, variant, qty: safeQty })
    setAdded(true)
  }

  const related = detail ? detail.relatedSlugs.map((s) => get(s)).filter((p): p is Product => !!p) : []

  const sections: AccordionItem[] = []
  if (detail) {
    sections.push({
      id: 'details',
      title: 'Description',
      content: (
        <>
          {(detail.longDescription ?? detail.description).split('\n\n').map((para, i) => <p key={i}>{para}</p>)}
          {detail.benefits.length > 0 && (
            <ul className="ticks">
              {detail.benefits.map((b) => <li key={b}><CheckIcon size={15} />{b}</li>)}
            </ul>
          )}
          {detail.includes?.length ? (
            <>
              <h4>What’s included</h4>
              <ul className="plain">{detail.includes.map((i) => <li key={i}>{i}</li>)}</ul>
            </>
          ) : null}
        </>
      ),
    })
    if (detail.fragrance) {
      const f = detail.fragrance
      const rows: [string, string[]][] = [['Top', f.notes.top], ['Heart', f.notes.heart], ['Base', f.notes.base]]
      sections.push({
        id: 'scent',
        title: 'Scent profile',
        content: (
          <>
            <dl className="specs">
              <Spec label="Family">{f.family}</Spec>
              <Spec label="Concentration">{f.concentration} · {f.strength}</Spec>
              <Spec label="Longevity">{f.longevity}</Spec>
              <Spec label="Wear it">{f.occasion.join(', ')}</Spec>
            </dl>
            {rows.some(([, n]) => n.length) && (
              <div className="pyramid">
                {rows.map(([name, notes]) => notes.length > 0 && (
                  <div key={name}><span>{name} notes</span><Chips items={notes} /></div>
                ))}
              </div>
            )}
          </>
        ),
      })
    }
    sections.push({
      id: 'use',
      title: 'How to use',
      content: (
        <>
          <ol className="steps">{detail.howToUse.map((s) => <li key={s}>{s}</li>)}</ol>
          {detail.warnings.length > 0 && (
            <div className="notice">
              <strong>Good to know</strong>
              <ul className="plain">{detail.warnings.map((w) => <li key={w}>{w}</li>)}</ul>
            </div>
          )}
        </>
      ),
    })
    if (detail.keyIngredients?.length || detail.materials?.length) {
      sections.push({
        id: 'ingredients',
        title: detail.keyIngredients?.length ? 'Key ingredients' : 'Materials',
        content: detail.keyIngredients?.length ? (
          <ul className="ingredients">
            {detail.keyIngredients.map((i) => (
              <li key={i.name}><strong>{i.name}</strong>{i.purpose && <span>{i.purpose}</span>}</li>
            ))}
          </ul>
        ) : (
          <Chips items={detail.materials ?? []} />
        ),
      })
    }
    sections.push({
      id: 'specs',
      title: 'Product details',
      content: (
        <dl className="specs">
          {detail.size && <Spec label="Size">{detail.size}</Spec>}
          {detail.finish && <Spec label="Finish">{detail.finish}</Spec>}
          {detail.suitableFor.length > 0 && <Spec label="Suitable for">{detail.suitableFor.join(', ')}</Spec>}
          {detail.concerns?.length ? <Spec label="Targets">{detail.concerns.join(', ')}</Spec> : null}
          {detail.certifications.length > 0 && <Spec label="Certifications"><Chips items={detail.certifications} /></Spec>}
          {detail.madeIn && <Spec label="Made in">{detail.madeIn}</Spec>}
          {detail.shelfLifeMonths && <Spec label="After opening">{detail.shelfLifeMonths} months</Spec>}
          {detail.packaging && (
            <Spec label="Packaging">{detail.packaging.material} · {detail.packaging.widthMm}×{detail.packaging.heightMm}×{detail.packaging.depthMm} mm · {detail.packaging.weightGrams} g</Spec>
          )}
          <Spec label="SKU">{product.sku}</Spec>
        </dl>
      ),
    })
    sections.push({
      id: 'shipping',
      title: 'Shipping & returns',
      content: (
        <>
          <p>Orders ship within 1–2 business days. Shipping is free over $100 and a flat $8 below that.</p>
          <p>Not in love with it? Return unopened items within 30 days for a full refund.</p>
        </>
      ),
    })
  }

  const pageUrl = `${SITE_URL}/#/product/${product.slug}`
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      sku: product.sku,
      url: pageUrl,
      category: categoryName[product.category] ?? product.category,
      brand: { '@type': 'Brand', name: product.brand },
      description: detail?.seo?.description ?? product.blurb,
      ...(product.images.length ? { image: product.images.map((i) => absoluteUrl(i.src)) } : {}),
      ...(product.rating && product.reviewCount ? { aggregateRating: { '@type': 'AggregateRating', ratingValue: product.rating, reviewCount: product.reviewCount } } : {}),
      offers: { '@type': 'Offer', url: pageUrl, priceCurrency: product.currency, price: price, availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { name: 'Home', path: '#/' },
        { name: 'Shop', path: '#/shop' },
        { name: categoryName[product.category] ?? product.category, path: `#/shop?category=${product.category}` },
        { name: product.name, path: `#/product/${product.slug}` },
      ].map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: `${SITE_URL}/${c.path}` })),
    },
  ]

  const breakdown = detail?.ratingBreakdown
  const breakdownTotal = breakdown ? Object.values(breakdown).reduce((a, b) => a + b, 0) : 0

  return (
    <article className="pdp">
      <Seo
        title={detail?.seo?.title ?? product.name}
        description={detail?.seo?.description ?? product.blurb}
        image={product.images[0]?.src}
        path={`#/product/${product.slug}`}
        type="product"
        jsonLd={jsonLd}
      >
        <meta property="product:price:amount" content={String(price)} />
        <meta property="product:price:currency" content={product.currency} />
        <meta property="product:availability" content={product.inStock ? 'in stock' : 'out of stock'} />
        <meta property="product:brand" content={product.brand} />
        {detail?.seo?.keywords?.length ? <meta name="keywords" content={detail.seo.keywords.join(', ')} /> : null}
      </Seo>

      <nav className="crumbs" aria-label="Breadcrumb">
        <a href="#/">Home</a><span aria-hidden="true">/</span>
        <a href="#/shop">Shop</a><span aria-hidden="true">/</span>
        <a href={shopHref({ category: product.category })}>{categoryName[product.category] ?? product.category}</a><span aria-hidden="true">/</span>
        <span aria-current="page">{product.name}</span>
      </nav>

      <div className="pdp__grid">
        <motion.div className="gallery" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}>
          <div className="gallery__main" onMouseMove={onZoom}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={imageIndex}
                className="gallery__frame"
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <ProductImage product={{ name: product.name, slug: product.slug, brand: product.brand, category: product.category, images: current ? [current] : [] }} />
              </motion.div>
            </AnimatePresence>
            {product.badges.length > 0 && (
              <div className="card__badges">
                {product.badges.map((b) => <span key={b} className={b.startsWith('-') ? 'is-sale' : ''}>{b}</span>)}
              </div>
            )}
          </div>
          {images.length > 1 && (
            <ul className="gallery__thumbs">
              {images.map((img, i) => (
                <li key={img?.src ?? i}>
                  <button type="button" aria-label={`Show image ${i + 1}`} aria-current={i === imageIndex} className={i === imageIndex ? 'is-active' : ''} onClick={() => setImageIndex(i)}>
                    <ProductImage compact product={{ name: product.name, category: product.category, images: img ? [img] : [] }} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </motion.div>

        <motion.div className="pinfo" variants={staggerParent(0.07, 0.1)} initial="hidden" animate="show">
          <motion.a variants={riseChild} className="pinfo__brand" href={shopHref({ category: product.category })}>{product.brand} · {product.subcategory}</motion.a>
          <motion.h1 variants={riseChild}>{product.name}</motion.h1>

          {product.rating ? (
            <motion.a variants={riseChild} href="#reviews" className="pinfo__rating" onClick={(e) => { e.preventDefault(); document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' }) }}>
              <Stars value={product.rating} /> <b>{product.rating.toFixed(1)}</b> <span>({product.reviewCount} reviews)</span>
            </motion.a>
          ) : null}

          <motion.p variants={riseChild} className="pinfo__blurb">{product.blurb}</motion.p>

          <motion.div variants={riseChild} className="pinfo__price">
            <motion.strong key={price} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>{money(price)}</motion.strong>
            {showOld && <del>{money(product.oldPrice!)}</del>}
            {product.discountPercent ? <span className="pinfo__save">Save {product.discountPercent}%</span> : null}
            {product.size && <small>{product.size}</small>}
          </motion.div>

          {product.variants.length > 0 && (
            <motion.fieldset variants={riseChild} className="variants">
              <legend>{label}: <b>{variant}</b></legend>
              <div>
                {product.variants.map((v) => {
                  const active = v.name === variant
                  const out = v.stock === 0
                  return (
                    <button
                      key={v.sku}
                      type="button"
                      className={`variant ${v.swatch ? 'variant--swatch' : ''} ${active ? 'is-active' : ''}`}
                      aria-pressed={active}
                      aria-label={`${v.name}${out ? ' (sold out)' : ''}`}
                      disabled={out}
                      title={v.name}
                      onClick={() => setVariant(v.name)}
                    >
                      {active && <motion.span layoutId="variant-ring" className="variant__ring" transition={{ type: 'spring', stiffness: 500, damping: 34 }} />}
                      {v.swatch ? <i style={{ background: v.swatch }} /> : (
                        <span>{v.name}{v.price !== undefined && v.price !== product.price ? ` · ${money(v.price)}` : ''}</span>
                      )}
                    </button>
                  )
                })}
              </div>
            </motion.fieldset>
          )}

          <motion.p variants={riseChild} className={`pinfo__stock ${!inStock ? 'is-out' : stock <= LOW_STOCK ? 'is-low' : ''}`}>
            <i aria-hidden="true" />
            {!inStock ? 'Sold out' : stock <= LOW_STOCK ? `Only ${stock} left` : 'In stock, ships in 1–2 days'}
          </motion.p>

          <motion.div variants={riseChild} className="pinfo__buy">
            <Stepper name={product.name} qty={safeQty} onChange={setQty} min={1} max={maxQty} />
            <div className="pinfo__addwrap">
              <motion.button
                className={`btn pinfo__add ${added ? 'is-added' : ''}`}
                disabled={!inStock}
                whileTap={{ scale: 0.97 }}
                onClick={onAdd}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span key={added ? 'added' : 'add'} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.15 }}>
                    {added ? <><CheckIcon size={16} /> Added to bag</> : inStock ? <>Add to bag · {money(price * safeQty)}</> : 'Sold out'}
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
                      borderRadius: '6px',
                      border: '2px solid var(--rose-deep)',
                      pointerEvents: 'none',
                    }}
                  />
                )}
              </AnimatePresence>
            </div>
            <div className="pinfo__wishwrap">
              <motion.button
                className={`pinfo__wish ${wished ? 'is-on' : ''}`}
                aria-pressed={wished}
                aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
                whileTap={{ scale: 0.88 }}
                onClick={() => wishlist.toggle(product.slug)}
              >
                <HeartIcon size={19} filled={wished} />
              </motion.button>
              <AnimatePresence>
                {wished && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 1 }}
                    animate={{ scale: 1.6, opacity: 0 }}
                    exit={{ scale: 1.6, opacity: 0 }}
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
          </motion.div>

          <motion.ul variants={riseChild} className="pinfo__trust">
            <li><TruckIcon size={17} /> Free shipping over $100</li>
            <li><ShieldIcon size={17} /> 30-day returns</li>
            <li><LeafIcon size={17} /> {detail?.vegan === false ? 'Cruelty-free' : 'Vegan & cruelty-free'}</li>
          </motion.ul>

          <motion.div variants={riseChild} className="pinfo__sections">
            {detail ? <Accordion items={sections} defaultOpen="details" /> : <DetailSkeleton />}
          </motion.div>

          {product.collections.length > 0 && (
            <motion.p variants={riseChild} className="pinfo__collections">
              {product.collections.filter((c) => COLLECTION_LABELS[c]).map((c) => (
                <a key={c} href={shopHref({ collection: c })}>{COLLECTION_LABELS[c]}</a>
              ))}
            </motion.p>
          )}
        </motion.div>
      </div>

      {breakdown && breakdownTotal > 0 && (
        <motion.section id="reviews" className="ratings" {...reveal}>
          <div className="ratings__score">
            <span className="eyebrow">Customer ratings</span>
            <strong>{product.rating?.toFixed(1)}</strong>
            <Stars value={product.rating ?? 0} />
            <small>Based on {breakdownTotal} reviews</small>
          </div>
          <ul className="ratings__bars">
            {([5, 4, 3, 2, 1] as const).map((n) => {
              const count = breakdown[String(n) as '1']
              return (
                <li key={n}>
                  <span>{n} ★</span>
                  <div><motion.i initial={{ width: 0 }} whileInView={{ width: `${(count / breakdownTotal) * 100}%` }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }} /></div>
                  <small>{count}</small>
                </li>
              )
            })}
          </ul>
        </motion.section>
      )}

      {related.length > 0 && (
        <motion.section className="pdp__related" {...reveal}>
          <div className="section-head">
            <div>
              <span className="eyebrow">You may also like</span>
              <h2>Pairs <em>well</em> with</h2>
            </div>
            <a href={shopHref({ category: product.category })} className="btn btn--ghost">More {categoryName[product.category]?.toLowerCase()} <ArrowRight size={16} /></a>
          </div>
          <div className="grid">
            {related.map((p) => <div className="grid__item" key={p.slug}><ProductCard product={p} /></div>)}
          </div>
        </motion.section>
      )}
    </article>
  )
}

export default function ProductPage({ slug }: { slug: string }) {
  const { get, status } = useCatalog()
  const { detail, status: detailStatus, retry } = useProductDetail(slug)
  const base = get(slug)
  const product: Product | undefined = detail ?? base

  if (!product) {
    if (status === 'loading' || detailStatus === 'loading') {
      return (
        <div className="pdp pdp--loading" aria-busy="true">
          <div className="pdp__grid">
            <div className="skeleton skeleton--img" />
            <div className="pdetail-skeleton">
              {[40, 80, 60, 100, 100, 70].map((w, i) => <div key={i} className="skeleton skeleton--line" style={{ width: `${w}%`, height: i === 1 ? 48 : 14 }} />)}
            </div>
          </div>
        </div>
      )
    }
    const missing = detailStatus === 'missing' || (status === 'ready' && detailStatus !== 'error')
    return (
      <div className="pdp">
        <div className="shop-state" role="alert">
          <h2>{missing ? 'We couldn’t find that product' : 'We couldn’t load this product'}</h2>
          <p>{missing ? 'It may have been renamed or removed.' : 'The product API isn’t reachable. Start it with npm run dev:all and try again.'}</p>
          {missing ? <a href="#/shop" className="btn">Browse all products <ArrowRight size={16} /></a> : <button className="btn" onClick={retry}>Try again</button>}
        </div>
      </div>
    )
  }

  return <ProductView key={slug} product={product} detail={detail} />
}
