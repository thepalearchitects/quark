// app/(auth)/sign-up/page.tsx
'use client'

import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import Link from 'next/link'
import { useState } from 'react'
import { useSignUp } from '@clerk/nextjs/legacy'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function SignUpPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const { isLoaded, signUp } = useSignUp()
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
      // Fallback for mock registration if Clerk keys are missing
      console.log('Mock Sign Up (Clerk disabled):', { email, username })
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
      await signUp.create({
        emailAddress: email,
        password,
      })

      // Send verification code
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      // Go to verify page
      router.push('/verify')
    } catch (err: unknown) {
      console.error('Clerk Sign Up Error:', err)
      const clerkError = err as { errors?: { code?: string; longMessage?: string }[]; message?: string }
      if (clerkError.errors?.[0]?.code === 'session_exists' || clerkError.message?.includes('already signed in')) {
        router.push('/dashboard')
        return
      }
      setError(clerkError.errors?.[0]?.longMessage || 'Registration failed. Please check your inputs.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="font-ui text-2xl font-bold text-ink">Create account</h2>
        <p className="mt-1 font-mono text-sm text-inkDim">
          Start shipping to the web.
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
            htmlFor="username"
            className="block font-mono text-xs uppercase tracking-wider text-inkDim"
          >
            Username
          </label>
          <Input
            id="username"
            type="text"
            placeholder="maou"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1"
            required
          />
        </div>

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
          <label
            htmlFor="password"
            className="block font-mono text-xs uppercase tracking-wider text-inkDim"
          >
            Password
          </label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1"
            required
            minLength={8}
          />
          <p className="mt-1 font-mono text-xs text-inkFaint">
            At least 8 characters.
          </p>
        </div>

        <div id="clerk-captcha" className="mt-2" />

        <Button
          type="submit"
          variant="primary"
          className="w-full min-h-[48px]"
          disabled={isLoading}
        >
          {isLoading ? 'Creating account...' : 'Create account'}
        </Button>
      </form>

      <p className="mt-6 text-center font-mono text-sm text-inkDim">
        Already have an account?{' '}
        <Link href="/sign-in" className="text-quarkBlue hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  )
}