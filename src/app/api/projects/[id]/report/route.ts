import { NextRequest } from 'next/server'
import { eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { projects, reports } from '@/lib/db/schema'
import { generateId } from '@/lib/db/ids'
import { ok, created, fail, notFound, unauthorized } from '@/lib/api'
import { getOrCreateUser } from '@/app/api/projects/route'

export const runtime = 'nodejs'

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { auth } = await import('@clerk/nextjs/server')
  const { userId: clerkUserId } = await auth()
  if (!clerkUserId) return unauthorized()

  const project = await db.query.projects.findFirst({ where: eq(projects.id, id) })
  if (!project) return notFound('Pen not found')

  const body = await req.json()
  const reason = (body?.reason as string)?.trim()
  if (!reason || reason.length > 500) return fail('Reason must be 1-500 characters')

  const cursor = await auth()
  const claims = cursor.sessionClaims
  const email = (claims?.email as string) || 'user@quark.dev'
  const username = (claims?.username as string) || `user-${clerkUserId.slice(0, 8)}`
  const displayName = (claims?.name as string) || username
  const user = await getOrCreateUser({ clerkId: clerkUserId, email, username, displayName })

  const reportId = generateId('report')
  await db.insert(reports).values({
    id: reportId,
    projectId: id,
    reporterId: user.id,
    reason,
  })

  const row = await db.query.reports.findFirst({ where: eq(reports.id, reportId) })
  if (!row) return fail('Failed to create report', 500)
  return created(row, 'Report submitted')
}
