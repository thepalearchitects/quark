// lib/store/editorStore.ts
import { create } from 'zustand'
import { ConsoleLog } from '@/lib/types'

interface EditorState {
  // open tabs
  openFiles: string[] // file IDs
  activeFileId: string | null

  // buffered file contents (keyed by file ID)
  fileContents: Record<string, string> // fileId -> content
  dirtyFiles: Record<string, boolean> // fileId -> isDirty

  // console state + responsive preview device
  consoleLogs: ConsoleLog[]
  isConsoleOpen: boolean
  activeDevice: 'desktop' | 'tablet' | 'mobile'

  // actions
  openFile: (fileId: string, content?: string) => void
  closeFile: (fileId: string) => void
  setActiveFile: (fileId: string) => void
  updateFileContent: (fileId: string, content: string) => void
  markDirty: (fileId: string) => void
  markClean: (fileId: string) => void
  getFileContent: (fileId: string) => string | undefined

  addConsoleLog: (log: Omit<ConsoleLog, 'id' | 'timestamp'>) => void
  clearConsoleLogs: () => void
  toggleConsole: () => void
  setConsoleOpen: (open: boolean) => void
  setActiveDevice: (device: 'desktop' | 'tablet' | 'mobile') => void
}

export const useEditorStore = create<EditorState>((set, get) => ({
  openFiles: [],
  activeFileId: null,
  fileContents: {},
  dirtyFiles: {},

  consoleLogs: [
    {
      id: 'log-1',
      type: 'info',
      args: ['Quark sandbox ready.'],
      timestamp: new Date().toLocaleTimeString(),
    },
  ],
  isConsoleOpen: false,
  activeDevice: 'desktop',

  openFile: (fileId: string, content = '') => {
    const { openFiles, fileContents } = get()
    if (!openFiles.includes(fileId)) {
      set({
        openFiles: [...openFiles, fileId],
        activeFileId: fileId,
        fileContents: { ...fileContents, [fileId]: content },
      })
    } else {
      set({ activeFileId: fileId })
    }
  },

  closeFile: (fileId: string) => {
    const { openFiles, activeFileId, fileContents, dirtyFiles } = get()
    const newOpenFiles = openFiles.filter((id) => id !== fileId)
    const newFileContents = { ...fileContents }
    delete newFileContents[fileId]
    const newDirtyFiles = { ...dirtyFiles }
    delete newDirtyFiles[fileId]

    let newActiveFileId = activeFileId
    if (activeFileId === fileId) {
      newActiveFileId = newOpenFiles.length > 0 ? newOpenFiles[0] : null
    }

    set({
      openFiles: newOpenFiles,
      activeFileId: newActiveFileId,
      fileContents: newFileContents,
      dirtyFiles: newDirtyFiles,
    })
  },

  setActiveFile: (fileId: string) => {
    set({ activeFileId: fileId })
  },

  updateFileContent: (fileId: string, content: string) => {
    const { fileContents, dirtyFiles } = get()
    const isDifferent = fileContents[fileId] !== content
    set({
      fileContents: { ...fileContents, [fileId]: content },
      dirtyFiles: isDifferent ? { ...dirtyFiles, [fileId]: true } : dirtyFiles,
    })
  },

  markDirty: (fileId: string) => {
    const { dirtyFiles } = get()
    set({
      dirtyFiles: { ...dirtyFiles, [fileId]: true },
    })
  },

  markClean: (fileId: string) => {
    const { dirtyFiles } = get()
    const newDirtyFiles = { ...dirtyFiles }
    delete newDirtyFiles[fileId]
    set({ dirtyFiles: newDirtyFiles })
  },

  getFileContent: (fileId: string) => {
    return get().fileContents[fileId]
  },

  addConsoleLog: (log) =>
    set((state) => ({
      consoleLogs: [
        ...state.consoleLogs,
        {
          ...log,
          id: `log-${Date.now()}-${Math.random()}`,
          timestamp: new Date().toLocaleTimeString(),
        },
      ],
    })),

  clearConsoleLogs: () => set({ consoleLogs: [] }),
  toggleConsole: () => set((state) => ({ isConsoleOpen: !state.isConsoleOpen })),
  setConsoleOpen: (open) => set({ isConsoleOpen: open }),
  setActiveDevice: (device) => set({ activeDevice: device }),
}))