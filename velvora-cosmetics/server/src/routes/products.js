import { Router } from 'express'
import Product, { CATEGORIES } from '../models/Product.js'

const router = Router()

// Light-weight projection used by listings; the detail endpoint returns the whole document.
const CARD_PROJECTION = {
  slug: 1, sku: 1, name: 1, brand: 1, category: 1, subcategory: 1, blurb: 1, size: 1, currency: 1,
  price: 1, priceMax: 1, oldPrice: 1, discountPercent: 1,
  rating: 1, reviewCount: 1, badges: 1, tags: 1, collections: 1,
  featured: 1, isNew: 1, bestseller: 1, popularity: 1, createdAt: 1,
  stock: 1, inStock: 1, variantLabel: 1, finish: 1, concerns: 1, suitableFor: 1,
  'variants.name': 1, 'variants.sku': 1, 'variants.price': 1, 'variants.stock': 1, 'variants.swatch': 1, 'variants.undertone': 1,
  images: { $slice: 2 }, // the second image is shown on hover
}

const SORTS = {
  featured: { featured: -1, popularity: -1, _id: 1 },
  popular: { popularity: -1, _id: 1 },
  newest: { createdAt: -1, _id: 1 },
  'price-asc': { price: 1, _id: 1 },
  'price-desc': { price: -1, _id: 1 },
  rating: { rating: -1, reviewCount: -1, _id: 1 },
  name: { name: 1, _id: 1 },
}

const str = (v) => (typeof v === 'string' && v.trim() ? v.trim() : undefined)
const list = (v) => str(v)?.split(',').map((s) => s.trim()).filter(Boolean)
const num = (v) => (str(v) !== undefined && Number.isFinite(Number(v)) ? Number(v) : undefined)
const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

router.get('/', async (req, res) => {
  const filter = { status: 'active' }

  const categories = list(req.query.category)?.filter((c) => CATEGORIES.includes(c))
  if (categories?.length) filter.category = { $in: categories }
  const subcategories = list(req.query.subcategory)
  if (subcategories?.length) filter.subcategory = { $in: subcategories }
  const brands = list(req.query.brand)
  if (brands?.length) filter.brand = { $in: brands }
  const collections = list(req.query.collection)
  if (collections?.length) filter.collections = { $in: collections }
  if (req.query.inStock === 'true') filter.inStock = true

  const min = num(req.query.minPrice)
  const max = num(req.query.maxPrice)
  if (min !== undefined || max !== undefined) filter.price = { ...(min !== undefined && { $gte: min }), ...(max !== undefined && { $lte: max }) }

  const q = str(req.query.q)
  if (q) {
    const rx = new RegExp(escapeRegex(q), 'i')
    filter.$or = [{ name: rx }, { brand: rx }, { subcategory: rx }, { tags: rx }, { blurb: rx }]
  }

  const sort = SORTS[str(req.query.sort)] ?? SORTS.featured
  const limit = Math.min(200, Math.max(1, Math.trunc(num(req.query.limit) ?? 24)))
  const page = Math.max(1, Math.trunc(num(req.query.page) ?? 1))

  const query = Product.find(filter).sort(sort).skip((page - 1) * limit).limit(limit)
  if (str(req.query.view) !== 'full') query.select(CARD_PROJECTION)

  const [items, total] = await Promise.all([query.lean(), Product.countDocuments(filter)])
  res.set('Cache-Control', 'public, max-age=60').json({ items, total, page, pages: Math.max(1, Math.ceil(total / limit)), limit })
})

router.get('/:slug', async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug.toLowerCase(), status: 'active' }).lean()
  if (!product) return res.status(404).json({ message: 'Product not found' })
  res.set('Cache-Control', 'public, max-age=60').json(product)
})

export default router
