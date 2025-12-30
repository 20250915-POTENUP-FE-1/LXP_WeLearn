'use client'

import ShortsFormTitle from './ShortsFormTitle'
import ShortsFormCategory from './ShortsFormCategory'
import ShortsFormKeywords from './ShortsFormKeywords'
import ShortsFormThumbnail from './ShortsFormThumbnail'

interface ShortsFormLeftSectionProps {
  title: string
  setTitle: (value: string) => void
  description: string
  setDescription: (value: string) => void
  category: string
  setCategory: (value: string) => void
  tags: string[]
  setTags: (value: string[]) => void
  tagInput: string
  setTagInput: (value: string) => void
  isPublic: boolean
  setIsPublic: (value: boolean) => void
  thumbnail: string | null
  setThumbnail: (value: string | null) => void
}

export default function ShortsFormLeftSection({
  title,
  setTitle,
  description,
  setDescription,
  category,
  setCategory,
  tags,
  setTags,
  tagInput,
  setTagInput,
  isPublic,
  setIsPublic,
  thumbnail,
  setThumbnail,
}: ShortsFormLeftSectionProps) {
  return (
    <div className="rounded-2xl bg-gray-50 p-8">
      <div className="space-y-6">
        <ShortsFormTitle
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          isPublic={isPublic}
          setIsPublic={setIsPublic}
        />

        <ShortsFormCategory category={category} setCategory={setCategory} />

        <ShortsFormKeywords
          tags={tags}
          setTags={setTags}
          tagInput={tagInput}
          setTagInput={setTagInput}
        />

        <ShortsFormThumbnail thumbnail={thumbnail} setThumbnail={setThumbnail} />
      </div>
    </div>
  )
}
