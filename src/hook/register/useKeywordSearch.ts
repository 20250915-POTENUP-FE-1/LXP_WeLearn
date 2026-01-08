import { useState, useEffect } from 'react'
import { DUMMY_KEYWORDS } from '@/dummy/keyword'

interface UseKeywordSearchParams {
  keywordInput: string // 사용자 입력값
  keywords: string[] // 이미 선택된 키워드 목록
  isMaxReached: boolean // 최대 키워드 개수 도달 여부
}

// 키워드 자동완성 검색 기능을 제공하는 커스텀 훅
export default function useKeywordSearch({
  keywordInput,
  keywords,
  isMaxReached,
}: UseKeywordSearchParams) {
  // 검색 결과 추천 키워드 목록
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // 입력값 변경 시 키워드 검색 실행
  useEffect(() => {
    const fetchSuggestions = async () => {
      // 입력값이 없거나 최대 개수 도달 시 추천 목록 초기화
      if (!keywordInput.trim() || isMaxReached) {
        setSuggestions([])
        return
      }

      setIsLoading(true)

      try {
        // TODO: 실제 API 호출로 변경 필요
        const input = keywordInput.toLowerCase()
        // 입력값을 포함하고, 아직 선택되지 않은 키워드만 필터링
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

    // 디바운스 처리 (300ms) - 연속 입력 시 불필요한 검색 방지
    const debounceTimer = setTimeout(fetchSuggestions, 300)
    return () => clearTimeout(debounceTimer)
  }, [keywordInput, keywords, isMaxReached])

  return {
    suggestions,
    isLoading,
    clearSuggestions: () => setSuggestions([]), // 추천 목록 초기화
  }
}
