// app/(marketing)/docs/page.tsx
import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'

export default async function DocsPage() {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return (
    <div className="min-h-screen border-b border-line bg-void">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-24">
        {/* ===== HERO ===== */}
        <div className="mb-20 text-center">
          <Badge variant="info" className="mb-4">
            Documentation
          </Badge>
          <h1 className="font-ui text-4xl font-bold text-ink md:text-6xl">
            Quark Docs
          </h1>
          <p className="mx-auto mt-4 max-w-2xl font-mono text-base text-inkDim md:text-lg">
            Everything you need to build with Quark — all in one place.
          </p>
        </div>

        {/* ===== SEARCH ===== */}
        <div className="mb-16">
          <div className="relative">
            <input
              type="text"
              placeholder="Search the docs..."
              className="w-full border border-line bg-surface2 px-6 py-4 font-mono text-base text-ink placeholder:text-inkFaint focus:border-quarkBlue focus:shadow-snap-blue focus:outline-none"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-xs text-inkFaint">
              ⌘K
            </span>
          </div>
        </div>

        {/* ============================================================ */}
        {/* ===== SECTION 1: GETTING STARTED ===== */}
        {/* ============================================================ */}
        <section className="mb-20">
          <div className="mb-8 flex items-center gap-4">
            <span className="font-mono text-xs uppercase tracking-wider text-quarkBlue">
              Getting Started
            </span>
            <span className="flex-1 border-t border-line" />
          </div>

          {/* Introduction */}
          <div className="mb-8 border border-line bg-surface p-8">
            <h2 className="font-ui text-2xl font-bold text-ink">Introduction</h2>
            <p className="mt-2 font-mono text-sm text-inkDim">
              What is Quark and why use it?
            </p>
            <div className="mt-4 font-mono text-sm leading-relaxed text-inkDim space-y-4">
              <p>
                Quark is a browser-based frontend code editor. Think of it as a
                lightweight, shareable playground for HTML, CSS, and JavaScript
                — but with real editor power.
              </p>
              <p>
                <strong className="text-ink">What makes Quark different?</strong>
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>No installation required — open a link and start typing</li>
                <li>Live preview — see your code update instantly</li>
                <li>Share &amp; fork — every pen is shareable and forkable</li>
                <li>Monaco Editor — the same engine as VS Code</li>
                <li>CDN imports — pull any npm package via esm.sh</li>
              </ul>
              <p>
                <strong className="text-ink">Who is it for?</strong>
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Frontend developers — quick prototyping and experimentation</li>
                <li>Designers — test UI ideas without setting up a project</li>
                <li>Educators — share code examples with students</li>
                <li>Anyone — who wants to write code without friction</li>
              </ul>
            </div>
          </div>

          {/* Quick Start */}
          <div className="mb-8 border border-line bg-surface p-8">
            <h2 className="font-ui text-2xl font-bold text-ink">Quick Start</h2>
            <p className="mt-2 font-mono text-sm text-inkDim">
              Get up and running in 2 minutes.
            </p>
            <div className="mt-4 font-mono text-sm leading-relaxed text-inkDim space-y-4">
              <p>
                <strong className="text-ink">Step 1: Open Quark</strong>
                <br />
                Go to{' '}
                <Link href="/" className="text-quarkBlue hover:underline">
                  quark.dev
                </Link>{' '}
                and you&apos;re already in the editor.
              </p>
              <p>
                <strong className="text-ink">Step 2: Write some code</strong>
                <br />
                In the left panel, you&apos;ll see an HTML file. Edit it:
              </p>
              <pre className="border border-line bg-surface2 p-4 text-xs text-ink">
                {`<h1>Hello, Quark!</h1>
<p>This is my first pen.</p>`}
              </pre>
              <p>
                <strong className="text-ink">Step 3: See it live</strong>
                <br />
                The right panel updates automatically as you type — no refresh
                needed.
              </p>
              <p>
                <strong className="text-ink">Step 4: Share your pen</strong>
                <br />
                Click the &quot;Share&quot; button and copy the link. Anyone can
                view your pen.
              </p>
              <p>
                <strong className="text-ink">Step 5: Fork someone else&apos;s pen</strong>
                <br />
                Find a pen you like, click &quot;Fork&quot;, and make it your
                own.
              </p>
            </div>
          </div>

          {/* Your First Pen */}
          <div className="border border-line bg-surface p-8">
            <h2 className="font-ui text-2xl font-bold text-ink">Your First Pen</h2>
            <p className="mt-2 font-mono text-sm text-inkDim">
              Write, preview, and share your first pen.
            </p>
            <div className="mt-4 font-mono text-sm leading-relaxed text-inkDim space-y-4">
              <p>
                <strong className="text-ink">1. Create a new pen</strong>
                <br />
                From the dashboard, click <strong>New pen +</strong>.
              </p>
              <p>
                <strong className="text-ink">2. Write your code</strong>
                <br />
                Start with a basic HTML structure:
              </p>
              <pre className="border border-line bg-surface2 p-4 text-xs text-ink">
                {`<!DOCTYPE html>
<html>
<head>
  <title>My First Pen</title>
</head>
<body>
  <h1>Hello, world!</h1>
</body>
</html>`}
              </pre>
              <p>
                <strong className="text-ink">3. Add some style</strong>
                <br />
                Switch to the CSS tab and add:
              </p>
              <pre className="border border-line bg-surface2 p-4 text-xs text-ink">
                {`h1 {
  color: #4D8DFF;
  font-size: 48px;
}`}
              </pre>
              <p>
                <strong className="text-ink">4. Make it interactive</strong>
                <br />
                Switch to the JS tab:
              </p>
              <pre className="border border-line bg-surface2 p-4 text-xs text-ink">
                {`document.querySelector('h1').addEventListener('click', () => {
  alert('🦆 Quack!')
})`}
              </pre>
              <p>
                <strong className="text-ink">5. Save and publish</strong>
                <br />
                Click <strong>Save</strong> to keep your work. If you want to
                share it, click <strong>Publish</strong>.
              </p>
              <p>
                <strong className="text-ink">6. Share the link</strong>
                <br />
                Your pen is now live at <code className="text-quarkBlue">quark.dev/p/your-pen-id</code>.
                Share it with anyone.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* ===== SECTION 2: EDITOR ===== */}
        {/* ============================================================ */}
        <section className="mb-20">
          <div className="mb-8 flex items-center gap-4">
            <span className="font-mono text-xs uppercase tracking-wider text-quarkBlue">
              Editor
            </span>
            <span className="flex-1 border-t border-line" />
          </div>

          {/* Editor Overview */}
          <div className="mb-8 border border-line bg-surface p-8">
            <h2 className="font-ui text-2xl font-bold text-ink">Editor Overview</h2>
            <p className="mt-2 font-mono text-sm text-inkDim">
              The Quark editor workspace explained.
            </p>
            <div className="mt-4 font-mono text-sm leading-relaxed text-inkDim space-y-4">
              <p>
                <strong className="text-ink">Layout</strong>
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong>File Tree</strong> — left sidebar showing all files in
                  your project
                </li>
                <li>
                  <strong>Tabs</strong> — top of the editor showing open files
                </li>
                <li>
                  <strong>Code Editor</strong> — Monaco-powered editor with syntax
                  highlighting
                </li>
                <li>
                  <strong>Preview Pane</strong> — right panel showing your code
                  running live
                </li>
                <li>
                  <strong>Console</strong> — bottom drawer showing console logs
                  and errors
                </li>
              </ul>
              <p>
                <strong className="text-ink">Keyboard Shortcuts</strong>
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code className="text-quarkBlue">Cmd/Ctrl + S</code> — Save
                </li>
                <li>
                  <code className="text-quarkBlue">Cmd/Ctrl + P</code> — Quick open
                  file
                </li>
                <li>
                  <code className="text-quarkBlue">Cmd/Ctrl + Shift + F</code> —
                  Format code
                </li>
                <li>
                  <code className="text-quarkBlue">Cmd/Ctrl + K</code> — Command
                  palette
                </li>
                <li>
                  <code className="text-quarkBlue">Cmd/Ctrl + /</code> — Toggle
                  comment
                </li>
              </ul>
            </div>
          </div>

          {/* File Tree */}
          <div className="mb-8 border border-line bg-surface p-8">
            <h2 className="font-ui text-2xl font-bold text-ink">File Tree</h2>
            <p className="mt-2 font-mono text-sm text-inkDim">
              Managing files and folders in your project.
            </p>
            <div className="mt-4 font-mono text-sm leading-relaxed text-inkDim space-y-4">
              <p>
                <strong className="text-ink">Creating Files &amp; Folders</strong>
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Click the <strong>+</strong> button next to the file tree header</li>
                <li>Choose <strong>File</strong> or <strong>Folder</strong></li>
                <li>Enter a name and press Enter</li>
              </ul>
              <p>
                <strong className="text-ink">Renaming</strong>
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Right-click a file or folder</li>
                <li>Select <strong>Rename</strong></li>
                <li>Type the new name and press Enter</li>
              </ul>
              <p>
                <strong className="text-ink">Deleting</strong>
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Right-click a file or folder</li>
                <li>Select <strong>Delete</strong></li>
                <li>Confirm the deletion</li>
              </ul>
              <p>
                <strong className="text-ink">Drag &amp; Drop</strong>
                <br />
                You can drag files and folders to rearrange them.
              </p>
              <p>
                <strong className="text-ink">File Types</strong>
                <br />
                Quark supports: HTML, CSS, JavaScript, TypeScript, JSON, and
                Markdown.
              </p>
            </div>
          </div>

          {/* Tabs & Panes */}
          <div className="mb-8 border border-line bg-surface p-8">
            <h2 className="font-ui text-2xl font-bold text-ink">Tabs &amp; Panes</h2>
            <p className="mt-2 font-mono text-sm text-inkDim">
              Managing open files with tabs.
            </p>
            <div className="mt-4 font-mono text-sm leading-relaxed text-inkDim space-y-4">
              <p>
                <strong className="text-ink">Opening a File</strong>
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Click a file in the file tree</li>
                <li>It opens as a new tab</li>
              </ul>
              <p>
                <strong className="text-ink">Switching Tabs</strong>
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Click a tab to switch to it</li>
                <li>
                  Use <code className="text-quarkBlue">Cmd/Ctrl + 1-9</code> to
                  switch to specific tabs
                </li>
              </ul>
              <p>
                <strong className="text-ink">Closing Tabs</strong>
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Click the <strong>×</strong> on a tab to close it</li>
                <li>
                  Use <code className="text-quarkBlue">Cmd/Ctrl + W</code> to
                  close the current tab
                </li>
              </ul>
              <p>
                <strong className="text-ink">Splitting Panes</strong>
                <br />
                You can split the editor into multiple panes:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Drag a tab to the side of the editor</li>
                <li>Drop it to create a new pane</li>
              </ul>
              <p>
                <strong className="text-ink">Tab Icons</strong>
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Files with unsaved changes show a <strong>●</strong> dot</li>
                <li>Files that have errors show a <strong>⚠️</strong> warning</li>
              </ul>
            </div>
          </div>

          {/* Monaco Editor */}
          <div className="mb-8 border border-line bg-surface p-8">
            <h2 className="font-ui text-2xl font-bold text-ink">Monaco Editor</h2>
            <p className="mt-2 font-mono text-sm text-inkDim">
              Autocomplete, IntelliSense, and more.
            </p>
            <div className="mt-4 font-mono text-sm leading-relaxed text-inkDim space-y-4">
              <p>
                Quark uses the Monaco Editor — the same engine that powers VS Code.
              </p>
              <p>
                <strong className="text-ink">Features</strong>
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong>Syntax Highlighting</strong> — for all major languages
                </li>
                <li>
                  <strong>Autocomplete</strong> — intelligent code completion
                </li>
                <li>
                  <strong>IntelliSense</strong> — type hints and parameter info
                </li>
                <li>
                  <strong>Multi-cursor</strong> — edit multiple lines at once
                </li>
                <li>
                  <strong>Find &amp; Replace</strong> — search across files
                </li>
                <li>
                  <strong>Format on Save</strong> — automatically format your code
                </li>
              </ul>
            </div>
          </div>

          {/* Live Preview */}
          <div className="mb-8 border border-line bg-surface p-8">
            <h2 className="font-ui text-2xl font-bold text-ink">Live Preview</h2>
            <p className="mt-2 font-mono text-sm text-inkDim">
              See your code run in real time.
            </p>
            <div className="mt-4 font-mono text-sm leading-relaxed text-inkDim space-y-4">
              <p>
                The live preview shows your code running exactly as it would in a
                browser.
              </p>
              <p>
                <strong className="text-ink">How it works</strong>
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  Your HTML, CSS, and JS are combined into a single document
                </li>
                <li>
                  It runs inside a <strong>sandboxed iframe</strong> — your code
                  can&apos;t access the parent page
                </li>
                <li>
                  The preview updates <strong>automatically</strong> on every
                  keystroke
                </li>
                <li>
                  You can toggle between <strong>desktop</strong>,{' '}
                  <strong>tablet</strong>, and <strong>mobile</strong> views
                </li>
              </ul>
              <p>
                <strong className="text-ink">Security</strong>
                <br />
                The preview runs in a strict sandbox with:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code className="text-quarkBlue">sandbox=&quot;allow-scripts&quot;</code>
                </li>
                <li>
                  No <code className="text-quarkBlue">allow-same-origin</code>
                </li>
                <li>Strict CSP headers</li>
              </ul>
            </div>
          </div>

          {/* Console */}
          <div className="border border-line bg-surface p-8">
            <h2 className="font-ui text-2xl font-bold text-ink">Console</h2>
            <p className="mt-2 font-mono text-sm text-inkDim">
              Debugging with the console drawer.
            </p>
            <div className="mt-4 font-mono text-sm leading-relaxed text-inkDim space-y-4">
              <p>
                The console drawer shows all <code className="text-quarkBlue">console.log()</code>{' '}
                output and errors from your code.
              </p>
              <p>
                <strong className="text-ink">Features</strong>
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong>Logs</strong> — all <code className="text-quarkBlue">console.log()</code>{' '}
                  output
                </li>
                <li>
                  <strong>Errors</strong> — runtime errors with stack traces
                </li>
                <li>
                  <strong>Warnings</strong> — console warnings and deprecation
                  notices
                </li>
                <li>
                  <strong>Clear</strong> — clear the console with one click
                </li>
                <li>
                  <strong>Filter</strong> — filter logs by type (log, error,
                  warn)
                </li>
              </ul>
              <p>
                <strong className="text-ink">Keyboard Shortcut</strong>
                <br />
                Toggle the console with <code className="text-quarkBlue">Cmd/Ctrl + `</code>
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* ===== SECTION 3: SHARING & COLLABORATION ===== */}
        {/* ============================================================ */}
        <section className="mb-20">
          <div className="mb-8 flex items-center gap-4">
            <span className="font-mono text-xs uppercase tracking-wider text-quarkBlue">
              Sharing &amp; Collaboration
            </span>
            <span className="flex-1 border-t border-line" />
          </div>

          {/* Public Pens */}
          <div className="mb-8 border border-line bg-surface p-8">
            <h2 className="font-ui text-2xl font-bold text-ink">Public Pens</h2>
            <p className="mt-2 font-mono text-sm text-inkDim">
              Sharing your work with the world.
            </p>
            <div className="mt-4 font-mono text-sm leading-relaxed text-inkDim space-y-4">
              <p>
                When you publish a pen, it becomes publicly accessible at{' '}
                <code className="text-quarkBlue">quark.dev/p/[pen-id]</code>.
              </p>
              <p>
                <strong className="text-ink">Visibility Options</strong>
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong>Public</strong> — anyone can view and fork
                </li>
                <li>
                  <strong>Unlisted</strong> — anyone with the link can view, but
                  it won&apos;t appear in Explore
                </li>
                <li>
                  <strong>Private</strong> — only you can view (requires account)
                </li>
              </ul>
              <p>
                <strong className="text-ink">How to Publish</strong>
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Click the <strong>Publish</strong> button in the editor</li>
                <li>Choose your visibility</li>
                <li>Add tags to help people find it</li>
                <li>Click <strong>Publish</strong> — done!</li>
              </ul>
            </div>
          </div>

          {/* Forking */}
          <div className="mb-8 border border-line bg-surface p-8">
            <h2 className="font-ui text-2xl font-bold text-ink">Forking</h2>
            <p className="mt-2 font-mono text-sm text-inkDim">
              Building on someone else&apos;s work.
            </p>
            <div className="mt-4 font-mono text-sm leading-relaxed text-inkDim space-y-4">
              <p>
                Forking creates a copy of a pen in your account. You can then edit
                it, add your own code, and publish your version.
              </p>
              <p>
                <strong className="text-ink">How to Fork</strong>
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Go to any public pen</li>
                <li>Click the <strong>Fork</strong> button</li>
                <li>The pen is now in your dashboard — edit and share</li>
              </ul>
              <p>
                <strong className="text-ink">Forking Requirements</strong>
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>You must be signed in</li>
                <li>You must have an active plan (Free or Pro)</li>
                <li>You can fork any public pen, even if it&apos;s unlisted</li>
              </ul>
            </div>
          </div>

          {/* Embedding */}
          <div className="mb-8 border border-line bg-surface p-8">
            <h2 className="font-ui text-2xl font-bold text-ink">Embedding</h2>
            <p className="mt-2 font-mono text-sm text-inkDim">
              Embed pens in your own site.
            </p>
            <div className="mt-4 font-mono text-sm leading-relaxed text-inkDim space-y-4">
              <p>
                You can embed any public pen directly into your own website or
                blog post.
              </p>
              <p>
                <strong className="text-ink">How to Embed</strong>
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Go to the pen you want to embed</li>
                <li>Click <strong>Embed</strong> in the share menu</li>
                <li>Copy the embed code</li>
                <li>Paste it into your site</li>
              </ul>
              <p>
                <strong className="text-ink">Embed Options</strong>
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong>Full view</strong> — shows the entire pen with preview
                </li>
                <li>
                  <strong>Code only</strong> — shows just the code without preview
                </li>
                <li>
                  <strong>Preview only</strong> — shows just the live preview
                </li>
              </ul>
            </div>
          </div>

          {/* Comments */}
          <div className="border border-line bg-surface p-8">
            <h2 className="font-ui text-2xl font-bold text-ink">Comments</h2>
            <p className="mt-2 font-mono text-sm text-inkDim">
              Feedback and discussions on pens.
            </p>
            <div className="mt-4 font-mono text-sm leading-relaxed text-inkDim space-y-4">
              <p>
                Comments allow the community to give feedback, ask questions, and
                discuss a pen.
              </p>
              <p>
                <strong className="text-ink">How to Comment</strong>
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Scroll to the comments section at the bottom of any public pen</li>
                <li>Write your comment and click <strong>Post</strong></li>
                <li>You must be signed in to comment</li>
              </ul>
              <p>
                <strong className="text-ink">Moderation</strong>
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Comments are public and visible to everyone</li>
                <li>Admins can delete inappropriate comments</li>
                <li>Users can report abusive comments</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* ===== SECTION 4: PRICING & PLANS ===== */}
        {/* ============================================================ */}
        <section className="mb-20">
          <div className="mb-8 flex items-center gap-4">
            <span className="font-mono text-xs uppercase tracking-wider text-quarkBlue">
              Pricing &amp; Plans
            </span>
            <span className="flex-1 border-t border-line" />
          </div>

          {/* Free vs Pro */}
          <div className="mb-8 border border-line bg-surface p-8">
            <h2 className="font-ui text-2xl font-bold text-ink">Free vs Pro</h2>
            <p className="mt-2 font-mono text-sm text-inkDim">
              Compare plans and choose the right one.
            </p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full border border-line text-left font-mono text-sm">
                <thead>
                  <tr className="border-b border-line bg-surface2">
                    <th className="px-4 py-3 text-ink">Feature</th>
                    <th className="px-4 py-3 text-ink">Free</th>
                    <th className="px-4 py-3 text-ink">Pro</th>
                    <th className="px-4 py-3 text-ink">Team</th>
                  </tr>
                </thead>
                <tbody className="text-inkDim">
                  <tr className="border-b border-line">
                    <td className="px-4 py-3">Published pens</td>
                    <td className="px-4 py-3">3</td>
                    <td className="px-4 py-3">Unlimited</td>
                    <td className="px-4 py-3">Unlimited</td>
                  </tr>
                  <tr className="border-b border-line">
                    <td className="px-4 py-3">Files per project</td>
                    <td className="px-4 py-3">10</td>
                    <td className="px-4 py-3">50</td>
                    <td className="px-4 py-3">100</td>
                  </tr>
                  <tr className="border-b border-line">
                    <td className="px-4 py-3">File size</td>
                    <td className="px-4 py-3">500KB</td>
                    <td className="px-4 py-3">2MB</td>
                    <td className="px-4 py-3">5MB</td>
                  </tr>
                  <tr className="border-b border-line">
                    <td className="px-4 py-3">Storage</td>
                    <td className="px-4 py-3">5MB</td>
                    <td className="px-4 py-3">50MB</td>
                    <td className="px-4 py-3">200MB</td>
                  </tr>
                  <tr className="border-b border-line">
                    <td className="px-4 py-3">Priority support</td>
                    <td className="px-4 py-3">—</td>
                    <td className="px-4 py-3">✓</td>
                    <td className="px-4 py-3">✓</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Team features</td>
                    <td className="px-4 py-3">—</td>
                    <td className="px-4 py-3">—</td>
                    <td className="px-4 py-3">✓</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Upgrading */}
          <div className="mb-8 border border-line bg-surface p-8">
            <h2 className="font-ui text-2xl font-bold text-ink">Upgrading</h2>
            <p className="mt-2 font-mono text-sm text-inkDim">
              How to upgrade your plan.
            </p>
            <div className="mt-4 font-mono text-sm leading-relaxed text-inkDim space-y-4">
              <p>
                <strong className="text-ink">How to Upgrade</strong>
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Go to <strong>Settings → Billing</strong></li>
                <li>Click <strong>Upgrade to Pro</strong></li>
                <li>Enter your payment details</li>
                <li>Click <strong>Subscribe</strong> — done!</li>
              </ul>
              <p>
                <strong className="text-ink">What Happens After Upgrading</strong>
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>All Pro features are unlocked immediately</li>
                <li>Your published pen limit is removed</li>
                <li>You get priority support</li>
              </ul>
            </div>
          </div>

          {/* Billing */}
          <div className="border border-line bg-surface p-8">
            <h2 className="font-ui text-2xl font-bold text-ink">Billing</h2>
            <p className="mt-2 font-mono text-sm text-inkDim">
              Manage your subscription and invoices.
            </p>
            <div className="mt-4 font-mono text-sm leading-relaxed text-inkDim space-y-4">
              <p>
                <strong className="text-ink">Payment Methods</strong>
                <br />
                We accept all major credit cards via Stripe.
              </p>
              <p>
                <strong className="text-ink">Billing Cycle</strong>
                <br />
                Pro and Team plans are billed monthly. You can cancel anytime.
              </p>
              <p>
                <strong className="text-ink">Invoices</strong>
                <br />
                All invoices are available in your <strong>Settings → Billing</strong>{' '}
                page.
              </p>
              <p>
                <strong className="text-ink">Refunds</strong>
                <br />
                If you&apos;re not satisfied, contact support within 30 days for a full
                refund.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* ===== SECTION 5: ADMIN ===== */}
        {/* ============================================================ */}
        <section className="mb-20">
          <div className="mb-8 flex items-center gap-4">
            <span className="font-mono text-xs uppercase tracking-wider text-quarkBlue">
              Admin
            </span>
            <span className="flex-1 border-t border-line" />
          </div>

          {/* Admin Overview */}
          <div className="mb-8 border border-line bg-surface p-8">
            <h2 className="font-ui text-2xl font-bold text-ink">Admin Overview</h2>
            <p className="mt-2 font-mono text-sm text-inkDim">
              The admin dashboard at a glance.
            </p>
            <div className="mt-4 font-mono text-sm leading-relaxed text-inkDim space-y-4">
              <p>
                The admin dashboard gives you full control over your Quark
                instance.
              </p>
              <p>
                <strong className="text-ink">Sections</strong>
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong>Overview</strong> — key metrics and stats
                </li>
                <li>
                  <strong>Users</strong> — search, manage, suspend, plan override
                </li>
                <li>
                  <strong>Pens</strong> — moderate, unpublish, delete
                </li>
                <li>
                  <strong>Reports</strong> — moderation queue and reports
                </li>
                <li>
                  <strong>Settings</strong> — platform settings, free-tier publish
                  limit, maintenance mode, featured pens
                </li>
              </ul>
            </div>
          </div>

          {/* Moderation */}
          <div className="mb-8 border border-line bg-surface p-8">
            <h2 className="font-ui text-2xl font-bold text-ink">Moderation</h2>
            <p className="mt-2 font-mono text-sm text-inkDim">
              Moderating pens and content.
            </p>
            <div className="mt-4 font-mono text-sm leading-relaxed text-inkDim space-y-4">
              <p>
                <strong className="text-ink">Moderation Actions</strong>
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong>Unpublish</strong> — remove a pen from public view
                </li>
                <li>
                  <strong>Soft-Delete</strong> — hide the pen from everyone
                </li>
                <li>
                  <strong>Account Suspension</strong> — suspend a user&apos;s account
                </li>
              </ul>
              <p>
                <strong className="text-ink">Moderation Queue</strong>
                <br />
                All reported pens and comments appear in the Reports queue for
                review.
              </p>
            </div>
          </div>

          {/* Reports */}
          <div className="border border-line bg-surface p-8">
            <h2 className="font-ui text-2xl font-bold text-ink">Reports</h2>
            <p className="mt-2 font-mono text-sm text-inkDim">
              Managing user reports.
            </p>
            <div className="mt-4 font-mono text-sm leading-relaxed text-inkDim space-y-4">
              <p>
                <strong className="text-ink">Report Types</strong>
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong>Spam</strong> — promotional or unrelated content
                </li>
                <li>
                  <strong>Inappropriate</strong> — offensive or harmful content
                </li>
                <li>
                  <strong>Copyright</strong> — unauthorized use of copyrighted
                  material
                </li>
              </ul>
              <p>
                <strong className="text-ink">Report Lifecycle</strong>
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong>Pending</strong> — waiting for admin review
                </li>
                <li>
                  <strong>Reviewed</strong> — admin has reviewed the report
                </li>
                <li>
                  <strong>Dismissed</strong> — report was rejected
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* ===== SECTION 6: SUPPORT ===== */}
        {/* ============================================================ */}
        <section className="mb-20">
          <div className="mb-8 flex items-center gap-4">
            <span className="font-mono text-xs uppercase tracking-wider text-quarkBlue">
              Support
            </span>
            <span className="flex-1 border-t border-line" />
          </div>

          {/* FAQ */}
          <div className="mb-8 border border-line bg-surface p-8">
            <h2 className="font-ui text-2xl font-bold text-ink">FAQ</h2>
            <p className="mt-2 font-mono text-sm text-inkDim">
              Frequently asked questions.
            </p>
            <div className="mt-4 font-mono text-sm leading-relaxed text-inkDim space-y-6">
              <div>
                <p className="font-semibold text-ink">
                  Do I need an account to view a pen?
                </p>
                <p>No — any public pen can be viewed without an account.</p>
              </div>
              <div>
                <p className="font-semibold text-ink">What happens if I hit my free tier limit?</p>
                <p>
                  You can continue editing private pens. Publishing past the cap
                  prompts you to upgrade.
                </p>
              </div>
              <div>
                <p className="font-semibold text-ink">Can I cancel my subscription anytime?</p>
                <p>Yes — cancel anytime from Settings → Billing.</p>
              </div>
              <div>
                <p className="font-semibold text-ink">Is my code private?</p>
                <p>
                  Private pens are only visible to you. Public pens are visible to
                  everyone.
                </p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="border border-line bg-surface p-8">
            <h2 className="font-ui text-2xl font-bold text-ink">Contact</h2>
            <p className="mt-2 font-mono text-sm text-inkDim">
              Get in touch with the team.
            </p>
            <div className="mt-4 font-mono text-sm leading-relaxed text-inkDim space-y-4">
              <p>
                <strong className="text-ink">Email</strong>
                <br />
                <a href="mailto:support@quark.dev" className="text-quarkBlue hover:underline">
                  support@quark.dev
                </a>
              </p>
              <p>
                <strong className="text-ink">Response Time</strong>
                <br />
                We respond to all inquiries within 24 hours.
              </p>
              <p>
                <strong className="text-ink">Feedback</strong>
                <br />
                We love hearing from you — send us your ideas, feature requests,
                and bug reports.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* ===== FOOTER ===== */}
        {/* ============================================================ */}
        <div className="mt-20 border-t border-line pt-10 text-center">
          <p className="font-mono text-sm text-inkFaint">
            Can&apos;t find what you&apos;re looking for?{' '}
            <a
              href="mailto:support@quark.dev"
              className="text-quarkBlue hover:underline"
            >
              Contact support
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}