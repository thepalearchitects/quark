// components/ui/Button.tsx
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'mono inline-flex items-center justify-center gap-2 border text-sm font-medium transition-transform transition-shadow duration-75 ease-none disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] px-5 py-2.5',
  {
    variants: {
      variant: {
        primary: 'bg-ink text-void border-ink hover:shadow-snap-hover-blue hover:-translate-x-1 hover:-translate-y-1',
        secondary: 'bg-transparent text-ink border-line hover:border-ink',
        destructive: 'bg-transparent text-quarkRed border-quarkRed hover:shadow-snap-hover-red hover:-translate-x-1 hover:-translate-y-1',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export function Button({ className, variant, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant }), className)}
      {...props}
    />
  )
}

Button.displayName = 'Button'