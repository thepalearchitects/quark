// app/(auth)/sign-in/page.tsx
'use client'

import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import Link from 'next/link'
import { useState } from 'react'
import { useSignIn } from '@clerk/nextjs/legacy'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const { isLoaded, signIn, setActive } = useSignIn()
  const { isSignedIn, isLoaded: isUserLoaded } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (isUserLoaded && isSignedIn) {
      router.push('/dashboard')
    }
  }, [isUserLoaded, isSignedIn, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
    const isClerkEnabled = publishableKey && publishableKey.startsWith('pk_')

    if (!isClerkEnabled) {
      // Mock login fallback if Clerk keys are missing
      console.log('Mock Sign In (Clerk disabled):', { email })
      await new Promise((resolve) => setTimeout(resolve, 800))
      setIsLoading(false)
      router.push('/dashboard')
      return
    }

    if (!isLoaded) {
      setIsLoading(false)
      return
    }

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      })

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId })
        router.push('/dashboard')
      } else {
        setError('Sign in status incomplete: ' + result.status)
      }
    } catch (err: unknown) {
      console.error('Clerk Sign In Error:', err)
      const clerkError = err as { errors?: { code?: string; longMessage?: string }[]; message?: string }
      if (clerkError.errors?.[0]?.code === 'session_exists' || clerkError.message?.includes('already signed in')) {
        router.push('/dashboard')
        return
      }
      setError(clerkError.errors?.[0]?.longMessage || 'Invalid email or password.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="font-ui text-2xl font-bold text-ink">Sign in</h2>
        <p className="mt-1 font-mono text-sm text-inkDim">
          Welcome back — explain it to the duck.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="border border-quarkRed bg-quarkRed/10 p-3 text-xs font-mono text-quarkRed">
            {error}
          </div>
        )}

        <div>
          <label
            htmlFor="email"
            className="block font-mono text-xs uppercase tracking-wider text-inkDim"
          >
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1"
            required
          />
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block font-mono text-xs uppercase tracking-wider text-inkDim"
            >
              Password
            </label>
            <Link
              href="/forgot-password"
              className="font-mono text-xs text-inkFaint hover:text-quarkBlue transition-colors"
            >
              Forgot?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1"
            required
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          className="w-full min-h-[48px]"
          disabled={isLoading}
        >
          {isLoading ? 'Signing in...' : 'Sign in'}
        </Button>
      </form>

      <p className="mt-6 text-center font-mono text-sm text-inkDim">
        Don&apos;t have an account?{' '}
        <Link href="/sign-up" className="text-quarkBlue hover:underline">
          Create one
        </Link>
      </p>
    </div>
  )
}