// Exports data/products.json in the format the AI chatbot's importer understands
// (D:\MyProjects\chatbot\server\scripts\importProducts.ts).
//
//   npm run export:chatbot -- [--base http://localhost:5180]
//
// --base is the public address of the storefront; it is used for product links and image URLs,
// because the chatbot shows them to visitors and they must be absolute.
import { existsSync, readFileSync, writeFileSync } from 'node:fs'

const baseArg = process.argv.indexOf('--base')
const base = (baseArg >= 0 ? process.argv[baseArg + 1] : 'http://localhost:5173').replace(/\/$/, '')

const products = JSON.parse(readFileSync('data/products.json', 'utf8'))

const rows = products.map((p) => {
  // Everything the assistant may need to answer questions, kept under the importer's 2000 character limit.
  const parts = [
    `${p.brand} ${p.subcategory.toLowerCase()}. ${p.longDescription ?? p.description}`.replace(/\n+/g, ' '),
    p.benefits?.length ? `Benefits: ${p.benefits.join('; ')}.` : '',
    p.keyIngredients?.length ? `Key ingredients: ${p.keyIngredients.map((i) => i.name).join(', ')}.` : '',
    p.suitableFor?.length ? `Suitable for: ${p.suitableFor.join(', ')}.` : '',
    p.concerns?.length ? `Targets: ${p.concerns.join(', ')}.` : '',
    p.fragrance ? `Scent: ${p.fragrance.family}, notes of ${[...p.fragrance.notes.top, ...p.fragrance.notes.heart, ...p.fragrance.notes.base].join(', ')}.` : '',
    p.howToUse?.length ? `How to use: ${p.howToUse.join(' ')}` : '',
    p.size ? `Size: ${p.size}.` : '',
    p.vegan ? 'Vegan and cruelty-free.' : 'Cruelty-free.',
  ].filter(Boolean)

  const image = p.images?.[0]?.src
  // Importer ignores relative URLs, so only photos that exist get a link.
  const hasFile = image && existsSync(`public${image}`)

  return {
    sku: p.sku,
    name: p.name,
    description: parts.join(' ').slice(0, 1990),
    category: p.category,
    colour: p.variants?.some((v) => v.swatch) ? p.variants.map((v) => v.name).join(', ') : undefined,
    price: p.price,
    currency: p.currency,
    image: hasFile ? `${base}${image}` : undefined,
    url: `${base}/#/product/${p.slug}`,
    tags: [...new Set([p.subcategory, p.brand, ...(p.tags ?? []), ...(p.concerns ?? []), ...(p.collections ?? [])].map((t) => t.toLowerCase()))].join('|'),
    in_stock: p.inStock ? 'yes' : 'no',
  }
})

writeFileSync('data/chatbot-products.json', JSON.stringify(rows, null, 2) + '\n')
console.log(`Wrote ${rows.length} products to data/chatbot-products.json (links use ${base}).`)
