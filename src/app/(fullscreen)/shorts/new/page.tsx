'use client'

import { ChevronDown, Upload, Plus } from 'lucide-react'
import { useState, useRef } from 'react'

export default function ShortsCreate() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [tags, setTags] = useState(['프론트엔드', 'NextJS'])
  const [tagInput, setTagInput] = useState('')
  const [isPublic, setIsPublic] = useState(true)
  const [thumbnail, setThumbnail] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [videoFile, setVideoFile] = useState(null)

  const thumbnailInputRef = useRef(null)
  const videoInputRef = useRef(null)

  // 태그 추가
  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()])
      setTagInput('')
    }
  }

  // 태그 삭제
  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  // 썸네일 업로드
  const handleThumbnailUpload = (e) => {
    const file = e.target.files[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setThumbnail(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  // 드래그 이벤트
  const handleDragEnter = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files.length > 0 && files[0].type.startsWith('video/')) {
      setVideoFile(files[0])
    }
  }

  // 비디오 파일 선택
  const handleVideoUpload = (e) => {
    const file = e.target.files[0]
    if (file && file.type.startsWith('video/')) {
      setVideoFile(file)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid grid-cols-2 gap-12">
          {/* 왼쪽 - 숏츠 정보 입력 폼 */}
          <div className="rounded-2xl bg-gray-50 p-8">
            <div className="space-y-6">
              {/* 숏츠 제목 */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">숏츠 제목</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="제목을 입력하세요"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all focus:ring-2 focus:ring-black focus:outline-none"
                />
              </div>

              {/* 숏츠 설명 */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">숏츠 설명</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="내용을 입력하세요."
                  rows={4}
                  className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 transition-all focus:ring-2 focus:ring-black focus:outline-none"
                />
              </div>

              {/* 카테고리 */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">카테고리</label>
                <div className="relative">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full cursor-pointer appearance-none rounded-lg border border-gray-300 bg-white px-4 py-3 transition-all focus:ring-2 focus:ring-black focus:outline-none"
                  >
                    <option value="">카테고리를 선택하세요.</option>
                    <option value="frontend">프론트엔드</option>
                    <option value="backend">백엔드</option>
                    <option value="design">디자인</option>
                    <option value="data">데이터</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              {/* 태그 */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">태그</label>
                <div className="mb-3 flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 rounded-full bg-gray-200 px-3 py-1 text-sm text-gray-700"
                    >
                      {tag}
                      <button onClick={() => handleRemoveTag(tag)} className="hover:text-gray-900">
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        handleAddTag()
                      }
                    }}
                    placeholder="태그를 입력하세요."
                    className="flex-1 rounded-lg border border-gray-300 px-4 py-3 transition-all focus:ring-2 focus:ring-black focus:outline-none"
                  />
                </div>
              </div>

              {/* 공개 여부 */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">공개 여부</label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsPublic(false)}
                    className={`flex-1 rounded-lg py-2 font-medium transition-all ${
                      !isPublic
                        ? 'border-2 border-black bg-white text-black'
                        : 'border-2 border-transparent bg-gray-200 text-gray-600'
                    }`}
                  >
                    비공개
                  </button>
                  <button
                    onClick={() => setIsPublic(true)}
                    className={`flex-1 rounded-lg py-2 font-medium transition-all ${
                      isPublic
                        ? 'border-2 border-green-500 bg-green-500 text-white'
                        : 'border-2 border-transparent bg-gray-200 text-gray-600'
                    }`}
                  >
                    공개
                  </button>
                </div>
              </div>

              {/* 썸네일 */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">썸네일</label>
                <input
                  ref={thumbnailInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailUpload}
                  className="hidden"
                />
                <button
                  onClick={() => thumbnailInputRef.current?.click()}
                  className="w-full rounded-lg bg-gray-200 px-4 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-300"
                >
                  썸네일 업로드
                </button>
              </div>

              {/* ==================== 썸네일 미리보기 (업로드 후 표시) ==================== */}
              {/*               
              <div className="mt-3 relative inline-block">
                <div className="w-32 h-44 bg-gray-200 rounded-lg overflow-hidden">
                  <img src="썸네일URL" alt="썸네일 미리보기" className="w-full h-full object-cover" />
                </div>
                <button className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>              
              */}
            </div>
          </div>

          {/* 오른쪽 - 미리보기 및 업로드 */}
          <div className="space-y-6">
            {/* 숏츠 업로드 버튼 */}
            <button className="w-full rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-300">
              숏츠 업로드
            </button>

            {/* 미리보기 영역 */}
            <div
              className={`flex aspect-[9/16] items-center justify-center rounded-2xl border-2 border-dashed bg-white transition-all ${
                isDragging ? 'border-black bg-gray-50' : 'border-gray-300'
              }`}
              onDragEnter={handleDragEnter}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {thumbnail || videoFile ? (
                <div className="relative h-full w-full">
                  {thumbnail && (
                    <img
                      src={thumbnail}
                      alt="Thumbnail preview"
                      className="h-full w-full rounded-2xl object-cover"
                    />
                  )}
                  {videoFile && !thumbnail && (
                    <div className="flex h-full w-full items-center justify-center rounded-2xl bg-black text-white">
                      <div className="text-center">
                        <Upload className="mx-auto mb-2 h-12 w-12" />
                        <p className="text-sm">{videoFile.name}</p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full border-4 border-black">
                    <Plus className="h-12 w-12 text-black" />
                  </div>
                  <p className="text-sm text-gray-500">동영상을 드래그하거나 클릭하여 업로드</p>
                  <input
                    ref={videoInputRef}
                    type="file"
                    accept="video/*"
                    onChange={handleVideoUpload}
                    className="hidden"
                  />
                  <button
                    onClick={() => videoInputRef.current?.click()}
                    className="mt-4 rounded-lg bg-gray-100 px-6 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
                  >
                    파일 선택
                  </button>
                </div>
              )}
            </div>
            {/* ==================== 업로드 후 미리보기 상태 ==================== */}
            {/*
              <div className="absolute inset-0 bg-gray-900">
                <video className="w-full h-full object-cover" controls>
                  <source src="영상URL" type="video/mp4" />
                </video>
                <button className="absolute top-3 right-3 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              */}

            {/* 등록하기 버튼 */}
            <button className="w-full rounded-xl bg-green-500 py-4 font-bold text-white transition-colors hover:bg-green-600">
              등록하기
            </button>

            {/* 취소 버튼 */}
            <button className="w-full rounded-xl bg-gray-200 py-4 font-medium text-gray-700 transition-colors hover:bg-gray-300">
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
