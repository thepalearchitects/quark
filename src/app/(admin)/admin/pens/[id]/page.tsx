// app/(admin)/admin/pens/[id]/page.tsx
'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { ConfirmModal } from '@/components/ui/ConfirmModal'

// Mock pen data
const getPen = (id: string) => ({
  id,
  title: 'Hello Quark',
  author: 'maou',
  status: 'public',
  reports: 0,
  createdAt: '2 days ago',
  description: 'A simple HTML/CSS demo showing the Quark design system.',
  tags: ['html', 'css', 'demo'],
  content: '<h1>Hello, Quark!</h1>',
})

export default function AdminPenDetail() {
  const params = useParams()
  const [pen] = useState(getPen(params.id as string))
  const [isLoading, setIsLoading] = useState(false)
  const [modalState, setModalState] = useState<{
    isOpen: boolean
    type: 'unpublish' | 'delete' | null
  }>({ isOpen: false, type: null })

  const handleUnpublish = async () => {
    setIsLoading(true)
    console.log(`Unpublishing pen: ${pen.title}`)
    await new Promise((resolve) => setTimeout(resolve, 800))
    setIsLoading(false)
    setModalState({ isOpen: false, type: null })
  }

  const handleDelete = async () => {
    setIsLoading(true)
    console.log(`Deleting pen: ${pen.title}`)
    await new Promise((resolve) => setTimeout(resolve, 800))
    setIsLoading(false)
    setModalState({ isOpen: false, type: null })
  }

  const getModalContent = () => {
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
          <span className="font-mono text-xs text-inkFaint">• by {pen.author}</span>
          <span className="font-mono text-xs text-inkFaint">• Created {pen.createdAt}</span>
        </div>
        <p className="mt-4 font-mono text-sm text-inkDim">{pen.description}</p>
        {pen.tags.length > 0 && (
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
          isLoading={isLoading}
        />
      )}
    </div>
  )
}