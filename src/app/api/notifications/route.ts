import { NextRequest } from 'next/server'
import { eq, desc } from 'drizzle-orm'
import { db } from '@/lib/db'
import { notifications } from '@/lib/db/schema'
import { generateId } from '@/lib/db/ids'
import { ok, created, fail, notFound, unauthorized } from '@/lib/api'

export const runtime = 'nodejs'

export async function GET(req: NextRequest) {
  const { auth } = await import('@clerk/nextjs/server')
  const { userId } = await auth()
  if (!userId) return unauthorized()

  const { users } = await import('@/lib/db/schema')
  const { eq: eqUsers } = await import('drizzle-orm')
  const user = await db.query.users.findFirst({ where: eqUsers(users.clerkId, userId) })
  if (!user) return ok([])

  const rows = await db.query.notifications.findMany({
    where: (n, { eq: eqN }) => eqN(n.userId, user.id),
    orderBy: (n, { desc: descN }) => [descN(n.createdAt)],
  })
  return ok(rows)
}

export async function POST(req: NextRequest) {
  const { auth } = await import('@clerk/nextjs/server')
  const { userId } = await auth()
  if (!userId) return unauthorized()

  const body = await req.json()
  const message = (body?.message as string)?.trim()
  if (!message || message.length > 500) return fail('Message is required')

  const { users } = await import('@/lib/db/schema')
  const { eq: eqUsers } = await import('drizzle-orm')
  const user = await db.query.users.findFirst({ where: eqUsers(users.clerkId, userId) })
  if (!user) return fail('User not found', 404)

  const allowed = ['fork', 'comment', 'billing', 'system'] as const
  const type = (allowed as readonly string[]).includes(body?.type)
    ? (body.type as (typeof allowed)[number])
    : 'system'
  const notifId = generateId('notif')
  await db.insert(notifications).values({
    id: notifId,
    userId: user.id,
    type,
    message,
    link: body?.link as string | undefined,
  })

  const row = await db.query.notifications.findFirst({ where: eq(notifications.id, notifId) })
  if (!row) return fail('Failed to create notification', 500)
  return created(row, 'Notification created')
}
