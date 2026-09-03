// app/(admin)/admin/users/page.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'

interface AdminUser {
  id: string
  username: string
  email: string
  plan: string
  role: string
  createdAt: string
  suspended: boolean
}

const roleColors: Record<string, string> = {
  admin: 'border-quarkRed text-quarkRed bg-quarkRed/10',
  moderator: 'border-quarkBlue text-quarkBlue bg-quarkBlue/10',
  user: 'border-inkFaint text-inkFaint bg-inkFaint/10',
}

export default function AdminUsers() {
  const [search, setSearch] = useState('')
  const [users, setUsers] = useState<AdminUser[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const loadUsers = async () => {
    try {
      const res = await fetch('/api/admin/users')
      const json = await res.json()
      if (json.success) setUsers(json.data || [])
    } catch (err) {
      console.error('Failed to load admin users:', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  )

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      await fetch(`/api/admin/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole }),
      })
      setUsers(users.map((user) =>
        user.id === userId ? { ...user, role: newRole } : user
      ))
    } catch (err) {
      console.error('Failed to change user role:', err)
    }
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
              <th className="px-4 py-3 font-mono text-xs uppercase tracking-wider text-inkFaint">Status</th>
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
                  <Badge variant={user.plan === 'paid' ? 'info' : 'live'} className="text-[10px]">
                    {user.plan}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  <span className={`font-mono text-xs px-2 py-0.5 border ${roleColors[user.role as keyof typeof roleColors]}`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-4 py-3 font-mono text-sm text-ink">{user.suspended ? 'Suspended' : 'Active'}</td>
                <td className="px-4 py-3 font-mono text-sm text-inkDim">{new Date(user.createdAt).toLocaleDateString()}</td>
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