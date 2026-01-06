'use client'

import { Button } from '@/components/ui/Button'

interface ShortsFormSubmitButtonsProps {
  onRegister: () => void
  onCancel: () => void
  registerLabel?: string
  cancelLabel?: string
  isLoading?: boolean
  loadingLabel?: string
  disabled?: boolean
}

export default function ShortsFormSubmitButtons({
  onRegister,
  onCancel,
  registerLabel = '등록하기',
  cancelLabel = '취소',
  isLoading = false,
  loadingLabel = '처리 중...',
  disabled = false,
}: ShortsFormSubmitButtonsProps) {
  const isDisabled = disabled || isLoading

  return (
    <div className="flex flex-col gap-6 pt-4">
      {/* 등록 버튼 */}
      <div className="rounded-full shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-gray-100 hover:shadow-lg">
        <Button
          type="button"
          variant="accent"
          onClick={onRegister}
          disabled={isDisabled}
          className="text-md w-full rounded-full py-7"
        >
          {isLoading ? loadingLabel : registerLabel}
        </Button>
      </div>

      {/* 취소 버튼 */}
      <div className="rounded-full shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-gray-100 hover:shadow-lg">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isDisabled}
          className="text-md w-full rounded-full py-7"
        >
          {cancelLabel}
        </Button>
      </div>
    </div>
  )
}
