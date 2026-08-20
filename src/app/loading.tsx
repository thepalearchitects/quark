// app/loading.tsx
'use client'

import { Loader } from '@/components/ui/Loader'
import { useEffect, useState } from 'react'

export default function Loading() {
  const [show] = useState(true)

  // prevent flashing on fast loads, keep it up for at least 600ms
  useEffect(() => {
    const startTime = Date.now()
    
    // bail out early if we haven't hit the minimum
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