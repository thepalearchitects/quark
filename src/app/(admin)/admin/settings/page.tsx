// app/(admin)/admin/settings/page.tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export default function AdminSettings() {
  const [freePublishLimit, setFreePublishLimit] = useState('3')
  const [maintenanceMode, setMaintenanceMode] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    console.log('Saving settings:', { freePublishLimit, maintenanceMode })
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
  }

  return (
    <div className="space-y-8">
      <div className="border-b border-line pb-4">
        <h1 className="font-ui text-2xl font-bold text-ink">Admin Settings</h1>
        <p className="font-mono text-sm text-inkDim">
          Platform-wide settings and configurations.
        </p>
      </div>

      <div className="border border-line bg-surface p-6">
        <h2 className="font-ui text-lg font-semibold text-ink">Platform Settings</h2>

        <div className="mt-4 space-y-4">
          <div>
            <label
              htmlFor="publishLimit"
              className="block font-mono text-xs uppercase tracking-wider text-inkDim"
            >
              Free tier publish limit
            </label>
            <Input
              id="publishLimit"
              type="number"
              value={freePublishLimit}
              onChange={(e) => setFreePublishLimit(e.target.value)}
              className="mt-1 max-w-xs"
            />
            <p className="mt-1 font-mono text-xs text-inkFaint">
              Number of published pens allowed on free tier.
            </p>
          </div>

          <div>
            <label className="block font-mono text-xs uppercase tracking-wider text-inkDim">
              Maintenance Mode
            </label>
            <div className="mt-1 flex items-center gap-3">
              <button
                onClick={() => setMaintenanceMode(!maintenanceMode)}
                className={`relative h-6 w-11 border transition-colors ${
                  maintenanceMode ? 'border-quarkBlue bg-quarkBlue' : 'border-line bg-surface2'
                }`}
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 bg-ink transition-all ${
                    maintenanceMode ? 'right-0.5' : 'left-0.5'
                  }`}
                />
              </button>
              <span className="font-mono text-sm text-inkDim">
                {maintenanceMode ? 'Enabled' : 'Disabled'}
              </span>
            </div>
            <p className="mt-1 font-mono text-xs text-inkFaint">
              When enabled, only admins can access the platform.
            </p>
          </div>
        </div>

        <Button
          onClick={handleSave}
          variant="primary"
          className="mt-6 min-h-[44px]"
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save settings'}
        </Button>
      </div>
    </div>
  )
}