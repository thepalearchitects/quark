// components/editor/CodePane.tsx
'use client'

import React, { useMemo } from 'react'
import dynamic from 'next/dynamic'
import { useEditorStore } from '@/lib/store/editorStore'
import { useProjectStore } from '@/lib/store/projectStore'
import { FileNode } from '@/lib/types'
import type { Monaco } from '@monaco-editor/react'

// Dynamically import Monaco Editor to exclude it from SSR bundles per blueprint spec
const Editor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center bg-void">
      <p className="font-mono text-sm text-inkFaint animate-pulse">Loading Monaco Editor...</p>
    </div>
  ),
})

export function CodePane() {
  const { activeFileId, fileContents, updateFileContent, markDirty } = useEditorStore()
  const { currentProject } = useProjectStore()

  const activeFile = useMemo(() => {
    if (!currentProject || !activeFileId) return null
    
    function findFile(nodes: FileNode[]): FileNode | null {
      for (const node of nodes) {
        if (node.id === activeFileId) return node
        if (node.children) {
          const found = findFile(node.children)
          if (found) return found
        }
      }
      return null
    }
    return findFile(currentProject.files)
  }, [currentProject, activeFileId])

  if (!activeFileId || !activeFile) {
    return (
      <div className="flex h-full items-center justify-center bg-void">
        <p className="font-mono text-sm text-inkFaint">Select a file to edit</p>
      </div>
    )
  }

  const getMonacoLanguage = (name: string): string => {
    if (name.endsWith('.html')) return 'html'
    if (name.endsWith('.css')) return 'css'
    if (name.endsWith('.js') || name.endsWith('.jsx')) return 'javascript'
    if (name.endsWith('.ts') || name.endsWith('.tsx')) return 'typescript'
    if (name.endsWith('.json')) return 'json'
    return 'plaintext'
  }

  const handleEditorWillMount = (monaco: Monaco) => {
    // Define custom Quark theme per section 1.1 of design blueprint
    monaco.editor.defineTheme('quark-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: '', background: '0A0A0A', foreground: 'FFFFFF' },
        { token: 'keyword', foreground: '4D8DFF', fontStyle: 'bold' },
        { token: 'string', foreground: '3ECF8E' },
        { token: 'comment', foreground: '55555A', fontStyle: 'italic' },
        { token: 'tag', foreground: 'FF4545' },
        { token: 'attribute.name', foreground: '4D8DFF' },
        { token: 'attribute.value', foreground: '3ECF8E' },
        { token: 'number', foreground: '3ECF8E' },
        { token: 'type', foreground: '4D8DFF' },
      ],
      colors: {
        'editor.background': '#0A0A0A',
        'editor.foreground': '#FFFFFF',
        'editor.lineHighlightBackground': '#141414',
        'editorCursor.foreground': '#4D8DFF',
        'editorLineNumber.foreground': '#55555A',
        'editorLineNumber.activeForeground': '#8A8A8F',
        'editorIndentGuide.background': '#2A2A2E',
        'editorIndentGuide.activeBackground': '#4D8DFF',
      },
    })
  }

  const content = fileContents[activeFile.id] !== undefined 
    ? fileContents[activeFile.id] 
    : (activeFile.content || '')

  return (
    <div className="h-full w-full relative bg-void">
      <Editor
        key={activeFile.id}
        height="100%"
        language={getMonacoLanguage(activeFile.name)}
        value={content}
        theme="quark-dark"
        beforeMount={handleEditorWillMount}
        onChange={(val) => {
          if (val !== undefined && activeFileId) {
            updateFileContent(activeFileId, val)
            markDirty(activeFileId)
          }
        }}
        options={{
          fontSize: 13,
          fontFamily: "var(--font-mono), monospace",
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          automaticLayout: true,
          padding: { top: 12, bottom: 12 },
          lineNumbersMinChars: 3,
          renderLineHighlight: 'line',
          smoothScrolling: false,
          tabSize: 2,
        }}
      />
    </div>
  )
}