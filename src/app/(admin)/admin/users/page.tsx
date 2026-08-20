// app/(admin)/admin/users/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'

// Mock users with roles
const mockUsers = [
  { id: '1', username: 'maou', email: 'maou@quark.dev', plan: 'free', role: 'admin', pens: 12, joined: '2 months ago' },
  { id: '2', username: 'dev', email: 'dev@quark.dev', plan: 'pro', role: 'moderator', pens: 45, joined: '1 month ago' },
  { id: '3', username: 'designer', email: 'designer@quark.dev', plan: 'free', role: 'user', pens: 8, joined: '3 weeks ago' },
  { id: '4', username: 'coder', email: 'coder@quark.dev', plan: 'pro', role: 'user', pens: 67, joined: '1 week ago' },
  { id: '5', username: 'builder', email: 'builder@quark.dev', plan: 'free', role: 'user', pens: 3, joined: '2 days ago' },
]

const roleColors = {
  admin: 'border-quarkRed text-quarkRed bg-quarkRed/10',
  moderator: 'border-quarkBlue text-quarkBlue bg-quarkBlue/10',
  user: 'border-inkFaint text-inkFaint bg-inkFaint/10',
}

export default function AdminUsers() {
  const [search, setSearch] = useState('')
  const [users, setUsers] = useState(mockUsers)
  const [isLoading, setIsLoading] = useState(false)

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  )

  const handleRoleChange = async (userId: string, newRole: string) => {
    setIsLoading(true)
    console.log(`Changing role for user ${userId} to ${newRole}`)
    await new Promise((resolve) => setTimeout(resolve, 500))
    setUsers(users.map((user) =>
      user.id === userId ? { ...user, role: newRole } : user
    ))
    setIsLoading(false)
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-line pb-4">
        <h1 className="font-ui text-2xl font-bold text-ink">Users</h1>
        <p className="font-mono text-sm text-inkDim">
          Manage users, roles, and account status.
        </p>
      </div>

      <div className="flex gap-4">
        <Input
          type="text"
          placeholder="Search by username or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <Button variant="secondary" className="min-h-[44px]">
          Search
        </Button>
      </div>

      <div className="border border-line bg-surface overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b border-line">
            <tr>
              <th className="px-4 py-3 font-mono text-xs uppercase tracking-wider text-inkFaint">User</th>
              <th className="px-4 py-3 font-mono text-xs uppercase tracking-wider text-inkFaint">Email</th>
              <th className="px-4 py-3 font-mono text-xs uppercase tracking-wider text-inkFaint">Plan</th>
              <th className="px-4 py-3 font-mono text-xs uppercase tracking-wider text-inkFaint">Role</th>
              <th className="px-4 py-3 font-mono text-xs uppercase tracking-wider text-inkFaint">Pens</th>
              <th className="px-4 py-3 font-mono text-xs uppercase tracking-wider text-inkFaint">Joined</th>
              <th className="px-4 py-3 font-mono text-xs uppercase tracking-wider text-inkFaint">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-surface2 transition-colors">
                <td className="px-4 py-3 font-mono text-sm text-ink">{user.username}</td>
                <td className="px-4 py-3 font-mono text-sm text-inkDim">{user.email}</td>
                <td className="px-4 py-3">
                  <Badge variant={user.plan === 'pro' ? 'info' : 'live'} className="text-[10px]">
                    {user.plan}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  <span className={`font-mono text-xs px-2 py-0.5 border ${roleColors[user.role as keyof typeof roleColors]}`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-4 py-3 font-mono text-sm text-ink">{user.pens}</td>
                <td className="px-4 py-3 font-mono text-sm text-inkDim">{user.joined}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Link href={`/admin/users/${user.id}`}>
                      <Button variant="secondary" className="min-h-[32px] px-3 text-xs">
                        View
                      </Button>
                    </Link>
                    {user.role !== 'admin' && (
                      <select
                        value={user.role}
                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                        className="border border-line bg-surface2 px-2 py-1 font-mono text-xs text-ink focus:border-quarkBlue focus:shadow-snap-blue focus:outline-none"
                        disabled={isLoading}
                      >
                        <option value="user">User</option>
                        <option value="moderator">Moderator</option>
                        <option value="admin">Admin</option>
                      </select>
                    )}
                    {user.role === 'admin' && (
                      <span className="font-mono text-xs text-inkFaint">(self)</span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredUsers.length === 0 && (
        <p className="font-mono text-sm text-inkDim">No users found.</p>
      )}
    </div>
  )
}