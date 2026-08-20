// app/(marketing)/page.tsx
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { LiveDemoEditor } from '@/components/marketing/LiveDemoEditor'

// ---------- HERO ----------
function Hero() {
  return (
    <section className="border-b border-line px-4 pt-16 md:px-8">
      <div className="mx-auto grid max-w-6xl lg:grid-cols-2">
        {/* Left — statement */}
        <div className="flex flex-col justify-center border-line pb-16 pr-0 lg:border-r lg:pr-14">
          <h1 className="font-ui text-4xl font-bold leading-[1.06] tracking-tight text-ink md:text-5xl lg:text-[60px]">
            Explain it to
            <br />
            the duck.
            <br />
            <span className="text-quarkBlue">Ship it to the web.</span>
          </h1>

          <p className="mt-5 max-w-md font-mono text-sm leading-relaxed text-inkDim">
            A browser-based code editor with nothing to install and nothing to
            prove first. Paste broken code, watch it render, fix it, fork it,
            ship the link. No account needed to view a public pen.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
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

          <div className="mt-12 flex gap-10 border-t border-line pt-7">
            <div>
              <span className="block font-mono text-2xl font-bold text-ink">0</span>
              <span className="font-mono text-[10.5px] uppercase tracking-wider text-inkFaint">
                Pens published
              </span>
            </div>
            <div>
              <span className="block font-mono text-2xl font-bold text-ink">∞</span>
              <span className="font-mono text-[10.5px] uppercase tracking-wider text-inkFaint">
                Free to start
              </span>
            </div>
            <div>
              <span className="block font-mono text-2xl font-bold text-ink">1</span>
              <span className="font-mono text-[10.5px] uppercase tracking-wider text-inkFaint">
                Rubber duck included
              </span>
            </div>
          </div>
        </div>

        {/* Right — LiveDemoEditor */}
        <div className="flex items-center pl-0 pt-10 lg:pl-14 lg:pt-0">
          <LiveDemoEditor />
        </div>
      </div>
    </section>
  )
}

// ---------- CHARGE, NOT DECORATION ----------
const chips = [
  {
    label: 'Focus states, links, anything you can click',
    state: 'info',
    classes: 'border-quarkBlue text-quarkBlue',
    dot: 'bg-quarkBlue',
  },
  {
    label: 'Autosave, deploys, anything that worked',
    state: 'live',
    classes: 'border-quarkGreen text-quarkGreen',
    dot: 'bg-quarkGreen',
  },
  {
    label: 'Broken builds, anything that needs your attention',
    state: 'error',
    classes: 'border-quarkRed text-quarkRed',
    dot: 'bg-quarkRed',
  },
] as const

function Charge() {
  return (
    <section className="border-b border-line px-4 py-20 md:px-8">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2">
        <div>
          <span className="font-mono text-[11.5px] uppercase tracking-wider text-quarkBlue">
            Design philosophy
          </span>
          <h2 className="mt-3.5 font-ui text-3xl font-bold leading-tight text-ink md:text-4xl">
            Charge, not decoration.
          </h2>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-inkDim">
            Real quarks carry color charge — red, green, blue — and none of
            it is for show, it&apos;s what binds matter together. This one
            borrows the idea: three accent colors, each with exactly one
            job. If a color shows up on screen, it means something specific.
            Nothing here is decorative.
          </p>
        </div>

        <div className="flex flex-col gap-px border border-line bg-line">
          {chips.map((chip) => (
            <div
              key={chip.state}
              className="flex items-center justify-between bg-void px-6 py-5"
            >
              <span className="font-mono text-[13px] text-inkDim">
                {chip.label}
              </span>
              <span
                className={`flex items-center gap-1.5 border px-2.5 py-1 font-mono text-[11.5px] uppercase tracking-wider ${chip.classes}`}
              >
                <span className={`h-1.5 w-1.5 ${chip.dot}`} />
                {chip.state}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ---------- SPEC LIST ----------
const specs = [
  { name: 'Live preview', desc: "Sandboxed iframe, rebuilds on keystroke. Your code can't read the parent page's cookies or storage — it isn't allowed to try." },
  { name: 'Fork anything', desc: 'Every public pen is forkable by default. View without an account. Save with one.' },
  { name: 'Monaco inside', desc: 'Full IntelliSense and autocomplete — the same editor engine VS Code runs on, not a toy.' },
  { name: 'CDN imports', desc: 'Pull any npm package straight from esm.sh. No bundler, no install step, no node_modules.' },
  { name: 'Revision history', desc: 'Every save is a revision. Roll back without asking permission or writing a commit message.' },
  { name: 'Nothing to install', desc: 'Open a link, start typing. That\u2019s the entire onboarding flow for anyone viewing a public pen.' },
]

function Specs() {
  return (
    <section className="border-b border-line px-4 py-20 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="font-mono text-[11.5px] uppercase tracking-wider text-quarkBlue">
              What&apos;s inside
            </span>
            <h2 className="mt-3.5 font-ui text-3xl font-bold leading-tight text-ink md:text-4xl">
              Six things that
              <br />
              actually matter.
            </h2>
          </div>
          <p className="max-w-[340px] text-right text-sm text-inkDim">
            No onboarding tour, no feature tooltips. This is the whole list.
          </p>
        </div>

        <div className="border-t border-line">
          {specs.map((spec, i) => (
            <div
              key={spec.name}
              className="grid grid-cols-[40px_1fr] gap-6 border-b border-line py-5 sm:grid-cols-[60px_220px_1fr] sm:items-baseline"
            >
              <span className="font-mono text-xs text-inkFaint">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="font-mono text-sm font-medium uppercase tracking-wide text-ink">
                {spec.name}
              </span>
              <span className="col-span-2 text-[14.5px] leading-relaxed text-inkDim sm:col-span-1">
                {spec.desc}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ---------- DUCK QUOTE ----------
function DuckQuote() {
  return (
    <section className="relative overflow-hidden border-b border-line px-4 py-28 text-center md:px-8">
      <Image
        src="/wordmark/icon-only-white.svg"
        alt=""
        aria-hidden
        width={560}
        height={560}
        priority
        className="pointer-events-none absolute left-1/2 top-1/2 max-w-none -translate-x-1/2 -translate-y-1/2 opacity-[0.05]"
      />
      <blockquote className="relative mx-auto max-w-2xl text-[26px] font-semibold leading-snug tracking-tight text-ink md:text-[34px]">
        &ldquo;The beak is the point. Rubber-duck debugging, built into the
        mark — say the bug out loud,{' '}
        <span className="text-quarkBlue">
          then watch the code actually run.
        </span>
        &rdquo;
      </blockquote>
      <cite className="relative mt-5 block font-mono text-xs uppercase tracking-wider text-inkFaint not-italic">
        — the whole idea, in one sentence
      </cite>
    </section>
  )
}

// ---------- CTA ----------
function CTA() {
  return (
    <section className="px-4 py-20 text-center md:px-8">
      <h2 className="font-ui text-3xl font-bold text-ink md:text-4xl">
        Ready to ship?
      </h2>
      <p className="mx-auto mt-3 max-w-lg font-mono text-sm text-inkDim">
        No install. No account required to view.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
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
    </section>
  )
}

// ---------- PAGE ----------
export default async function LandingPage() {
  // 1-second delay for smooth UX (like Replit)
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return (
    <>
      <Hero />
      <Charge />
      <Specs />
      <DuckQuote />
      <CTA />
    </>
  )
}