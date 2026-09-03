import { eq } from 'drizzle-orm'
import { beforeAll, afterAll, it, expect } from 'vitest'
import { describeDb, testDb, runMigration, unique, schema } from './helpers'

describeDb('Users feature', () => {
  const db = testDb()
  const userId = unique('user')

  beforeAll(async () => {
    await runMigration()
  })

  afterAll(async () => {
    await db.delete(schema.users).where(eq(schema.users.id, userId))
  })

  it('creates a user with default free plan and user role', async () => {
    const email = `${userId}@test.dev`
    await db.insert(schema.users).values({
      id: userId,
      email,
      username: userId,
      displayName: 'Test User',
    })

    const row = await db.query.users.findFirst({ where: eq(schema.users.id, userId) })
    expect(row).toBeDefined()
    expect(row?.email).toBe(email)
    expect(row?.plan).toBe('free')
    expect(row?.role).toBe('user')
    expect(row?.publishedCount).toBe(0)
    expect(row?.maxPublished).toBe(3)
    expect(row?.suspended).toBe(false)
  })

  it('enforces unique email / username', async () => {
    // A conflicting insert is silently ignored rather than duplicating.
    await db
      .insert(schema.users)
      .values({ id: unique('u'), email: `${userId}@test.dev`, username: userId })
      .onConflictDoNothing()
    const rows = await db.select().from(schema.users)
    expect(rows.filter((r) => r.username === userId)).toHaveLength(1)
  })

  it('updates plan, role, and suspension state', async () => {
    await db.update(schema.users).set({ plan: 'paid', role: 'admin', suspended: true }).where(eq(schema.users.id, userId))
    const row = await db.query.users.findFirst({ where: eq(schema.users.id, userId) })
    expect(row?.plan).toBe('paid')
    expect(row?.role).toBe('admin')
    expect(row?.suspended).toBe(true)
  })

  it('deletes a user and cascades means no orphan reference', async () => {
    const newId = unique('del')
    await db.insert(schema.users).values({ id: newId, email: `${newId}@test.dev`, username: newId })
    await db.delete(schema.users).where(eq(schema.users.id, newId))
    const gone = await db.query.users.findFirst({ where: eq(schema.users.id, newId) })
    expect(gone).toBeUndefined()
  })
})
