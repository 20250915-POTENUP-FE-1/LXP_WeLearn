'use client'

import { ShortsFormLeftSection, ShortsPreviewRight } from '@/features/register/compontents'
import { useState } from 'react'

export default function ShortsCreatePage() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [tags, setTags] = useState<string[]>(['프론트엔드', 'NextJS'])
  const [tagInput, setTagInput] = useState('')
  const [isPublic, setIsPublic] = useState(true)
  const [thumbnail, setThumbnail] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [videoFile, setVideoFile] = useState<File | null>(null)

  const handleSubmit = () => {
    // TODO: 등록 로직 구현
  }

  const handleCancel = () => {
    // TODO: 취소 로직 구현
  }

  return (
    <div className="h-full w-full max-w-7xl">
      <div className="px-4 py-6 sm:px-6 sm:py-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
          {/* 왼쪽 - 숏츠 정보 입력 폼 */}
          <div className="w-full lg:flex-1">
            <ShortsFormLeftSection
              title={title}
              setTitle={setTitle}
              description={description}
              setDescription={setDescription}
              category={category}
              setCategory={setCategory}
              tags={tags}
              setTags={setTags}
              tagInput={tagInput}
              setTagInput={setTagInput}
              isPublic={isPublic}
              setIsPublic={setIsPublic}
              thumbnail={thumbnail}
              setThumbnail={setThumbnail}
            />
          </div>

          {/* 오른쪽 - 미리보기 및 업로드 */}
          <div className="w-full lg:w-96">
            <ShortsPreviewRight
              thumbnail={thumbnail}
              videoFile={videoFile}
              setVideoFile={setVideoFile}
              isDragging={isDragging}
              setIsDragging={setIsDragging}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
