'use client'

import { Button } from '@/components/ui/Button'

interface ShortsSubmitButtonsProps {
  onRegister: () => void
  onCancel: () => void
  registerLabel?: string
  isLoading?: boolean
}

export default function ShortsFormSubmitButtons({
  onRegister,
  onCancel,
  registerLabel = '등록하기',
  isLoading = false,
}: ShortsSubmitButtonsProps) {
  return (
    <div className="space-y-4">
      {/* 등록/수정 버튼 */}
      <Button
        type="button"
        variant="accent"
        onClick={onRegister}
        disabled={isLoading}
        className="text-md w-full py-6"
      >
        {isLoading ? '처리 중...' : registerLabel}
      </Button>

      {/* 취소 버튼 */}
      <Button
        type="button"
        variant="secondary"
        onClick={onCancel}
        disabled={isLoading}
        className="text-md w-full py-6"
      >
        취소
      </Button>
    </div>
  )
}
