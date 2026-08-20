// app/(admin)/admin/reports/page.tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { ConfirmModal } from '@/components/ui/ConfirmModal'

// Mock reports
const mockReports = [
  { id: '1', penId: 'pen-123', reason: 'Spam', status: 'pending', createdAt: '2 hours ago', reporter: 'anonymous' },
  { id: '2', penId: 'pen-456', reason: 'Inappropriate content', status: 'pending', createdAt: '4 hours ago', reporter: 'user-789' },
  { id: '3', penId: 'pen-789', reason: 'Copyright violation', status: 'pending', createdAt: '1 day ago', reporter: 'user-101' },
]

export default function AdminReports() {
  const [reports, setReports] = useState(mockReports)
  const [isLoading, setIsLoading] = useState(false)
  const [modalState, setModalState] = useState<{
    isOpen: boolean
    type: 'dismiss' | 'review' | null
    reportId: string | null
  }>({ isOpen: false, type: null, reportId: null })

  const handleDismiss = async () => {
    setIsLoading(true)
    const id = modalState.reportId
    console.log('Dismissing report:', id)
    await new Promise((resolve) => setTimeout(resolve, 500))
    setReports(reports.filter((r) => r.id !== id))
    setIsLoading(false)
    setModalState({ isOpen: false, type: null, reportId: null })
  }

  const handleReview = async () => {
    setIsLoading(true)
    const id = modalState.reportId
    console.log('Reviewing report:', id)
    await new Promise((resolve) => setTimeout(resolve, 500))
    setReports(reports.filter((r) => r.id !== id))
    setIsLoading(false)
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

      {reports.length === 0 ? (
        <div className="border border-line bg-surface p-8 text-center">
          <p className="font-mono text-sm text-quarkGreen">✓ All clear — no pending reports</p>
        </div>
      ) : (
        <div className="border border-line bg-surface divide-y divide-line">
          {reports.map((report) => (
            <div key={report.id} className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-mono text-sm text-ink">Report #{report.id}</p>
                  <p className="font-mono text-xs text-inkDim">
                    Pen ID: {report.penId} · {report.createdAt}
                  </p>
                  <p className="font-mono text-xs text-inkFaint">
                    Reason: {report.reason} · Reported by: {report.reporter}
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