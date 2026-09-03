// app/embed/[id]/page.tsx
'use client'

import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Logo } from '@/components/ui/Logo'
import Link from 'next/link'

interface EmbedPen {
  id: string
  title: string
  files: { name: string; language: string; content: string }[]
}

export default function EmbedPage() {
  const params = useParams()
  const [pen, setPen] = useState<EmbedPen | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isNotFound, setIsNotFound] = useState(false)

  useEffect(() => {
    let cancelled = false
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/projects/${params.id}`)
        const json = await res.json()
        if (cancelled) return
        if (json.success && json.data) {
          const raw = json.data
          setPen({
            id: raw.id,
            title: raw.name,
            files: raw.files || [],
          })
          setIsNotFound(false)
        } else {
          setPen(null)
          setIsNotFound(true)
        }
      } catch (err) {
        if (!cancelled) {
          setPen(null)
          setIsNotFound(true)
        }
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }, 200)
    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [params.id])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-void">
        <div className="font-mono text-sm text-inkFaint animate-pulse">
          Loading...
        </div>
      </div>
    )
  }

  // 404 — Pen not found
  if (isNotFound || !pen) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-void px-4 text-center">
        <Logo variant="white" width={64} height={64} />
        <h1 className="mt-6 font-ui text-2xl font-bold text-ink">Pen not found</h1>
        <p className="mt-2 max-w-md font-mono text-sm text-inkDim">
          This pen doesn&apos;t exist, was deleted, or you followed a broken link.
          The duck can&apos;t fix this one.
        </p>
        <div className="mt-6 flex gap-4">
          <Link href="/explore">
            <button className="border border-quarkBlue px-4 py-2 font-mono text-sm text-quarkBlue hover:bg-quarkBlue hover:text-void transition-colors">
              Explore pens
            </button>
          </Link>
          <Link href="/">
            <button className="border border-line px-4 py-2 font-mono text-sm text-inkDim hover:text-ink hover:border-ink transition-colors">
              Go home
            </button>
          </Link>
        </div>
        <div className="mt-8 flex items-center gap-2 border-t border-line pt-4 font-mono text-xs text-inkFaint">
          <span className="inline-block h-1.5 w-1.5 bg-quarkRed" />
          error · nothing was saved
        </div>
      </div>
    )
  }

  // Combine all files into a single HTML document for preview
  const htmlFile = pen.files.find((f: { name: string }) => f.name === 'index.html')
  const cssFile = pen.files.find((f: { name: string }) => f.name === 'style.css')
  const jsFile = pen.files.find((f: { name: string }) => f.name === 'script.js')

  const htmlContent = htmlFile?.content || '<h1>Hello, Quark!</h1>'
  const cssContent = cssFile?.content || ''
  const jsContent = jsFile?.content || ''

  const srcDoc = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${pen.title}</title>
  <style>${cssContent}</style>
</head>
<body>
  ${htmlContent}
  <script>${jsContent}<\/script>
</body>
</html>
  `

  return (
    <div className="min-h-screen bg-void">
      <iframe
        srcDoc={srcDoc}
        sandbox="allow-scripts"
        className="h-screen w-full border-none"
        title={`${pen.title} — embed`}
      />
    </div>
  )
}