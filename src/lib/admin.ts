import { db } from '@/lib/db'
import { users } from '@/lib/db/schema'

export async function getAuthUser() {
  const { auth } = await import('@clerk/nextjs/server')
  const { userId } = await auth()
  if (!userId) return null
  const user = await db.query.users.findFirst({ where: (u, { eq }) => eq(u.clerkId, userId) })
  return { userId, user }
}

export async function isAdmin() {
  const authUser = await getAuthUser()
  const user = authUser?.user
  return !!user && (user.role === 'admin' || user.role === 'moderator')
}
