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
    <div className="space-y-4">
      {/* 등록 버튼 */}
      <Button
        type="button"
        variant="accent"
        onClick={onRegister}
        disabled={isDisabled}
        className="text-md w-full py-6"
      >
        {isLoading ? loadingLabel : registerLabel}
      </Button>

      {/* 취소 버튼 */}
      <Button
        type="button"
        variant="secondary"
        onClick={onCancel}
        disabled={isDisabled}
        className="text-md w-full py-6"
      >
        {cancelLabel}
      </Button>
    </div>
  )
}
