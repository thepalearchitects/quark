// components/editor/PreviewPane.tsx
'use client'

import { useEditorStore } from '@/lib/store/editorStore'
import { useProjectStore } from '@/lib/store/projectStore'
import { useState, useEffect, useRef } from 'react'
import { Maximize2, Minimize2, Laptop, Tablet, Smartphone } from 'lucide-react'
import { buildSrcDoc } from '@/lib/preview/buildSrcDoc'
import { FileNode } from '@/lib/types'

const deviceWidthMap = {
  desktop: 'w-full h-full',
  tablet: 'w-[768px] h-full max-w-full border-x border-line shadow-2xl',
  mobile: 'w-[375px] h-full max-w-full border-x border-line shadow-2xl',
}

export function PreviewPane() {
  const { fileContents, addConsoleLog, activeDevice, setActiveDevice } = useEditorStore()
  const { currentProject } = useProjectStore()
  const [srcDoc, setSrcDoc] = useState('')
  const [isFullscreen, setIsFullscreen] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  // Listen to message events from the sandboxed iframe for console logs
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data && e.data.source === 'QUARK_PREVIEW') {
        const { type, args } = e.data
        addConsoleLog({ type, args })
      }
    }
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [addConsoleLog])

  // Recompile index.html, style.css, and script.js recursively with local edited cache
  useEffect(() => {
    if (!currentProject) return

    const getCompiledFiles = (nodes: FileNode[]): FileNode[] => {
      return nodes.map((node) => {
        if (node.type === 'file') {
          const editedContent = fileContents[node.id]
          return {
            ...node,
            content: editedContent !== undefined ? editedContent : node.content,
          }
        } else if (node.type === 'folder' && node.children) {
          return {
            ...node,
            children: getCompiledFiles(node.children),
          }
        }
        return node
      })
    }

    const compiledFiles = getCompiledFiles(currentProject.files)
    const doc = buildSrcDoc(compiledFiles)

    // Debounce updates
    const timeout = setTimeout(() => {
      setSrcDoc(doc)
    }, 300)

    return () => clearTimeout(timeout)
  }, [fileContents, currentProject])

  if (!currentProject) {
    return (
      <div className="flex h-full items-center justify-center bg-void">
        <p className="font-mono text-sm text-inkFaint">No project loaded</p>
      </div>
    )
  }

  return (
    <div className={`flex h-full flex-col ${isFullscreen ? 'fixed inset-0 z-50 bg-void' : ''}`}>
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-line px-3 py-2 select-none">
        <span className="font-mono text-xs uppercase tracking-wider text-quarkGreen">
          ● Live Preview
        </span>

        {/* Device select buttons */}
        <div className="flex items-center gap-1.5 border border-line bg-surface/50 p-0.5">
          <button
            onClick={() => setActiveDevice('desktop')}
            className={`p-1 transition-colors ${
              activeDevice === 'desktop' ? 'bg-surface2 text-quarkBlue' : 'text-inkFaint hover:text-ink'
            }`}
            title="Desktop Mode"
          >
            <Laptop size={14} />
          </button>
          <button
            onClick={() => setActiveDevice('tablet')}
            className={`p-1 transition-colors ${
              activeDevice === 'tablet' ? 'bg-surface2 text-quarkBlue' : 'text-inkFaint hover:text-ink'
            }`}
            title="Tablet Mode"
          >
            <Tablet size={14} />
          </button>
          <button
            onClick={() => setActiveDevice('mobile')}
            className={`p-1 transition-colors ${
              activeDevice === 'mobile' ? 'bg-surface2 text-quarkBlue' : 'text-inkFaint hover:text-ink'
            }`}
            title="Mobile Mode"
          >
            <Smartphone size={14} />
          </button>
        </div>

        {/* Fullscreen button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="text-inkFaint hover:text-ink transition-colors"
          >
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
        </div>
      </div>

      {/* Sandboxed Iframe container */}
      <div className="flex-1 bg-void p-2 overflow-hidden flex items-center justify-center">
        <iframe
          ref={iframeRef}
          srcDoc={srcDoc}
          sandbox="allow-scripts"
          className={`bg-white border border-line transition-all duration-200 ${deviceWidthMap[activeDevice]}`}
          title="Live preview"
        />
      </div>
    </div>
  )
}