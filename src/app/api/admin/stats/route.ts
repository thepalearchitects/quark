import { NextRequest } from 'next/server'
import { eq, sql, count } from 'drizzle-orm'
import { db } from '@/lib/db'
import { users, projects, reports, comments } from '@/lib/db/schema'
import { ok, unauthorized } from '@/lib/api'
import { isAdmin } from '@/lib/admin'

export const runtime = 'nodejs'

export async function GET(req: NextRequest) {
  if (!(await isAdmin())) return unauthorized('Admin access required')

  const userCount = await db.select({ value: count() }).from(users)
  const projectCount = await db.select({ value: count() }).from(projects)
  const reportRows = await db.select().from(reports)
  const pendingReports = reportRows.filter((r) => r.status === 'pending').length

  return ok({
    totalUsers: userCount[0]?.value ?? 0,
    totalPens: projectCount[0]?.value ?? 0,
    totalReports: reportRows.length,
    pendingReports,
  })
}
