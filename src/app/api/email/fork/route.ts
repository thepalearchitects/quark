import { NextRequest, NextResponse } from 'next/server'
import { sendTransactionalEmail } from '@/lib/resend'
import { getForkNotificationEmailHtml } from '@/emails/fork-notification'

export async function POST(request: NextRequest) {
  try {
    const { ownerEmail, ownerName, forkerName, penTitle, penUrl } = await request.json()
    if (!ownerEmail || !ownerName || !forkerName || !penTitle || !penUrl) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 })
    }

    const html = getForkNotificationEmailHtml(ownerName, forkerName, penTitle, penUrl)
    const result = await sendTransactionalEmail({
      to: ownerEmail,
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
