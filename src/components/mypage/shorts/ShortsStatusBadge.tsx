'use client'

import { SHORTS_STATUS_CONFIG } from '@/constants/shortsCardBadge'
import { ShortsStatus, ShortsVisibility } from '@/types/shorts/status'
import { cn } from '@/utils/cnUtils'

interface ShortsStatusBadgeProps {
  shortsStatus: ShortsStatus | null | undefined
  visibility?: ShortsVisibility | null
  className?: string
}

export default function ShortsStatusBadge({ shortsStatus, visibility, className }: ShortsStatusBadgeProps) {
  // PUBLISHED 상태일 때는 visibility 기준으로 배지 표시
  const badgeKey = shortsStatus === 'PUBLISHED' && visibility ? visibility : shortsStatus
  if (!badgeKey || !(badgeKey in SHORTS_STATUS_CONFIG)) return null
  const config = SHORTS_STATUS_CONFIG[badgeKey as keyof typeof SHORTS_STATUS_CONFIG]
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
