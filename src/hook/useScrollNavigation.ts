'use client'

import { useCallback, useRef } from 'react'

interface UseScrollNavigationProps {
  onPrev: () => void
  onNext: () => void
  threshold?: number
  velocityThreshold?: number
  lockTime?: number
}

export function useScrollNavigation({
  onPrev,
  onNext,
  threshold = 80,
  velocityThreshold = 1.2,
  lockTime = 600,
}: UseScrollNavigationProps) {
  const lastTimeRef = useRef<number | null>(null)
  const lockedRef = useRef(false)

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      if (lockedRef.current) return

      const now = Date.now()

      if (lastTimeRef.current === null) {
        lastTimeRef.current = now
        return
      }

      const deltaY = e.deltaY
      const deltaTime = now - lastTimeRef.current
      const velocity = deltaY / deltaTime

      if (deltaY > threshold || velocity > velocityThreshold) {
        lockedRef.current = true
        onNext()
      } else if (deltaY < -threshold || velocity < -velocityThreshold) {
        lockedRef.current = true
        onPrev()
      }

      lastTimeRef.current = now

      if (lockedRef.current) {
        setTimeout(() => {
          lockedRef.current = false
        }, lockTime)
      }
    },
    [onPrev, onNext, threshold, velocityThreshold, lockTime],
  )

  return handleWheel
}
