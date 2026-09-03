import { eq } from 'drizzle-orm'
import { beforeAll, afterAll, it, expect } from 'vitest'
import { describeDb, testDb, runMigration, unique, schema } from './helpers'

describeDb('Comments feature', () => {
  const db = testDb()
  const userId = unique('user')
  const projectId = unique('pen')

  beforeAll(async () => {
    await runMigration()
    await db.insert(schema.users).values({ id: userId, email: `${userId}@test.dev`, username: userId })
    await db.insert(schema.projects).values({ id: projectId, name: 'commented', ownerId: userId, visibility: 'public' })
  })

  afterAll(async () => {
    await db.delete(schema.projects).where(eq(schema.projects.id, projectId))
    await db.delete(schema.users).where(eq(schema.users.id, userId))
  })

  it('creates and lists comments for a project', async () => {
    const c1 = unique('comment')
    const c2 = unique('comment')
    await db.insert(schema.comments).values([
      { id: c1, projectId, userId, content: 'First!' },
      { id: c2, projectId, userId, content: 'Nice work.' },
    ])

    const rows = await db.query.comments.findMany({
      where: (c, { eq: e }) => e(c.projectId, projectId),
      orderBy: (c, { asc }) => [asc(c.createdAt)],
    })
    expect(rows).toHaveLength(2)

    await db.delete(schema.comments).where(eq(schema.comments.id, c1))
    await db.delete(schema.comments).where(eq(schema.comments.id, c2))
  })

  it('updates a comment body and timestamp', async () => {
    const cid = unique('comment')
    await db.insert(schema.comments).values({ id: cid, projectId, userId, content: 'Original' })

    await db.update(schema.comments).set({ content: 'Edited', updatedAt: new Date() }).where(eq(schema.comments.id, cid))
    const row = await db.query.comments.findFirst({ where: eq(schema.comments.id, cid) })
    expect(row?.content).toBe('Edited')

    await db.delete(schema.comments).where(eq(schema.comments.id, cid))
  })

  it('deletes a comment', async () => {
    const cid = unique('comment')
    await db.insert(schema.comments).values({ id: cid, projectId, userId, content: 'Temp' })
    await db.delete(schema.comments).where(eq(schema.comments.id, cid))
    const gone = await db.query.comments.findFirst({ where: eq(schema.comments.id, cid) })
    expect(gone).toBeUndefined()
  })
})
