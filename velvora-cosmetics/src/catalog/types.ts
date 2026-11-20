export const CATEGORY_SLUGS = ['skincare', 'lips', 'hair', 'eye', 'makeup', 'fragrance'] as const
export type CategorySlug = (typeof CATEGORY_SLUGS)[number]

export type Undertone = 'warm' | 'cool' | 'neutral'
export const UNDERTONES: Undertone[] = ['warm', 'neutral', 'cool']

export type Variant = {
  name: string
  sku: string
  price?: number
  stock: number
  swatch?: string
  undertone?: Undertone
}

export type ProductImageData = { src: string; alt?: string; width?: number; height?: number; role?: string }

/** The listing ("card") shape returned by GET /api/products. The detail endpoint adds much more. */
export type Product = {
  slug: string
  sku: string
  name: string
  brand: string
  category: CategorySlug
  subcategory: string
  blurb: string
  size?: string
  currency: string
  price: number
  priceMax?: number
  oldPrice?: number
  discountPercent?: number
  rating?: number
  reviewCount?: number
  badges: string[]
  tags: string[]
  collections: string[]
  featured: boolean
  isNew: boolean
  bestseller: boolean
  popularity: number
  createdAt: string
  stock: number
  inStock: boolean
  variantLabel?: string
  variants: Variant[]
  images: ProductImageData[]
  finish?: string
  concerns?: string[]
  suitableFor?: string[]
}

export type SortKey = 'featured' | 'popular' | 'newest' | 'price-asc' | 'price-desc' | 'rating' | 'name'

/** The complete document from GET /api/products/:slug. */
export type ProductDetail = Product & {
  description: string
  longDescription?: string
  highlights: string[]
  benefits: string[]
  howToUse: string[]
  keyIngredients?: { name: string; purpose?: string }[]
  materials?: string[]
  includes?: string[]
  suitableFor: string[]
  concerns?: string[]
  finish?: string
  warnings: string[]
  certifications: string[]
  vegan?: boolean
  crueltyFree?: boolean
  fragrance?: {
    family: string
    concentration: string
    strength: string
    longevity: string
    notes: { top: string[]; heart: string[]; base: string[] }
    occasion: string[]
  }
  ratingBreakdown?: Record<'1' | '2' | '3' | '4' | '5', number>
  packaging?: { widthMm: number; heightMm: number; depthMm: number; weightGrams: number; material: string }
  shelfLifeMonths?: number
  madeIn?: string
  barcode?: string
  relatedSlugs: string[]
  seo?: { title?: string; description?: string; keywords?: string[] }
}

export const SORT_LABELS: Record<SortKey, string> = {
  featured: 'Featured',
  popular: 'Most popular',
  newest: 'Newest',
  'price-asc': 'Price: low to high',
  'price-desc': 'Price: high to low',
  rating: 'Top rated',
  name: 'Name A–Z',
}

export const COLLECTION_LABELS: Record<string, string> = {
  bestsellers: 'Bestsellers',
  'new-arrivals': 'New arrivals',
  sale: 'On sale',
  'gift-ideas': 'Gift ideas',
  vegan: 'Vegan',
  'my-roses': 'My Roses',
  'travel-friendly': 'Travel-friendly',
}
