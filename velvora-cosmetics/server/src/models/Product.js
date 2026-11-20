import mongoose from 'mongoose'

const { Schema } = mongoose

const imageSchema = new Schema(
  {
    src: { type: String, required: true },
    alt: String,
    width: Number,
    height: Number,
    role: { type: String, enum: ['primary', 'gallery'], default: 'gallery' },
  },
  { _id: false },
)

const variantSchema = new Schema(
  {
    name: { type: String, required: true },
    sku: { type: String, required: true },
    barcode: String,
    swatch: String,
    undertone: { type: String, enum: ['warm', 'cool', 'neutral'] },
    price: { type: Number, min: 0 }, // overrides the product price when set
    stock: { type: Number, min: 0, default: 0 },
  },
  { _id: false },
)

const ingredientSchema = new Schema({ name: { type: String, required: true }, purpose: String }, { _id: false })

const fragranceSchema = new Schema(
  {
    family: String,
    concentration: String,
    strength: String,
    longevity: String,
    notes: { top: [String], heart: [String], base: [String] },
    occasion: [String],
  },
  { _id: false },
)

export const CATEGORIES = ['skincare', 'lips', 'hair', 'eye', 'makeup', 'fragrance']

const productSchema = new Schema(
  {
    // Identity
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    sku: { type: String, required: true, unique: true, trim: true },
    barcode: String,
    name: { type: String, required: true, trim: true },
    brand: { type: String, required: true, trim: true },
    category: { type: String, required: true, enum: CATEGORIES },
    subcategory: { type: String, required: true, trim: true },
    status: { type: String, enum: ['active', 'draft', 'archived'], default: 'active' },

    // Copy
    blurb: { type: String, required: true },
    description: { type: String, required: true },
    longDescription: String,
    highlights: [String],
    benefits: [String],
    howToUse: [String],
    keyIngredients: [ingredientSchema],
    materials: [String],
    includes: [String],
    suitableFor: [String],
    concerns: [String],
    finish: String,
    warnings: [String],
    certifications: [String],
    vegan: Boolean,
    crueltyFree: Boolean,
    fragrance: fragranceSchema,

    // Pricing
    price: { type: Number, required: true, min: 0 },
    priceMax: { type: Number, min: 0 },
    oldPrice: { type: Number, min: 0 },
    discountPercent: { type: Number, min: 0, max: 100 },
    currency: { type: String, default: 'USD' },
    taxClass: { type: String, default: 'standard' },
    size: String,

    // Social proof & merchandising
    rating: { type: Number, min: 0, max: 5 },
    reviewCount: { type: Number, min: 0, default: 0 },
    ratingBreakdown: { 1: Number, 2: Number, 3: Number, 4: Number, 5: Number },
    badges: [String],
    tags: [String],
    collections: [String],
    featured: { type: Boolean, default: false },
    isNew: { type: Boolean, default: false },
    bestseller: { type: Boolean, default: false },
    popularity: { type: Number, min: 0, max: 100, default: 0 },
    stats: { sold: Number, views: Number, wishlisted: Number },

    // Inventory & media
    stock: { type: Number, min: 0, default: 0 },
    inStock: { type: Boolean, default: true },
    variantLabel: String,
    variants: [variantSchema],
    images: [imageSchema],

    // Logistics
    packaging: { widthMm: Number, heightMm: Number, depthMm: Number, weightGrams: Number, material: String },
    shelfLifeMonths: Number,
    madeIn: String,

    // Discovery
    relatedSlugs: [String],
    seo: { title: String, description: String, keywords: [String] },

    // Dates are supplied by the seed data; swap to `timestamps: true` once the API writes products.
    launchDate: Date,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
    suppressReservedKeysWarning: true, // `isNew` is also a Mongoose document property; the stored field is what the storefront reads
  },
)

productSchema.index(
  { name: 'text', brand: 'text', subcategory: 'text', tags: 'text', blurb: 'text', description: 'text' },
  { name: 'product_text', weights: { name: 10, brand: 5, subcategory: 4, tags: 3, blurb: 2, description: 1 } },
)
productSchema.index({ category: 1, subcategory: 1 })
productSchema.index({ brand: 1 })
productSchema.index({ collections: 1 })
productSchema.index({ status: 1, inStock: 1, price: 1 })
productSchema.index({ createdAt: -1 })
productSchema.index({ popularity: -1 })
productSchema.index({ 'variants.sku': 1 })

export default mongoose.models.Product ?? mongoose.model('Product', productSchema)
