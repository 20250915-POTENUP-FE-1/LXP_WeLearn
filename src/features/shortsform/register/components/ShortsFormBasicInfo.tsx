'use client'

import { ChevronDown } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { VALIDATION_LIMITS } from '@/constants/form.validation'
import type {
  ShortsFormData,
  ShortsFormChangeHandler,
  CategoryOption,
} from '@/features/shortsform/types/shortsForm'

interface ShortsFormBasicInfoProps {
  formData: Pick<ShortsFormData, 'title' | 'description' | 'isPublic' | 'categoryId'>
  categories: CategoryOption[]
  onChange: ShortsFormChangeHandler
}

/**
 * 숏츠 기본 정보 입력
 * - 제목, 설명, 공개여부, 카테고리
 */
export default function ShortsFormBasicInfo({
  formData,
  categories,
  onChange,
}: ShortsFormBasicInfoProps) {
  const { title, description, isPublic, categoryId } = formData
  const selectValue = categoryId?.toString() ?? ''

  return (
    <div className="space-y-6">
      {/* 제목 */}
      <div>
        <div className="flex flex-row justify-between">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            숏츠 제목 <span className="text-red-600">*</span>
          </label>
          <p className="mt-1 pr-2 text-right text-xs text-gray-500">
            {title.length}/{VALIDATION_LIMITS.TITLE_MAX_LENGTH}
          </p>
        </div>
        <Input
          type="text"
          name="title"
          value={title}
          onChange={(e) => onChange('title', e.target.value)}
          placeholder="제목을 입력하세요."
          maxLength={VALIDATION_LIMITS.TITLE_MAX_LENGTH}
          className="border-gray-300 bg-white text-sm focus:ring-black focus:outline-none"
        />
      </div>

      {/* 설명 */}
      <div>
        <div className="flex flex-row justify-between">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            숏츠 설명 <span className="text-red-600">*</span>
          </label>
          <p className="mt-1 pr-2 text-right text-xs text-gray-500">
            {description.length}/{VALIDATION_LIMITS.DESCRIPTION_MAX_LENGTH}
          </p>
        </div>
        <textarea
          value={description}
          name="description"
          onChange={(e) => onChange('description', e.target.value)}
          placeholder="내용을 입력하세요."
          rows={4}
          maxLength={VALIDATION_LIMITS.DESCRIPTION_MAX_LENGTH}
          className="w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm transition-all placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:outline-none"
        />
      </div>

      {/* 공개 여부 */}
      <fieldset>
        <legend className="mb-2 block text-sm font-medium text-gray-700">공개 여부</legend>
        <div className="flex items-center gap-3">
          <label
            className={`flex flex-1 cursor-pointer items-center justify-center rounded-lg py-2 text-sm font-medium transition-all ${
              isPublic
                ? 'border-2 border-black bg-black text-white'
                : 'border-2 border-gray-200 bg-white text-gray-600'
            }`}
          >
            <input
              type="radio"
              name="isPublic"
              value="true"
              checked={isPublic}
              onChange={() => onChange('isPublic', true)}
              className="sr-only"
            />
            공개
          </label>
          <label
            className={`flex flex-1 cursor-pointer items-center justify-center rounded-lg py-2 text-sm font-medium transition-all ${
              !isPublic
                ? 'border-2 border-black bg-black text-white'
                : 'border-2 border-gray-200 bg-white text-gray-600'
            }`}
          >
            <input
              type="radio"
              name="isPublic"
              value="false"
              checked={!isPublic}
              onChange={() => onChange('isPublic', false)}
              className="sr-only"
            />
            비공개
          </label>
        </div>
      </fieldset>

      {/* 카테고리 */}
      <div>
        <label htmlFor="category" className="mb-2 block text-sm font-medium text-gray-700">
          카테고리 <span className="text-red-600">*</span>
        </label>
        <div className="relative">
          <select
            id="category"
            value={selectValue}
            onChange={(e) => {
              const value = e.target.value
              onChange('categoryId', value ? Number(value) : null)
            }}
            className={`w-full cursor-pointer appearance-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm transition-all focus:ring-2 focus:ring-black focus:outline-none ${
              selectValue ? 'text-black' : 'text-gray-400'
            }`}
          >
            <option value="">카테고리를 선택하세요.</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2 text-gray-400" />
        </div>
      </div>
    </div>
  )
}
