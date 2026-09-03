import { NextRequest } from 'next/server'
import { eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { reports } from '@/lib/db/schema'
import { ok, notFound, unauthorized } from '@/lib/api'
import { isAdmin } from '@/lib/admin'

export const runtime = 'nodejs'

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return unauthorized('Admin access required')

  const { id } = await params
  const body = await req.json()
  const status = body?.status
  if (!['pending', 'reviewed', 'dismissed'].includes(status)) {
    return new Response(JSON.stringify({ success: false, error: 'Invalid status' }), { status: 400 })
  }

  const row = await db.query.reports.findFirst({ where: eq(reports.id, id) })
  if (!row) return notFound('Report not found')

  await db.update(reports).set({ status }).where(eq(reports.id, id))
  const updated = await db.query.reports.findFirst({ where: eq(reports.id, id) })
  return ok(updated, 'Report updated')
}
