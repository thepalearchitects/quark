// app/(admin)/admin/pens/[id]/page.tsx
'use client'

import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { ConfirmModal } from '@/components/ui/ConfirmModal'

interface AdminPen {
  id: string
  title: string
  author?: string
  status: string
  createdAt: string
  description?: string
  tags?: string[]
}

export default function AdminPenDetail() {
  const params = useParams()
  const router = useRouter()
  const [pen, setPen] = useState<AdminPen | null>(null)
  const [isBusy, setIsBusy] = useState(false)
  const [modalState, setModalState] = useState<{
    isOpen: boolean
    type: 'unpublish' | 'delete' | null
  }>({ isOpen: false, type: null })

  useEffect(() => {
    fetch(`/api/admin/pens/${params.id}`)
      .then((r) => r.json())
      .then((json) => {
        if (json.success && json.data) {
          const p = json.data
          setPen({
            id: p.id,
            title: p.name,
            status: p.visibility,
            createdAt: p.createdAt,
            description: p.description,
            tags: p.tags,
          })
        }
      })
  }, [params.id])

  const handleUnpublish = async () => {
    setIsBusy(true)
    try {
      await fetch(`/api/admin/pens/${pen?.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'unpublish' }),
      })
      if (pen) setPen({ ...pen, status: 'private' })
    } finally {
      setIsBusy(false)
      setModalState({ isOpen: false, type: null })
    }
  }

  const handleDelete = async () => {
    setIsBusy(true)
    try {
      await fetch(`/api/admin/pens/${pen?.id}`, { method: 'DELETE' })
      router.push('/admin/pens')
    } finally {
      setIsBusy(false)
      setModalState({ isOpen: false, type: null })
    }
  }

  const getModalContent = () => {
    if (!pen) return null
    switch (modalState.type) {
      case 'unpublish':
        return {
          title: `Unpublish "${pen.title}"?`,
          description: `This will remove "${pen.title}" from public view. The author can republish it later.`,
          confirmLabel: 'Unpublish',
          variant: 'warning' as const,
          onConfirm: handleUnpublish,
        }
      case 'delete':
        return {
          title: `Delete "${pen.title}"?`,
          description: `This will permanently delete "${pen.title}" and all its data. This action cannot be undone.`,
          confirmLabel: 'Delete permanently',
          variant: 'danger' as const,
          onConfirm: handleDelete,
        }
      default:
        return null
    }
  }

  const modalContent = getModalContent()

  if (!pen) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="font-mono text-sm text-inkFaint animate-pulse">
          Loading pen...
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 border-b border-line pb-4">
        <Link href="/admin/pens">
          <Button variant="secondary" className="min-h-[32px] px-3 text-xs">
            ← Back
          </Button>
        </Link>
        <h1 className="font-ui text-2xl font-bold text-ink">Pen Detail</h1>
      </div>

      <div className="border border-line bg-surface p-6">
        <h2 className="font-ui text-xl font-bold text-ink">{pen.title}</h2>
        <div className="mt-2 flex items-center gap-2">
          <Badge variant={pen.status === 'public' ? 'live' : 'info'} className="text-[10px]">
            {pen.status}
          </Badge>
          {pen.author && (
            <span className="font-mono text-xs text-inkFaint">• by {pen.author}</span>
          )}
          <span className="font-mono text-xs text-inkFaint">• Created {new Date(pen.createdAt).toLocaleDateString()}</span>
        </div>
        {pen.description && (
          <p className="mt-4 font-mono text-sm text-inkDim">{pen.description}</p>
        )}
        {pen.tags && pen.tags.length > 0 && (
          <div className="mt-3 flex gap-1.5">
            {pen.tags.map((tag) => (
              <Badge key={tag} variant="info" className="text-[10px]">
                #{tag}
              </Badge>
            ))}
          </div>
        )}
        <div className="mt-6 border-t border-line pt-6">
          <div className="flex gap-3">
            <Button
              variant="destructive"
              className="min-h-[36px] px-4 text-xs"
              onClick={() => setModalState({ isOpen: true, type: 'unpublish' })}
            >
              Unpublish
            </Button>
            <Button
              variant="secondary"
              className="min-h-[36px] px-4 text-xs"
              onClick={() => setModalState({ isOpen: true, type: 'delete' })}
            >
              Soft delete
            </Button>
            <Button variant="secondary" className="min-h-[36px] px-4 text-xs">
              View pen →
            </Button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {modalContent && (
        <ConfirmModal
          isOpen={modalState.isOpen}
          onClose={() => setModalState({ isOpen: false, type: null })}
          onConfirm={modalContent.onConfirm}
          title={modalContent.title}
          description={modalContent.description}
          confirmLabel={modalContent.confirmLabel}
          variant={modalContent.variant}
          isLoading={isBusy}
        />
      )}
    </div>
  )
}