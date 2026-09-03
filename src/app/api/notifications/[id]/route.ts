import { NextRequest } from 'next/server'
import { eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { notifications } from '@/lib/db/schema'
import { ok, notFound, unauthorized } from '@/lib/api'

export const runtime = 'nodejs'

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { auth } = await import('@clerk/nextjs/server')
  const { userId } = await auth()
  if (!userId) return unauthorized()

  const { users } = await import('@/lib/db/schema')
  const { eq: eqUsers } = await import('drizzle-orm')
  const user = await db.query.users.findFirst({ where: eqUsers(users.clerkId, userId) })
  const row = await db.query.notifications.findFirst({ where: eq(notifications.id, id) })
  if (!row) return notFound('Notification not found')
  if (!user || user.id !== row.userId) return unauthorized()

  await db.update(notifications).set({ read: true }).where(eq(notifications.id, id))
  const updated = await db.query.notifications.findFirst({ where: eq(notifications.id, id) })
  return ok(updated, 'Notification marked read')
}
