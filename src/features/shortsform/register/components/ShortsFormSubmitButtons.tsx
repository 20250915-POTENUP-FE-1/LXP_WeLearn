'use client'

import { Button } from '@/components/ui/Button'
import { Loader2 } from 'lucide-react'

interface ShortsFormSubmitButtonsProps {
  // onRegister: () => void
  onCancel: () => void
  isLoading?: boolean
  submitText?: string // 버튼 텍스트 커스터마이징
  cancelText?: string
}

export default function ShortsFormSubmitButtons({
  // onRegister,
  onCancel,
  isLoading = false,
  submitText = '등록하기',
  cancelText = '취소',
}: ShortsFormSubmitButtonsProps) {
  return (
    <div className="pt-4-y-4 flex flex-col gap-6">
      <div className="rounded-full shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-gray-100 hover:shadow-lg">
        <Button
          type="submit"
          variant="accent"
          className="text-md w-full rounded-full py-6"
          // onClick={onRegister}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              처리 중...
            </>
          ) : (
            submitText
          )}
        </Button>
      </div>
      <div className="rounded-full shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-gray-100 hover:shadow-lg">
        <Button
          type="button"
          variant="secondary"
          className="text-md w-full rounded-full py-6"
          onClick={onCancel}
          disabled={isLoading}
        >
          {cancelText}
        </Button>
      </div>
    </div>
  )
}
