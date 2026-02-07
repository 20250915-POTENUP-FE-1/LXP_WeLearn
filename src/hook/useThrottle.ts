import { useRef } from 'react'

export function useThrottle<T extends (...args: any[]) => void>(fn: T, delay = 1000) {
  const lastRunRef = useRef(0)

  return (...args: Parameters<T>) => {
    const now = Date.now()

    if (now - lastRunRef.current < delay) {
      return
    }

    lastRunRef.current = now
    fn(...args)
  }
}
