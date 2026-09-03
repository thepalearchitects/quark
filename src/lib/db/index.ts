import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from './schema'

type Database = ReturnType<typeof drizzle<typeof schema>>

let dbInstance: Database | null = null

function getDb(): Database {
  if (!dbInstance) {
    const databaseUrl = process.env.DATABASE_URL
    if (!databaseUrl) {
      throw new Error(
        'DATABASE_URL is not set. Provide a NeonDB connection string to use the database.'
      )
    }
    const sql = neon(databaseUrl)
    dbInstance = drizzle(sql, { schema })
  }
  return dbInstance
}

// Lazily connect via a Proxy so module load (and static builds) do not require
// DATABASE_URL; it is only required when a route actually touches the database.
export const db = new Proxy({} as Database, {
  get(_target, prop) {
    return (getDb() as unknown as Record<PropertyKey, unknown>)[prop]
  },
}) as Database

export type { Database }
