// app/(marketing)/privacy/page.tsx
import Link from 'next/link'

export default async function PrivacyPage() {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 md:px-8 md:py-24">
      <div className="border border-line bg-surface p-8 shadow-snap-blue">
        <h1 className="font-ui text-3xl font-bold text-ink md:text-4xl">Privacy Policy</h1>
        <p className="mt-2 font-mono text-sm text-inkDim">Last updated: August 2026</p>

        <div className="mt-8 space-y-6 font-mono text-sm leading-relaxed text-inkDim">
          <p>
            We take your privacy seriously. Here&apos;s what we collect and why.
          </p>

          <div>
            <h2 className="font-ui text-lg font-semibold text-ink">1. What We Collect</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Email address — to create your account and send notifications</li>
              <li>Username — to identify you across the platform</li>
              <li>Your code — the pens you create (private or public)</li>
              <li>Usage data — to improve the platform</li>
            </ul>
          </div>

          <div>
            <h2 className="font-ui text-lg font-semibold text-ink">2. How We Use Your Data</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>To provide and maintain the platform</li>
              <li>To send you important updates (security, billing, etc.)</li>
              <li>To improve the product based on usage patterns</li>
              <li>We do NOT sell your data to anyone</li>
            </ul>
          </div>

          <div>
            <h2 className="font-ui text-lg font-semibold text-ink">3. Your Code</h2>
            <p>
              Your code belongs to you. We store it securely and only use it to provide the
              service. We never share your private code with anyone.
            </p>
          </div>

          <div>
            <h2 className="font-ui text-lg font-semibold text-ink">4. Cookies</h2>
            <p>
              We use cookies to keep you signed in and remember your preferences. You can disable
              cookies in your browser, but some features may not work.
            </p>
          </div>

          <div>
            <h2 className="font-ui text-lg font-semibold text-ink">5. Data Deletion</h2>
            <p>
              You can delete your account at any time. We&apos;ll remove all your data within 30 days,
              except where required by law.
            </p>
          </div>

          <div>
            <h2 className="font-ui text-lg font-semibold text-ink">6. Contact</h2>
            <p>
              Privacy questions?{' '}
              <Link href="/docs/contact" className="text-quarkBlue hover:underline">
                Contact us
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}