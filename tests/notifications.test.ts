import { eq } from 'drizzle-orm'
import { beforeAll, afterAll, it, expect } from 'vitest'
import { describeDb, testDb, runMigration, unique, schema } from './helpers'

describeDb('Notifications feature', () => {
  const db = testDb()
  const userId = unique('user')

  beforeAll(async () => {
    await runMigration()
    await db.insert(schema.users).values({ id: userId, email: `${userId}@test.dev`, username: userId })
  })

  afterAll(async () => {
    await db.delete(schema.users).where(eq(schema.users.id, userId))
  })

  it('creates notifications of each supported type', async () => {
    for (const type of ['fork', 'comment', 'billing', 'system'] as const) {
      const nid = unique('notif')
      await db.insert(schema.notifications).values({
        id: nid,
        userId,
        type,
        message: `A ${type} notification`,
      })
      const row = await db.query.notifications.findFirst({ where: eq(schema.notifications.id, nid) })
      expect(row?.type).toBe(type)
      expect(row?.read).toBe(false)
      await db.delete(schema.notifications).where(eq(schema.notifications.id, nid))
    }
  })

  it('lists notifications for a user newest-first', async () => {
    const n1 = unique('notif')
    const n2 = unique('notif')
    await db.insert(schema.notifications).values([
      { id: n1, userId, type: 'system', message: 'old' },
      { id: n2, userId, type: 'fork', message: 'new' },
    ])

    const rows = await db.query.notifications.findMany({
      where: (n, { eq: e }) => e(n.userId, userId),
      orderBy: (n, { desc }) => [desc(n.createdAt)],
    })
    expect(rows.map((r) => r.id)).toContain(n1)
    expect(rows.map((r) => r.id)).toContain(n2)

    await db.delete(schema.notifications).where(eq(schema.notifications.id, n1))
    await db.delete(schema.notifications).where(eq(schema.notifications.id, n2))
  })

  it('marks a notification as read', async () => {
    const nid = unique('notif')
    await db.insert(schema.notifications).values({ id: nid, userId, type: 'system', message: 'hello' })
    await db.update(schema.notifications).set({ read: true }).where(eq(schema.notifications.id, nid))
    const row = await db.query.notifications.findFirst({ where: eq(schema.notifications.id, nid) })
    expect(row?.read).toBe(true)
    await db.delete(schema.notifications).where(eq(schema.notifications.id, nid))
  })
})
