// lib/types.ts

export type FileNode = {
  id: string
  name: string
  type: 'file' | 'folder'
  language: 'html' | 'css' | 'js' | 'ts' | 'json' | 'markdown'
  content?: string
  children?: FileNode[]
}

export type ProjectVisibility = 'private' | 'public' | 'unlisted'

export type Project = {
  id: string
  name: string
  ownerId: string
  files: FileNode[]
  dependencies: Record<string, string> // npm package -> version
  visibility: ProjectVisibility
  tags: string[]
  createdAt: string
  updatedAt: string
  publishedAt?: string
}

export type User = {
  id: string
  email: string
  username: string
  displayName?: string
  avatarUrl?: string
  plan: 'free' | 'paid'
  publishedCount: number
  maxPublished: number
  createdAt: string
  emailVerified: boolean
}

export type Session = {
  user: User
  expires: string
}

export type Comment = {
  id: string
  projectId: string
  userId: string
  content: string
  createdAt: string
  updatedAt: string
}

export type Report = {
  id: string
  projectId: string
  reporterId: string
  reason: string
  status: 'pending' | 'reviewed' | 'dismissed'
  createdAt: string
}

export type Notification = {
  id: string
  userId: string
  type: 'fork' | 'comment' | 'billing' | 'system'
  message: string
  read: boolean
  link?: string
  createdAt: string
}

export type ApiResponse<T = unknown> = {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface ConsoleLog {
  id: string
  type: 'log' | 'warn' | 'error' | 'info'
  args: string[]
  timestamp: string
}