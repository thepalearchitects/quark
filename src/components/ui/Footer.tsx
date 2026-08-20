// components/ui/Footer.tsx
import { Logo } from './Logo'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-line bg-void px-4 py-8 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2">
              <Logo variant="white" width={32} height={32} />
              <span className="font-mono text-sm font-bold text-ink">Quark</span>
            </div>
            <p className="mt-3 font-mono text-xs text-inkFaint">
              Explain it to the duck. Ship it to the web.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-inkDim">
              Product
            </h4>
            <ul className="mt-3 space-y-2 font-mono text-sm text-inkFaint">
              <li>
                <Link href="/explore" className="hover:text-ink transition-colors">
                  Explore
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-ink transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/docs" className="hover:text-ink transition-colors">
                  Docs
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-inkDim">
              Company
            </h4>
            <ul className="mt-3 space-y-2 font-mono text-sm text-inkFaint">
              <li>
                <Link href="/terms" className="hover:text-ink transition-colors">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-ink transition-colors">
                  Privacy
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-inkDim">
              Connect
            </h4>
            <ul className="mt-3 space-y-2 font-mono text-sm text-inkFaint">
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-ink transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-ink transition-colors"
                >
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-line pt-4 text-center font-mono text-xs text-inkFaint">
          &copy; {new Date().getFullYear()} Quark. All rights reserved.
        </div>
      </div>
    </footer>
  )
}