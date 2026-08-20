// app/(marketing)/pricing/page.tsx
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

const tiers = [
  {
    name: 'Hobby',
    price: '$0',
    description: 'For getting started and experimenting.',
    features: [
      'Unlimited private/draft pens',
      '3 published pens at a time',
      '10 files per project',
      '500KB per file',
      '5MB storage per project',
      'Community support',
    ],
    cta: 'Get started',
    ctaLink: '/sign-up',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$12',
    description: 'For serious creators who publish regularly.',
    features: [
      'Unlimited published pens',
      '50 files per project',
      '2MB per file',
      '50MB storage per project',
      'Priority support',
      'Custom domain support',
    ],
    cta: 'Upgrade now',
    ctaLink: '/sign-up',
    highlighted: true,
  },
  {
    name: 'Team',
    price: '$29',
    description: 'For teams collaborating on projects.',
    features: [
      'Everything in Pro',
      'Unlimited team members',
      'Shared project folders',
      'Team analytics',
      'SSO (SAML/OIDC)',
      'Dedicated account manager',
    ],
    cta: 'Start team trial',
    ctaLink: '/sign-up',
    highlighted: false,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large organizations with custom needs.',
    features: [
      'Everything in Team',
      'Custom contract & pricing',
      'On-premise deployment',
      '24/7 support',
      'SLA guarantee',
      'Custom integrations',
    ],
    cta: 'Contact sales',
    ctaLink: '/contact-sales',
    highlighted: false,
  },
]

export default async function PricingPage() {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return (
    <div className="px-4 py-16 md:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center">
          <span className="font-mono text-xs uppercase tracking-wider text-quarkBlue">
            Pricing
          </span>
          <h1 className="mt-3 font-ui text-3xl font-bold text-ink md:text-4xl">
            Simple, usage-based pricing
          </h1>
          <p className="mx-auto mt-3 max-w-xl font-mono text-sm text-inkDim">
            Free to start. Pay only for what you publish. No feature gating.
          </p>
        </div>

        {/* Pricing Grid — 4 Tiers */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`border bg-surface p-6 ${
                tier.highlighted
                  ? 'border-quarkBlue shadow-snap-blue'
                  : 'border-line'
              }`}
            >
              {/* Most popular badge */}
              {tier.highlighted && (
                <Badge variant="info" className="mb-3">
                  Most popular
                </Badge>
              )}

              {/* Name */}
              <h3 className="font-ui text-xl font-semibold text-ink">
                {tier.name}
              </h3>

              {/* Price */}
              <div className="mt-2 flex items-baseline gap-1">
                <span className="font-mono text-3xl font-bold text-ink">
                  {tier.price}
                </span>
                {tier.price !== 'Custom' && tier.price !== '$0' && (
                  <span className="font-mono text-sm text-inkDim">/ month</span>
                )}
              </div>

              {/* Description */}
              <p className="mt-2 font-mono text-sm text-inkDim">
                {tier.description}
              </p>

              {/* Features */}
              <ul className="mt-6 space-y-2 border-t border-line pt-4">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 font-mono text-sm text-inkDim"
                  >
                    <span className="text-quarkGreen mt-0.5">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link href={tier.ctaLink} className="mt-6 block">
                <Button
                  variant={tier.highlighted ? 'primary' : 'secondary'}
                  className="w-full min-h-[44px]"
                >
                  {tier.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>

        {/* Fine Print */}
        <p className="mt-8 text-center font-mono text-xs text-inkFaint">
          No hidden fees. Cancel anytime. All prices in USD.
        </p>

        {/* FAQ Link */}
        <div className="mt-12 border-t border-line pt-8 text-center">
          <p className="font-mono text-sm text-inkDim">
            Questions?{' '}
            <Link href="/docs" className="text-quarkBlue hover:underline">
              Check the docs
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}