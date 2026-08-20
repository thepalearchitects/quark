// components/ui/Avatar.tsx
'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'
import { useState, useRef } from 'react'

interface AvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  src?: string | null
  onImageChange?: (file: File) => void
}

const sizeMap = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-14 h-14',
  xl: 'w-20 h-20',
}

export function Avatar({ size = 'md', className, src, onImageChange }: AvatarProps) {
  const [imageSrc, setImageSrc] = useState<string | null>(src || null)
  const [isHovered, setIsHovered] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const result = event.target?.result as string
      setImageSrc(result)
      onImageChange?.(file)
    }
    reader.readAsDataURL(file)
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="relative">
      <div
        className={cn(
          'relative overflow-hidden border border-line bg-void flex items-center justify-center cursor-pointer transition-all duration-200',
          sizeMap[size],
          isHovered && 'border-quarkBlue shadow-snap-blue',
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
      >
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt="Avatar"
            fill
            unoptimized
            className="object-cover"
          />
        ) : (
          <Image
            src="/wordmark/icon-only-white.svg"
            alt="Default avatar"
            width={size === 'xl' ? 48 : size === 'lg' ? 32 : size === 'md' ? 24 : 18}
            height={size === 'xl' ? 48 : size === 'lg' ? 32 : size === 'md' ? 24 : 18}
            className="object-contain opacity-80"
          />
        )}

        {/* Hover overlay */}
        {isHovered && (
          <div className="absolute inset-0 flex items-center justify-center bg-void/70">
            <span className="font-mono text-[10px] uppercase tracking-wider text-ink">
              Change
            </span>
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  )
}