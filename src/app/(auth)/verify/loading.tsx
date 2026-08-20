// app/(auth)/verify/loading.tsx
import { Loader } from '@/components/ui/Loader'

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-void">
      <Loader />
    </div>
  )
}