// ShortsStatusBadge.tsx
'use client'

import { SHORTS_STATUS_CONFIG } from '@/constants/shortsCardBadge'
import type { ShortsStatus } from '@/types/myshorts'
import { cn } from '@/utils/cnUtils'

interface ShortsStatusBadgeProps {
  status: ShortsStatus
  className?: string
}

export default function ShortsStatusBadge({ status, className }: ShortsStatusBadgeProps) {
  const config = SHORTS_STATUS_CONFIG[status]
  const Icon = config.icon

  return (
    <span
      className={cn(
        'absolute top-2 left-2 flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] text-white',
        config.bgColor,
        className,
      )}
      role="status"
      aria-label={`쇼츠 상태: ${config.label}`}
    >
      <Icon size={10} aria-hidden="true" />
      {config.label}
    </span>
  )
}
