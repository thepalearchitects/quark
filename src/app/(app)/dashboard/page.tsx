// app/(app)/dashboard/page.tsx
'use client'

import { useProjectStore } from '@/lib/store/projectStore'
import { ProjectCard } from '@/components/dashboard/ProjectCard'
import { UsageBadge } from '@/components/dashboard/UsageBadge'
import { Button } from '@/components/ui/Button'
import { Avatar } from '@/components/ui/Avatar'
import { OnboardingTour } from '@/components/onboarding/OnboardingTour'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'

export default function DashboardPage() {
  const { projects, isLoading, loadProjects } = useProjectStore()
  const { user, isLoaded } = useUser()
  const [isClerkEnabled] = useState(() => {
    const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
    return !!(publishableKey && publishableKey.startsWith('pk_'))
  })

  useEffect(() => {
    loadProjects()
  }, [loadProjects])

  if (isLoading || (isClerkEnabled && !isLoaded)) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="font-mono text-sm text-inkFaint animate-pulse">
          Loading your pens...
        </div>
      </div>
    )
  }

  const publishedCount = projects.filter(p => p.visibility === 'public').length
  const userName = isClerkEnabled ? (user?.username || user?.fullName || 'Quark Developer') : 'Quark Developer'
  const userAvatar = isClerkEnabled ? user?.imageUrl : null

  return (
    <div className="space-y-6">
      {/* Onboarding Tour */}
      <OnboardingTour />

      {/* Header with Avatar */}
      <div className="flex items-center justify-between border-b border-line pb-4">
        <div className="flex items-center gap-4">
          <Avatar size="lg" src={userAvatar} />
          <div>
            <h1 className="font-ui text-2xl font-bold text-ink">Dashboard</h1>
            <p className="font-mono text-sm text-inkDim">
              Welcome back, {userName} · Your pens.
            </p>
          </div>
        </div>
        <Link href="/pen/new" className="pointer-events-auto">
          <Button variant="primary" className="min-h-[44px]">
            New pen +
          </Button>
        </Link>
      </div>

      {/* Usage Badge */}
      <UsageBadge used={publishedCount} total={3} />

      {/* Projects Grid */}
      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center border border-line bg-surface p-12 text-center">
          <p className="font-mono text-sm text-inkDim">No pens yet.</p>
          <Link href="/pen/new" className="mt-4">
            <Button variant="primary">Create your first pen</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  )
}