import express from 'express'
import mongoose from 'mongoose'
import Product from './models/Product.js'
import ordersRouter from './routes/orders.js'
import productsRouter from './routes/products.js'

export function createApp() {
  const app = express()
  app.disable('x-powered-by')
  app.set('trust proxy', 1) // behind Render's proxy, so req.ip is the visitor
  app.use(express.json({ limit: '100kb' }))

  // Same-origin in dev (Vite proxies /api). Set CORS_ORIGIN when the storefront is hosted elsewhere.
  if (process.env.CORS_ORIGIN) {
    app.use((req, res, next) => {
      res.set({
        'Access-Control-Allow-Origin': process.env.CORS_ORIGIN,
        'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Credentials': 'true',
      })
      if (req.method === 'OPTIONS') return res.sendStatus(204)
      next()
    })
  }

  app.get('/api/health', (req, res) => {
    res.json({ ok: mongoose.connection.readyState === 1, database: mongoose.connection.name })
  })

  app.use('/api/products', productsRouter)
  app.use('/api/orders', ordersRouter)

  app.get('/api/categories', async (req, res) => {
    const rows = await Product.aggregate([
      { $match: { status: 'active' } },
      { $group: { _id: { category: '$category', subcategory: '$subcategory' }, count: { $sum: 1 }, minPrice: { $min: '$price' }, maxPrice: { $max: '$price' } } },
      { $sort: { '_id.category': 1, '_id.subcategory': 1 } },
    ])
    const byCategory = new Map()
    for (const { _id, count, minPrice, maxPrice } of rows) {
      const entry = byCategory.get(_id.category) ?? { slug: _id.category, count: 0, minPrice: Infinity, maxPrice: 0, subcategories: [] }
      entry.count += count
      entry.minPrice = Math.min(entry.minPrice, minPrice)
      entry.maxPrice = Math.max(entry.maxPrice, maxPrice)
      entry.subcategories.push({ name: _id.subcategory, count })
      byCategory.set(_id.category, entry)
    }
    res.set('Cache-Control', 'public, max-age=60').json([...byCategory.values()])
  })

  app.use('/api', (req, res) => res.status(404).json({ message: 'Not found' }))

  // eslint-disable-next-line no-unused-vars
  app.use((error, req, res, next) => {
    console.error(error)
    res.status(500).json({ message: 'Something went wrong' })
  })

  return app
}
