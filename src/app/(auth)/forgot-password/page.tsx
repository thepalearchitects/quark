// app/(auth)/forgot-password/page.tsx
'use client'

import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import Link from 'next/link'
import { useState } from 'react'
import { useSignIn } from '@clerk/nextjs/legacy'
import { useRouter } from 'next/navigation'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSent, setIsSent] = useState(false)
  const [error, setError] = useState('')

  const { isLoaded, signIn } = useSignIn()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email) {
      setError('Please enter your email address')
      return
    }

    setIsLoading(true)

    const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
    const isClerkEnabled = publishableKey && publishableKey.startsWith('pk_')

    if (!isClerkEnabled) {
      // Mock flow if Clerk is disabled
      console.log('Mock password reset requested for:', email)
      await new Promise((resolve) => setTimeout(resolve, 800))
      setIsLoading(false)
      setIsSent(true)
      return
    }

    if (!isLoaded) {
      setIsLoading(false)
      return
    }

    try {
      await signIn.create({
        strategy: 'reset_password_email_code',
        identifier: email,
      })
      // Redirect to reset password with email in query parameter
      router.push(`/reset-password?email=${encodeURIComponent(email)}`)
    } catch (err: unknown) {
      console.error('Clerk Forgot Password Error:', err)
      const clerkError = err as { errors?: { longMessage?: string }[] }
      setError(clerkError.errors?.[0]?.longMessage || 'Failed to send reset code.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSent) {
    return (
      <div className="w-full space-y-6 text-center">
        <div className="text-quarkGreen text-4xl">✓</div>
        <h2 className="font-ui text-xl font-semibold text-ink">Check your email</h2>
        <p className="font-mono text-sm text-inkDim">
          If an account exists for <strong className="text-ink">{email}</strong>,
          you&apos;ll receive a password reset link shortly.
        </p>
        <div className="space-y-2">
          <Link href="/sign-in">
            <Button variant="primary" className="w-full min-h-[48px]">
              Back to sign in
            </Button>
          </Link>
          <button
            type="button"
            onClick={() => {
              setIsSent(false)
              setEmail('')
            }}
            className="font-mono text-sm text-quarkBlue hover:underline"
          >
            Try a different email
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="font-ui text-2xl font-bold text-ink">Forgot password</h2>
        <p className="mt-1 font-mono text-sm text-inkDim">
          Enter your email and we&apos;ll send you a reset link.
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

        <Button
          type="submit"
          variant="primary"
          className="w-full min-h-[48px]"
          disabled={isLoading}
        >
          {isLoading ? 'Sending...' : 'Send reset link'}
        </Button>

        <p className="text-center font-mono text-sm text-inkDim">
          Remember your password?{' '}
          <Link href="/sign-in" className="text-quarkBlue hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  )
}