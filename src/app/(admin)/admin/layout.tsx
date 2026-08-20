// app/(admin)/admin/layout.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Logo } from '@/components/ui/Logo'
import { Button } from '@/components/ui/Button'

const navItems = [
  { href: '/admin', label: 'Overview' },
  { href: '/admin/users', label: 'Users' },
  { href: '/admin/pens', label: 'Pens' },
  { href: '/admin/reports', label: 'Reports' },
  { href: '/admin/settings', label: 'Settings' },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-void">
      {/* Admin Top Bar */}
      <header className="sticky top-0 z-50 border-b border-line bg-void/90 backdrop-blur-md px-4 py-3 md:px-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
          <Link href="/admin" className="flex items-center gap-2 flex-shrink-0">
            <Logo variant="white" width={28} height={28} />
            <span className="font-mono text-sm font-bold text-ink">Admin</span>
          </Link>
          <Link href="/dashboard">
            <Button variant="secondary" className="min-h-[36px] px-4 text-xs">
              ← Back to app
            </Button>
          </Link>
        </div>
      </header>

      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 md:flex-row md:px-8">
        {/* Sidebar */}
        <aside className="w-full md:w-48 flex-shrink-0">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block font-mono text-sm px-3 py-2 transition-colors ${
                  pathname === item.href
                    ? 'bg-quarkBlue/10 text-quarkBlue border-l-2 border-quarkBlue'
                    : 'text-inkDim hover:text-ink hover:bg-surface'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  )
}