// components/ui/Badge.tsx
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'mono inline-flex items-center gap-1.5 rounded-none border px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide',
  {
    variants: {
      variant: {
        live: 'border-quarkGreen text-quarkGreen [&>span]:bg-quarkGreen',
        info: 'border-quarkBlue text-quarkBlue [&>span]:bg-quarkBlue',
        error: 'border-quarkRed text-quarkRed [&>span]:bg-quarkRed',
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <span className="inline-block h-1.5 w-1.5 rounded-none" />
      {children}
    </div>
  )
}

export { Badge, badgeVariants }