// app/error.tsx
'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Logo } from '@/components/ui/Logo'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to console
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-void px-4 text-center">
      <Logo variant="white" width={64} height={64} />
      <h1 className="mt-6 font-ui text-2xl font-bold text-ink">Something went wrong</h1>
      <p className="mt-2 max-w-md font-mono text-sm text-inkDim">
        The duck encountered an error. Please try again or contact support if
        the problem persists.
      </p>
      <div className="mt-6 flex gap-4">
        <Button variant="primary" onClick={reset}>
          Try again
        </Button>
        <Link href="/">
          <Button variant="secondary">Go home</Button>
        </Link>
      </div>
      <div className="mt-8 flex items-center gap-2 border-t border-line pt-4 font-mono text-xs text-inkFaint">
        <span className="inline-block h-1.5 w-1.5 bg-quarkRed" />
        error · {error.message || 'unknown error'}
      </div>
    </div>
  )
}