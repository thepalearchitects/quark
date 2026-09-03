import { eq, count } from 'drizzle-orm'
import { beforeAll, afterAll, it, expect } from 'vitest'
import { describeDb, testDb, runMigration, unique, schema } from './helpers'

describeDb('Admin feature (stats & settings)', () => {
  const db = testDb()
  const adminId = unique('user')
  const userId = unique('user')
  const projectId = unique('pen')

  beforeAll(async () => {
    await runMigration()
    await db.insert(schema.users).values([
      { id: adminId, email: `${adminId}@test.dev`, username: adminId, role: 'admin' },
      { id: userId, email: `${userId}@test.dev`, username: userId },
    ])
    await db.insert(schema.projects).values({ id: projectId, name: 'admin-pen', ownerId: userId, visibility: 'public' })
  })

  afterAll(async () => {
    await db.delete(schema.projects).where(eq(schema.projects.id, projectId))
    await db.delete(schema.users).where(eq(schema.users.id, userId))
    await db.delete(schema.users).where(eq(schema.users.id, adminId))
  })

  it('computes aggregate platform stats', async () => {
    const userCount = await db.select({ value: count() }).from(schema.users)
    const projectCount = await db.select({ value: count() }).from(schema.projects)
    expect(userCount[0]?.value).toBeGreaterThanOrEqual(2)
    expect(projectCount[0]?.value).toBeGreaterThanOrEqual(1)
  })

  it('persists and reads admin settings', async () => {
    await db
      .insert(schema.adminSettings)
      .values({ key: 'free_publish_limit', value: '5', updatedAt: new Date() })
      .onConflictDoUpdate({ target: schema.adminSettings.key, set: { value: '5', updatedAt: new Date() } })

    const row = await db.query.adminSettings.findFirst({ where: eq(schema.adminSettings.key, 'free_publish_limit') })
    expect(row?.value).toBe('5')
  })
})
