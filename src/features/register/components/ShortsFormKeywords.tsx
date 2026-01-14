'use client'

import { Input } from '@/components/ui/Input'
import { ShortsFormChangeHandler } from '@/features/register/types/shortsRegister'
import KeywordSuggestions from './KeywordSuggestions'
import KeywordList from './KeywordList'
import useKeywords from '@/hook/keyword/useKeywords'

interface ShortsFormKeywordsProps {
  keywords: string[]
  keywordInput: string
  onChange: ShortsFormChangeHandler
}

export default function ShortsFormKeywords({
  keywords,
  keywordInput,
  onChange,
}: ShortsFormKeywordsProps) {
  const {
    isOpen,
    suggestions,
    isLoading,
    activeIndex,
    isMaxReached,
    maxKeywords,
    handleSelectKeyword,
    handleRemoveKeyword,
    handleInputChange,
    handleKeyDown,
    handleBlur,
    handleFocus,
  } = useKeywords({ keywords, keywordInput, onChange })

  const listboxId = 'keyword-listbox'
  const getOptionId = (index: number) => `keyword-option-${index}`

  return (
    <div>
      <label id="keyword-label" className="mb-2 block text-sm font-medium text-gray-700">
        키워드 ({keywords.length}/{maxKeywords}) <span className="text-red-600">*</span>
      </label>

      {/* 키워드 입력 */}
      <div className="relative" onBlur={handleBlur}>
        <Input
          role="combobox"
          aria-expanded={isOpen && suggestions.length > 0}
          aria-controls={listboxId}
          aria-activedescendant={activeIndex >= 0 ? getOptionId(activeIndex) : undefined}
          aria-autocomplete="list"
          type="text"
          name="keywords"
          value={keywordInput}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          className="bg-white focus:ring-black focus:outline-none"
          placeholder={
            isMaxReached ? `최대 ${maxKeywords}개까지 선택 가능합니다.` : '키워드를 입력하세요.'
          }
          disabled={isMaxReached}
        />

        {/* 추천 드롭다운 */}
        <KeywordSuggestions
          isOpen={isOpen}
          isLoading={isLoading}
          suggestions={suggestions}
          activeIndex={activeIndex}
          keywordInput={keywordInput}
          listboxId={listboxId}
          getOptionId={getOptionId}
          onSelect={handleSelectKeyword}
        />
      </div>
      {/* 선택된 키워드 목록 */}
      <KeywordList keywords={keywords} onRemove={handleRemoveKeyword} />
    </div>
  )
}
