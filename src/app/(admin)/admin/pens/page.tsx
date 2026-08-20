// app/(admin)/admin/pens/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'

// Mock pens
const mockPens = [
  { id: 'pen-1', title: 'Hello Quark', author: 'maou', status: 'public', reports: 0, createdAt: '2 days ago' },
  { id: 'pen-2', title: 'Portfolio — quack', author: 'maou', status: 'public', reports: 2, createdAt: '3 days ago' },
  { id: 'pen-3', title: 'Secret Project', author: 'maou', status: 'private', reports: 0, createdAt: '4 days ago' },
]

export default function AdminPens() {
  const [search, setSearch] = useState('')

  const filteredPens = mockPens.filter((pen) =>
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
            {filteredPens.map((pen) => (
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
                <td className="px-4 py-3 font-mono text-sm text-inkDim">{pen.createdAt}</td>
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