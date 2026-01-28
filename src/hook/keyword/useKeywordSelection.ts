import type { ShortsFormChangeHandler } from '@/types/shorts/shortsForm'
import { VALIDATION_LIMITS } from '@/constants/form.validation'
import { isKeywordsMaxReached } from '@/features/shortsform/shortsform.validation'

interface UseKeywordSelectionParams {
  keywords: string[]
  onChange: ShortsFormChangeHandler
}

export default function useKeywordSelection({ keywords, onChange }: UseKeywordSelectionParams) {
  const isMaxReached = isKeywordsMaxReached(keywords)

  // 키워드 선택
  const selectKeyword = (keyword: string): boolean => {
    if (isMaxReached) {
      return false
    }

    if (!keywords.includes(keyword)) {
      onChange('keywords', [...keywords, keyword])
      onChange('keywordInput', '')
      return true
    }

    return false
  }

  // 키워드 삭제
  const removeKeyword = (keywordToRemove: string) => {
    onChange(
      'keywords',
      keywords.filter((keyword) => keyword !== keywordToRemove),
    )
  }

  return {
    isMaxReached,
    maxKeywords: VALIDATION_LIMITS.KEYWORDS_MAX,
    selectKeyword,
    removeKeyword,
  }
}
