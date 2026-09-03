import { db } from './index'
import * as schema from './schema'
import { generateId } from './ids'
import { mockProjects, mockUsers, mockComments, mockReports } from '@/lib/mock-data'

export async function seedDatabase() {
  for (const user of mockUsers) {
    await db
      .insert(schema.users)
      .values({
        id: user.id,
        email: user.email,
        username: user.username,
        displayName: user.displayName,
        plan: user.plan,
        publishedCount: user.publishedCount,
        maxPublished: user.maxPublished,
        emailVerified: user.emailVerified,
        role: 'admin',
        bio: 'Building things with Quark.',
      })
      .onConflictDoNothing()
  }

  for (const project of mockProjects) {
    await db
      .insert(schema.projects)
      .values({
        id: project.id,
        name: project.name,
        ownerId: project.ownerId,
        files: project.files,
        dependencies: project.dependencies,
        visibility: project.visibility,
        tags: project.tags,
        createdAt: new Date(project.createdAt),
        updatedAt: new Date(project.updatedAt),
        publishedAt: project.publishedAt ? new Date(project.publishedAt) : null,
      })
      .onConflictDoNothing()
  }

  for (const comment of mockComments) {
    await db
      .insert(schema.comments)
      .values({
        id: comment.id,
        projectId: comment.projectId,
        userId: comment.userId,
        content: comment.content,
        createdAt: new Date(comment.createdAt),
        updatedAt: new Date(comment.updatedAt),
      })
      .onConflictDoNothing()
  }

  for (const report of mockReports) {
    await db
      .insert(schema.reports)
      .values({
        id: report.id,
        projectId: report.projectId,
        reporterId: report.reporterId,
        reason: report.reason,
        status: report.status,
        createdAt: new Date(report.createdAt),
      })
      .onConflictDoNothing()
  }

  await db
    .insert(schema.adminSettings)
    .values({ key: 'free_publish_limit', value: '3' })
    .onConflictDoNothing()

  await db
    .insert(schema.adminSettings)
    .values({ key: 'maintenance_mode', value: 'false' })
    .onConflictDoNothing()

  return { seed: true }
}

if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log('Database seeded successfully.')
      process.exit(0)
    })
    .catch((err) => {
      console.error('Failed to seed database:', err)
      process.exit(1)
    })
}
