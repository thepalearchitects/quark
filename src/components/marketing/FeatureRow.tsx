// components/marketing/FeatureRow.tsx
import { ReactNode } from 'react'

interface FeatureRowProps {
  title: string
  description: string
  children: ReactNode
  reversed?: boolean
}

export function FeatureRow({
  title,
  description,
  children,
  reversed = false,
}: FeatureRowProps) {
  return (
    <div className={`grid gap-8 md:grid-cols-2 md:gap-12 items-center ${reversed ? 'md:direction-rtl' : ''}`}>
      <div className={reversed ? 'md:order-2' : ''}>
        <h2 className="font-ui text-2xl font-bold text-ink md:text-3xl">
          {title}
        </h2>
        <p className="mt-3 font-mono text-sm text-inkDim md:text-base">
          {description}
        </p>
      </div>
      <div className={reversed ? 'md:order-1' : ''}>
        {children}
      </div>
    </div>
  )
}