'use client'

import { ShortsFormData, ShortsFormChangeHandler } from '@/features/register/types/shortsRegister'
import ShortsFormInputs from './ShortsFormInputs'
import ShortsFormCategory from './ShortsFormCategory'
import ShortsFormKeywords from './ShortsFormKeywords'
import ShortsFormThumbnail from './ShortsFormThumbnail'

interface ShortsFormLeftSectionProps {
  formData: ShortsFormData
  onChange: ShortsFormChangeHandler
}

export default function ShortsFormLeftSection({ formData, onChange }: ShortsFormLeftSectionProps) {
  return (
    <div className="rounded-2xl bg-gray-50 p-8">
      <div className="space-y-6">
        {/* 제목, 설명, 공개여부 */}
        <ShortsFormInputs formData={formData} onChange={onChange} />

        {/* 카테고리 */}
        <ShortsFormCategory
          value={formData.categoryId}
          onChange={(value) => onChange('categoryId', value)}
        />

        {/* 키워드 */}
        <ShortsFormKeywords
          keywords={formData.keywords}
          keywordInput={formData.keywordInput}
          onChange={onChange}
        />

        {/* 썸네일 이미지 */}
        <ShortsFormThumbnail
          value={formData.thumbnail}
          onChange={(value) => onChange('thumbnail', value)}
        />
      </div>
    </div>
  )
}
