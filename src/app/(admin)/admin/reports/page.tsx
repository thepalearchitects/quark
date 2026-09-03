// app/(admin)/admin/reports/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { ConfirmModal } from '@/components/ui/ConfirmModal'

interface Report {
  id: string
  projectId: string
  reason: string
  status: string
  createdAt: string
  reporterId: string
}

export default function AdminReports() {
  const [reports, setReports] = useState<Report[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [modalState, setModalState] = useState<{
    isOpen: boolean
    type: 'dismiss' | 'review' | null
    reportId: string | null
  }>({ isOpen: false, type: null, reportId: null })

  const loadReports = async () => {
    try {
      const res = await fetch('/api/reports')
      const json = await res.json()
      if (json.success) setReports(json.data || [])
    } catch (err) {
      console.error('Failed to load reports:', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadReports()
  }, [])

  const updateStatus = async (id: string, status: string) => {
    try {
      await fetch(`/api/admin/reports/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      setReports(reports.filter((r) => r.id !== id))
    } catch (err) {
      console.error('Failed to update report:', err)
    }
  }

  const handleDismiss = async () => {
    const id = modalState.reportId
    if (id) await updateStatus(id, 'dismissed')
    setModalState({ isOpen: false, type: null, reportId: null })
  }

  const handleReview = async () => {
    const id = modalState.reportId
    if (id) await updateStatus(id, 'reviewed')
    setModalState({ isOpen: false, type: null, reportId: null })
  }

  const getModalContent = () => {
    switch (modalState.type) {
      case 'dismiss':
        return {
          title: 'Dismiss report?',
          description: 'This will dismiss the report. No action will be taken against the reported content.',
          confirmLabel: 'Dismiss',
          variant: 'info' as const,
          onConfirm: handleDismiss,
        }
      case 'review':
        return {
          title: 'Review & dismiss report?',
          description: 'This will mark the report as reviewed and dismiss it. The reported content will remain.',
          confirmLabel: 'Review & dismiss',
          variant: 'warning' as const,
          onConfirm: handleReview,
        }
      default:
        return null
    }
  }

  const modalContent = getModalContent()

  return (
    <div className="space-y-6">
      <div className="border-b border-line pb-4">
        <h1 className="font-ui text-2xl font-bold text-ink">Reports</h1>
        <p className="font-mono text-sm text-inkDim">
          Review and moderate reported content.
        </p>
      </div>

      {isLoading ? (
        <div className="border border-line bg-surface p-8 text-center">
          <p className="font-mono text-sm text-inkFaint animate-pulse">Loading reports...</p>
        </div>
      ) : reports.length === 0 ? (
        <div className="border border-line bg-surface p-8 text-center">
          <p className="font-mono text-sm text-quarkGreen">✓ No reports to review</p>
        </div>
      ) : (
        <div className="border border-line bg-surface divide-y divide-line">
          {reports.map((report) => (
            <div key={report.id} className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-mono text-sm text-ink">Report #{report.id}</p>
                  <p className="font-mono text-xs text-inkDim">
                    Pen ID: {report.projectId} · {new Date(report.createdAt).toLocaleString()}
                  </p>
                  <p className="font-mono text-xs text-inkFaint">
                    Reason: {report.reason} · Reported by: {report.reporterId}
                  </p>
                </div>
                <Badge variant="error" className="text-[10px]">
                  {report.status}
                </Badge>
              </div>
              <div className="mt-3 flex gap-3">
                <Button
                  variant="primary"
                  className="min-h-[32px] px-4 text-xs"
                  onClick={() => setModalState({
                    isOpen: true,
                    type: 'review',
                    reportId: report.id,
                  })}
                >
                  Review & dismiss
                </Button>
                <Button
                  variant="secondary"
                  className="min-h-[32px] px-4 text-xs"
                  onClick={() => setModalState({
                    isOpen: true,
                    type: 'dismiss',
                    reportId: report.id,
                  })}
                >
                  Ignore
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Confirmation Modal */}
      {modalContent && (
        <ConfirmModal
          isOpen={modalState.isOpen}
          onClose={() => setModalState({ isOpen: false, type: null, reportId: null })}
          onConfirm={modalContent.onConfirm}
          title={modalContent.title}
          description={modalContent.description}
          confirmLabel={modalContent.confirmLabel}
          variant={modalContent.variant}
          isLoading={isLoading}
        />
      )}
    </div>
  )
}