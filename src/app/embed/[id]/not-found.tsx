// app/embed/[id]/not-found.tsx
import Link from 'next/link'
import { Logo } from '@/components/ui/Logo'

export default function EmbedNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-void px-4 text-center">
      <Logo variant="white" width={64} height={64} />
      <h1 className="mt-6 font-ui text-2xl font-bold text-ink">Pen not found</h1>
      <p className="mt-2 max-w-md font-mono text-sm text-inkDim">
        This pen doesn&apos;t exist, was deleted, or you followed a broken link.
        The duck can&apos;t fix this one.
      </p>
      <div className="mt-6 flex gap-4">
        <Link href="/explore">
          <button className="border border-quarkBlue px-4 py-2 font-mono text-sm text-quarkBlue hover:bg-quarkBlue hover:text-void transition-colors">
            Explore pens
          </button>
        </Link>
        <Link href="/">
          <button className="border border-line px-4 py-2 font-mono text-sm text-inkDim hover:text-ink hover:border-ink transition-colors">
            Go home
          </button>
        </Link>
      </div>
      <div className="mt-8 flex items-center gap-2 border-t border-line pt-4 font-mono text-xs text-inkFaint">
        <span className="inline-block h-1.5 w-1.5 bg-quarkRed" />
        error · nothing was saved
      </div>
    </div>
  )
}