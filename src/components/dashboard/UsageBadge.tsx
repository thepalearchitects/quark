// components/dashboard/UsageBadge.tsx
interface UsageBadgeProps {
  used: number
  total: number
}

export function UsageBadge({ used, total }: UsageBadgeProps) {
  const percentage = Math.min((used / total) * 100, 100)
  const isNearLimit = percentage >= 80

  return (
    <div className="border border-line bg-surface p-4">
      <div className="flex items-center justify-between">
        <div>
          <span className="font-mono text-sm text-inkDim">
            Published pens
          </span>
          <span className="ml-2 font-mono text-lg font-bold text-ink">
            {used} / {total}
          </span>
        </div>
        {isNearLimit && (
          <span className="mono text-xs uppercase tracking-wider text-quarkRed border border-quarkRed px-2 py-0.5">
            ⚠️ Near limit
          </span>
        )}
      </div>

      <div className="mt-2 h-1 w-full bg-line">
        <div
          className="h-1 transition-all duration-300"
          style={{
            width: `${percentage}%`,
            backgroundColor: isNearLimit ? '#FF4545' : '#4D8DFF',
          }}
        />
      </div>

      {isNearLimit && (
        <p className="mt-2 font-mono text-xs text-inkFaint">
          Upgrade to Pro for unlimited published pens.
        </p>
      )}
    </div>
  )
}