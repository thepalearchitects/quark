// components/marketing/Nav.tsx
'use client'

import { Wordmark } from '@/components/ui/Wordmark'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { useState } from 'react'

export function Nav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 border-b border-line bg-void/90 backdrop-blur-md px-4 py-3 md:px-8">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Wordmark variant="white" width={120} height={32} />
        </Link>

        <div className="hidden items-center gap-6 font-mono text-sm text-inkDim md:flex">
          <Link href="/explore" className="hover:text-ink transition-colors">
            Explore
          </Link>
          <Link href="/pricing" className="hover:text-ink transition-colors">
            Pricing
          </Link>
          <Link href="/docs" className="hover:text-ink transition-colors">
            Docs
          </Link>
          <Link href="/sign-in">
            <Button variant="secondary" className="min-h-[36px] px-4 text-xs">
              Sign in
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button variant="primary" className="min-h-[36px] px-4 text-xs">
              Get started
            </Button>
          </Link>
        </div>

        <button
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block h-0.5 w-6 bg-ink transition-all ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
          <span className={`block h-0.5 w-6 bg-ink transition-all ${isOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-6 bg-ink transition-all ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
        </button>
      </div>

      {isOpen && (
        <div className="mt-4 flex flex-col gap-4 border-t border-line pt-4 font-mono text-sm text-inkDim md:hidden">
          <Link href="/explore" className="hover:text-ink transition-colors">
            Explore
          </Link>
          <Link href="/pricing" className="hover:text-ink transition-colors">
            Pricing
          </Link>
          <Link href="/docs" className="hover:text-ink transition-colors">
            Docs
          </Link>
          <div className="flex flex-col gap-3 pt-2">
            <Link href="/sign-in">
              <Button variant="secondary" className="w-full min-h-[44px]">
                Sign in
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button variant="primary" className="w-full min-h-[44px]">
                Get started
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}