'use client'

import { KeywordSuggestion } from '@/types/keyword/keyword'
import { useEffect, useRef } from 'react'

interface KeywordSuggestionsProps {
  isOpen: boolean
  isLoading: boolean
  suggestions: KeywordSuggestion[]
  activeIndex: number
  keywordInput: string
  listboxId: string
  getOptionId: (index: number) => string
  onSelect: (suggestion: KeywordSuggestion) => void
}

export default function KeywordSuggestions({
  isOpen,
  isLoading,
  suggestions,
  activeIndex,
  keywordInput,
  listboxId,
  getOptionId,
  onSelect,
}: KeywordSuggestionsProps) {
  const activeItemRef = useRef<HTMLLIElement>(null)

  // activeIndex 변경 시 scrollIntoView로 선택 항목으로 스크롤 (키보드 방향키 스크롤)
  useEffect(() => {
    if (activeIndex >= 0 && activeItemRef.current) {
      activeItemRef.current.scrollIntoView({ block: 'nearest' })
    }
  }, [activeIndex])

  // 로딩 표시
  if (isLoading) {
    return (
      <div className="absolute z-10 mt-1 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-500 shadow-lg">
        검색 중...
      </div>
    )
  }

  // 드롭다운 닫힘
  if (!isOpen) return null

  // 추천 목록
  if (suggestions.length > 0) {
    return (
      <ul
        id={listboxId}
        role="listbox"
        className="absolute z-10 mt-1 max-h-48 w-full overflow-y-auto rounded-lg border border-gray-300 bg-white shadow-lg"
      >
        {suggestions.map((suggestion, index) => (
          <li
            key={suggestion.normalizedName} // 렌더링용
            ref={index === activeIndex ? activeItemRef : null} // 활성 항목만 ref 연결
            id={getOptionId(index)}
            role="option"
            aria-selected={index === activeIndex}
            onMouseDown={(e) => {
              e.preventDefault()
              onSelect(suggestion)
            }}
            className={`cursor-pointer px-4 py-2 text-sm text-gray-700 ${
              index === activeIndex ? 'bg-gray-100' : 'hover:bg-gray-100'
            }`}
          >
            {suggestion.displayName}
          </li>
        ))}
      </ul>
    )
  }

  // 검색 결과 없음
  if (keywordInput.trim()) {
    return (
      <div
        className="absolute z-10 mt-1 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-500 shadow-lg"
        role="status"
        aria-live="polite"
      >
        일치하는 키워드가 없습니다.
      </div>
    )
  }

  return null
}
