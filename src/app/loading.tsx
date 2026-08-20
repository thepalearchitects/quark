// app/loading.tsx
'use client'

import { Loader } from '@/components/ui/Loader'
import { useEffect, useState } from 'react'

export default function Loading() {
  const [show] = useState(true)

  // Show loader after a tiny delay to prevent flashing on fast transitions
  // Then ensure it stays visible for at least 600ms for smooth UX
  useEffect(() => {
    const startTime = Date.now()
    
    // Ensure minimum display time of 600ms
    return () => {
      const elapsed = Date.now() - startTime
      if (elapsed < 600) {
        setTimeout(() => {}, 600 - elapsed)
      }
    }
  }, [])

  if (!show) return null

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-void">
      <Loader />
    </div>
  )
}