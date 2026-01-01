import { useState } from 'react'

interface CreatePlaylistFormInputProps {
  playlistTitle: string
  setPlaylistTitle: (title: string) => void
  isPublic: boolean
  setIsPublic: (isPublic: boolean) => void
}
export default function CreatePlaylistFormInput({
  playlistTitle,
  setPlaylistTitle,
  isPublic,
  setIsPublic,
}: CreatePlaylistFormInputProps) {
  return (
    <>
      {/* 제목 입력 */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">playlistTitle</label>
        <input
          type="text"
          value={playlistTitle}
          onChange={(e) => setPlaylistTitle(e.target.value)}
          placeholder="제목을 입력하세요."
          className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all focus:ring-2 focus:ring-black focus:outline-none"
        />
      </div>

      {/* 공개/비공개 선택 */}
      <div>
        <label className="mb-3 block text-sm font-medium text-gray-700">playlistSelect</label>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setIsPublic(true)}
            className={`flex items-center gap-2 transition-all ${
              isPublic ? 'text-black' : 'text-gray-400'
            }`}
          >
            <div
              className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all ${
                isPublic ? 'border-black bg-black' : 'border-gray-300 bg-white'
              }`}
            >
              {isPublic && <div className="h-2.5 w-2.5 rounded-full bg-white"></div>}
            </div>
            <span className="text-sm font-medium">공개</span>
          </button>

          <button
            type="button"
            onClick={() => setIsPublic(false)}
            className={`flex items-center gap-2 transition-all ${
              !isPublic ? 'text-black' : 'text-gray-400'
            }`}
          >
            <div
              className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all ${
                !isPublic ? 'border-black bg-black' : 'border-gray-300 bg-white'
              }`}
            >
              {!isPublic && <div className="h-2.5 w-2.5 rounded-full bg-white"></div>}
            </div>
            <span className="text-sm font-medium">비공개</span>
          </button>
        </div>
      </div>
    </>
  )
}
