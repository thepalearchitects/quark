// components/ui/Input.tsx
import * as React from 'react'
import { cn } from '@/lib/utils'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'mono flex w-full rounded-none border border-line bg-surface2 px-3 py-2.5 text-sm text-ink placeholder:text-inkFaint focus:border-quarkBlue focus:shadow-snap-blue focus:outline-none transition-shadow transition-transform duration-75 ease-none disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

export { Input }