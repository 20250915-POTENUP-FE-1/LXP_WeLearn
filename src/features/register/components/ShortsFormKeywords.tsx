'use client'

import { Input } from '@/components/ui/Input'

interface ShortsFormKeywordsProps {
  tags: string[]
  setTags: (value: string[]) => void
  tagInput: string
  setTagInput: (value: string) => void
}

export default function ShortsFormKeywords({
  tags,
  setTags,
  tagInput,
  setTagInput,
}: ShortsFormKeywordsProps) {
  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()])
      setTagInput('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddTag()
    }
  }

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">태그</label>
      <div className="mb-3 flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center gap-1 rounded-full bg-gray-200 px-3 py-1 text-sm text-gray-700"
          >
            {tag}
            <button
              type="button"
              onClick={() => handleRemoveTag(tag)}
              className="hover:text-gray-900"
            >
              ✕
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          type="text"
          name="shorts-tag"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="태그를 입력하세요."
        />
      </div>
    </div>
  )
}
