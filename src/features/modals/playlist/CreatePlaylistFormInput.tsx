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
        <label className="mb-2 block text-sm font-medium text-gray-700">Playlist Title</label>
        <input
          type="text"
          name="title"
          value={playlistTitle}
          onChange={(e) => setPlaylistTitle(e.target.value)}
          placeholder="제목을 입력하세요."
          className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all focus:ring-2 focus:ring-black focus:outline-none"
        />
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">Playlist Description</label>
        <textarea
          placeholder="플레이리스트에 대한 설명을 입력해주세요."
          name="description"
          rows={4}
          className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 transition-all focus:ring-2 focus:ring-black focus:outline-none"
        />
      </div>

      {/* 공개/비공개 선택 */}
      <div>
        <label className="mb-3 block text-sm font-medium text-gray-700">playlistSelect</label>
        <input type="hidden" name="visibility" value={isPublic ? 'public' : 'private'} />
        <div className="flex items-center gap-4">
          <div className="flex w-full items-center gap-3">
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
                onClick={() => setIsPublic(true)}
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
                onClick={() => setIsPublic(false)}
                className="sr-only"
              />
              비공개
            </label>
          </div>
        </div>
      </div>
    </>
  )
}
