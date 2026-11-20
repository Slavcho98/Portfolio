import mongoose from 'mongoose'

// Node 20.12+ can load .env natively; a missing file is fine (the variable may come from the shell).
try {
  process.loadEnvFile(new URL('../.env', import.meta.url))
} catch {}

export const DEFAULT_URI = 'mongodb://127.0.0.1:27017/velvora'

export const redact = (uri) => uri.replace(/\/\/([^:/@]+):([^@]+)@/, '//$1:*****@')

function explain(error) {
  const msg = String(error?.message ?? error)
  if (/bad auth|authentication failed/i.test(msg)) return 'Authentication failed. Check the database user name and password in MONGODB_URI (special characters in the password must be URL-encoded).'
  if (/ReplicaSetNoPrimary|Server selection timed out|ECONNREFUSED|ETIMEDOUT/i.test(msg)) return 'Could not reach the server. For Atlas, add your IP under Network Access; for local, make sure the MongoDB service is running.'
  if (/ENOTFOUND|querySrv/i.test(msg)) return 'The host name could not be resolved. Re-copy the connection string from Atlas (Connect → Drivers).'
  return msg
}

export async function connect() {
  const uri = process.env.MONGODB_URI?.trim() || DEFAULT_URI
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 })
  } catch (error) {
    console.error(`\nCould not connect to ${redact(uri)}\n${explain(error)}\n`)
    process.exit(1)
  }
  const { host, name } = mongoose.connection
  console.log(`Connected to ${host} / database "${name}"`)
  return mongoose.connection
}

export const disconnect = () => mongoose.disconnect()
