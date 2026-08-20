// components/marketing/Features.tsx
import { FeatureRow } from './FeatureRow'

export function Features() {
  return (
    <section className="border-b border-line px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-6xl space-y-16 md:space-y-24">
        {/* Section Header */}
        <div className="text-center">
          <span className="font-mono text-xs uppercase tracking-wider text-quarkBlue">
            Features
          </span>
          <h2 className="mt-2 font-ui text-3xl font-bold text-ink md:text-4xl">
            Everything you need to build on the web
          </h2>
          <p className="mx-auto mt-3 max-w-xl font-mono text-sm text-inkDim">
            Write code, see it live, and share it with the world. No setup required.
          </p>
        </div>

        {/* Feature 1 */}
        <FeatureRow
          title="Live Preview"
          description="See your code update instantly as you type. No refresh, no rebuild, no wait."
        >
          <div className="aspect-video border border-line bg-surface2 p-4 shadow-snap-blue">
            <div className="flex h-full items-center justify-center font-mono text-sm text-inkDim">
              <span className="text-quarkGreen">●</span> Live preview
            </div>
          </div>
        </FeatureRow>

        {/* Feature 2 */}
        <FeatureRow
          title="Share & Fork"
          description="Share a link to your pen. Anyone can view it, fork it, and build on it."
          reversed
        >
          <div className="aspect-video border border-line bg-surface2 p-4 shadow-snap-blue">
            <div className="flex h-full items-center justify-center font-mono text-sm text-inkDim">
              🔗 <span className="ml-2 text-quarkBlue">quark.dev/p/abc123</span>
            </div>
          </div>
        </FeatureRow>

        {/* Feature 3 */}
        <FeatureRow
          title="Monaco Editor"
          description="Full-featured code editor with autocomplete, IntelliSense, and syntax highlighting."
        >
          <div className="aspect-video border border-line bg-surface2 p-4 shadow-snap-blue">
            <div className="flex h-full items-center justify-center font-mono text-sm text-inkDim">
              <span className="text-quarkBlue">const</span> duck ={' '}
              <span className="text-quarkGreen">&apos;🦆&apos;</span>
              <span className="text-inkFaint">;</span>
            </div>
          </div>
        </FeatureRow>
      </div>
    </section>
  )
}