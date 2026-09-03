import { eq } from 'drizzle-orm'
import { beforeAll, afterAll, it, expect } from 'vitest'
import { describeDb, testDb, runMigration, unique, schema } from './helpers'

describeDb('Reports feature', () => {
  const db = testDb()
  const reporterId = unique('user')
  const ownerId = unique('user')
  const projectId = unique('pen')

  beforeAll(async () => {
    await runMigration()
    await db.insert(schema.users).values([
      { id: reporterId, email: `${reporterId}@test.dev`, username: reporterId },
      { id: ownerId, email: `${ownerId}@test.dev`, username: ownerId },
    ])
    await db.insert(schema.projects).values({ id: projectId, name: 'flagged', ownerId, visibility: 'public' })
  })

  afterAll(async () => {
    await db.delete(schema.projects).where(eq(schema.projects.id, projectId))
    await db.delete(schema.users).where(eq(schema.users.id, ownerId))
    await db.delete(schema.users).where(eq(schema.users.id, reporterId))
  })

  it('creates a report as pending', async () => {
    const rid = unique('report')
    await db.insert(schema.reports).values({ id: rid, projectId, reporterId, reason: 'Spam' })
    const row = await db.query.reports.findFirst({ where: eq(schema.reports.id, rid) })
    expect(row).toBeDefined()
    expect(row?.status).toBe('pending')
    expect(row?.reason).toBe('Spam')

    await db.delete(schema.reports).where(eq(schema.reports.id, rid))
  })

  it('transitions report status', async () => {
    const rid = unique('report')
    await db.insert(schema.reports).values({ id: rid, projectId, reporterId, reason: 'Copyright' })

    await db.update(schema.reports).set({ status: 'reviewed' }).where(eq(schema.reports.id, rid))
    expect((await db.query.reports.findFirst({ where: eq(schema.reports.id, rid) }))?.status).toBe('reviewed')

    await db.update(schema.reports).set({ status: 'dismissed' }).where(eq(schema.reports.id, rid))
    expect((await db.query.reports.findFirst({ where: eq(schema.reports.id, rid) }))?.status).toBe('dismissed')

    await db.delete(schema.reports).where(eq(schema.reports.id, rid))
  })

  it('lists pending reports for admin moderation', async () => {
    const rid = unique('report')
    await db.insert(schema.reports).values({ id: rid, projectId, reporterId, reason: 'Inappropriate' })
    const pending = await db.query.reports.findMany({
      where: (r, { eq: e }) => e(r.status, 'pending'),
    })
    expect(pending.some((r) => r.id === rid)).toBe(true)

    await db.delete(schema.reports).where(eq(schema.reports.id, rid))
  })
})
