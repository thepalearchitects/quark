// components/editor/EditorTopBar.tsx
'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Logo } from '@/components/ui/Logo'
import { useProjectStore } from '@/lib/store/projectStore'
import { useEditorStore } from '@/lib/store/editorStore'
import { Share2, Save, Upload, Terminal, Check } from 'lucide-react'
import { useState } from 'react'
import { UserButton } from '@clerk/nextjs'
import { FileNode } from '@/lib/types'

export function EditorTopBar() {
  const { currentProject, updateProject } = useProjectStore()
  const { dirtyFiles, fileContents, markClean, toggleConsole, isConsoleOpen } = useEditorStore()
  const [isSaving, setIsSaving] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)
  const [isClerkEnabled] = useState(() => {
    const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
    return !!(publishableKey && publishableKey.startsWith('pk_'))
  })

  const hasUnsavedChanges = Object.keys(dirtyFiles).length > 0

  const handleSave = async () => {
    if (!currentProject) return
    setIsSaving(true)

    // fake some save latency so it doesn't feel instant
    await new Promise((resolve) => setTimeout(resolve, 600))

    // walk the file tree and flush editorStore buffers into the project
    const saveFilesRecursive = (nodes: FileNode[]): FileNode[] => {
      return nodes.map((node) => {
        if (node.type === 'file') {
          const edited = fileContents[node.id]
          return {
            ...node,
            content: edited !== undefined ? edited : node.content,
          }
        } else if (node.type === 'folder' && node.children) {
          return {
            ...node,
            children: saveFilesRecursive(node.children),
          }
        }
        return node
      })
    }

    const updatedFiles = saveFilesRecursive(currentProject.files)
    const updatedProject = {
      ...currentProject,
      files: updatedFiles,
      updatedAt: new Date().toISOString(),
    }

    updateProject(updatedProject)

    // all good, mark clean
    Object.keys(dirtyFiles).forEach((id) => markClean(id))
    setIsSaving(false)
  }

  const handlePublish = async () => {
    if (!currentProject) return
    setIsPublishing(true)
    await new Promise((resolve) => setTimeout(resolve, 800))
    // flip to public — TODO: this should call an API
    const updatedProject = {
      ...currentProject,
      visibility: 'public' as const,
      updatedAt: new Date().toISOString(),
    }
    updateProject(updatedProject)
    setIsPublishing(false)
  }

  return (
    <header className="flex items-center justify-between border-b border-line bg-surface px-4 py-2 select-none z-20">
      <div className="flex items-center gap-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Logo variant="white" width={24} height={24} />
          <span className="font-mono text-sm font-bold text-ink">Quark</span>
        </Link>
        <span className="font-mono text-sm text-inkFaint">/</span>
        <span className="font-mono text-sm text-ink">{currentProject?.name || 'Untitled'}</span>
        <Badge variant={currentProject?.visibility === 'public' ? 'live' : 'faint'}>
          {currentProject?.visibility || 'private'}
        </Badge>
        {hasUnsavedChanges && (
          <span className="font-mono text-xs text-quarkRed">● unsaved</span>
        )}
      </div>

      <div className="flex items-center gap-3">
        {/* Console drawer toggle */}
        <button
          onClick={toggleConsole}
          className={`font-mono text-xs px-3 py-1.5 border flex items-center gap-1.5 transition-none cursor-pointer ${
            isConsoleOpen
              ? 'bg-surface2 border-quarkBlue text-quarkBlue'
              : 'border-line text-inkDim hover:text-ink hover:border-ink'
          }`}
        >
          <Terminal size={14} />
          <span className="hidden md:inline">Console</span>
        </button>

        {/* Save button */}
        <Button
          variant="secondary"
          className="min-h-[32px] px-4 text-xs flex items-center gap-1.5"
          onClick={handleSave}
          disabled={isSaving || !hasUnsavedChanges}
        >
          {isSaving ? (
            <span className="animate-pulse">Saving...</span>
          ) : hasUnsavedChanges ? (
            <>
              <Save size={14} />
              Save
            </>
          ) : (
            <>
              <Check size={14} className="text-quarkGreen" />
              Saved
            </>
          )}
        </Button>

        {/* Publish button */}
        <Button
          variant="primary"
          className="min-h-[32px] px-4 text-xs flex items-center gap-1.5"
          onClick={handlePublish}
          disabled={isPublishing || currentProject?.visibility === 'public'}
        >
          <Upload size={14} />
          {isPublishing ? 'Publishing...' : currentProject?.visibility === 'public' ? 'Published' : 'Publish'}
        </Button>

        {/* Share read-only link */}
        <Link href={`/p/${currentProject?.id}`} target="_blank">
          <Button variant="secondary" className="min-h-[32px] px-4 text-xs flex items-center gap-1.5">
            <Share2 size={14} />
            Share
          </Button>
        </Link>

        {isClerkEnabled && (
          <>
            <div className="h-4 w-px bg-line mx-1" />
            <UserButton />
          </>
        )}
      </div>
    </header>
  )
}

function Badge({ children, variant }: { children: React.ReactNode; variant: 'live' | 'faint' }) {
  return (
    <span
      className={`font-mono text-[9px] uppercase tracking-wider px-1.5 py-0.5 border ${
        variant === 'live' ? 'border-quarkGreen text-quarkGreen bg-quarkGreen/5' : 'border-line text-inkFaint'
      }`}
    >
      {children}
    </span>
  )
}