// app/(auth)/verify/page.tsx
'use client'

import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useState, useRef } from 'react'
import Link from 'next/link'
import { useSignUp } from '@clerk/nextjs/legacy'
import { useRouter } from 'next/navigation'

export default function VerifyPage() {
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return
    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }

    if (error) setError('')
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const fullCode = code.join('')
    if (fullCode.length !== 6) {
      setError('Please enter all 6 digits')
      return
    }
    setIsLoading(true)
    setError('')

    const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
    const isClerkEnabled = publishableKey && publishableKey.startsWith('pk_')

    if (!isClerkEnabled) {
      // Fallback for mock verification
      console.log('Mock Verification (Clerk disabled):', fullCode)
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
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: fullCode,
      })

      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId })

        // Trigger Welcome Email on successful sign up
        fetch('/api/email/welcome', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: completeSignUp.emailAddress,
            name: completeSignUp.username || 'Quark Developer',
          }),
        }).catch((err) => console.error('Failed to send welcome email:', err))

        router.push('/dashboard')
      } else {
        setError('Verification status incomplete: ' + completeSignUp.status)
      }
    } catch (err: unknown) {
      console.error('Clerk Verification Error:', err)
      const clerkError = err as { errors?: { longMessage?: string }[] }
      setError(clerkError.errors?.[0]?.longMessage || 'Invalid verification code.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleResend = async () => {
    const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
    const isClerkEnabled = publishableKey && publishableKey.startsWith('pk_')

    if (!isClerkEnabled) {
      console.log('Mock resend code...')
      return
    }

    if (!isLoaded) return

    try {
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
      console.log('Code resent successfully')
    } catch (err: unknown) {
      console.error('Resend error:', err)
      const clerkError = err as { errors?: { longMessage?: string }[] }
      setError(clerkError.errors?.[0]?.longMessage || 'Failed to resend code.')
    }
  }

  return (
    <div className="w-full">
      <div className="mb-8 text-center">
        <h2 className="font-ui text-2xl font-bold text-ink">Verify your email</h2>
        <p className="mt-1 font-mono text-sm text-inkDim">
          Enter the 6-digit code sent to your email.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-center gap-2">
          {code.map((digit, index) => (
            <Input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el
              }}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="h-14 w-12 text-center font-mono text-xl font-bold [&::-webkit-inner-spin-button]:appearance-none"
              inputMode="numeric"
              pattern="[0-9]*"
              autoFocus={index === 0}
            />
          ))}
        </div>

        {error && (
          <p className="text-center font-mono text-sm text-quarkRed">{error}</p>
        )}

        <Button
          type="submit"
          variant="primary"
          className="w-full min-h-[48px]"
          disabled={isLoading}
        >
          {isLoading ? 'Verifying...' : 'Verify email'}
        </Button>

        <div className="text-center">
          <button
            type="button"
            onClick={handleResend}
            className="font-mono text-sm text-inkFaint hover:text-quarkBlue transition-colors"
          >
            Resend code
          </button>
        </div>

        <p className="text-center font-mono text-xs text-inkFaint">
          Wrong email?{' '}
          <Link href="/sign-up" className="text-quarkBlue hover:underline">
            Try again
          </Link>
        </p>
      </form>
    </div>
  )
}