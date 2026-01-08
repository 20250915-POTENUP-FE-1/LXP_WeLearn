import { toast } from 'react-toastify'
import { ShortsFormChangeHandler } from '@/features/register/types/shortsRegister'

const MAX_KEYWORDS = 5
const MIN_KEYWORDS = 1

interface UseKeywordSelectionParams {
  keywords: string[]
  onChange: ShortsFormChangeHandler
}

export default function useKeywordSelection({ keywords, onChange }: UseKeywordSelectionParams) {
  const isMaxReached = keywords.length >= MAX_KEYWORDS
  const isValid = keywords.length >= MIN_KEYWORDS

  // 키워드 선택
  const selectKeyword = (keyword: string): boolean => {
    if (isMaxReached) {
      // toast.warning(`키워드는 최대 ${MAX_KEYWORDS}개까지 선택 가능합니다.`)
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

  // 필수 입력 유효성 검증
  const validateKeywords = (): boolean => {
    if (!isValid) {
      toast.warning(`키워드를 ${MIN_KEYWORDS}개 이상 입력해주세요.`)
      return false
    }
    return true
  }

  return {
    isMaxReached,
    isValid,
    maxKeywords: MAX_KEYWORDS,
    minKeywords: MIN_KEYWORDS,
    selectKeyword,
    removeKeyword,
    validateKeywords,
  }
}
