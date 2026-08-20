// app/(auth)/reset-password/page.tsx
'use client'

import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import Link from 'next/link'
import { useState } from 'react'
import { useSignIn } from '@clerk/nextjs/legacy'
import { useSearchParams } from 'next/navigation'

export default function ResetPasswordPage() {
  const [code, setCode] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')
  const [isClerkEnabled] = useState(() => {
    const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
    return !!(publishableKey && publishableKey.startsWith('pk_'))
  })

  const { isLoaded, signIn, setActive } = useSignIn()
  const searchParams = useSearchParams()
  const email = searchParams.get('email') || ''

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (isClerkEnabled && !code.trim()) {
      setError('Please enter the verification code sent to your email')
      return
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setIsLoading(true)

    if (!isClerkEnabled) {
      // Mock flow if Clerk is disabled
      console.log('Mock password reset success')
      await new Promise((resolve) => setTimeout(resolve, 800))
      setIsLoading(false)
      setIsSuccess(true)
      return
    }

    if (!isLoaded) {
      setIsLoading(false)
      return
    }

    try {
      const result = await signIn.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code: code.trim(),
        password: password,
      })

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId })
        setIsSuccess(true)
      } else {
        setError('Status incomplete: ' + result.status)
      }
    } catch (err: unknown) {
      console.error('Clerk Reset Password Error:', err)
      const clerkError = err as { errors?: { longMessage?: string }[] }
      setError(clerkError.errors?.[0]?.longMessage || 'Failed to reset password. Please check your verification code.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="w-full space-y-6 text-center">
        <div className="text-quarkGreen text-4xl">✓</div>
        <h2 className="font-ui text-xl font-semibold text-ink">Password reset</h2>
        <p className="font-mono text-sm text-inkDim">
          Your password has been reset successfully.
        </p>
        <Link href="/dashboard">
          <Button variant="primary" className="w-full min-h-[48px]">
            Go to dashboard
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="font-ui text-2xl font-bold text-ink">Reset password</h2>
        <p className="mt-1 font-mono text-sm text-inkDim">
          Enter your new password below {email ? `for ${email}` : ''}.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="border border-quarkRed bg-quarkRed/10 p-3 text-xs font-mono text-quarkRed">
            {error}
          </div>
        )}

        {isClerkEnabled && (
          <div>
            <label
              htmlFor="code"
              className="block font-mono text-xs uppercase tracking-wider text-inkDim"
            >
              Verification code
            </label>
            <Input
              id="code"
              type="text"
              placeholder="123456"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="mt-1"
              required
            />
            <p className="mt-1 font-mono text-xs text-inkFaint">
              The 6-digit code sent to your email.
            </p>
          </div>
        )}

        <div>
          <label
            htmlFor="password"
            className="block font-mono text-xs uppercase tracking-wider text-inkDim"
          >
            New password
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

        <div>
          <label
            htmlFor="confirmPassword"
            className="block font-mono text-xs uppercase tracking-wider text-inkDim"
          >
            Confirm password
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

        <Button
          type="submit"
          variant="primary"
          className="w-full min-h-[48px]"
          disabled={isLoading}
        >
          {isLoading ? 'Resetting...' : 'Reset password'}
        </Button>
      </form>
    </div>
  )
}