import { ShortsFormChangeHandler } from '@/types/shortsRegister'

interface UseKeywordsParams {
  keywords: string[]
  keywordInput: string
  onChange: ShortsFormChangeHandler
}

export default function useKeywords({ keywords, keywordInput, onChange }: UseKeywordsParams) {
  // 키워드 추가
  const handleAddKeyword = () => {
    const trimmedInput = keywordInput.trim()
    if (trimmedInput && !keywords.includes(trimmedInput)) {
      onChange('keywords', [...keywords, trimmedInput])
      onChange('keywordInput', '')
    }
  }

  // 키워드 삭제
  const handleRemoveKeyword = (keywordToRemove: string) => {
    onChange(
      'keywords',
      keywords.filter((keyword) => keyword !== keywordToRemove),
    )
  }

  // Enter 키 입력 시 키워드 추가
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddKeyword()
    }
  }

  // 키워드 입력값 변경
  const handleInputChange = (value: string) => {
    onChange('keywordInput', value)
  }

  return {
    handleAddKeyword,
    handleRemoveKeyword,
    handleKeyDown,
    handleInputChange,
  }
}
