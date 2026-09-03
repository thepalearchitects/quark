import { NextRequest } from 'next/server'
import { eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { adminSettings } from '@/lib/db/schema'
import { ok, unauthorized } from '@/lib/api'
import { isAdmin } from '@/lib/admin'

export const runtime = 'nodejs'

export async function GET(req: NextRequest) {
  if (!(await isAdmin())) return unauthorized('Admin access required')
  const rows = await db.select().from(adminSettings)
  const settings: Record<string, string> = {}
  rows.forEach((r) => (settings[r.key] = r.value))
  return ok(settings)
}

export async function PATCH(req: NextRequest) {
  if (!(await isAdmin())) return unauthorized('Admin access required')
  const body = await req.json()

  const allowed = new Set(['free_publish_limit', 'maintenance_mode'])
  const updates: { key: string; value: string }[] = []

  for (const [key, value] of Object.entries(body)) {
    if (allowed.has(key) && typeof value === 'string') {
      updates.push({ key, value })
    }
  }

  for (const u of updates) {
    await db
      .insert(adminSettings)
      .values({ key: u.key, value: u.value, updatedAt: new Date() })
      .onConflictDoUpdate({ target: adminSettings.key, set: { value: u.value, updatedAt: new Date() } })
  }

  const rows = await db.select().from(adminSettings)
  const settings: Record<string, string> = {}
  rows.forEach((r) => (settings[r.key] = r.value))
  return ok(settings, 'Settings saved')
}
