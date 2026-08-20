// components/marketing/LiveDemoEditor.tsx
'use client'

import { useState, useEffect, useRef } from 'react'

const htmlTemplate = `<!DOCTYPE html>
<html>
<head>
  <title>Quark</title>
  <style>
    body { font-family: system-ui; max-width: 600px; margin: 48px auto; padding: 0 24px; background: #0A0A0A; color: #FFFFFF; }
    h1 { font-size: 40px; font-weight: 700; letter-spacing: -0.02em; }
    p { color: #8A8A8F; margin-top: 8px; }
  </style>
</head>
<body>
  <h1>Explain it to the duck.</h1>
  <p>Ship it to the web.</p>
</body>
</html>`

export function LiveDemoEditor() {
  const [html, setHtml] = useState(htmlTemplate)
  const [srcDoc, setSrcDoc] = useState('')
  const iframeRef = useRef<HTMLIFrameElement>(null)

  // Debounce iframe updates
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(html)
    }, 300)
    return () => clearTimeout(timeout)
  }, [html])

  return (
    <div className="w-full border border-line bg-surface2">
      {/* Split view: code editor + preview */}
      <div className="grid grid-cols-1 gap-0 md:grid-cols-2">
        {/* Left: Code Editor */}
        <div className="border-b border-line p-3 md:border-b-0 md:border-r">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-wider text-quarkBlue">
              index.html
            </span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-inkFaint">
              HTML
            </span>
          </div>
          <textarea
            value={html}
            onChange={(e) => setHtml(e.target.value)}
            className="h-64 w-full resize-none bg-transparent font-mono text-sm leading-relaxed text-ink outline-none md:h-72"
            spellCheck={false}
          />
        </div>

        {/* Right: Live Preview */}
        <div className="flex flex-col p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-wider text-quarkGreen">
              ● live preview
            </span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-inkFaint">
              rendered
            </span>
          </div>
          <iframe
            ref={iframeRef}
            srcDoc={srcDoc}
            sandbox="allow-scripts"
            className="h-64 w-full border border-line bg-void md:h-72"
            title="Live preview"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-line px-3 py-2 font-mono text-[10px] uppercase tracking-wider text-inkFaint">
        <span>UTF-8 · HTML</span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-1.5 w-1.5 bg-quarkGreen" />
          saved
        </span>
      </div>
    </div>
  )
}