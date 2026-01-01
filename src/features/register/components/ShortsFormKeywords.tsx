'use client'

import { Input } from '@/components/ui/Input'
import useKeywords from '@/hook/useKeywords'
import { ShortsFormChangeHandler } from '@/types/shortsRegister'

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
        키워드
      </label>

      {/* 선택된 키워드 목록 */}
      {keywords.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2" role="list" aria-label="선택된 키워드">
          {keywords.map((keyword) => (
            <span
              key={keyword}
              role="listitem"
              className="inline-flex items-center gap-1 rounded-full bg-gray-200 px-3 py-1 text-sm text-gray-700"
            >
              {keyword}
              <button
                type="button"
                onClick={() => handleRemoveKeyword(keyword)}
                aria-label={`${keyword} 삭제`}
                className="hover:text-gray-900"
              >
                ✕
              </button>
            </span>
          ))}
        </div>
      )}

      {/* 키워드 입력 및 추천 목록 */}
      <div className="relative" onBlur={handleBlur}>
        <Input
          type="text"
          name="keyword"
          value={keywordInput}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          placeholder="키워드를 입력하세요."
          className="bg-white focus:ring-black focus:outline-none"
          role="combobox"
          aria-expanded={isOpen && suggestions.length > 0}
          aria-controls={listboxId}
          aria-activedescendant={activeIndex >= 0 ? getOptionId(activeIndex) : undefined}
          aria-autocomplete="list"
        />

        {/* 로딩 표시 */}
        {isLoading && (
          <div className="absolute z-10 mt-1 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-500 shadow-lg">
            검색 중...
          </div>
        )}

        {/* 연관 키워드 추천 목록 */}
        {!isLoading && isOpen && suggestions.length > 0 && (
          <ul
            id={listboxId}
            role="listbox"
            className="absolute z-10 mt-1 max-h-48 w-full overflow-y-auto rounded-lg border border-gray-300 bg-white shadow-lg"
          >
            {suggestions.map((keyword, index) => (
              <li
                key={keyword}
                id={getOptionId(index)}
                role="option"
                aria-selected={index === activeIndex}
                // blur로 dropdown이 닫히기 전에 선택 처리하기 위해 mousedown 사용
                onMouseDown={(e) => {
                  e.preventDefault()
                  handleSelectKeyword(keyword)
                }}
                className={`cursor-pointer px-4 py-2 text-sm text-gray-700 ${
                  index === activeIndex ? 'bg-gray-100' : 'hover:bg-gray-100'
                }`}
              >
                {keyword}
              </li>
            ))}
          </ul>
        )}

        {/* 검색 결과 없음 */}
        {!isLoading && isOpen && keywordInput.trim() && suggestions.length === 0 && (
          <div
            className="absolute z-10 mt-1 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-500 shadow-lg"
            role="status"
            aria-live="polite"
          >
            일치하는 키워드가 없습니다.
          </div>
        )}
      </div>
    </div>
  )
}
