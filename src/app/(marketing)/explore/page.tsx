// app/(marketing)/explore/page.tsx
'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { useEffect, useState } from 'react'

interface PublicPen {
  id: string
  title: string
  description: string
  tags: string[]
  author: string
  updatedAt: string
  forks: number
  views: number
}

export default function ExplorePage() {
  const [pens, setPens] = useState<PublicPen[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState<'recent' | 'trending'>('recent')

  useEffect(() => {
    const controller = new AbortController()
    const timer = setTimeout(async () => {
      try {
        const params = new URLSearchParams()
        if (query) params.set('q', query)
        params.set('sort', sort)
        const res = await fetch(`/api/projects/public?${params.toString()}`, {
          signal: controller.signal,
        })
        const json = await res.json()
        if (json.success) {
          setPens(json.data || [])
        }
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          console.error('Failed to load public pens:', err)
        }
      } finally {
        setIsLoading(false)
      }
    }, 400)
    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [query, sort])

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
            <Button
              variant={sort === 'recent' ? 'primary' : 'secondary'}
              className="min-h-[40px] px-4 text-sm"
              onClick={() => setSort('recent')}
            >
              Recent
            </Button>
            <Button
              variant={sort === 'trending' ? 'primary' : 'secondary'}
              className="min-h-[40px] px-4 text-sm"
              onClick={() => setSort('trending')}
            >
              Trending
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="mt-6">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pens by name..."
            className="w-full border border-line bg-surface2 px-4 py-3 font-mono text-sm text-ink placeholder:text-inkFaint focus:border-quarkBlue focus:shadow-snap-blue focus:outline-none"
          />
        </div>

        {/* Pen Grid */}
        {isLoading ? (
          <div className="mt-8 flex justify-center border border-line bg-surface p-12">
            <p className="font-mono text-sm text-inkFaint animate-pulse">
              Loading public pens...
            </p>
          </div>
        ) : (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pens.map((pen) => (
              <Link
                key={pen.id}
                href={`/p/${pen.id}`}
                className="block border border-line bg-surface p-5 transition-shadow duration-75 hover:shadow-snap-blue"
              >
                <h3 className="font-ui text-lg font-semibold text-ink">
                  {pen.title}
                </h3>
                <p className="mt-1 font-mono text-sm text-inkDim line-clamp-2">
                  {pen.description || 'No description provided.'}
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
                  <span>{new Date(pen.updatedAt).toLocaleDateString()}</span>
                </div>
                <div className="mt-2 flex gap-4 font-mono text-xs text-inkFaint">
                  <span>🔄 {pen.forks} forks</span>
                  <span>👁️ {pen.views} views</span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Empty State (if no pens) */}
        {!isLoading && pens.length === 0 && (
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
