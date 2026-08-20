// app/(app)/settings/page.tsx
'use client'

import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import { Loader } from '@/components/ui/Loader'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useUser, useClerk } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

export default function SettingsPage() {
  const { isLoaded, user } = useUser()
  const { signOut } = useClerk()
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [bio, setBio] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  
  const [isLoading, setIsLoading] = useState(false)
  const [isPasswordLoading, setIsPasswordLoading] = useState(false)
  const [profileSuccess, setProfileSuccess] = useState(false)
  const [passwordSuccess, setPasswordSuccess] = useState(false)
  const [profileError, setProfileError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [isClerkEnabled] = useState(() => {
    const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
    return !!(publishableKey && publishableKey.startsWith('pk_'))
  })

  // Initialize fields once user is loaded
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        setUsername(user.username || '')
        setDisplayName(user.fullName || '')
        setBio((user.unsafeMetadata?.bio as string) || '')
      }, 0)
    } else if (!isClerkEnabled) {
      // Initialize mock data
      setTimeout(() => {
        setUsername('maou')
        setDisplayName('Maou')
        setBio('Building things with Quark.')
      }, 0)
    }
  }, [user, isLoaded, isClerkEnabled])

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setProfileSuccess(false)
    setProfileError('')

    if (!isClerkEnabled) {
      // Mock save
      await new Promise((resolve) => setTimeout(resolve, 800))
      setIsLoading(false)
      setProfileSuccess(true)
      setTimeout(() => setProfileSuccess(false), 3000)
      return
    }

    if (!user) {
      setIsLoading(false)
      return
    }

    try {
      // Split display name into first and last name for Clerk
      const names = displayName.trim().split(' ')
      const firstName = names[0] || ''
      const lastName = names.slice(1).join(' ') || ''

      await user.update({
        username: username.trim(),
        firstName,
        lastName,
        unsafeMetadata: {
          ...user.unsafeMetadata,
          bio: bio.trim(),
        },
      })
      
      setProfileSuccess(true)
      setTimeout(() => setProfileSuccess(false), 3000)
    } catch (err: unknown) {
      console.error('Failed to update Clerk profile:', err)
      const clerkError = err as { errors?: { longMessage?: string }[] }
      setProfileError(clerkError.errors?.[0]?.longMessage || 'Failed to update profile.')
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasswordSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsPasswordLoading(true)
    setPasswordSuccess(false)
    setPasswordError('')

    if (newPassword.length < 8) {
      setPasswordError('New password must be at least 8 characters')
      setIsPasswordLoading(false)
      return
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match')
      setIsPasswordLoading(false)
      return
    }

    if (!isClerkEnabled) {
      // Mock save
      await new Promise((resolve) => setTimeout(resolve, 800))
      setIsPasswordLoading(false)
      setPasswordSuccess(true)
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
      setTimeout(() => setPasswordSuccess(false), 3000)
      return
    }

    if (!user) {
      setIsPasswordLoading(false)
      return
    }

    try {
      await user.updatePassword({
        currentPassword,
        newPassword,
      })
      setPasswordSuccess(true)
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
      setTimeout(() => setPasswordSuccess(false), 3000)
    } catch (err: unknown) {
      console.error('Failed to change Clerk password:', err)
      const clerkError = err as { errors?: { longMessage?: string }[] }
      setPasswordError(clerkError.errors?.[0]?.longMessage || 'Failed to change password. Make sure current password is correct.')
    } finally {
      setIsPasswordLoading(false)
    }
  }

  const handleAvatarChange = async (file: File) => {
    if (!isClerkEnabled || !user) {
      console.log('Mock avatar upload:', file.name)
      return
    }

    try {
      await user.setProfileImage({ file })
      console.log('Avatar updated successfully on Clerk')
    } catch (err) {
      console.error('Failed to upload avatar to Clerk:', err)
    }
  }

  if (isClerkEnabled && !isLoaded) {
    return (
      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-void">
        <Loader />
      </div>
    )
  }

  const userEmail = isClerkEnabled ? user?.primaryEmailAddress?.emailAddress : 'maou@quark.dev'
  const isVerified = isClerkEnabled ? !!user?.primaryEmailAddress?.verification.status : true

  return (
    <div className="max-w-3xl space-y-12">
      {/* Header */}
      <div className="border-b border-line pb-4">
        <h1 className="font-ui text-2xl font-bold text-ink">Settings</h1>
        <p className="font-mono text-sm text-inkDim">
          Manage your account, security, and preferences.
        </p>
      </div>

      {/* ===== PROFILE SECTION ===== */}
      <section>
        <div className="mb-6 flex items-center gap-4">
          <span className="font-mono text-xs uppercase tracking-wider text-quarkBlue">
            Profile
          </span>
          <span className="flex-1 border-t border-line" />
        </div>

        <form onSubmit={handleProfileSave} className="space-y-4">
          {/* Avatar */}
          <div className="flex items-center gap-6">
            <Avatar size="xl" src={isClerkEnabled ? user?.imageUrl : null} onImageChange={handleAvatarChange} />
            <div>
              <p className="font-mono text-sm text-ink">Your avatar</p>
              <p className="font-mono text-xs text-inkFaint">
                Click the avatar to upload a new image.
              </p>
            </div>
          </div>

          {profileError && (
            <div className="border border-quarkRed bg-quarkRed/10 p-3 text-xs font-mono text-quarkRed">
              {profileError}
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label
                htmlFor="username"
                className="block font-mono text-xs uppercase tracking-wider text-inkDim"
              >
                Username
              </label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1"
                required
              />
              <p className="mt-1 font-mono text-xs text-inkFaint">
                Your unique handle. Visible to everyone.
              </p>
            </div>

            <div>
              <label
                htmlFor="displayName"
                className="block font-mono text-xs uppercase tracking-wider text-inkDim"
              >
                Display name
              </label>
              <Input
                id="displayName"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          {/* Email — display only */}
          <div>
            <label
              htmlFor="email"
              className="block font-mono text-xs uppercase tracking-wider text-inkDim"
            >
              Email
            </label>
            <div className="mt-1 flex items-center gap-2">
              <span className="font-mono text-sm text-inkDim">{userEmail}</span>
              {isVerified && (
                <Badge variant="info" className="text-[10px]">
                  Verified
                </Badge>
              )}
            </div>
            <p className="mt-1 font-mono text-xs text-inkFaint">
              Your registered email. Cannot be changed here.
            </p>
          </div>

          <div>
            <label
              htmlFor="bio"
              className="block font-mono text-xs uppercase tracking-wider text-inkDim"
            >
              Bio
            </label>
            <textarea
              id="bio"
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full border border-line bg-surface2 px-3 py-2.5 font-mono text-sm text-ink placeholder:text-inkFaint focus:border-quarkBlue focus:shadow-snap-blue focus:outline-none"
              placeholder="Tell the community about yourself..."
            />
            <p className="mt-1 font-mono text-xs text-inkFaint">
              Appears on your profile and pen pages.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Button
              type="submit"
              variant="primary"
              className="min-h-[44px]"
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save profile'}
            </Button>
            {profileSuccess && (
              <span className="font-mono text-sm text-quarkGreen">✓ Saved</span>
            )}
          </div>
        </form>
      </section>

      {/* ===== SECURITY SECTION ===== */}
      <section>
        <div className="mb-6 flex items-center gap-4">
          <span className="font-mono text-xs uppercase tracking-wider text-quarkBlue">
            Security
          </span>
          <span className="flex-1 border-t border-line" />
        </div>

        <form onSubmit={handlePasswordSave} className="space-y-4 border border-line bg-surface p-6">
          {passwordError && (
            <div className="border border-quarkRed bg-quarkRed/10 p-3 text-xs font-mono text-quarkRed">
              {passwordError}
            </div>
          )}

          {isClerkEnabled && (
            <div>
              <label
                htmlFor="currentPassword"
                className="block font-mono text-xs uppercase tracking-wider text-inkDim"
              >
                Current password
              </label>
              <Input
                id="currentPassword"
                type="password"
                placeholder="••••••••"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="mt-1"
                required
              />
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label
                htmlFor="newPassword"
                className="block font-mono text-xs uppercase tracking-wider text-inkDim"
              >
                New password
              </label>
              <Input
                id="newPassword"
                type="password"
                placeholder="••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1"
                required
              />
              <p className="mt-1 font-mono text-xs text-inkFaint">
                At least 8 characters.
              </p>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block font-mono text-xs uppercase tracking-wider text-inkDim"
              >
                Confirm new password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1"
                required
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button
              type="submit"
              variant="primary"
              className="min-h-[44px]"
              disabled={isPasswordLoading}
            >
              {isPasswordLoading ? 'Changing...' : 'Change password'}
            </Button>
            {passwordSuccess && (
              <span className="font-mono text-sm text-quarkGreen">✓ Password updated</span>
            )}
          </div>
        </form>
      </section>

      {/* ===== BILLING SECTION ===== */}
      <section>
        <div className="mb-6 flex items-center gap-4">
          <span className="font-mono text-xs uppercase tracking-wider text-quarkBlue">
            Billing
          </span>
          <span className="flex-1 border-t border-line" />
        </div>

        <div className="border border-line bg-surface p-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-ui text-lg font-semibold text-ink">Free Plan</h3>
                <Badge variant="info">Active</Badge>
              </div>
              <p className="mt-1 font-mono text-sm text-inkDim">
                3 published pens · 10 files per project · 500KB per file
              </p>
              <p className="mt-2 font-mono text-sm text-inkDim">
                Unlimited private/draft pens
              </p>
            </div>
            <Link href="/billing">
              <Button variant="primary" className="min-h-[40px]">
                Upgrade to Pro
              </Button>
            </Link>
          </div>

          <div className="mt-4 border-t border-line pt-4">
            <p className="font-mono text-xs text-inkFaint">
              No payment method on file.
            </p>
          </div>
        </div>
      </section>

      {/* ===== DANGER ZONE ===== */}
      <section>
        <div className="mb-6 flex items-center gap-4">
          <span className="font-mono text-xs uppercase tracking-wider text-quarkRed">
            Danger Zone
          </span>
          <span className="flex-1 border-t border-line" />
        </div>

        <div className="border border-quarkRed bg-surface p-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-ui text-lg font-semibold text-quarkRed">
                Delete account
              </h3>
              <p className="mt-1 font-mono text-sm text-inkDim">
                Permanently delete your account and all data. This cannot be
                undone.
              </p>
            </div>
            <Button
              variant="destructive"
              className="min-h-[40px]"
              onClick={() => {
                if (
                  confirm(
                    'Are you sure you want to delete your account? This is permanent.'
                  )
                ) {
                  if (isClerkEnabled && user) {
                    user.delete().then(() => {
                      signOut()
                      router.push('/')
                    }).catch(err => console.error(err))
                  } else {
                    console.log('Account deleted (Mock)')
                    router.push('/')
                  }
                }
              }}
            >
              Delete account
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}