// app/(admin)/admin/page.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

// Mock data
const stats = {
  totalUsers: 142,
  totalPens: 389,
  totalReports: 12,
  pendingReports: 5,
}

const recentReports = [
  { id: '1', penId: 'pen-123', reason: 'Spam', status: 'pending', createdAt: '2 hours ago' },
  { id: '2', penId: 'pen-456', reason: 'Inappropriate content', status: 'pending', createdAt: '4 hours ago' },
  { id: '3', penId: 'pen-789', reason: 'Copyright violation', status: 'pending', createdAt: '1 day ago' },
]

export default function AdminOverview() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="font-mono text-sm text-inkFaint animate-pulse">
          Loading admin overview...
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-line pb-4">
        <h1 className="font-ui text-2xl font-bold text-ink">Admin Overview</h1>
        <p className="font-mono text-sm text-inkDim">
          Platform statistics and moderation queue.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="border border-line bg-surface p-4">
          <p className="font-mono text-xs uppercase tracking-wider text-inkFaint">
            Total Users
          </p>
          <p className="font-mono text-2xl font-bold text-ink">{stats.totalUsers}</p>
        </div>
        <div className="border border-line bg-surface p-4">
          <p className="font-mono text-xs uppercase tracking-wider text-inkFaint">
            Total Pens
          </p>
          <p className="font-mono text-2xl font-bold text-ink">{stats.totalPens}</p>
        </div>
        <div className="border border-line bg-surface p-4">
          <p className="font-mono text-xs uppercase tracking-wider text-inkFaint">
            Total Reports
          </p>
          <p className="font-mono text-2xl font-bold text-ink">{stats.totalReports}</p>
        </div>
        <div className="border border-quarkRed bg-surface p-4">
          <p className="font-mono text-xs uppercase tracking-wider text-inkFaint">
            Pending Reports
          </p>
          <p className="font-mono text-2xl font-bold text-quarkRed">{stats.pendingReports}</p>
        </div>
      </div>

      {/* Recent Reports */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-ui text-lg font-semibold text-ink">Recent Reports</h2>
          <Link href="/admin/reports">
            <Button variant="secondary" className="min-h-[32px] px-4 text-xs">
              View all →
            </Button>
          </Link>
        </div>
        <div className="border border-line bg-surface">
          {recentReports.length === 0 ? (
            <p className="p-4 font-mono text-sm text-inkDim">No reports pending.</p>
          ) : (
            <div className="divide-y divide-line">
              {recentReports.map((report) => (
                <div key={report.id} className="flex items-center justify-between p-4">
                  <div>
                    <p className="font-mono text-sm text-ink">
                      Report #{report.id}
                    </p>
                    <p className="font-mono text-xs text-inkDim">
                      {report.reason} · {report.createdAt}
                    </p>
                  </div>
                  <Badge variant="error" className="text-[10px]">
                    {report.status}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}