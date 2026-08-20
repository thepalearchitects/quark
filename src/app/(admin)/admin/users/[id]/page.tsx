// app/(admin)/admin/users/[id]/page.tsx
'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import { ConfirmModal } from '@/components/ui/ConfirmModal'

// Mock user data
const getUser = (id: string) => ({
  id,
  username: 'maou',
  email: 'maou@quark.dev',
  plan: 'free',
  role: 'admin',
  pens: 12,
  joined: '2 months ago',
  bio: 'Building things with Quark.',
})

const roleColors = {
  admin: 'border-quarkRed text-quarkRed bg-quarkRed/10',
  moderator: 'border-quarkBlue text-quarkBlue bg-quarkBlue/10',
  user: 'border-inkFaint text-inkFaint bg-inkFaint/10',
}

export default function AdminUserDetail() {
  const params = useParams()
  const [user, setUser] = useState(getUser(params.id as string))
  const [isLoading, setIsLoading] = useState(false)
  const [modalState, setModalState] = useState<{
    isOpen: boolean
    type: 'delete' | 'suspend' | 'upgrade' | 'role' | null
  }>({ isOpen: false, type: null })
  const [pendingRole, setPendingRole] = useState<string | null>(null)

  const handleRoleChange = async (newRole: string) => {
    setIsLoading(true)
    console.log(`Changing role for ${user.username} to ${newRole}`)
    await new Promise((resolve) => setTimeout(resolve, 500))
    setUser({ ...user, role: newRole })
    setIsLoading(false)
    setModalState({ isOpen: false, type: null })
    setPendingRole(null)
  }

  const handleDelete = async () => {
    setIsLoading(true)
    console.log(`Deleting user ${user.username}`)
    await new Promise((resolve) => setTimeout(resolve, 800))
    setIsLoading(false)
    setModalState({ isOpen: false, type: null })
  }

  const handleSuspend = async () => {
    setIsLoading(true)
    console.log(`Suspending user ${user.username}`)
    await new Promise((resolve) => setTimeout(resolve, 800))
    setIsLoading(false)
    setModalState({ isOpen: false, type: null })
  }

  const handleUpgrade = async () => {
    setIsLoading(true)
    console.log(`Upgrading user ${user.username} to Pro`)
    await new Promise((resolve) => setTimeout(resolve, 800))
    setIsLoading(false)
    setModalState({ isOpen: false, type: null })
  }

  const getModalContent = () => {
    switch (modalState.type) {
      case 'delete':
        return {
          title: `Delete ${user.username}?`,
          description: `This will permanently delete ${user.username}'s account and all their data. This action cannot be undone.`,
          confirmLabel: 'Delete permanently',
          variant: 'danger' as const,
          onConfirm: handleDelete,
        }
      case 'suspend':
        return {
          title: `Suspend ${user.username}?`,
          description: `This will suspend ${user.username}'s account. They will not be able to log in or access their pens until unsuspended.`,
          confirmLabel: 'Suspend account',
          variant: 'warning' as const,
          onConfirm: handleSuspend,
        }
      case 'upgrade':
        return {
          title: `Upgrade ${user.username} to Pro?`,
          description: `This will upgrade ${user.username} to the Pro plan. They will have unlimited published pens and priority support.`,
          confirmLabel: 'Upgrade to Pro',
          variant: 'info' as const,
          onConfirm: handleUpgrade,
        }
      case 'role':
        return {
          title: `Change ${user.username}'s role?`,
          description: `This will change ${user.username}'s role from "${user.role}" to "${pendingRole}". They will have different permissions based on their new role.`,
          confirmLabel: 'Change role',
          variant: 'info' as const,
          onConfirm: () => {
            if (pendingRole && ['admin', 'moderator', 'user'].includes(pendingRole)) {
              handleRoleChange(pendingRole)
            }
          },
        }
      default:
        return null
    }
  }

  const modalContent = getModalContent()

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 border-b border-line pb-4">
        <Link href="/admin/users">
          <Button variant="secondary" className="min-h-[32px] px-3 text-xs">
            ← Back
          </Button>
        </Link>
        <h1 className="font-ui text-2xl font-bold text-ink">User Profile</h1>
      </div>

      <div className="border border-line bg-surface p-6">
        <div className="flex items-start gap-6">
          <Avatar size="xl" />
          <div>
            <h2 className="font-ui text-xl font-bold text-ink">{user.username}</h2>
            <p className="font-mono text-sm text-inkDim">{user.email}</p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <Badge variant={user.plan === 'pro' ? 'info' : 'live'} className="text-[10px]">
                {user.plan}
              </Badge>
              <span className={`font-mono text-xs px-2 py-0.5 border ${roleColors[user.role as keyof typeof roleColors]}`}>
                {user.role}
              </span>
              <span className="font-mono text-xs text-inkFaint">• {user.pens} pens</span>
              <span className="font-mono text-xs text-inkFaint">• Joined {user.joined}</span>
            </div>
            {user.bio && (
              <p className="mt-3 font-mono text-sm text-inkDim">{user.bio}</p>
            )}
          </div>
        </div>

        {/* Role Management */}
        <div className="mt-6 border-t border-line pt-6">
          <h3 className="font-mono text-sm font-semibold text-ink">Role Management</h3>
          <div className="mt-3 flex items-center gap-4">
            <span className="font-mono text-sm text-inkDim">Current role:</span>
            <span className={`font-mono text-sm px-3 py-1 border ${roleColors[user.role as keyof typeof roleColors]}`}>
              {user.role}
            </span>
            <select
              value={user.role}
              onChange={(e) => {
                const newRole = e.target.value
                if (newRole !== user.role) {
                  setPendingRole(newRole)
                  setModalState({ isOpen: true, type: 'role' })
                }
              }}
              className="border border-line bg-surface2 px-3 py-2 font-mono text-sm text-ink focus:border-quarkBlue focus:shadow-snap-blue focus:outline-none"
              disabled={isLoading}
            >
              <option value="user">User</option>
              <option value="moderator">Moderator</option>
              <option value="admin">Admin</option>
            </select>
            {isLoading && (
              <span className="font-mono text-xs text-inkFaint">Updating...</span>
            )}
          </div>
          <p className="mt-2 font-mono text-xs text-inkFaint">
            {user.role === 'admin'
              ? 'This user has full administrative access.'
              : user.role === 'moderator'
              ? 'This user can moderate content and reports.'
              : 'This user has standard permissions.'}
          </p>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-wrap gap-3 border-t border-line pt-6">
          <Button
            variant="secondary"
            className="min-h-[36px] px-4 text-xs"
            onClick={() => setModalState({ isOpen: true, type: 'suspend' })}
          >
            Suspend account
          </Button>
          <Button
            variant="primary"
            className="min-h-[36px] px-4 text-xs"
            onClick={() => setModalState({ isOpen: true, type: 'upgrade' })}
          >
            Upgrade to Pro
          </Button>
          <Button
            variant="destructive"
            className="min-h-[36px] px-4 text-xs"
            onClick={() => setModalState({ isOpen: true, type: 'delete' })}
          >
            Delete account
          </Button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {modalContent && (
        <ConfirmModal
          isOpen={modalState.isOpen}
          onClose={() => {
            setModalState({ isOpen: false, type: null })
            setPendingRole(null)
          }}
          onConfirm={modalContent.onConfirm}
          title={modalContent.title}
          description={modalContent.description}
          confirmLabel={modalContent.confirmLabel}
          variant={modalContent.variant}
          isLoading={isLoading}
        />
      )}
    </div>
  )
}