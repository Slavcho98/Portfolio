// Links dropped-in product photos to products.
//
//   1. Put photos in public/products/ (any of jpg / png / webp / avif). Name them after the product slug,
//      optionally with a number for extra shots: purity-made-cleanser.jpg, purity-made-cleanser-2.jpg
//   2. npm run images            (add --dry-run to preview)
//   3. npm --prefix server run seed   (pushes the updated product data to MongoDB)
//
// Each photo is resized (max 1600px wide), converted to <slug>-<n>.webp and the original is moved to
// source-images/ (git-ignored), so only the optimised file is served. data/products.json is then updated so
// every product lists exactly the images that exist on disk.
import { existsSync, mkdirSync, readFileSync, readdirSync, renameSync, writeFileSync } from 'node:fs'
import { basename, extname, join } from 'node:path'
import sharp from 'sharp'

const DRY = process.argv.includes('--dry-run')
const PUBLIC_DIR = 'public/products'
const SOURCE_DIR = 'source-images'
const DATA_FILE = 'data/products.json'
const INPUT = /\.(jpe?g|png|webp|avif)$/i

const products = JSON.parse(readFileSync(DATA_FILE, 'utf8'))
const slugs = new Set(products.map((p) => p.slug))

function distance(a, b) {
  const row = Array.from({ length: b.length + 1 }, (_, i) => i)
  for (let i = 1; i <= a.length; i++) {
    let prev = row[0]
    row[0] = i
    for (let j = 1; j <= b.length; j++) {
      const tmp = row[j]
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1))
      prev = tmp
    }
  }
  return row[b.length]
}

/** Maps a file name (without extension) to { slug, n }, tolerating small typos. */
function resolve(stem) {
  if (slugs.has(stem)) return { slug: stem, n: 1 }
  const numbered = stem.match(/^(.*)-(\d+)$/)
  if (numbered && slugs.has(numbered[1])) return { slug: numbered[1], n: Number(numbered[2]) }

  const candidate = numbered ? numbered[1] : stem
  const n = numbered ? Number(numbered[2]) : 1
  const ranked = [...slugs].map((slug) => ({ slug, d: distance(candidate, slug) })).sort((a, b) => a.d - b.d)
  const [best, second] = ranked
  const limit = Math.max(2, Math.floor(candidate.length / 4))
  if (best.d <= limit && (!second || second.d > best.d)) return { slug: best.slug, n, fuzzy: true }
  return null
}

const converted = []
const skipped = []

const files = existsSync(PUBLIC_DIR) ? readdirSync(PUBLIC_DIR) : []
for (const file of files) {
  if (!INPUT.test(file)) continue
  const stem = basename(file, extname(file))
  // Already in final form (<slug>-<n>.webp): nothing to do.
  if (extname(file).toLowerCase() === '.webp' && /^(.*)-\d+$/.test(stem) && slugs.has(stem.replace(/-\d+$/, ''))) continue

  const match = resolve(stem)
  if (!match) {
    skipped.push(`${file}: no product matches "${stem}"`)
    continue
  }
  const out = `${match.slug}-${match.n}.webp`
  if (existsSync(join(PUBLIC_DIR, out))) {
    skipped.push(`${file}: ${out} already exists (rename or delete one of them)`)
    continue
  }

  console.log(`${file}  ->  ${out}${match.fuzzy ? `   (closest product to "${stem}")` : ''}`)
  if (!DRY) {
    const info = await sharp(join(PUBLIC_DIR, file)).rotate().resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 82 }).toFile(join(PUBLIC_DIR, out))
    mkdirSync(SOURCE_DIR, { recursive: true })
    renameSync(join(PUBLIC_DIR, file), join(SOURCE_DIR, file))
    converted.push(`${out}: ${info.width}×${info.height}, ${Math.round(info.size / 1024)} kB`)
  }
}

// Rebuild every product's image list from what is actually on disk.
const onDisk = existsSync(PUBLIC_DIR) ? readdirSync(PUBLIC_DIR) : []
let linked = 0
for (const p of products) {
  const found = onDisk
    .map((f) => f.match(new RegExp(`^${p.slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}-(\\d+)\\.webp$`)))
    .filter(Boolean)
    .map((m) => m[0])
    .sort((a, b) => Number(a.match(/-(\d+)\.webp$/)[1]) - Number(b.match(/-(\d+)\.webp$/)[1]))

  const images = []
  for (const file of found) {
    const meta = await sharp(join(PUBLIC_DIR, file)).metadata()
    images.push({
      src: `/products/${file}`,
      alt: `${p.name} – ${images.length === 0 ? 'packshot' : 'detail'}`,
      width: meta.width,
      height: meta.height,
      role: images.length === 0 ? 'primary' : 'gallery',
    })
  }
  if (JSON.stringify(images) !== JSON.stringify(p.images)) p.images = images
  linked += images.length ? 1 : 0
}

if (!DRY) writeFileSync(DATA_FILE, JSON.stringify(products, null, 2) + '\n')

console.log(`\n${DRY ? '[dry run] ' : ''}${converted.length} converted${converted.length ? ':\n  ' + converted.join('\n  ') : ''}`)
console.log(`${linked} of ${products.length} products now have photos.`)
if (skipped.length) console.log(`\nSkipped:\n  ${skipped.join('\n  ')}`)
if (!DRY) console.log('\nNext: npm --prefix server run seed')
