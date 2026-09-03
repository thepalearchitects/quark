import { NextRequest } from 'next/server'
import { eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { projects } from '@/lib/db/schema'
import { ok, notFound, unauthorized } from '@/lib/api'
import { isAdmin } from '@/lib/admin'

export const runtime = 'nodejs'

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return unauthorized('Admin access required')
  const { id } = await params
  const row = await db.query.projects.findFirst({ where: eq(projects.id, id) })
  if (!row) return notFound('Pen not found')
  return ok(row)
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return unauthorized('Admin access required')
  const { id } = await params
  const body = await req.json()

  const row = await db.query.projects.findFirst({ where: eq(projects.id, id) })
  if (!row) return notFound('Pen not found')

  if (body?.action === 'unpublish') {
    await db.update(projects).set({ visibility: 'private' }).where(eq(projects.id, id))
    return ok({ id, visibility: 'private' }, 'Pen unpublished')
  }

  return ok(row, 'No action taken')
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return unauthorized('Admin access required')
  const { id } = await params
  const row = await db.query.projects.findFirst({ where: eq(projects.id, id) })
  if (!row) return notFound('Pen not found')

  await db.delete(projects).where(eq(projects.id, id))
  return ok({ id }, 'Pen deleted')
}
