// components/editor/ShareModal.tsx
'use client'

import React, { useState } from 'react'
import { Modal } from '../ui/Modal'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'
import { Project } from '@/lib/types'
import { useProjectStore } from '@/lib/store/projectStore'
import { Copy, Check, ExternalLink } from 'lucide-react'

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  project: Project
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  project,
}) => {
  const { updateVisibility } = useProjectStore()
  const [copiedLink, setCopiedLink] = useState(false)
  const [copiedEmbed, setCopiedEmbed] = useState(false)

  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  const publicUrl = `${origin}/p/${project.id}`
  const embedSnippet = `<iframe src="${origin}/embed/${project.id}" width="100%" height="450" frameborder="0" loading="lazy"></iframe>`

  const copyToClipboard = (text: string, type: 'link' | 'embed') => {
    navigator.clipboard.writeText(text)
    if (type === 'link') {
      setCopiedLink(true)
      setTimeout(() => setCopiedLink(false), 2000)
    } else {
      setCopiedEmbed(true)
      setTimeout(() => setCopiedEmbed(false), 2000)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-5 font-mono text-sm">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-line pb-2">
          <h2 className="font-ui text-lg font-bold text-ink">Share & Embed Pen</h2>
          <button
            onClick={onClose}
            className="font-mono text-base text-inkFaint hover:text-ink transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Visibility Setting */}
        <div className="flex flex-col gap-2">
          <label className="text-xs uppercase tracking-wider text-inkDim">
            Visibility Setting
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => updateVisibility('public')}
              className={`flex-1 py-2 text-xs border uppercase tracking-wider transition-none cursor-pointer ${
                project.visibility === 'public'
                  ? 'bg-surface2 border-quarkBlue text-quarkBlue font-bold'
                  : 'border-line text-inkDim hover:text-ink'
              }`}
            >
              Public
            </button>
            <button
              onClick={() => updateVisibility('private')}
              className={`flex-1 py-2 text-xs border uppercase tracking-wider transition-none cursor-pointer ${
                project.visibility === 'private'
                  ? 'bg-surface2 border-quarkBlue text-quarkBlue font-bold'
                  : 'border-line text-inkDim hover:text-ink'
              }`}
            >
              Private
            </button>
          </div>
        </div>

        {/* Public Shareable Link */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs uppercase tracking-wider text-inkDim">
            Shareable URL
          </label>
          <div className="flex gap-2">
            <Input value={publicUrl} readOnly className="font-mono text-xs" />
            <Button
              variant="secondary"
              onClick={() => copyToClipboard(publicUrl, 'link')}
              className="shrink-0"
            >
              {copiedLink ? (
                <Check className="w-4 h-4 text-quarkGreen" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Embed Snippet */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs uppercase tracking-wider text-inkDim">
            Embed HTML Code
          </label>
          <div className="flex gap-2">
            <textarea
              value={embedSnippet}
              readOnly
              rows={3}
              className="snap-input px-3 py-2 text-xs font-mono w-full resize-none bg-surface2 border border-line text-inkDim focus:outline-none focus:border-quarkBlue"
            />
            <Button
              variant="secondary"
              onClick={() => copyToClipboard(embedSnippet, 'embed')}
              className="shrink-0 self-start"
            >
              {copiedEmbed ? (
                <Check className="w-4 h-4 text-quarkGreen" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Open Public Page Preview */}
        <div className="pt-2 border-t border-line flex justify-end">
          <a
            href={`/p/${project.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-quarkBlue hover:underline"
          >
            <span>Open public pen page</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </Modal>
  )
}
