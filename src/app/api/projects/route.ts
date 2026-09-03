import { NextRequest } from 'next/server'
import { eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { users, projects, adminSettings } from '@/lib/db/schema'
import { generateId } from '@/lib/db/ids'
import { ok, created, fail, unauthorized } from '@/lib/api'
import type { Project, FileNode } from '@/lib/types'

const DEFAULT_FILES: FileNode[] = [
  {
    id: 'file-html-1',
    name: 'index.html',
    type: 'file',
    language: 'html',
    content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Pen</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>Hello from Quark!</h1>
  <p>Modify index.html, style.css, or script.js and see the results instantly.</p>
  <script src="script.js"></script>
</body>
</html>`,
  },
  {
    id: 'file-css-1',
    name: 'style.css',
    type: 'file',
    language: 'css',
    content: `body {
  background-color: #0A0A0A;
  color: #FFFFFF;
  font-family: 'Space Grotesk', system-ui, sans-serif;
  padding: 32px;
  text-align: center;
}
h1 {
  color: #4D8DFF;
}`,
  },
  {
    id: 'file-js-1',
    name: 'script.js',
    type: 'file',
    language: 'js',
    content: `console.log('Quark live preview initialized!');`,
  },
]

function toProject(row: typeof projects.$inferSelect): Project {
  return {
    id: row.id,
    name: row.name,
    ownerId: row.ownerId,
    files: row.files,
    dependencies: row.dependencies,
    visibility: row.visibility,
    tags: row.tags,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
    publishedAt: row.publishedAt ? row.publishedAt.toISOString() : undefined,
  }
}

export async function resolveUser(userId: string) {
  const user = await db.query.users.findFirst({ where: eq(users.clerkId, userId) })
  if (user) return user
  return null
}

export async function getOrCreateUser({ clerkId, email, username, displayName }: {
  clerkId: string
  email: string
  username: string
  displayName?: string
}) {
  const existing = await db.query.users.findFirst({ where: eq(users.clerkId, clerkId) })
  if (existing) return existing

  const id = generateId('user')
  await db.insert(users).values({
    id,
    clerkId,
    email,
    username,
    displayName: displayName ?? null,
    role: 'user',
  })
  const created = await db.query.users.findFirst({ where: eq(users.id, id) })
  if (!created) throw new Error('Failed to create user')
  return created
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const ownerId = searchParams.get('ownerId')

  if (ownerId) {
    const rows = await db.query.projects.findMany({
      where: (p, { eq }) => eq(p.ownerId, ownerId),
      orderBy: (p, { desc }) => [desc(p.updatedAt)],
    })
    return ok(rows.map(toProject))
  }

  return ok([])
}

export async function POST(req: NextRequest) {
  const { auth } = await import('@clerk/nextjs/server')
  const { userId } = await auth()
  if (!userId) return unauthorized()

  const body = await req.json()
  const name = (body?.name as string)?.trim() || 'Untitled Pen'

  let user = await resolveUser(userId)
  if (!user) {
    const cursor = await auth()
    const session = cursor.sessionClaims
    const email = (session?.email as string) || 'user@quark.dev'
    const username = (session?.username as string) || `user-${userId.slice(0, 8)}`
    const displayName = (session?.name as string) || username
    user = await getOrCreateUser({ clerkId: userId, email, username, displayName })
  }

  const projectId = generateId('pen')
  await db.insert(projects).values({
    id: projectId,
    name,
    ownerId: user!.id,
    files: DEFAULT_FILES,
    visibility: 'private',
  })

  const row = await db.query.projects.findFirst({ where: eq(projects.id, projectId) })
  if (!row) return fail('Failed to create project', 500)
  return created(toProject(row), 'Project created')
}
