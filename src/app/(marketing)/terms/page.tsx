// app/(marketing)/terms/page.tsx
import Link from 'next/link'

export default async function TermsPage() {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 md:px-8 md:py-24">
      <div className="border border-line bg-surface p-8 shadow-snap-blue">
        <h1 className="font-ui text-3xl font-bold text-ink md:text-4xl">Terms of Service</h1>
        <p className="mt-2 font-mono text-sm text-inkDim">Last updated: August 2026</p>

        <div className="mt-8 space-y-6 font-mono text-sm leading-relaxed text-inkDim">
          <p>
            By using Quark, you agree to these terms. If you don&apos;t agree, don&apos;t use Quark. Simple.
          </p>

          <div>
            <h2 className="font-ui text-lg font-semibold text-ink">1. Your Content</h2>
            <p>
              You own everything you create. We don&apos;t claim ownership of your code, design, or
              intellectual property. You&apos;re responsible for what you publish.
            </p>
          </div>

          <div>
            <h2 className="font-ui text-lg font-semibold text-ink">2. Public Pens</h2>
            <p>
              When you publish a pen as public, anyone can view it, fork it, and share it. That&apos;s
              the whole point. If you don&apos;t want that, keep it private.
            </p>
          </div>

          <div>
            <h2 className="font-ui text-lg font-semibold text-ink">3. Acceptable Use</h2>
            <p>
              Don&apos;t use Quark for anything illegal, harmful, or malicious. Don&apos;t spam, don&apos;t
              impersonate, don&apos;t try to break the platform.
            </p>
          </div>

          <div>
            <h2 className="font-ui text-lg font-semibold text-ink">4. Termination</h2>
            <p>
              We reserve the right to suspend or terminate your account if you violate these terms.
              We&apos;ll give you notice first unless it&apos;s urgent.
            </p>
          </div>

          <div>
            <h2 className="font-ui text-lg font-semibold text-ink">5. Changes</h2>
            <p>
              We may update these terms from time to time. We&apos;ll notify you of significant changes.
              Your continued use means you accept the updated terms.
            </p>
          </div>

          <div>
            <h2 className="font-ui text-lg font-semibold text-ink">6. Contact</h2>
            <p>
              Questions?{' '}
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