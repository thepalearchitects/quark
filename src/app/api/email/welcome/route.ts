import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { sendTransactionalEmail } from '@/lib/resend'
import { getWelcomeEmailHtml } from '@/emails/welcome'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: NextRequest) {
  try {
    // Auth Check: If Clerk keys are configured, enforce authentication
    const hasClerkKey =
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.startsWith('pk_')

    if (hasClerkKey) {
      const { userId } = await auth()
      if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
    }

    const body = await request.json()
    const { email, name } = body || {}

    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: 'Invalid or missing email address' }, { status: 400 })
    }

    if (!name || typeof name !== 'string' || name.trim().length === 0 || name.length > 100) {
      return NextResponse.json({ error: 'Invalid or missing name parameter' }, { status: 400 })
    }

    const sanitizedName = name.trim()
    const html = getWelcomeEmailHtml(sanitizedName)
    const result = await sendTransactionalEmail({
      to: email.trim(),
      subject: 'Welcome to Quark!',
      html,
    })

    return NextResponse.json(result)
  } catch (error: unknown) {
    console.error('Welcome email API error:', error)
    const err = error as { message?: string }
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 })
  }
}
