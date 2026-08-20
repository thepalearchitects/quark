// components/editor/TabBar.tsx
'use client'

import { useEditorStore } from '@/lib/store/editorStore'
import { useProjectStore } from '@/lib/store/projectStore'
import { X } from 'lucide-react'

export function TabBar() {
  const { openFiles, activeFileId, setActiveFile, closeFile, dirtyFiles } = useEditorStore()
  const { currentProject } = useProjectStore()

  const getFileName = (fileId: string) => {
    const file = currentProject?.files.find((f) => f.id === fileId)
    return file?.name || 'Untitled'
  }

  if (openFiles.length === 0) {
    return (
      <div className="flex h-9 items-center border-b border-line bg-surface2 px-2">
        <span className="font-mono text-xs text-inkFaint">No files open</span>
      </div>
    )
  }

  return (
    <div className="flex items-center border-b border-line bg-surface2 px-2 overflow-x-auto">
      {openFiles.map((fileId) => {
        const isActive = fileId === activeFileId
        const isDirty = dirtyFiles[fileId]
        return (
          <div
            key={fileId}
            className={`flex items-center gap-2 px-3 py-1.5 font-mono text-xs cursor-pointer transition-colors whitespace-nowrap ${
              isActive
                ? 'border-b-2 border-quarkBlue text-ink'
                : 'text-inkFaint hover:text-ink'
            }`}
            onClick={() => setActiveFile(fileId)}
          >
            <span>{getFileName(fileId)}</span>
            {isDirty && <span className="text-quarkRed">●</span>}
            <button
              className="text-inkFaint hover:text-ink transition-colors"
              onClick={(e) => {
                e.stopPropagation()
                closeFile(fileId)
              }}
            >
              <X size={14} />
            </button>
          </div>
        )
      })}
    </div>
  )
}