// components/dashboard/ProjectCard.tsx
'use client'

import { Card, CardContent, CardTitle } from '@/components/ui/Card'
import { Project } from '@/lib/types'
import Link from 'next/link'

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const visibilityColors = {
    public: 'text-quarkGreen border-quarkGreen',
    private: 'text-inkFaint border-inkFaint',
    unlisted: 'text-inkDim border-inkDim',
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diff = Math.floor((now.getTime() - date.getTime()) / 60000)

    if (diff < 1) return 'Just now'
    if (diff < 60) return `${diff}m ago`
    if (diff < 1440) return `${Math.floor(diff / 60)}h ago`
    return `${Math.floor(diff / 1440)}d ago`
  }

  return (
    <Link
      href={`/pen/${project.id}`}
      className="block transition-transform duration-75 hover:-translate-x-1 hover:-translate-y-1"
    >
      <Card className="hover:shadow-snap-blue transition-shadow duration-75">
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <CardTitle className="font-ui text-base font-semibold text-ink">
              {project.name}
            </CardTitle>
            <span
              className={`mono text-[10px] uppercase tracking-wider ${visibilityColors[project.visibility]}`}
            >
              {project.visibility}
            </span>
          </div>

          {project.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1">
              {project.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="mono text-[10px] text-quarkBlue border border-quarkBlue px-1.5 py-0.5"
                >
                  #{tag}
                </span>
              ))}
              {project.tags.length > 3 && (
                <span className="mono text-[10px] text-inkFaint">
                  +{project.tags.length - 3}
                </span>
              )}
            </div>
          )}

          <div className="mt-3 flex items-center justify-between border-t border-line pt-3">
            <span className="mono text-xs text-inkFaint">
              Updated {formatDate(project.updatedAt)}
            </span>
            <span className="mono text-xs text-inkFaint">
              {project.files.length} files
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}