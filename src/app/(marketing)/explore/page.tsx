// app/(marketing)/explore/page.tsx
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

// Mock data — will be replaced with real API later
const mockPens = [
  {
    id: 'pen-1',
    title: 'Hello Quark',
    description: 'A simple HTML/CSS demo showing the Quark design system.',
    tags: ['html', 'css', 'demo'],
    author: '@maou',
    updatedAt: '2 hours ago',
    forks: 12,
    views: 89,
  },
  {
    id: 'pen-2',
    title: 'Portfolio — quack',
    description: 'Minimal portfolio page with zero-radius design.',
    tags: ['portfolio', 'minimal'],
    author: '@maou',
    updatedAt: '1 day ago',
    forks: 5,
    views: 34,
  },
  {
    id: 'pen-3',
    title: 'Console Logger',
    description: 'Interactive console logger with Quark styling.',
    tags: ['javascript', 'console', 'interactive'],
    author: '@dev',
    updatedAt: '3 days ago',
    forks: 8,
    views: 56,
  },
]

export default async function ExplorePage() {
  // 1-second delay for smooth UX
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return (
    <div className="px-4 py-16 md:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-4 border-b border-line pb-6 md:flex-row md:items-center">
          <div>
            <h1 className="font-ui text-3xl font-bold text-ink md:text-4xl">
              Explore
            </h1>
            <p className="mt-2 font-mono text-sm text-inkDim">
              Public pens from the community — fork, learn, and build.
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" className="min-h-[40px] px-4 text-sm">
              Recent
            </Button>
            <Button variant="secondary" className="min-h-[40px] px-4 text-sm">
              Trending
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="mt-6">
          <input
            type="text"
            placeholder="Search pens by name, tag, or author..."
            className="w-full border border-line bg-surface2 px-4 py-3 font-mono text-sm text-ink placeholder:text-inkFaint focus:border-quarkBlue focus:shadow-snap-blue focus:outline-none"
          />
        </div>

        {/* Pen Grid */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {mockPens.map((pen) => (
            <Link
              key={pen.id}
              href={`/p/${pen.id}`}
              className="block border border-line bg-surface p-5 transition-shadow duration-75 hover:shadow-snap-blue"
            >
              <h3 className="font-ui text-lg font-semibold text-ink">
                {pen.title}
              </h3>
              <p className="mt-1 font-mono text-sm text-inkDim line-clamp-2">
                {pen.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {pen.tags.map((tag) => (
                  <Badge key={tag} variant="info" className="text-[10px]">
                    #{tag}
                  </Badge>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-line pt-3 font-mono text-xs text-inkFaint">
                <span>{pen.author}</span>
                <span>{pen.updatedAt}</span>
              </div>
              <div className="mt-2 flex gap-4 font-mono text-xs text-inkFaint">
                <span>🔄 {pen.forks} forks</span>
                <span>👁️ {pen.views} views</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State (if no pens) */}
        {mockPens.length === 0 && (
          <div className="mt-16 flex flex-col items-center justify-center border border-line bg-surface p-12 text-center">
            <p className="font-mono text-sm text-inkDim">
              No public pens yet.
            </p>
            <Link href="/dashboard" className="mt-4">
              <Button variant="primary">Create the first pen</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}