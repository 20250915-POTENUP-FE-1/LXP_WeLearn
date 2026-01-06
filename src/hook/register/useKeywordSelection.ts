import { toast } from 'react-toastify'
import { ShortsFormChangeHandler } from '@/features/register/types/shortsRegister'

const MAX_KEYWORDS = 5

interface UseKeywordSelectionParams {
  keywords: string[]
  onChange: ShortsFormChangeHandler
}

export default function useKeywordSelection({ keywords, onChange }: UseKeywordSelectionParams) {
  const isMaxReached = keywords.length >= MAX_KEYWORDS

  // 키워드 선택
  const selectKeyword = (keyword: string): boolean => {
    if (isMaxReached) {
      toast.warning(`키워드는 최대 ${MAX_KEYWORDS}개까지 선택 가능합니다.`)
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
    maxKeywords: MAX_KEYWORDS,
    selectKeyword,
    removeKeyword,
  }
}
