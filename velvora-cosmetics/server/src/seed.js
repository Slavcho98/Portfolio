import { readFile } from 'node:fs/promises'
import { connect, disconnect } from './db.js'
import Product from './models/Product.js'

const DATA_FILE = new URL('../../data/products.json', import.meta.url)
const fresh = process.argv.includes('--fresh')

const raw = JSON.parse(await readFile(DATA_FILE, 'utf8'))
console.log(`Read ${raw.length} products from data/products.json`)

// Validate everything up front so a typo never leaves the collection half-written.
const problems = []
for (const item of raw) {
  try {
    await new Product(item).validate()
  } catch (error) {
    const detail = error.errors ? Object.values(error.errors).map((e) => e.message).join('; ') : error.message
    problems.push(`${item.slug ?? '(no slug)'}: ${detail}`)
  }
}
const slugs = raw.map((p) => p.slug)
if (new Set(slugs).size !== slugs.length) problems.push('Duplicate slugs in data/products.json')
if (problems.length) {
  console.error(`\n${problems.length} validation problem(s):\n- ${problems.join('\n- ')}`)
  process.exit(1)
}

await connect()

try {
  if (fresh) {
    const { deletedCount } = await Product.deleteMany({})
    console.log(`--fresh: removed ${deletedCount} existing products`)
  }

  // Upsert on slug so the seed can be re-run safely; edits to the JSON are applied, nothing is duplicated.
  const result = await Product.bulkWrite(
    raw.map((item) => ({
      updateOne: { filter: { slug: item.slug }, update: { $set: item }, upsert: true, setDefaultsOnInsert: true },
    })),
  )
  await Product.syncIndexes()

  console.log(`Inserted ${result.upsertedCount}, updated ${result.modifiedCount}, unchanged ${result.matchedCount - result.modifiedCount}`)

  const total = await Product.countDocuments()
  const byCategory = await Product.aggregate([{ $group: { _id: '$category', count: { $sum: 1 } } }, { $sort: { count: -1 } }])
  console.log(`\n"products" now holds ${total} documents:`)
  for (const { _id, count } of byCategory) console.log(`  ${_id.padEnd(10)} ${count}`)
} finally {
  await disconnect()
}
