import { ArrowDown, ArrowUp } from 'lucide-react'

interface ShortsNavigationButtonsProps {
  onPrev: () => void
  onNext: () => void
  hasPrev: boolean
  hasNext: boolean
}

function ShortsNavigationButtons({
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}: ShortsNavigationButtonsProps) {
  return (
    <div className="hidden flex-col items-center justify-center gap-4 md:flex">
      {/* 이전 영상 버튼 */}
      <button
        onClick={onPrev}
        disabled={!hasPrev}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="이전 영상"
      >
        <span className="flex flex-col items-center text-xs text-gray-600">
          <ArrowUp strokeWidth={1.5} />
        </span>
      </button>

      {/* 다음 영상 버튼 */}
      <button
        onClick={onNext}
        disabled={!hasNext}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="다음 영상"
      >
        <span className="flex flex-col items-center text-xs text-gray-600">
          <ArrowDown strokeWidth={1.5} />
        </span>
      </button>
    </div>
  )
}

export default ShortsNavigationButtons
