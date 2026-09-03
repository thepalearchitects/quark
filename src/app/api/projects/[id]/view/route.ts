import { NextRequest } from 'next/server'
import { eq, sql } from 'drizzle-orm'
import { db } from '@/lib/db'
import { projects } from '@/lib/db/schema'
import { ok, notFound } from '@/lib/api'

export const runtime = 'nodejs'

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const row = await db.query.projects.findFirst({ where: eq(projects.id, id) })
  if (!row) return notFound('Pen not found')

  await db
    .update(projects)
    .set({ viewsCount: sql`${projects.viewsCount} + 1` })
    .where(eq(projects.id, id))

  return ok({ id, viewed: true })
}
