import { randomBytes } from 'node:crypto'
import { Router } from 'express'
import Order from '../models/Order.js'
import Product from '../models/Product.js'
import { MAX_QTY, PROMOS, cents, totalsFor } from '../lib/pricing.js'

const router = Router()

// Test project, no payment provider: a small in-memory limiter keeps the public demo from being spammed.
const WINDOW_MS = 60 * 60 * 1000
const MAX_ORDERS_PER_WINDOW = 15
const hits = new Map()
function limited(ip) {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > MAX_ORDERS_PER_WINDOW
}

const PAYMENT_METHODS = ['cod', 'apple-pay', 'google-pay', 'paypal']

const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
const newOrderNumber = () => `VLV-${[...randomBytes(8)].map((b) => ALPHABET[b % ALPHABET.length]).join('')}`

const text = (v, max = 120) => (typeof v === 'string' ? v.trim().slice(0, max) : '')
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

class ValidationError extends Error {
  constructor(message, fields) {
    super(message)
    this.fields = fields
  }
}

function parseDetails(body) {
  const c = body?.customer ?? {}
  const a = body?.shippingAddress ?? {}
  const customer = {
    email: text(c.email, 200).toLowerCase(),
    firstName: text(c.firstName, 60),
    lastName: text(c.lastName, 60),
    phone: text(c.phone, 30),
  }
  const shippingAddress = {
    address1: text(a.address1, 120),
    address2: text(a.address2, 120),
    city: text(a.city, 80),
    region: text(a.region, 80),
    postalCode: text(a.postalCode, 20),
    country: text(a.country, 80),
  }

  const fields = {}
  if (!EMAIL.test(customer.email)) fields['customer.email'] = 'Enter a valid email address'
  if (!customer.firstName) fields['customer.firstName'] = 'Required'
  if (!customer.lastName) fields['customer.lastName'] = 'Required'
  if (!shippingAddress.address1) fields['shippingAddress.address1'] = 'Required'
  if (!shippingAddress.city) fields['shippingAddress.city'] = 'Required'
  if (!shippingAddress.postalCode) fields['shippingAddress.postalCode'] = 'Required'
  if (!shippingAddress.country) fields['shippingAddress.country'] = 'Required'
  if (Object.keys(fields).length) throw new ValidationError('Please check the highlighted fields', fields)

  const paymentMethod = PAYMENT_METHODS.includes(body?.paymentMethod) ? body.paymentMethod : 'cod'
  return { customer, shippingAddress, note: text(body?.note, 500), paymentMethod }
}

// Prices and stock come from the database; whatever the browser says about money is ignored.
async function buildLines(rawLines) {
  if (!Array.isArray(rawLines) || rawLines.length === 0) throw new ValidationError('Your bag is empty')
  if (rawLines.length > 50) throw new ValidationError('Too many items in one order')

  const slugs = [...new Set(rawLines.map((l) => text(l?.productId, 120).toLowerCase()))]
  const products = await Product.find({ slug: { $in: slugs }, status: 'active' }).lean()
  const bySlug = new Map(products.map((p) => [p.slug, p]))

  const merged = new Map()
  for (const l of rawLines) {
    const slug = text(l?.productId, 120).toLowerCase()
    const variant = text(l?.variant, 120) || undefined
    const qty = Math.min(MAX_QTY, Math.max(1, Math.trunc(Number(l?.qty) || 0)))
    const key = `${slug}:${variant ?? ''}`
    const existing = merged.get(key)
    merged.set(key, { slug, variant, qty: Math.min(MAX_QTY, (existing?.qty ?? 0) + qty) })
  }

  const lines = []
  for (const { slug, variant, qty } of merged.values()) {
    const product = bySlug.get(slug)
    if (!product) throw new ValidationError('An item in your bag is no longer available')
    const chosen = variant ? product.variants?.find((v) => v.name === variant) : undefined
    if (variant && !chosen) throw new ValidationError(`${product.name} is no longer available in "${variant}"`)
    if (!variant && product.variants?.length) {
      throw new ValidationError(`Choose a ${(product.variantLabel ?? 'option').toLowerCase()} for ${product.name}`)
    }

    const stock = chosen ? chosen.stock : product.stock
    if (!product.inStock || (stock !== undefined && stock < qty)) {
      throw new ValidationError(`${product.name}${variant ? ` (${variant})` : ''} is out of stock`)
    }

    const unitPrice = chosen?.price ?? product.price
    lines.push({
      productSlug: product.slug,
      sku: chosen?.sku ?? product.sku,
      name: product.name,
      brand: product.brand,
      variant,
      image: product.images?.[0]?.src,
      unitPrice,
      qty,
      lineTotal: cents(unitPrice * qty),
    })
  }
  return lines
}

router.post('/', async (req, res) => {
  if (limited(req.ip)) return res.status(429).json({ message: 'Too many orders from this connection. Try again later.' })

  try {
    const details = parseDetails(req.body)
    const lines = await buildLines(req.body?.lines)

    const code = text(req.body?.promoCode, 40).toUpperCase()
    if (code && !PROMOS[code]) throw new ValidationError("That promo code isn't valid")

    const subtotal = cents(lines.reduce((s, l) => s + l.lineTotal, 0))
    const order = await Order.create({
      orderNumber: newOrderNumber(),
      ...details,
      lines,
      promoCode: code || undefined,
      subtotal,
      ...totalsFor(subtotal, code || undefined),
    })
    res.status(201).json(order.toJSON())
  } catch (error) {
    if (error instanceof ValidationError) return res.status(422).json({ message: error.message, fields: error.fields })
    throw error
  }
})

// Looking an order up needs the number and the email it was placed with.
router.get('/:orderNumber', async (req, res) => {
  const email = text(req.query.email, 200).toLowerCase()
  const order = await Order.findOne({ orderNumber: text(req.params.orderNumber, 20).toUpperCase(), 'customer.email': email }).lean()
  if (!order) return res.status(404).json({ message: "We couldn't find an order with those details" })
  res.set('Cache-Control', 'no-store').json(order)
})

export default router
