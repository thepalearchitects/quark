// app/(app)/pen/[id]/page.tsx
'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { FileTree } from '@/components/editor/FileTree'
import { TabBar } from '@/components/editor/TabBar'
import { CodePane } from '@/components/editor/CodePane'
import { PreviewPane } from '@/components/editor/PreviewPane'
import { EditorTopBar } from '@/components/editor/EditorTopBar'
import { ConsoleDrawer } from '@/components/editor/ConsoleDrawer'
import { useEditorStore } from '@/lib/store/editorStore'
import { useProjectStore } from '@/lib/store/projectStore'
import type { Project } from '@/lib/types'

export default function EditorPage() {
  const params = useParams()
  const router = useRouter()
  const penId = params.id as string

  const { openFile, fileContents, openFiles } = useEditorStore()
  const { currentProject, projects, isLoading: isStoreLoading, loadProjects, createProject, setCurrentProject } = useProjectStore()
  const [isLoading, setIsLoading] = useState(true)

  // Initialize and load project list
  useEffect(() => {
    loadProjects()
  }, [loadProjects])

  // Handle route loading and new pen creation
  useEffect(() => {
    if (isStoreLoading) return

    if (penId === 'new') {
      createProject('Untitled Pen').then((newPen) => {
        newPen.files.forEach((file) => {
          if (file.content !== undefined) {
            openFile(file.id, file.content)
          }
        })
        router.replace(`/pen/${newPen.id}`)
      })
      return
    }

    const project = projects.find((p) => p.id === penId)
    if (project) {
      setCurrentProject(project)
      
      // Load file content buffers into editorStore if not already there
      project.files.forEach(file => {
        if (file.content !== undefined && fileContents[file.id] === undefined) {
          openFile(file.id, file.content)
        }
      })

      // Set active file if none selected
      if (openFiles.length === 0 && project.files.length > 0) {
        openFile(project.files[0].id, project.files[0].content || '')
      }

      setTimeout(() => setIsLoading(false), 0)
    } else {
      // Pen not found in the owner's list — try fetching it directly by id
      fetch(`/api/projects/${penId}`)
        .then((res) => res.json())
        .then((json) => {
          if (json.success && json.data) {
            const project = json.data as Project
            setCurrentProject(project)
            project.files.forEach((file) => {
              if (file.content !== undefined && fileContents[file.id] === undefined) {
                openFile(file.id, file.content)
              }
            })
            if (openFiles.length === 0 && project.files.length > 0) {
              openFile(project.files[0].id, project.files[0].content || '')
            }
          }
          setIsLoading(false)
        })
        .catch(() => setIsLoading(false))
    }
  }, [penId, projects, isStoreLoading, createProject, openFile, setCurrentProject, router, fileContents, openFiles])

  if (isLoading || !currentProject) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-void">
        <div className="font-mono text-sm text-inkFaint animate-pulse">
          Loading editor...
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen flex-col bg-void overflow-hidden">
      <EditorTopBar />

      <div className="flex flex-1 overflow-hidden relative">
        {/* File Tree */}
        <div className="w-52 border-r border-line bg-surface2 p-2 overflow-y-auto">
          <FileTree />
        </div>

        {/* Code Editor Column */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <TabBar />
          <div className="flex-1 overflow-hidden">
            <CodePane />
          </div>
        </div>

        {/* Preview Pane Column */}
        <div className="w-1/2 border-l border-line bg-surface2 overflow-hidden">
          <PreviewPane />
        </div>
      </div>

      {/* Slide up Console Drawer */}
      <ConsoleDrawer />
    </div>
  )
}