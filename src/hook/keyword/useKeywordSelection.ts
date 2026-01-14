import { toast } from 'react-toastify'
import { ShortsFormChangeHandler } from '@/features/register/types/shortsRegister'
import { isKeywordsMaxReached, isKeywordsValid } from '@/features/register/register.validation'
import { VALIDATION_LIMITS } from '@/constants/form.validation'

interface UseKeywordSelectionParams {
  keywords: string[]
  onChange: ShortsFormChangeHandler
}

export default function useKeywordSelection({ keywords, onChange }: UseKeywordSelectionParams) {
  const isMaxReached = isKeywordsMaxReached(keywords)
  const isValid = isKeywordsValid(keywords)

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

  // 필수 입력 유효성 검증
  const validateKeywords = (): boolean => {
    if (!isValid) {
      toast.warning(`키워드를 ${VALIDATION_LIMITS.KEYWORDS_MIN}개 이상 입력해주세요.`)
      return false
    }
    return true
  }

  return {
    isMaxReached,
    isValid,
    maxKeywords: VALIDATION_LIMITS.KEYWORDS_MAX,
    minKeywords: VALIDATION_LIMITS.KEYWORDS_MIN,
    selectKeyword,
    removeKeyword,
    validateKeywords,
  }
}
