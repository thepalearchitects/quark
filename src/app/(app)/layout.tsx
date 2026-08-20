// app/(app)/layout.tsx
'use client'

import { useEffect } from 'react'
import { useProjectStore } from '@/lib/store/projectStore'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Logo } from '@/components/ui/Logo'

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Load mock projects when the app mounts
  useEffect(() => {
    useProjectStore.getState().loadProjects()
  }, [])

  return (
    <div className="min-h-screen bg-void">
      {/* App Top Bar */}
      <header className="sticky top-0 z-50 border-b border-line bg-void/90 backdrop-blur-md px-4 py-3 md:px-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
          {/* Left — Logo */}
          <Link href="/dashboard" className="flex items-center gap-2 flex-shrink-0">
            <Logo variant="white" width={28} height={28} />
            <span className="font-mono text-sm font-bold text-ink">Quark</span>
          </Link>

          {/* Right — Navigation */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <Link href="/dashboard">
              <Button variant="secondary" className="min-h-[36px] px-3 text-xs sm:px-4">
                Dashboard
              </Button>
            </Link>
            <Link href="/billing">
              <Button variant="secondary" className="min-h-[36px] px-3 text-xs sm:px-4">
                Billing
              </Button>
            </Link>
            <Link href="/settings">
              <Button variant="secondary" className="min-h-[36px] px-3 text-xs sm:px-4">
                Settings
              </Button>
            </Link>
            <Link href="/sign-out">
              <Button variant="destructive" className="min-h-[36px] px-3 text-xs sm:px-4">
                Sign out
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 md:px-8">
        {children}
      </main>
    </div>
  )
}