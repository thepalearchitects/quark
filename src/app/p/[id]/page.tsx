// app/p/[id]/page.tsx
'use client'

import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Logo } from '@/components/ui/Logo'
import { buildSrcDoc } from '@/lib/preview/buildSrcDoc'
import { useProjectStore } from '@/lib/store/projectStore'
import { useUser } from '@clerk/nextjs'
import { FileNode } from '@/lib/types'

interface Pen {
  id: string
  title: string
  description: string
  author: string
  tags: string[]
  files: FileNode[]
  visibility: string
  createdAt: string
  updatedAt: string
  forks: number
  views: number
}

// Mock data — will come from backend later
const getPen = (id: string): Pen | null => {
  if (id === '404' || id === 'deleted' || id === 'nonexistent') {
    return null
  }

  return {
    id,
    title: 'Hello Quark',
    description: 'A simple HTML/CSS demo showing the Quark design system.',
    author: 'maou',
    tags: ['html', 'css', 'demo'],
    files: [
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
        content: `body {
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
  color: #4D8DFF;
}`,
      },
      {
        id: 'file-1-3',
        name: 'script.js',
        type: 'file',
        language: 'js',
        content: `console.log("Quark initialized!");`,
      },
    ],
    visibility: 'public',
    createdAt: '2 days ago',
    updatedAt: '1 day ago',
    forks: 12,
    views: 89,
  }
}

export default function PublicPenPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useUser()
  const { createProject, updateProject } = useProjectStore()

  const [pen, setPen] = useState<Pen | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isNotFound, setIsNotFound] = useState(false)
  const [activeFile, setActiveFile] = useState('index.html')
  const [showEmbedModal, setShowEmbedModal] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      const data = getPen(params.id as string)
      if (data) {
        setPen(data)
        setIsNotFound(false)
      } else {
        setPen(null)
        setIsNotFound(true)
      }
      setIsLoading(false)
    }, 600)
    return () => clearTimeout(timer)
  }, [params.id])

  const handleCopyEmbed = () => {
    const embedCode = `<iframe src="${window.location.origin}/embed/${pen.id}" width="100%" height="400" style="border: none;" allow="scripts"></iframe>`
    navigator.clipboard.writeText(embedCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleFork = async () => {
    if (!pen) return
    
    // Create new project in the store
    const forkedProject = createProject(pen.title + ' (Fork)')
    
    // Copy pen files into new project
    forkedProject.files = pen.files.map((f: FileNode) => ({
      ...f,
      id: `file-${Date.now()}-${Math.random()}`,
    }))
    
    updateProject(forkedProject)

    const forkerName = user?.fullName || user?.username || 'Guest Developer'

    // Send Fork email notification to author
    fetch('/api/email/fork', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ownerEmail: 'maou@quark.dev', // Mock author email
        ownerName: pen.author,
        forkerName,
        penTitle: pen.title,
        penUrl: `${window.location.origin}/p/${pen.id}`,
      }),
    }).catch((err) => console.error('Failed to send fork email:', err))

    // Redirect to the newly created project in the editor workspace
    router.push(`/pen/${forkedProject.id}`)
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-void">
        <div className="font-mono text-sm text-inkFaint animate-pulse">
          Loading pen...
        </div>
      </div>
    )
  }

  if (isNotFound || !pen) {
    return (
      <div className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center bg-void px-4 text-center">
        <Logo variant="white" width={64} height={64} />
        <h1 className="mt-6 font-ui text-2xl font-bold text-ink">Pen not found</h1>
        <p className="mt-2 max-w-md font-mono text-sm text-inkDim">
          This pen doesn&apos;t exist, was deleted, or you followed a broken link.
          The duck can&apos;t fix this one.
        </p>
        <div className="mt-6 flex gap-4">
          <Link href="/explore">
            <Button variant="primary">Explore pens</Button>
          </Link>
          <Link href="/">
            <Button variant="secondary">Go home</Button>
          </Link>
        </div>
        <div className="mt-8 flex items-center gap-2 border-t border-line pt-4 font-mono text-xs text-inkFaint">
          <span className="inline-block h-1.5 w-1.5 bg-quarkRed" />
          error · nothing was saved
        </div>
      </div>
    )
  }

  const activeFileContent = pen.files.find((f: FileNode) => f.name === activeFile)?.content || ''
  const srcDoc = buildSrcDoc(pen.files)

  return (
    <div className="min-h-screen bg-void">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 border-b border-line bg-void/90 backdrop-blur-md px-4 py-3 md:px-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <Logo variant="white" width={28} height={28} />
            <span className="font-mono text-sm font-bold text-ink">Quark</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/sign-in">
              <Button variant="secondary" className="min-h-[36px] px-4 text-xs">
                Sign in
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button variant="primary" className="min-h-[36px] px-4 text-xs">
                Get started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Pen Content */}
      <main className="mx-auto max-w-6xl px-4 py-6 md:px-8">
        {/* Header */}
        <div className="border-b border-line pb-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="font-ui text-2xl font-bold text-ink md:text-3xl">
                  {pen.title}
                </h1>
                <Badge variant="live" className="text-[10px]">
                  {pen.visibility}
                </Badge>
              </div>
              <p className="mt-1 font-mono text-sm text-inkDim">{pen.description}</p>
              <div className="mt-3 flex flex-wrap items-center gap-4">
                <span className="font-mono text-sm text-ink">by {pen.author}</span>
                <span className="font-mono text-xs text-inkFaint">•</span>
                <span className="font-mono text-xs text-inkFaint">Updated {pen.updatedAt}</span>
                <span className="font-mono text-xs text-inkFaint">•</span>
                <span className="font-mono text-xs text-inkFaint">{pen.forks} forks</span>
                <span className="font-mono text-xs text-inkFaint">•</span>
                <span className="font-mono text-xs text-inkFaint">{pen.views} views</span>
              </div>
              {pen.tags.length > 0 && (
                <div className="mt-3 flex gap-1.5">
                  {pen.tags.map((tag: string) => (
                    <Badge key={tag} variant="info" className="text-[10px]">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            <div className="flex gap-3">
              <Link href={`/embed/${pen.id}`} target="_blank">
                <Button variant="secondary" className="min-h-[40px]">
                  View embed
                </Button>
              </Link>
              <Button
                variant="secondary"
                className="min-h-[40px]"
                onClick={() => setShowEmbedModal(true)}
              >
                Get code
              </Button>
              <Button variant="secondary" className="min-h-[40px]" onClick={handleFork}>
                Fork
              </Button>
            </div>
          </div>
        </div>

        {/* Editor + Preview */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {/* Code Editor */}
          <div className="border border-line bg-surface2">
            <div className="flex items-center gap-2 border-b border-line px-3 py-2 overflow-x-auto">
              {pen.files.map((file: FileNode) => (
                <button
                  key={file.name}
                  onClick={() => setActiveFile(file.name)}
                  className={`font-mono text-xs px-3 py-1 transition-colors whitespace-nowrap ${
                    activeFile === file.name
                      ? 'bg-quarkBlue/10 text-quarkBlue border-b-2 border-quarkBlue'
                      : 'text-inkFaint hover:text-ink'
                  }`}
                >
                  {file.name}
                </button>
              ))}
            </div>
            <div className="p-4">
              <pre className="font-mono text-sm leading-relaxed text-ink whitespace-pre-wrap">
                {activeFileContent}
              </pre>
            </div>
          </div>

          {/* Live Preview */}
          <div className="border border-line bg-surface2">
            <div className="flex items-center justify-between border-b border-line px-3 py-2">
              <span className="font-mono text-xs uppercase tracking-wider text-quarkGreen">
                ● Live Preview
              </span>
              <span className="font-mono text-xs text-inkFaint">Desktop</span>
            </div>
            <div className="flex h-96 items-center justify-center border border-line bg-void m-3">
              <iframe
                srcDoc={srcDoc}
                title={pen.title}
                sandbox="allow-scripts"
                className="w-full h-full border-none bg-void"
              />
            </div>
          </div>
        </div>
      </main>

      {/* Embed Modal */}
      {showEmbedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-void/80 p-4">
          <div className="max-w-lg w-full border border-line bg-surface p-6 shadow-snap-blue">
            <div className="flex items-center justify-between">
              <h3 className="font-ui text-xl font-bold text-ink">Embed this pen</h3>
              <button
                onClick={() => setShowEmbedModal(false)}
                className="font-mono text-xl text-inkFaint hover:text-ink transition-colors"
              >
                ✕
              </button>
            </div>
            <p className="mt-2 font-mono text-sm text-inkDim">
              Copy the code below to embed this pen on your site.
            </p>
            <div className="mt-4 border border-line bg-surface2 p-3">
              <code className="font-mono text-xs text-ink break-all">
                {`<iframe src="${window.location.origin}/embed/${pen.id}" width="100%" height="400" style="border: none;" allow="scripts"></iframe>`}
              </code>
            </div>
            <button
              onClick={handleCopyEmbed}
              className="mt-4 border border-quarkBlue px-4 py-2 font-mono text-sm text-quarkBlue hover:bg-quarkBlue hover:text-void transition-colors"
            >
              {copied ? '✓ Copied!' : 'Copy embed code'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}