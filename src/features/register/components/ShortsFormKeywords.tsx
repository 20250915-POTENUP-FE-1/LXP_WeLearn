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
  const { handleRemoveKeyword, handleKeyDown } = useKeywords({ keywords, keywordInput, onChange })

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">키워드</label>

      {/* 키워드 목록 */}
      {keywords.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {keywords.map((keyword, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 rounded-full bg-gray-200 px-3 py-1 text-sm text-gray-700"
            >
              {keyword}
              <button
                type="button"
                onClick={() => handleRemoveKeyword(keyword)}
                className="hover:text-gray-900"
              >
                ✕
              </button>
            </span>
          ))}
        </div>
      )}

      {/* 키워드 입력 */}
      <div className="flex gap-2">
        <Input
          type="text"
          name="shorts-keyword"
          value={keywordInput}
          onChange={(e) => onChange('keywordInput', e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="키워드를 입력하세요."
          className="bg-white focus:ring-black focus:outline-none"
        />
      </div>
    </div>
  )
}
