'use client'

import { X } from 'lucide-react'

interface KeywordListProps {
  keywords: string[]
  onRemove: (keyword: string) => void
}

export default function KeywordList({ keywords, onRemove }: KeywordListProps) {
  if (keywords.length === 0) return null

  return (
    <div className="my-4 flex flex-wrap gap-2" role="list" aria-label="선택된 키워드">
      {keywords.map((keyword) => (
        <span
          key={keyword}
          role="listitem"
          className="inline-flex items-center gap-1 rounded-full bg-gray-200 px-3 py-1 text-sm text-gray-700"
        >
          {keyword}
          <button
            type="button"
            onClick={() => onRemove(keyword)}
            aria-label={`${keyword} 삭제`}
            className="hover:text-gray-900"
          >
            <X size={14} />
          </button>
        </span>
      ))}
    </div>
  )
}
