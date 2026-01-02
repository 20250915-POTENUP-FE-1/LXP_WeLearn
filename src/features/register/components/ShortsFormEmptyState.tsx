'use client'

import React from 'react'

export default function ShortsFormEmptyState({
  icon,
  description,
  action,
}: {
  icon: React.ReactNode
  description: React.ReactNode
  action?: React.ReactNode
}) {
  return (
    // 빈 상태 컴포넌트
    <div className="text-center">
      <div className="mb-4 flex items-center justify-center">{icon}</div>
      <p className="text-sm leading-6 text-gray-500">{description}</p>
      {action}
    </div>
  )
}
