// app/(admin)/admin/pens/page.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'

interface AdminPen {
  id: string
  title: string
  author: string
  status: string
  reports: number
  createdAt: string
}

export default function AdminPens() {
  const [search, setSearch] = useState('')
  const [pens, setPens] = useState<AdminPen[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const loadPens = async () => {
    try {
      const res = await fetch('/api/admin/pens')
      const json = await res.json()
      if (json.success) setPens(json.data || [])
    } catch (err) {
      console.error('Failed to load admin pens:', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadPens()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const filteredPens = pens.filter((pen) =>
    pen.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="border-b border-line pb-4">
        <h1 className="font-ui text-2xl font-bold text-ink">Pens</h1>
        <p className="font-mono text-sm text-inkDim">
          Moderate and manage all pens on the platform.
        </p>
      </div>

      <div className="flex gap-4">
        <Input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <Button variant="secondary" className="min-h-[44px]">
          Search
        </Button>
      </div>

      <div className="border border-line bg-surface overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b border-line">
            <tr>
              <th className="px-4 py-3 font-mono text-xs uppercase tracking-wider text-inkFaint">Title</th>
              <th className="px-4 py-3 font-mono text-xs uppercase tracking-wider text-inkFaint">Author</th>
              <th className="px-4 py-3 font-mono text-xs uppercase tracking-wider text-inkFaint">Status</th>
              <th className="px-4 py-3 font-mono text-xs uppercase tracking-wider text-inkFaint">Reports</th>
              <th className="px-4 py-3 font-mono text-xs uppercase tracking-wider text-inkFaint">Created</th>
              <th className="px-4 py-3 font-mono text-xs uppercase tracking-wider text-inkFaint">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {isLoading ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center font-mono text-sm text-inkFaint animate-pulse">
                  Loading pens...
                </td>
              </tr>
            ) : filteredPens.map((pen) => (
              <tr key={pen.id} className="hover:bg-surface2 transition-colors">
                <td className="px-4 py-3 font-mono text-sm text-ink">{pen.title}</td>
                <td className="px-4 py-3 font-mono text-sm text-inkDim">{pen.author}</td>
                <td className="px-4 py-3">
                  <Badge variant={pen.status === 'public' ? 'live' : 'info'} className="text-[10px]">
                    {pen.status}
                  </Badge>
                </td>
                <td className="px-4 py-3 font-mono text-sm text-ink">
                  {pen.reports > 0 ? (
                    <span className="text-quarkRed">{pen.reports}</span>
                  ) : (
                    '0'
                  )}
                </td>
                <td className="px-4 py-3 font-mono text-sm text-inkDim">{new Date(pen.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-3">
                  <Link href={`/admin/pens/${pen.id}`}>
                    <Button variant="secondary" className="min-h-[32px] px-3 text-xs">
                      View
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}