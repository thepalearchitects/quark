// components/ui/ConfirmModal.tsx
'use client'

import { Button } from './Button'
import { Modal } from './Modal'

interface ConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description: string
  confirmLabel?: string
  cancelLabel?: string
  variant?: 'danger' | 'warning' | 'info'
  isLoading?: boolean
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'danger',
  isLoading = false,
}: ConfirmModalProps) {
  const variantColors = {
    danger: {
      border: 'border-quarkRed',
      button: 'destructive' as const,
      text: 'text-quarkRed',
    },
    warning: {
      border: 'border-quarkBlue',
      button: 'primary' as const,
      text: 'text-quarkBlue',
    },
    info: {
      border: 'border-quarkGreen',
      button: 'primary' as const,
      text: 'text-quarkGreen',
    },
  }

  const styles = variantColors[variant]

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-4">
        <div>
          <h3 className={`font-ui text-xl font-bold ${styles.text}`}>
            {title}
          </h3>
          <p className="mt-2 font-mono text-sm text-inkDim">{description}</p>
        </div>

        <div className="flex gap-3 pt-4 border-t border-line">
          <Button
            variant="secondary"
            className="min-h-[40px] flex-1"
            onClick={onClose}
            disabled={isLoading}
          >
            {cancelLabel}
          </Button>
          <Button
            variant={styles.button}
            className="min-h-[40px] flex-1"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  )
}