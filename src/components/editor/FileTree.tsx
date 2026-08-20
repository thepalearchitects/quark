// components/editor/FileTree.tsx
'use client'

import { useProjectStore } from '@/lib/store/projectStore'
import { useEditorStore } from '@/lib/store/editorStore'
import { FileNode } from '@/lib/types'
import { Folder, File, Plus, X } from 'lucide-react'
import { useState } from 'react'

export function FileTree() {
  const { currentProject, updateFileTree } = useProjectStore()
  const { openFile } = useEditorStore()
  const [isCreating, setIsCreating] = useState(false)
  const [newFileName, setNewFileName] = useState('')
  const [error, setError] = useState('')

  if (!currentProject) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="font-mono text-xs text-inkFaint">No files</p>
      </div>
    )
  }

  const handleFileClick = (file: FileNode) => {
    if (file.type === 'file') {
      openFile(file.id, file.content)
    }
  }

  const handleCreateFile = () => {
    const name = newFileName.trim()
    if (!name) {
      setError('File name is required')
      return
    }

    // Check for duplicate file names
    const exists = currentProject.files.some(
      (f) => f.name.toLowerCase() === name.toLowerCase() && f.type === 'file'
    )
    if (exists) {
      setError(`A file named "${name}" already exists`)
      return
    }

    const newFile: FileNode = {
      id: `file-${Date.now()}`,
      name: name,
      type: 'file',
      language: 'html',
      content: '',
    }
    updateFileTree([...currentProject.files, newFile])
    setNewFileName('')
    setError('')
    setIsCreating(false)
    openFile(newFile.id, '')
  }

  const renderFileTree = (files: FileNode[], depth = 0) => {
    return files.map((file) => (
      <div key={file.id} style={{ paddingLeft: `${depth * 12 + 4}px` }}>
        <div
          className={`flex cursor-pointer items-center gap-1.5 rounded px-2 py-1 font-mono text-xs transition-colors ${
            file.type === 'file'
              ? 'text-inkDim hover:bg-surface hover:text-ink'
              : 'text-inkFaint font-semibold'
          }`}
          onClick={() => handleFileClick(file)}
        >
          {file.type === 'folder' ? (
            <Folder size={14} className="text-quarkBlue" />
          ) : (
            <File size={14} className="text-inkFaint" />
          )}
          {file.name}
        </div>
        {file.type === 'folder' && file.children && (
          <div>{renderFileTree(file.children, depth + 1)}</div>
        )}
      </div>
    ))
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between border-b border-line pb-2">
        <span className="font-mono text-xs uppercase tracking-wider text-inkFaint">
          Files
        </span>
        <button
          onClick={() => {
            setIsCreating(!isCreating)
            setError('')
            setNewFileName('')
          }}
          className="text-inkFaint hover:text-ink transition-colors"
        >
          <Plus size={16} />
        </button>
      </div>

      {isCreating && (
        <div className="px-2">
          <div className="flex items-center gap-1">
            <input
              type="text"
              value={newFileName}
              onChange={(e) => {
                setNewFileName(e.target.value)
                setError('')
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleCreateFile()
                if (e.key === 'Escape') {
                  setIsCreating(false)
                  setError('')
                  setNewFileName('')
                }
              }}
              placeholder="file.html"
              className="flex-1 border border-line bg-surface2 px-2 py-1 font-mono text-xs text-ink placeholder:text-inkFaint focus:border-quarkBlue focus:outline-none"
              autoFocus
            />
            <button
              onClick={handleCreateFile}
              className="font-mono text-xs text-quarkBlue hover:underline"
            >
              Add
            </button>
            <button
              onClick={() => {
                setIsCreating(false)
                setError('')
                setNewFileName('')
              }}
              className="text-inkFaint hover:text-ink transition-colors"
            >
              <X size={14} />
            </button>
          </div>
          {error && (
            <p className="mt-1 font-mono text-xs text-quarkRed">{error}</p>
          )}
        </div>
      )}

      <div className="space-y-0.5">
        {renderFileTree(currentProject.files)}
      </div>
    </div>
  )
}