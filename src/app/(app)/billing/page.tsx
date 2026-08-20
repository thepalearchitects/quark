// app/(app)/billing/page.tsx
'use client'

import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import Link from 'next/link'

export default function BillingPage() {

  return (
    <div className="max-w-3xl space-y-10">
      {/* Header */}
      <div className="border-b border-line pb-4">
        <h1 className="font-ui text-2xl font-bold text-ink">Billing</h1>
        <p className="font-mono text-sm text-inkDim">
          Manage your subscription and payment methods.
        </p>
      </div>

      {/* Current Plan */}
      <section>
        <div className="mb-4 flex items-center gap-4">
          <span className="font-mono text-xs uppercase tracking-wider text-quarkBlue">
            Current Plan
          </span>
          <span className="flex-1 border-t border-line" />
        </div>

        <div className="border border-line bg-surface p-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-ui text-lg font-semibold text-ink">Free</h3>
                <Badge variant="info">Active</Badge>
              </div>
              <p className="mt-1 font-mono text-sm text-inkDim">$0 / month</p>
              <ul className="mt-4 space-y-1 font-mono text-sm text-inkDim">
                <li>• 3 published pens at a time</li>
                <li>• 10 files per project</li>
                <li>• 500KB per file</li>
                <li>• Unlimited private/draft pens</li>
              </ul>
            </div>
            <Link href="/pricing">
              <Button variant="primary" className="min-h-[40px]">
                Upgrade to Pro
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Payment Method */}
      <section>
        <div className="mb-4 flex items-center gap-4">
          <span className="font-mono text-xs uppercase tracking-wider text-quarkBlue">
            Payment Method
          </span>
          <span className="flex-1 border-t border-line" />
        </div>

        <div className="border border-line bg-surface p-6">
          <p className="font-mono text-sm text-inkDim">
            No payment method on file.
          </p>
          <Button
            variant="secondary"
            className="mt-4 min-h-[40px]"
            disabled
          >
            Add payment method
          </Button>
          <p className="mt-2 font-mono text-xs text-inkFaint">
            You&apos;ll need a payment method to upgrade to Pro.
          </p>
        </div>
      </section>

      {/* Billing History */}
      <section>
        <div className="mb-4 flex items-center gap-4">
          <span className="font-mono text-xs uppercase tracking-wider text-quarkBlue">
            Billing History
          </span>
          <span className="flex-1 border-t border-line" />
        </div>

        <div className="border border-line bg-surface p-6">
          <p className="font-mono text-sm text-inkDim">No invoices yet.</p>
          <p className="mt-1 font-mono text-xs text-inkFaint">
            Invoices will appear here once you upgrade.
          </p>
        </div>
      </section>

      {/* Cancel Subscription */}
      <section>
        <div className="mb-4 flex items-center gap-4">
          <span className="font-mono text-xs uppercase tracking-wider text-quarkRed">
            Cancel Subscription
          </span>
          <span className="flex-1 border-t border-line" />
        </div>

        <div className="border border-quarkRed bg-surface p-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-ui text-lg font-semibold text-quarkRed">
                Cancel Pro
              </h3>
              <p className="mt-1 font-mono text-sm text-inkDim">
                You are currently on the Free plan. No active subscription to
                cancel.
              </p>
            </div>
            <Button
              variant="destructive"
              className="min-h-[40px]"
              disabled
            >
              Cancel subscription
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}