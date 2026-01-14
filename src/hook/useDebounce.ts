import { useRef } from 'react'

export function useDebounce<T extends (...args: any[]) => void>(fn: T, delay = 300) {
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  return (...args: Parameters<T>) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    timerRef.current = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}
