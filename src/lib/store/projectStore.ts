// lib/store/projectStore.ts
import { create } from 'zustand'
import { Project, FileNode } from '@/lib/types'
import { get as apiGet, post as apiPost, put as apiPut, del as apiDelete } from '@/lib/api-client'

interface ProjectState {
  currentProject: Project | null
  projects: Project[]
  isLoading: boolean
  error: string | null

  // Actions
  setCurrentProject: (project: Project | null) => void
  setProjects: (projects: Project[]) => void
  loadProjects: () => Promise<void>
  createProject: (name: string) => Promise<Project>
  updateProject: (project: Project) => Promise<void>
  updateFileTree: (fileTree: FileNode[]) => void
  updateDependencies: (dependencies: Record<string, string>) => void
  updateVisibility: (visibility: 'private' | 'public' | 'unlisted') => void
  setIsLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  deleteProject: (id: string) => Promise<void>
  reset: () => void
}

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
  },

  loadProjects: async () => {
    set({ isLoading: true, error: null })
    try {
      const { data, error } = await apiGet<Project[]>('/api/projects')
      if (error) {
        set({ error, projects: [], isLoading: false })
        return
      }
      set({ projects: data || [], isLoading: false })
    } catch (e) {
      console.error('Failed to load projects:', e)
      set({ error: 'Failed to load projects', isLoading: false })
    }
  },

  createProject: async (name: string) => {
    const { data, error } = await apiPost<Project>('/api/projects', { name: name || 'Untitled Pen' })
    if (error || !data) {
      set({ error: error || 'Failed to create project' })
      throw new Error(error || 'Failed to create project')
    }
    const newProject = data
    set({
      projects: [newProject, ...get().projects],
      currentProject: newProject,
    })
    return newProject
  },

  updateProject: async (project: Project) => {
    const updatedProjects = get().projects.map((p) => (p.id === project.id ? project : p))
    set({
      currentProject: project,
      projects: updatedProjects,
    })
    const { error } = await apiPut<Project>(`/api/projects/${project.id}`, project)
    if (error) {
      set({ error })
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
    set({
      currentProject: updatedProject,
      projects: get().projects.map((p) => (p.id === current.id ? updatedProject : p)),
    })
  },

  updateDependencies: (dependencies: Record<string, string>) => {
    const current = get().currentProject
    if (!current) return
    const updatedProject = {
      ...current,
      dependencies,
      updatedAt: new Date().toISOString(),
    }
    set({
      currentProject: updatedProject,
      projects: get().projects.map((p) => (p.id === current.id ? updatedProject : p)),
    })
  },

  updateVisibility: (visibility: 'private' | 'public' | 'unlisted') => {
    const current = get().currentProject
    if (!current) return
    const updatedProject = {
      ...current,
      visibility,
      updatedAt: new Date().toISOString(),
    }
    set({
      currentProject: updatedProject,
      projects: get().projects.map((p) => (p.id === current.id ? updatedProject : p)),
    })
    void apiPut<Project>(`/api/projects/${current.id}`, { visibility })
  },

  setIsLoading: (loading: boolean) => {
    set({ isLoading: loading })
  },

  setError: (error: string | null) => {
    set({ error })
  },

  deleteProject: async (id: string) => {
    const updatedProjects = get().projects.filter((p) => p.id !== id)
    set({
      projects: updatedProjects,
      currentProject: get().currentProject?.id === id ? null : get().currentProject,
    })
    const { error } = await apiDelete<{ id: string }>(`/api/projects/${id}`)
    if (error) set({ error })
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
