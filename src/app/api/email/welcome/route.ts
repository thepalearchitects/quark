import { NextRequest, NextResponse } from 'next/server'
import { sendTransactionalEmail } from '@/lib/resend'
import { getWelcomeEmailHtml } from '@/emails/welcome'

export async function POST(request: NextRequest) {
  try {
    const { email, name } = await request.json()
    if (!email || !name) {
      return NextResponse.json({ error: 'Email and name are required' }, { status: 400 })
    }

    const html = getWelcomeEmailHtml(name)
    const result = await sendTransactionalEmail({
      to: email,
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
