import { NextRequest } from 'next/server'
import { desc } from 'drizzle-orm'
import { db } from '@/lib/db'
import { users } from '@/lib/db/schema'
import { ok, unauthorized } from '@/lib/api'
import { isAdmin } from '@/lib/admin'

export const runtime = 'nodejs'

export async function GET(req: NextRequest) {
  if (!(await isAdmin())) return unauthorized('Admin access required')
  const { searchParams } = new URL(req.url)
  const q = (searchParams.get('q') || '').toLowerCase()

  const rows = await db.select().from(users).orderBy(desc(users.createdAt))
  const filtered = q
    ? rows.filter(
        (u) =>
          u.username.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q)
      )
    : rows

  return ok(filtered)
}
