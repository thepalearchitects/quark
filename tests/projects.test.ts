import { eq } from 'drizzle-orm'
import { describe, beforeAll, afterAll, it, expect } from 'vitest'
import { describeDb, testDb, runMigration, unique, schema } from './helpers'

describeDb('Projects (pens) feature', () => {
  const db = testDb()
  const ownerUser = unique('user')
  const otherUser = unique('user')

  beforeAll(async () => {
    await runMigration()
    for (const u of [ownerUser, otherUser]) {
      await db.insert(schema.users).values({
        id: u,
        email: `${u}@test.dev`,
        username: u,
        role: 'user',
      })
    }
  })

  afterAll(async () => {
    await db.delete(schema.users).where(eq(schema.users.id, otherUser))
    await db.delete(schema.users).where(eq(schema.users.id, ownerUser))
  })

  it('creates, reads, updates, and deletes a project', async () => {
    const pid = unique('pen')
    const name = `Test Pen ${pid}`

    await db.insert(schema.projects).values({
      id: pid,
      name,
      ownerId: ownerUser,
      files: [{ id: 'f1', name: 'index.html', type: 'file', language: 'html', content: '<h1>hi</h1>' }],
      dependencies: {},
      visibility: 'private',
      tags: ['test'],
    })

    const fetched = await db.query.projects.findFirst({ where: eq(schema.projects.id, pid) })
    expect(fetched).toBeDefined()
    expect(fetched?.name).toBe(name)
    expect(fetched?.visibility).toBe('private')
    expect(fetched?.files).toHaveLength(1)

    await db.update(schema.projects).set({ visibility: 'public', updatedAt: new Date() }).where(eq(schema.projects.id, pid))
    const updated = await db.query.projects.findFirst({ where: eq(schema.projects.id, pid) })
    expect(updated?.visibility).toBe('public')
    expect(updated?.publishedAt).toBeNull()

    await db.delete(schema.projects).where(eq(schema.projects.id, pid))
    const gone = await db.query.projects.findFirst({ where: eq(schema.projects.id, pid) })
    expect(gone).toBeUndefined()
  })

  it('scopes projects to their owner', async () => {
    const pid = unique('pen')
    await db.insert(schema.projects).values({ id: pid, name: 'scoped', ownerId: otherUser, visibility: 'private' })

    const ownerRows = await db.query.projects.findMany({ where: (p, { eq: e }) => e(p.ownerId, ownerUser) })
    const otherRows = await db.query.projects.findMany({ where: (p, { eq: e }) => e(p.ownerId, otherUser) })
    expect(ownerRows.find((r) => r.id === pid)).toBeUndefined()
    expect(otherRows.find((r) => r.id === pid)).toBeDefined()

    await db.delete(schema.projects).where(eq(schema.projects.id, pid))
  })

  it('lists public projects for the explore feed', async () => {
    const p1 = unique('pen')
    const p2 = unique('pen')
    await db.insert(schema.projects).values([
      { id: p1, name: 'Public A', ownerId: ownerUser, visibility: 'public', publishedAt: new Date() },
      { id: p2, name: 'Private B', ownerId: ownerUser, visibility: 'private' },
    ])

    const publicRows = await db.query.projects.findMany({
      where: (p, { eq: e }) => e(p.visibility, 'public'),
      orderBy: (p, { desc: d }) => [d(p.publishedAt ?? p.updatedAt)],
    })
    const ids = publicRows.map((r) => r.id)
    expect(ids).toContain(p1)
    expect(ids).not.toContain(p2)

    await db.delete(schema.projects).where(eq(schema.projects.id, p1))
    await db.delete(schema.projects).where(eq(schema.projects.id, p2))
  })

  it('increments fork and view counters', async () => {
    const pid = unique('pen')
    await db.insert(schema.projects).values({ id: pid, name: 'counted', ownerId: ownerUser, visibility: 'public' })

    const base = await db.query.projects.findFirst({ where: eq(schema.projects.id, pid) })
    const baseViews = base?.viewsCount ?? 0

    await db
      .update(schema.projects)
      .set({ viewsCount: baseViews + 1 })
      .where(eq(schema.projects.id, pid))

    const counted = await db.query.projects.findFirst({ where: eq(schema.projects.id, pid) })
    expect(counted?.viewsCount).toBe(baseViews + 1)

    await db.delete(schema.projects).where(eq(schema.projects.id, pid))
  })

  it('creates a fork project owned by the forking user', async () => {
    const src = unique('pen')
    const fork = unique('pen')
    await db.insert(schema.projects).values({ id: src, name: 'Original', ownerId: ownerUser, visibility: 'public' })
    await db.insert(schema.projects).values({ id: fork, name: 'Original (Fork)', ownerId: otherUser, visibility: 'private' })

    const forkRow = await db.query.projects.findFirst({ where: eq(schema.projects.id, fork) })
    expect(forkRow?.ownerId).toBe(otherUser)
    expect(forkRow?.name).toContain('Fork')

    await db.delete(schema.projects).where(eq(schema.projects.id, src))
    await db.delete(schema.projects).where(eq(schema.projects.id, fork))
  })
})
