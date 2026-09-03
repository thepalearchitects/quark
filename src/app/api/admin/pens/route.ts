import { NextRequest } from 'next/server'
import { desc } from 'drizzle-orm'
import { db } from '@/lib/db'
import { projects, users } from '@/lib/db/schema'
import { ok, unauthorized } from '@/lib/api'
import { isAdmin } from '@/lib/admin'

export const runtime = 'nodejs'

export async function GET(req: NextRequest) {
  if (!(await isAdmin())) return unauthorized('Admin access required')
  const { searchParams } = new URL(req.url)
  const q = (searchParams.get('q') || '').toLowerCase()

  const rows = await db.select().from(projects).orderBy(desc(projects.createdAt))
  const authors = await db.select().from(users)
  const authorMap = new Map(authors.map((u) => [u.id, u]))

  const data = rows
    .filter((p) => !q || p.name.toLowerCase().includes(q))
    .map((r) => {
      const author = authorMap.get(r.ownerId)
      return {
        id: r.id,
        title: r.name,
        author: author ? author.username : 'unknown',
        status: r.visibility,
        reports: 0,
        createdAt: r.createdAt.toISOString(),
        description: r.description,
        tags: r.tags,
        content: '',
      }
    })

  return ok(data)
}
