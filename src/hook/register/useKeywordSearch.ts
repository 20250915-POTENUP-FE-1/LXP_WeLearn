import { useState, useEffect } from 'react'
import { DUMMY_KEYWORDS } from '@/dummy/keyword'

interface UseKeywordSearchParams {
  keywordInput: string
  keywords: string[]
  isMaxReached: boolean
}

export default function useKeywordSearch({
  keywordInput,
  keywords,
  isMaxReached,
}: UseKeywordSearchParams) {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!keywordInput.trim() || isMaxReached) {
        setSuggestions([])
        return
      }

      setIsLoading(true)

      try {
        // TODO: 실제 API 호출로 변경 필요
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

    const debounceTimer = setTimeout(fetchSuggestions, 300)
    return () => clearTimeout(debounceTimer)
  }, [keywordInput, keywords, isMaxReached])

  return {
    suggestions,
    isLoading, // api 호출 상태 반환
    clearSuggestions: () => setSuggestions([]),
  }
}
