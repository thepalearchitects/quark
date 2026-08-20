// components/ui/Logo.tsx
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface LogoProps {
  variant?: 'black' | 'white'
  className?: string
  width?: number
  height?: number
}

export function Logo({
  variant = 'white',
  className,
  width = 40,
  height = 40,
}: LogoProps) {
  const src =
    variant === 'black'
      ? '/wordmark/icon-only-black.svg'
      : '/wordmark/icon-only-white.svg'

  return (
    <Image
      src={src}
      alt="Quark — code editor"
      width={width}
      height={height}
      className={cn('block', className)}
      priority
    />
  )
}