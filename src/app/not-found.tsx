// app/not-found.tsx
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <section className="relative flex min-h-[calc(100vh-80px)] flex-col items-center justify-center overflow-hidden px-4 text-center md:px-8">
      <Image
        src="/wordmark/icon-only-white.svg"
        alt=""
        aria-hidden
        width={520}
        height={520}
        priority
        className="pointer-events-none absolute left-1/2 top-1/2 max-w-none -translate-x-1/2 -translate-y-1/2 opacity-[0.06]"
      />

      <span className="relative font-mono text-[13px] uppercase tracking-wider text-quarkRed">
        404 / not found
      </span>

      <h1 className="relative mt-4 font-ui text-4xl font-bold leading-tight tracking-tight text-ink md:text-5xl">
        This pen doesn&apos;t exist.
      </h1>

      <p className="relative mt-4 max-w-sm font-mono text-sm leading-relaxed text-inkDim">
        It was deleted, never published, or you followed a broken link.
        The duck can&apos;t fix this one.
      </p>

      <div className="relative mt-9 flex flex-wrap justify-center gap-4">
        <Link href="/dashboard">
          <Button variant="primary" className="min-h-[48px] px-8 text-base">
            Back to dashboard
          </Button>
        </Link>
        <Link href="/explore">
          <Button variant="secondary" className="min-h-[48px] px-8 text-base">
            Explore pens
          </Button>
        </Link>
      </div>

      <div className="relative mt-14 flex items-center gap-2 border-t border-line pt-6 font-mono text-[11px] uppercase tracking-wider text-inkFaint">
        <span className="inline-block h-1.5 w-1.5 bg-quarkRed" />
        error · nothing was saved
      </div>
    </section>
  )
}