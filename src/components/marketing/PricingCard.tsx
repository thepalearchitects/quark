// components/marketing/PricingCard.tsx
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/utils'

interface PricingCardProps {
  title: string
  price: string
  description: string
  features: string[]
  cta: string
  ctaLink: string
  highlighted?: boolean
  className?: string
}

export function PricingCard({
  title,
  price,
  description,
  features,
  cta,
  ctaLink,
  highlighted = false,
  className,
}: PricingCardProps) {
  return (
    <div
      className={cn(
        'border border-line bg-surface p-6',
        highlighted && 'border-quarkBlue shadow-snap-blue',
        className
      )}
    >
      {/* Header */}
      <div className="mb-4">
        {highlighted && (
          <Badge variant="info" className="mb-3">
            Most popular
          </Badge>
        )}
        <h3 className="font-ui text-xl font-semibold text-ink">{title}</h3>
        <div className="mt-2 flex items-baseline gap-1">
          <span className="font-mono text-3xl font-bold text-ink">{price}</span>
          {price !== 'Free' && (
            <span className="font-mono text-sm text-inkDim">/ month</span>
          )}
        </div>
        <p className="mt-2 font-mono text-sm text-inkDim">{description}</p>
      </div>

      {/* Features */}
      <ul className="mb-6 space-y-2 border-t border-line pt-4">
        {features.map((feature, index) => (
          <li
            key={index}
            className="flex items-center gap-2 font-mono text-sm text-inkDim"
          >
            <span className="text-quarkGreen">✓</span>
            {feature}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a href={ctaLink}>
        <Button
          variant={highlighted ? 'primary' : 'secondary'}
          className="w-full min-h-[44px]"
        >
          {cta}
        </Button>
      </a>
    </div>
  )
}