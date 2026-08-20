// lib/mock-data.ts
import { Project, FileNode, User, Comment, Report } from './types'

// ---------- MOCK FILES ----------
const mockFileTree1: FileNode[] = [
  {
    id: 'file-1-1',
    name: 'index.html',
    type: 'file',
    language: 'html',
    content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hello, Quark!</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <h1>Hello, Quark!</h1>
    <p>Write code. See it live. Share it instantly.</p>
    <button id="clickMe">Click me</button>
  </div>
  <script src="script.js"></script>
</body>
</html>`,
  },
  {
    id: 'file-1-2',
    name: 'style.css',
    type: 'file',
    language: 'css',
    content: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: #0A0A0A;
  color: #FFFFFF;
  font-family: 'Space Grotesk', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.container {
  text-align: center;
  border: 1px solid #2A2A2E;
  padding: 48px;
}

h1 {
  font-size: 40px;
  letter-spacing: -0.02em;
}

p {
  color: #8A8A8F;
  margin-top: 8px;
}

button {
  margin-top: 24px;
  background: transparent;
  border: 1px solid #4D8DFF;
  color: #4D8DFF;
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  padding: 10px 20px;
  cursor: pointer;
}

button:hover {
  transform: translate(-3px, -3px);
  box-shadow: 3px 3px 0 #4D8DFF;
}`,
  },
  {
    id: 'file-1-3',
    name: 'script.js',
    type: 'file',
    language: 'js',
    content: `// Quark — code editor
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('clickMe')
  const container = document.querySelector('.container')
  let count = 0

  btn.addEventListener('click', () => {
    count++
    const badge = document.createElement('span')
    badge.textContent = \` 🦆 \${count}\`
    badge.style.fontSize = '24px'
    badge.style.display = 'block'
    badge.style.marginTop = '16px'
    badge.style.fontFamily = 'JetBrains Mono, monospace'
    container.appendChild(badge)
  })
})`,
  },
]

const mockFileTree2: FileNode[] = [
  {
    id: 'file-2-1',
    name: 'index.html',
    type: 'file',
    language: 'html',
    content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portfolio — quack</title>
</head>
<body>
  <h1>🐤 quack.</h1>
  <p>just a duck building things.</p>
</body>
</html>`,
  },
]

const mockFileTree3: FileNode[] = [
  {
    id: 'file-3-1',
    name: 'index.html',
    type: 'file',
    language: 'html',
    content: `<h1>🚀 Coming soon</h1>`,
  },
  {
    id: 'file-3-2',
    name: 'style.css',
    type: 'file',
    language: 'css',
    content: `/* still cooking */`,
  },
  {
    id: 'file-3-3',
    name: 'script.js',
    type: 'file',
    language: 'js',
    content: `// stay tuned`,
  },
]

// ---------- MOCK PROJECTS ----------
export const mockProjects: Project[] = [
  {
    id: 'proj-1',
    name: 'Hello Quark',
    ownerId: 'user-1',
    files: mockFileTree1,
    dependencies: {},
    visibility: 'public',
    tags: ['html', 'css', 'javascript', 'demo'],
    createdAt: '2026-08-18T12:00:00Z',
    updatedAt: '2026-08-18T14:30:00Z',
    publishedAt: '2026-08-18T14:30:00Z',
  },
  {
    id: 'proj-2',
    name: 'Portfolio — quack',
    ownerId: 'user-1',
    files: mockFileTree2,
    dependencies: {},
    visibility: 'public',
    tags: ['portfolio', 'html'],
    createdAt: '2026-08-17T10:00:00Z',
    updatedAt: '2026-08-17T11:15:00Z',
    publishedAt: '2026-08-17T11:15:00Z',
  },
  {
    id: 'proj-3',
    name: 'Secret Project',
    ownerId: 'user-1',
    files: mockFileTree3,
    dependencies: {},
    visibility: 'private',
    tags: ['wip', 'draft'],
    createdAt: '2026-08-16T22:00:00Z',
    updatedAt: '2026-08-16T22:00:00Z',
  },
]

// ---------- MOCK USERS ----------
export const mockUsers: User[] = [
  {
    id: 'user-1',
    email: 'maou@quark.dev',
    username: 'maou',
    displayName: 'Maou',
    plan: 'free',
    publishedCount: 2,
    maxPublished: 3,
    createdAt: '2026-08-01T00:00:00Z',
    emailVerified: true,
  },
]

// ---------- MOCK COMMENTS ----------
export const mockComments: Comment[] = [
  {
    id: 'comment-1',
    projectId: 'proj-1',
    userId: 'user-1',
    content: 'Love this! The snap shadow is so clean.',
    createdAt: '2026-08-18T15:00:00Z',
    updatedAt: '2026-08-18T15:00:00Z',
  },
]

// ---------- MOCK REPORTS ----------
export const mockReports: Report[] = [
  {
    id: 'report-1',
    projectId: 'proj-2',
    reporterId: 'user-1',
    reason: 'Inappropriate content',
    status: 'pending',
    createdAt: '2026-08-18T16:00:00Z',
  },
]

// ---------- GETTERS ----------
export function getProjectById(id: string): Project | undefined {
  return mockProjects.find((p) => p.id === id)
}

export function getProjectsByOwner(ownerId: string): Project[] {
  return mockProjects.filter((p) => p.ownerId === ownerId)
}

export function getPublicProjects(): Project[] {
  return mockProjects.filter((p) => p.visibility === 'public')
}

export function getUserById(id: string): User | undefined {
  return mockUsers.find((u) => u.id === id)
}

export function getCommentsByProject(projectId: string): Comment[] {
  return mockComments.filter((c) => c.projectId === projectId)
}