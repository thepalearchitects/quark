// app/(auth)/layout.tsx
import { Logo } from '@/components/ui/Logo'
import Link from 'next/link'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      {/* Left — Brand / SVG */}
      <div className="relative hidden flex-col items-center justify-center border-r border-line bg-void p-12 lg:flex">
        {/* Background duck watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.04]">
          <Logo variant="white" width={320} height={320} />
        </div>

        <div className="relative z-10 max-w-md text-center">
          <div className="flex justify-center mb-6">
            <Logo variant="white" width={64} height={64} />
          </div>
          <h1 className="font-ui text-4xl font-bold text-ink">
            Explain it to the duck.
          </h1>
          <p className="mt-3 font-mono text-sm text-inkDim">
            Ship it to the web.
          </p>
          <div className="mt-6 flex justify-center gap-2 font-mono text-xs text-inkFaint">
            <span className="border border-quarkBlue px-2 py-0.5 text-quarkBlue">
              No install
            </span>
            <span className="border border-quarkGreen px-2 py-0.5 text-quarkGreen">
              Live preview
            </span>
            <span className="border border-quarkRed px-2 py-0.5 text-quarkRed">
              Fork anything
            </span>
          </div>
        </div>
      </div>

      {/* Right — Form */}
      <div className="flex flex-col items-center justify-center bg-void px-6 py-12 lg:px-12">
        <div className="w-full max-w-sm">
          {/* Mobile brand (visible only on mobile) */}
          <div className="mb-8 flex flex-col items-center lg:hidden">
            <Link href="/">
              <Logo variant="white" width={48} height={48} />
            </Link>
            <span className="mt-2 font-mono text-xs text-inkFaint">
              Quark
            </span>
          </div>

          {children}
        </div>
      </div>
    </div>
  )
}