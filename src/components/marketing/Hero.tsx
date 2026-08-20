// components/marketing/Hero.tsx
'use client'

import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const codeSnippets = [
  `<!DOCTYPE html>
<html>
<head>
  <title>Hello, Quark</title>
</head>
<body>
  <h1>🦆 Write code.</h1>
</body>
</html>`,

  `.container {
  background: #0A0A0A;
  border: 1px solid #2A2A2E;
  padding: 48px;
}

h1 {
  font-size: 40px;
  letter-spacing: -0.02em;
}`,

  `document.addEventListener('DOMContentLoaded', () => {
  const duck = document.querySelector('.duck')
  duck?.addEventListener('click', () => {
    alert('🦆 Quack!')
  })
})`,
]

export function Hero() {
  const [currentSnippet, setCurrentSnippet] = useState(0)
  const [isTyping, setIsTyping] = useState(true)
  const [displayText, setDisplayText] = useState('')
  const [charIndex, setCharIndex] = useState(0)

  // Rotate snippets
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSnippet((prev) => (prev + 1) % codeSnippets.length)
      setDisplayText('')
      setCharIndex(0)
      setIsTyping(true)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  // Typing effect
  useEffect(() => {
    if (!isTyping) return
    const snippet = codeSnippets[currentSnippet]
    if (charIndex < snippet.length) {
      const timeout = setTimeout(() => {
        setDisplayText(snippet.slice(0, charIndex + 1))
        setCharIndex(charIndex + 1)
      }, 12)
      return () => clearTimeout(timeout)
    } else {
      setTimeout(() => setIsTyping(false), 0)
      // Pause before switching
      const pause = setTimeout(() => {
        const next = (currentSnippet + 1) % codeSnippets.length
        setCurrentSnippet(next)
        setDisplayText('')
        setCharIndex(0)
        setIsTyping(true)
      }, 2000)
      return () => clearTimeout(pause)
    }
  }, [charIndex, currentSnippet, isTyping])

  return (
    <section className="relative min-h-[calc(100vh-80px)] overflow-hidden border-b border-line px-4 py-16 md:px-8">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '48px 48px'
        }} />
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left — Content */}
        <div className="flex flex-col justify-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 self-start border border-quarkBlue px-3 py-1 font-mono text-xs uppercase tracking-wider text-quarkBlue">
            <span className="inline-block h-1.5 w-1.5 bg-quarkBlue" />
            v1.0 — Now in beta
          </div>

          <h1 className="font-ui text-4xl font-bold leading-[1.1] tracking-tight text-ink md:text-5xl lg:text-6xl">
            Write code.
            <br />
            See it live.
            <br />
            <span className="text-quarkBlue">Share instantly.</span>
          </h1>

          <p className="mt-4 max-w-md font-mono text-sm text-inkDim md:text-base">
            A no-install HTML, CSS, and JS editor that lives in your browser.
            Write code, see it update, share the link. No account required to
            view a public pen.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/sign-up">
              <Button variant="primary" className="min-h-[48px] px-8 text-base">
                Start coding →
              </Button>
            </Link>
            <Link href="/explore">
              <Button variant="secondary" className="min-h-[48px] px-8 text-base">
                Explore pens
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-12 flex gap-8 border-t border-line pt-8">
            <div>
              <span className="block font-mono text-2xl font-bold text-ink">0</span>
              <span className="font-mono text-xs uppercase tracking-wider text-inkFaint">
                Pens published
              </span>
            </div>
            <div>
              <span className="block font-mono text-2xl font-bold text-ink">∞</span>
              <span className="font-mono text-xs uppercase tracking-wider text-inkFaint">
                Free to start
              </span>
            </div>
            <div>
              <span className="block font-mono text-2xl font-bold text-ink">🦆</span>
              <span className="font-mono text-xs uppercase tracking-wider text-inkFaint">
                Rubber duck included
              </span>
            </div>
          </div>
        </div>

        {/* Right — Code Editor Preview */}
        <div className="flex items-center">
          <div className="w-full border border-line bg-surface2 p-4 shadow-snap-blue">
            {/* Editor Tabs */}
            <div className="flex items-center gap-4 border-b border-line pb-2 font-mono text-xs text-inkFaint">
              <span className="text-quarkBlue">index.html</span>
              <span>style.css</span>
              <span>script.js</span>
              <span className="ml-auto text-quarkGreen">● live</span>
            </div>

            {/* Code Display */}
            <div className="mt-4 font-mono text-xs leading-relaxed text-inkDim md:text-sm">
              <pre className="whitespace-pre-wrap break-words text-ink">
                <code>{displayText}</code>
                {isTyping && (
                  <span className="inline-block h-4 w-0.5 animate-pulse bg-quarkBlue" />
                )}
              </pre>
            </div>

            {/* Status Bar */}
            <div className="mt-4 flex items-center justify-between border-t border-line pt-2 font-mono text-[10px] uppercase tracking-wider text-inkFaint">
              <span>Ln 1 • Col 1</span>
              <span>UTF-8 • HTML</span>
              <span className="text-quarkGreen">● saved</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}