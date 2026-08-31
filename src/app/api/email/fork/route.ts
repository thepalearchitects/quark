import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { sendTransactionalEmail } from '@/lib/resend'
import { getForkNotificationEmailHtml } from '@/emails/fork-notification'

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
    const { ownerEmail, ownerName, forkerName, penTitle, penUrl } = body || {}

    if (!ownerEmail || typeof ownerEmail !== 'string' || !EMAIL_REGEX.test(ownerEmail)) {
      return NextResponse.json({ error: 'Invalid or missing owner email address' }, { status: 400 })
    }

    if (!ownerName || typeof ownerName !== 'string' || ownerName.trim().length === 0 || ownerName.length > 100) {
      return NextResponse.json({ error: 'Invalid or missing ownerName parameter' }, { status: 400 })
    }

    if (!forkerName || typeof forkerName !== 'string' || forkerName.trim().length === 0 || forkerName.length > 100) {
      return NextResponse.json({ error: 'Invalid or missing forkerName parameter' }, { status: 400 })
    }

    if (!penTitle || typeof penTitle !== 'string' || penTitle.trim().length === 0 || penTitle.length > 150) {
      return NextResponse.json({ error: 'Invalid or missing penTitle parameter' }, { status: 400 })
    }

    if (!penUrl || typeof penUrl !== 'string' || penUrl.trim().length === 0 || penUrl.length > 500) {
      return NextResponse.json({ error: 'Invalid or missing penUrl parameter' }, { status: 400 })
    }

    const html = getForkNotificationEmailHtml(
      ownerName.trim(),
      forkerName.trim(),
      penTitle.trim(),
      penUrl.trim()
    )

    const result = await sendTransactionalEmail({
      to: ownerEmail.trim(),
      subject: 'Quark Pen Fork Notification',
      html,
    })

    return NextResponse.json(result)
  } catch (error: unknown) {
    console.error('Fork email API error:', error)
    const err = error as { message?: string }
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 })
  }
}
