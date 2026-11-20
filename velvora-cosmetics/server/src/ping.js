import mongoose from 'mongoose'
import { connect, disconnect, redact, DEFAULT_URI } from './db.js'

console.log(`Target: ${redact(process.env.MONGODB_URI?.trim() || DEFAULT_URI)}`)
await connect()

const admin = mongoose.connection.db.admin()
const { version } = await admin.serverInfo()
const collections = await mongoose.connection.db.listCollections().toArray()
console.log(`MongoDB ${version}. Collections: ${collections.map((c) => c.name).join(', ') || '(none yet)'}`)

await disconnect()
