import { readFileSync } from 'fs'
import { join } from 'path'
import { describe } from 'vitest'
import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from '@/lib/db/schema'

export const databaseUrl: string | undefined = process.env.DATABASE_URL

export const hasDatabase = !!databaseUrl

// Skip an entire suite when no live NeonDB connection is configured.
export function describeDb(name: string, fn: () => void) {
  return hasDatabase ? describe(name, fn) : describe.skip(name, fn)
}

export { schema }

export function testDb() {
  const url = databaseUrl
  if (!url) {
    // Return a lazy proxy so test collection still succeeds; the suite is
    // skipped, so the underlying connection is never actually touched.
    return new Proxy({} as ReturnType<typeof makeDb>, {
      get(_target, prop) {
        throw new Error('DATABASE_URL is required to run backend smoke tests.')
      },
    }) as ReturnType<typeof makeDb>
  }
  return makeDb(url)
}

function makeDb(url: string) {
  const sql = neon(url)
  return drizzle(sql, { schema })
}

let migrationRan = false

export async function runMigration() {
  const url = databaseUrl
  if (!url) return
  if (migrationRan) return
  migrationRan = true
  const sqlText = readFileSync(join(process.cwd(), 'drizzle', '0000_initial.sql'), 'utf-8')
  const sql = neon(url)
  await sql`${sqlText}`
}

let uid = 0
export function unique(prefix: string) {
  uid += 1
  return `${prefix}-${Date.now()}-${uid}-${Math.random().toString(36).slice(2, 6)}`
}
