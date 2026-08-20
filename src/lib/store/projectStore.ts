// lib/store/projectStore.ts
import { create } from 'zustand'
import { Project, FileNode } from '@/lib/types'
import { mockProjects } from '@/lib/mock-data'

interface ProjectState {
  currentProject: Project | null
  projects: Project[]
  isLoading: boolean
  error: string | null

  // Actions
  setCurrentProject: (project: Project | null) => void
  setProjects: (projects: Project[]) => void
  loadProjects: () => void
  createProject: (name: string) => Project
  updateProject: (project: Project) => void
  updateFileTree: (fileTree: FileNode[]) => void
  updateDependencies: (dependencies: Record<string, string>) => void
  updateVisibility: (visibility: 'private' | 'public' | 'unlisted') => void
  setIsLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  deleteProject: (id: string) => void
  reset: () => void
}

const STORAGE_KEY = 'quark_projects'

export const useProjectStore = create<ProjectState>((set, get) => ({
  currentProject: null,
  projects: [],
  isLoading: false,
  error: null,

  setCurrentProject: (project: Project | null) => {
    set({ currentProject: project })
  },

  setProjects: (projects: Project[]) => {
    set({ projects })
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
    }
  },

  loadProjects: () => {
    set({ isLoading: true })
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        try {
          const parsed = JSON.parse(stored) as Project[]
          if (parsed && parsed.length > 0) {
            set({ projects: parsed, isLoading: false })
            return
          }
        } catch (e) {
          console.error('Failed to parse projects from local storage:', e)
        }
      }
    }
    // nothing in localStorage yet — seed from mock data
    set({ projects: mockProjects, isLoading: false })
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mockProjects))
    }
  },

  createProject: (name: string) => {
    const newProject: Project = {
      id: `pen-${Date.now()}`,
      name: name || 'Untitled Pen',
      ownerId: 'user-current',
      files: [
        {
          id: `file-html-${Date.now()}`,
          name: 'index.html',
          type: 'file',
          language: 'html',
          content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Pen</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>Hello from Quark!</h1>
  <p>Modify index.html, style.css, or script.js and see the results instantly.</p>
  <script src="script.js"></script>
</body>
</html>`,
        },
        {
          id: `file-css-${Date.now()}`,
          name: 'style.css',
          type: 'file',
          language: 'css',
          content: `body {
  background-color: #0A0A0A;
  color: #FFFFFF;
  font-family: 'Space Grotesk', system-ui, sans-serif;
  padding: 32px;
  text-align: center;
}
h1 {
  color: #4D8DFF;
}`,
        },
        {
          id: `file-js-${Date.now()}`,
          name: 'script.js',
          type: 'file',
          language: 'js',
          content: `console.log('Quark live preview initialized!');`,
        },
      ],
      dependencies: {},
      visibility: 'private',
      tags: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const updatedProjects = [newProject, ...get().projects]
    set({
      projects: updatedProjects,
      currentProject: newProject,
    })
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProjects))
    }

    return newProject
  },

  updateProject: (project: Project) => {
    const updatedProjects = get().projects.map((p) => (p.id === project.id ? project : p))
    set({
      currentProject: project,
      projects: updatedProjects,
    })
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProjects))
    }
  },

  updateFileTree: (fileTree: FileNode[]) => {
    const current = get().currentProject
    if (!current) return
    const updatedProject = {
      ...current,
      files: fileTree,
      updatedAt: new Date().toISOString(),
    }
    const updatedProjects = get().projects.map((p) => (p.id === current.id ? updatedProject : p))
    set({
      currentProject: updatedProject,
      projects: updatedProjects,
    })
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProjects))
    }
  },

  updateDependencies: (dependencies: Record<string, string>) => {
    const current = get().currentProject
    if (!current) return
    const updatedProject = {
      ...current,
      dependencies,
      updatedAt: new Date().toISOString(),
    }
    const updatedProjects = get().projects.map((p) => (p.id === current.id ? updatedProject : p))
    set({
      currentProject: updatedProject,
      projects: updatedProjects,
    })
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProjects))
    }
  },

  updateVisibility: (visibility: 'private' | 'public' | 'unlisted') => {
    const current = get().currentProject
    if (!current) return
    const updatedProject = {
      ...current,
      visibility,
      updatedAt: new Date().toISOString(),
    }
    const updatedProjects = get().projects.map((p) => (p.id === current.id ? updatedProject : p))
    set({
      currentProject: updatedProject,
      projects: updatedProjects,
    })
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProjects))
    }
  },

  setIsLoading: (loading: boolean) => {
    set({ isLoading: loading })
  },

  setError: (error: string | null) => {
    set({ error })
  },

  deleteProject: (id: string) => {
    const updatedProjects = get().projects.filter((p) => p.id !== id)
    set({
      projects: updatedProjects,
      currentProject: get().currentProject?.id === id ? null : get().currentProject,
    })
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProjects))
    }
  },

  reset: () => {
    set({
      currentProject: null,
      projects: [],
      isLoading: false,
      error: null,
    })
  },
}))