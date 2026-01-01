import { useState, useEffect } from 'react'
import { ShortsFormChangeHandler } from '@/types/shortsRegister'
import { DUMMY_KEYWORDS } from '@/dummy/keyword'

interface UseKeywordsParams {
  keywords: string[]
  keywordInput: string
  onChange: ShortsFormChangeHandler
}

export default function useKeywords({ keywords, keywordInput, onChange }: UseKeywordsParams) {
  // 추천 목록 표시 여부
  const [isOpen, setIsOpen] = useState(false)

  // 추천 키워드 목록
  const [suggestions, setSuggestions] = useState<string[]>([])

  // 로딩 상태
  const [isLoading, setIsLoading] = useState(false)

  // 현재 선택된 항목 인덱스 (키보드 네비게이션용)
  const [activeIndex, setActiveIndex] = useState(-1)

  // 입력값 변경 시 키워드 검색
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!keywordInput.trim()) {
        setSuggestions([])
        setActiveIndex(-1)
        return
      }

      setIsLoading(true)

      try {
        // TODO: API 연동 시 실제 API 호출로 교체
        const input = keywordInput.toLowerCase()
        const filtered = DUMMY_KEYWORDS.filter(
          (keyword) => keyword.toLowerCase().includes(input) && !keywords.includes(keyword),
        )
        setSuggestions(filtered)
        setActiveIndex(-1)
      } catch (error) {
        console.error('키워드 검색 실패:', error)
        setSuggestions([])
      } finally {
        setIsLoading(false)
      }
    }

    const debounceTimer = setTimeout(fetchSuggestions, 300)
    return () => clearTimeout(debounceTimer)
  }, [keywordInput, keywords])

  // 키워드 선택
  const handleSelectKeyword = (keyword: string) => {
    if (!keywords.includes(keyword)) {
      onChange('keywords', [...keywords, keyword])
      onChange('keywordInput', '')
      setIsOpen(false)
      setActiveIndex(-1)
    }
  }

  // 키워드 삭제
  const handleRemoveKeyword = (keywordToRemove: string) => {
    onChange(
      'keywords',
      keywords.filter((keyword) => keyword !== keywordToRemove),
    )
  }

  // 입력값 변경
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    onChange('keywordInput', value)
    setIsOpen(value.trim().length > 0)
  }

  // 키보드 이벤트
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || suggestions.length === 0) {
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
      return
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setActiveIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0))
        break
      case 'ArrowUp':
        e.preventDefault()
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1))
        break
      case 'Enter':
        e.preventDefault()
        if (activeIndex >= 0 && activeIndex < suggestions.length) {
          handleSelectKeyword(suggestions[activeIndex])
        } else if (suggestions.length > 0) {
          handleSelectKeyword(suggestions[0])
        }
        break
      case 'Escape':
        e.preventDefault()
        setIsOpen(false)
        setActiveIndex(-1)
        break
    }
  }

  // 포커스 해제
  const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
    if (e.relatedTarget && e.currentTarget.contains(e.relatedTarget as Node)) {
      return
    }
    setIsOpen(false)
    setActiveIndex(-1)
  }

  // 포커스
  const handleFocus = () => {
    if (keywordInput.trim().length > 0) {
      setIsOpen(true)
    }
  }

  return {
    isOpen,
    suggestions,
    isLoading,
    activeIndex,
    handleSelectKeyword,
    handleRemoveKeyword,
    handleInputChange,
    handleKeyDown,
    handleBlur,
    handleFocus,
  }
}
