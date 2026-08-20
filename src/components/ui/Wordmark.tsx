// components/ui/Wordmark.tsx
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface WordmarkProps {
  variant?: 'black' | 'white'
  className?: string
  width?: number
  height?: number
}

export function Wordmark({
  variant = 'white',
  className,
  width = 160,
  height = 40,
}: WordmarkProps) {
  const src =
    variant === 'black'
      ? '/wordmark/logo-wordmark-black.svg'
      : '/wordmark/logo-wordmark-white.svg'

  return (
    <Image
      src={src}
      alt="Quark"
      width={width}
      height={height}
      className={cn('block', className)}
      style={{ width: 'auto', height: 'auto' }}
      priority
    />
  )
}