import { NextRequest } from 'next/server'
import { eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { users } from '@/lib/db/schema'
import { ok, notFound, unauthorized } from '@/lib/api'
import { isAdmin } from '@/lib/admin'

export const runtime = 'nodejs'

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return unauthorized('Admin access required')
  const { id } = await params
  const row = await db.query.users.findFirst({ where: eq(users.id, id) })
  if (!row) return notFound('User not found')
  return ok(row)
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return unauthorized('Admin access required')
  const { id } = await params
  const row = await db.query.users.findFirst({ where: eq(users.id, id) })
  if (!row) return notFound('User not found')

  const body = await req.json()
  const updates: Partial<typeof users.$inferInsert> = {}

  if (body?.role && ['user', 'moderator', 'admin'].includes(body.role)) updates.role = body.role
  if (body?.plan && ['free', 'paid'].includes(body.plan)) updates.plan = body.plan
  if (typeof body?.suspended === 'boolean') updates.suspended = body.suspended

  if (Object.keys(updates).length > 0) {
    await db.update(users).set(updates).where(eq(users.id, id))
  }

  const updated = await db.query.users.findFirst({ where: eq(users.id, id) })
  return ok(updated, 'User updated')
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return unauthorized('Admin access required')
  const { id } = await params
  const row = await db.query.users.findFirst({ where: eq(users.id, id) })
  if (!row) return notFound('User not found')

  await db.delete(users).where(eq(users.id, id))
  return ok({ id }, 'User deleted')
}
