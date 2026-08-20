// app/(app)/dashboard/loading.tsx
import { Loader } from '@/components/ui/Loader'

export default function Loading() {
  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-void">
      <Loader />
    </div>
  )
}