import { ShortsFormChangeHandler } from '@/features/register/types/shortsRegister'
import useKeywordSearch from './useKeywordSearch'
import useKeywordSelection from './useKeywordSelection'
import useKeywordsNavigation from './useKeywordsNavigation'
import { KeywordSuggestion } from '@/types/keyword/keyword'

interface UseKeywordsParams {
  keywords: string[]
  keywordInput: string
  onChange: ShortsFormChangeHandler
}

export default function useKeywords({ keywords, keywordInput, onChange }: UseKeywordsParams) {
  // 키워드 선택/삭제 로직
  const { isMaxReached, maxKeywords, selectKeyword, removeKeyword } = useKeywordSelection({
    keywords,
    onChange,
  })

  // 키워드 검색/추천 로직
  const { suggestions, isLoading, getDisplayName } = useKeywordSearch({
    keywordInput,
    keywords,
    isMaxReached,
  })

  // 드롭다운 네비게이션 로직
  const {
    isOpen,
    activeIndex,
    open,
    close,
    handleKeyDown: navigationKeyDown,
    handleBlur,
  } = useKeywordsNavigation({
    itemCount: suggestions.length,
    onSelect: (index) => {
      // normalizedName을 저장
      if (selectKeyword(suggestions[index].normalizedName)) {
        close()
      }
    },
  })

  // 키워드 선택 핸들러 (normalizedName 저장)
  const handleSelectKeyword = (suggestion: KeywordSuggestion) => {
    if (selectKeyword(suggestion.normalizedName)) {
      close()
    }
  }

  // 입력값 변경 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isMaxReached) {
      return
    }
    const value = e.target.value
    onChange('keywordInput', value)
    if (value.trim().length > 0) {
      open()
    } else {
      close()
    }
  }

  // 포커스 핸들러
  const handleFocus = () => {
    if (keywordInput.trim().length > 0 && !isMaxReached) {
      open()
    }
  }

  return {
    // 상태
    isOpen,
    suggestions,
    isLoading,
    activeIndex,
    isMaxReached,
    maxKeywords,
    // 핸들러
    handleSelectKeyword,
    handleRemoveKeyword: removeKeyword,
    handleInputChange,
    handleKeyDown: navigationKeyDown,
    handleBlur,
    handleFocus,
    // 유틸리티
    getDisplayName,
  }
}
