'use client'

import { Input } from '@/components/ui/Input'
import { toast } from 'react-toastify'

const SEARCH_CONFIG = {
  placeholder: '검색어를 입력하세요',
  toastId: 'search-coming-soon',
  toastMessage: '검색 기능 서비스 준비 중입니다.',
} as const

interface SearchInputProps {
  name: string
  rightButton?: React.ReactNode
  autoFocus?: boolean
}

export default function SearchInput({ name, rightButton, autoFocus = false }: SearchInputProps) {
  const handleComingSoon = () => {
    toast.info(SEARCH_CONFIG.toastMessage, {
      toastId: SEARCH_CONFIG.toastId,
    })
  }

  return (
    <Input
      type="text"
      name={name}
      placeholder={SEARCH_CONFIG.placeholder}
      variant="search"
      rightButton={rightButton}
      autoFocus={autoFocus}
      aria-label="검색"
      onClick={handleComingSoon}
    />
  )
}
