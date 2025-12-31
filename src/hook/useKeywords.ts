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

  // 입력값 변경 시 키워드 검색
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!keywordInput.trim()) {
        setSuggestions([])
        return
      }

      setIsLoading(true)

      try {
        // TODO: API 연동 시 실제 API 호출로 교체
        // const tags = await searchTags(keywordInput)

        // 더미 데이터 필터링
        const input = keywordInput.toLowerCase()
        const filtered = DUMMY_KEYWORDS.filter(
          (keyword) => keyword.toLowerCase().includes(input) && !keywords.includes(keyword),
        )
        setSuggestions(filtered)
      } catch (error) {
        console.error('키워드 검색 실패:', error)
        setSuggestions([])
      } finally {
        setIsLoading(false)
      }
    }

    // 디바운스 적용 (300ms)
    const debounceTimer = setTimeout(fetchSuggestions, 300)
    return () => clearTimeout(debounceTimer)
  }, [keywordInput, keywords])

  // 키워드 선택 (목록에서 클릭)
  const handleSelectKeyword = (keyword: string) => {
    if (!keywords.includes(keyword)) {
      onChange('keywords', [...keywords, keyword])
      onChange('keywordInput', '')
      setIsOpen(false)
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

  // 키보드 이벤트 (Enter, Escape)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setIsOpen(false)
    }
    if (e.key === 'Enter') {
      e.preventDefault()
      if (suggestions.length > 0) {
        handleSelectKeyword(suggestions[0])
      }
    }
  }

  // 포커스 해제 시 목록 닫기
  const handleBlur = () => {
    setTimeout(() => setIsOpen(false), 150)
  }

  // 포커스 시 목록 열기
  const handleFocus = () => {
    if (keywordInput.trim().length > 0) {
      setIsOpen(true)
    }
  }

  return {
    isOpen,
    suggestions,
    isLoading,
    handleSelectKeyword,
    handleRemoveKeyword,
    handleInputChange,
    handleKeyDown,
    handleBlur,
    handleFocus,
  }
}
