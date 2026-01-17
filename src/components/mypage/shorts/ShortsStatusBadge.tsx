'use client'

import { SHORTS_STATUS_CONFIG } from '@/constants/shortsCardBadge'
import type { ShortsStatus } from '@/types/mypage-shorts'
import { cn } from '@/utils/cnUtils'

interface ShortsStatusBadgeProps {
  shortsStatus: ShortsStatus | null | undefined
  className?: string
}

export default function ShortsStatusBadge({ shortsStatus, className }: ShortsStatusBadgeProps) {
  if (!shortsStatus || !(shortsStatus in SHORTS_STATUS_CONFIG)) return null
  const config = SHORTS_STATUS_CONFIG[shortsStatus as keyof typeof SHORTS_STATUS_CONFIG]
  const Icon = config.icon

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full py-0.5 pr-2 pl-1.5 text-[10px] text-white',
        config.bgColor,
        className,
      )}
      aria-label={`쇼츠 상태: ${config.label}`}
    >
      <Icon size={10} aria-hidden="true" />
      {config.label}
    </span>
  )
}
