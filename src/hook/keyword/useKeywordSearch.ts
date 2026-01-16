import { useState, useEffect, useRef } from 'react'
import { getKeywordsAction } from '@/features/keyword.action'
import { KeywordResponse } from '@/services/keyword/keyword.service'

interface UseKeywordSearchParams {
  keywordInput: string // 사용자 입력값
  keywords: string[] // 이미 선택된 키워드 목록
  isMaxReached: boolean // 최대 키워드 개수 도달 여부
}

// 키워드 자동완성 검색 기능을 제공하는 커스텀 훅
// 서버에서 최초 1회 전체 키워드를 가져온 후 클라이언트에서 캐싱하여 로컬 필터링 방식
export default function useKeywordSearch({
  keywordInput,
  keywords,
  isMaxReached,
}: UseKeywordSearchParams) {
  // 검색 결과 추천 키워드 목록
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // 전체 키워드 캐시 (최초 1회 로드 후 재사용)
  const keywordCacheRef = useRef<KeywordResponse[] | null>(null)
  const isFetchingRef = useRef(false)

  // 전체 키워드 로드 (캐시가 없을 때만 서버 호출)
  const loadKeywords = async (): Promise<KeywordResponse[]> => {
    if (keywordCacheRef.current) {
      return keywordCacheRef.current
    }

    if (isFetchingRef.current) {
      // 이미 로딩 중이면 완료될 때까지 대기
      return new Promise((resolve) => {
        const checkCache = setInterval(() => {
          if (keywordCacheRef.current) {
            clearInterval(checkCache)
            resolve(keywordCacheRef.current)
          }
        }, 50) // 타임아웃 방지, 50ms 간격으로 체크
      })
    }

    isFetchingRef.current = true
    try {
      const result = await getKeywordsAction()
      keywordCacheRef.current = result
      return result
    } finally {
      isFetchingRef.current = false
    }
  }

  // 입력값 변경 시 로컬 필터링 실행
  useEffect(() => {
    const filterSuggestions = async () => {
      // 입력값이 없거나 최대 개수 도달 시 추천 목록 초기화
      if (!keywordInput.trim() || isMaxReached) {
        setSuggestions([])
        return
      }

      setIsLoading(true)

      try {
        const allKeywords = await loadKeywords()
        const query = keywordInput.trim().toLowerCase()

        // 로컬 필터링: 입력값을 포함하는 키워드 검색
        const filtered = allKeywords
          .filter((item) => item.normalizedName.includes(query))
          .map((item) => item.displayName)
          .filter((name) => !keywords.includes(name)) // 이미 선택된 키워드 제외

        setSuggestions(filtered)
      } catch (error) {
        console.error('키워드 검색 실패:', error)
        setSuggestions([])
      } finally {
        setIsLoading(false)
      }
    }

    // 디바운스 처리 (150ms) - 로컬 필터링이므로 더 짧게 설정
    const debounceTimer = setTimeout(filterSuggestions, 150)
    return () => clearTimeout(debounceTimer)
  }, [keywordInput, keywords, isMaxReached])

  return {
    suggestions,
    isLoading,
    clearSuggestions: () => setSuggestions([]), // 추천 목록 초기화
  }
}
