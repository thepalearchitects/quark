// components/onboarding/OnboardingTour.tsx
'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { Logo } from '@/components/ui/Logo'

interface OnboardingStep {
  id: string
  title: string
  description: string
  target: string // CSS selector for the element to highlight
  position: 'top' | 'bottom' | 'left' | 'right'
}

const steps: OnboardingStep[] = [
  {
    id: 'dashboard',
    title: 'Welcome to Quark! 🦆',
    description: 'This is your dashboard. All your pens live here.',
    target: 'main',
    position: 'bottom',
  },
  {
    id: 'new-pen',
    title: 'Create your first pen',
    description: 'Click "New pen" to start writing code instantly. No setup needed.',
    target: 'a[href="/pen/new"]',
    position: 'bottom',
  },
  {
    id: 'project-card',
    title: 'Your projects',
    description: 'Each card is a pen. Click one to open the editor and start coding.',
    target: '.grid a:first-child',
    position: 'bottom',
  },
  {
    id: 'usage-badge',
    title: 'Track your usage',
    description: 'Free plan includes 3 published pens. Upgrade anytime for unlimited.',
    target: '.border.bg-surface.p-4',
    position: 'top',
  },
]

export function OnboardingTour() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [hasCompleted, setHasCompleted] = useState(false)

  useEffect(() => {
    // skip if they've already gone through it
    const completed = localStorage.getItem('quark_onboarding_complete')
    if (!completed) {
      // first time here? show the tour after a tick
      const hasVisited = localStorage.getItem('quark_visited')
      if (!hasVisited) {
        setTimeout(() => setIsOpen(true), 0)
        localStorage.setItem('quark_visited', 'true')
      }
    }
  }, [])

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleComplete()
    }
  }

  const handleSkip = () => {
    handleComplete()
  }

  const handleComplete = () => {
    setIsOpen(false)
    setHasCompleted(true)
    localStorage.setItem('quark_onboarding_complete', 'true')
  }

  if (!isOpen || hasCompleted) return null

  const step = steps[currentStep]
  const isLast = currentStep === steps.length - 1

  return (
    <div className="fixed inset-0 z-[999] pointer-events-none">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-void/60 pointer-events-auto" />

      {/* Highlight overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="h-full w-full border-2 border-quarkBlue shadow-[0_0_0_9999px_rgba(10,10,10,0.6)]" />
      </div>

      {/* Tooltip */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-md px-4 pointer-events-auto">
        <div className="border border-line bg-surface p-6 shadow-snap-blue">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Logo variant="white" width={20} height={20} />
                <span className="font-mono text-xs text-quarkBlue">
                  {currentStep + 1} / {steps.length}
                </span>
              </div>
              <h3 className="mt-2 font-ui text-xl font-bold text-ink">
                {step.title}
              </h3>
              <p className="mt-1 font-mono text-sm text-inkDim">
                {step.description}
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between gap-4">
            <button
              onClick={handleSkip}
              className="font-mono text-sm text-inkFaint hover:text-ink transition-colors"
            >
              Skip tour
            </button>
            <div className="flex gap-3">
              <Button
                variant="primary"
                className="min-h-[40px] px-6"
                onClick={handleNext}
              >
                {isLast ? 'Done' : 'Next →'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}