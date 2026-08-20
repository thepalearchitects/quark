// app/sign-out/page.tsx
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Loader } from '@/components/ui/Loader'
import { useClerk } from '@clerk/nextjs'

export default function SignOutPage() {
  const router = useRouter()
  const { signOut } = useClerk()

  useEffect(() => {
    const performSignOut = async () => {
      console.log('Signing out...')
      try {
        const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
        const isClerkEnabled = publishableKey && publishableKey.startsWith('pk_')
        if (isClerkEnabled) {
          await signOut()
        } else {
          // Simulate latency in mock dev mode
          await new Promise((resolve) => setTimeout(resolve, 800))
        }
      } catch (err) {
        console.error('Clerk sign-out error:', err)
      } finally {
        router.push('/')
      }
    }
    performSignOut()
  }, [signOut, router])

  return (
    <div className="flex min-h-screen items-center justify-center bg-void">
      <div className="text-center">
        <Loader />
        <p className="mt-4 font-mono text-sm text-inkDim">Signing out...</p>
      </div>
    </div>
  )
}