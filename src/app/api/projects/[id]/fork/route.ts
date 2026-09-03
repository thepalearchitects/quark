import { NextRequest } from 'next/server'
import { eq, sql } from 'drizzle-orm'
import { db } from '@/lib/db'
import { projects, users, notifications } from '@/lib/db/schema'
import { generateId } from '@/lib/db/ids'
import { ok, notFound, unauthorized, fail } from '@/lib/api'
import { getOrCreateUser } from '@/app/api/projects/route'

export const runtime = 'nodejs'

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { auth } = await import('@clerk/nextjs/server')
  const { userId: clerkUserId } = await auth()

  const source = await db.query.projects.findFirst({ where: eq(projects.id, id) })
  if (!source) return notFound('Pen not found')

  const forkerName = 'Guest Developer'
  let forkerId: string | null = null

  if (clerkUserId) {
    const cursor = await auth()
    const claims = cursor.sessionClaims
    const email = (claims?.email as string) || 'user@quark.dev'
    const username = (claims?.username as string) || `user-${clerkUserId.slice(0, 8)}`
    const displayName = (claims?.name as string) || username
    const user = await getOrCreateUser({ clerkId: clerkUserId, email, username, displayName })
    forkerId = user.id
  }

  const forkId = generateId('pen')
  await db.insert(projects).values({
    id: forkId,
    name: `${source.name} (Fork)`,
    description: source.description,
    ownerId: forkerId || source.ownerId,
    files: source.files,
    dependencies: source.dependencies,
    visibility: 'private',
    tags: source.tags,
  })

  await db
    .update(projects)
    .set({ forksCount: sql`${projects.forksCount} + 1` })
    .where(eq(projects.id, id))

  const owner = await db.query.users.findFirst({ where: eq(users.id, source.ownerId) })
  if (owner && owner.clerkId !== clerkUserId) {
    await db.insert(notifications).values({
      id: generateId('notif'),
      userId: owner.id,
      type: 'fork',
      message: `Your pen "${source.name}" was forked by ${forkerName}.`,
      link: `/p/${forkId}`,
    })
  }

  const created = await db.query.projects.findFirst({ where: eq(projects.id, forkId) })
  if (!created) return fail('Failed to create fork', 500)

  return ok({
    id: created.id,
    name: created.name,
    ownerId: created.ownerId,
    files: created.files,
    dependencies: created.dependencies,
    visibility: created.visibility,
    tags: created.tags,
    createdAt: created.createdAt.toISOString(),
    updatedAt: created.updatedAt.toISOString(),
  }, 'Pen forked')
}
