import { NextRequest } from 'next/server'
import { desc, eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { reports } from '@/lib/db/schema'
import { ok } from '@/lib/api'

export const runtime = 'nodejs'

export async function GET(req: NextRequest) {
  const rows = await db.select().from(reports).orderBy(desc(reports.createdAt))
  return ok(rows)
}

export async function POST(req: NextRequest) {
  return ok({}, 'Use a project report endpoint to create reports')
}
