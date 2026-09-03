import { NextRequest } from 'next/server'
import { eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { comments } from '@/lib/db/schema'
import { ok, notFound, unauthorized } from '@/lib/api'

export const runtime = 'nodejs'

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { auth } = await import('@clerk/nextjs/server')
  const { userId } = await auth()
  if (!userId) return unauthorized()

  const row = await db.query.comments.findFirst({ where: eq(comments.id, id) })
  if (!row) return notFound('Comment not found')

  const { users } = await import('@/lib/db/schema')
  const { eq: eqUsers } = await import('drizzle-orm')
  const owner = await db.query.users.findFirst({ where: eqUsers(users.clerkId, userId) })
  if (!owner || owner.id !== row.userId) return unauthorized()

  const body = await req.json()
  const content = (body?.content as string)?.trim()
  if (!content || content.length > 1000) {
    return new Response(JSON.stringify({ success: false, error: 'Invalid content' }), { status: 400 })
  }

  await db.update(comments).set({ content, updatedAt: new Date() }).where(eq(comments.id, id))
  const updated = await db.query.comments.findFirst({ where: eq(comments.id, id) })
  return ok(updated, 'Comment updated')
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { auth } = await import('@clerk/nextjs/server')
  const { userId } = await auth()
  if (!userId) return unauthorized()

  const row = await db.query.comments.findFirst({ where: eq(comments.id, id) })
  if (!row) return notFound('Comment not found')

  const { users } = await import('@/lib/db/schema')
  const { eq: eqUsers } = await import('drizzle-orm')
  const owner = await db.query.users.findFirst({ where: eqUsers(users.clerkId, userId) })
  if (!owner || owner.id !== row.userId) return unauthorized()

  await db.delete(comments).where(eq(comments.id, id))
  return ok({ id }, 'Comment deleted')
}
