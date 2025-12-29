'use client'

import { X, Copy, Bookmark, Plus } from 'lucide-react'
import { useState } from 'react'

export default function PlaylistModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('save') // 'save' or 'create'
  const [playlistTitle, setPlaylistTitle] = useState('')
  const [isPublic, setIsPublic] = useState(true)

  // 샘플 플레이리스트 데이터
  const existingPlaylists = [
    { id: 1, title: 'welcome JavaScript', count: 5 },
    { id: 2, title: 'python으로 주식 투자 자동화 모음', count: 5 },
  ]

  if (!isOpen) return null

  const handleCreatePlaylist = () => {
    // 플레이리스트 생성 로직
    console.log('Creating playlist:', { title: playlistTitle, isPublic })
    onClose()
  }

  return (
    <>
      {/* 오버레이 */}
      <div
        className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black"
        onClick={onClose}
      >
        {/* 모달 컨테이너 */}
        <div
          className="mx-4 w-full max-w-lg rounded-2xl bg-white shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* 저장 리스트 모달 */}
          {activeTab === 'save' && (
            <>
              {/* 헤더 */}
              <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
                <h2 className="text-xl font-bold text-black">ModalTitle</h2>
                <div className="flex items-center gap-3">
                  <button className="rounded-lg p-2 transition-colors hover:bg-gray-100">
                    <Copy className="h-5 w-5 text-gray-600" />
                  </button>
                  <button className="rounded-lg p-2 transition-colors hover:bg-gray-100">
                    <Bookmark className="h-5 w-5 text-gray-600" />
                  </button>
                  <button
                    onClick={onClose}
                    className="rounded-lg p-2 transition-colors hover:bg-gray-100"
                  >
                    <X className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* 플레이리스트 목록 */}
              <div className="max-h-96 overflow-y-auto px-6 py-4">
                {existingPlaylists.map((playlist) => (
                  <button
                    key={playlist.id}
                    className="mb-2 flex w-full items-center justify-between rounded-lg px-4 py-4 transition-colors hover:bg-gray-50"
                  >
                    <span className="text-sm font-medium text-gray-900">{playlist.title}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">{playlist.count}개</span>
                      <button className="rounded p-1 transition-colors hover:bg-gray-200">
                        <Plus className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                  </button>
                ))}
              </div>

              {/* 새 플레이리스트 만들기 버튼 */}
              <div className="border-t border-gray-200 px-6 py-4">
                <button
                  onClick={() => setActiveTab('create')}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-gray-200 bg-white py-3 transition-colors hover:border-black"
                >
                  <Plus className="h-5 w-5 text-gray-700" />
                  <span className="text-sm font-medium text-gray-700">create new playlist</span>
                </button>
              </div>
            </>
          )}

          {/* 플레이리스트 생성 모달 */}
          {activeTab === 'create' && (
            <>
              {/* 헤더 */}
              <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
                <h2 className="text-xl font-bold text-black">Playlist</h2>
                <button
                  onClick={onClose}
                  className="rounded-lg p-2 transition-colors hover:bg-gray-100"
                >
                  <X className="h-5 w-5 text-gray-600" />
                </button>
              </div>

              {/* 폼 컨텐츠 */}
              <div className="space-y-6 px-6 py-6">
                {/* 제목 입력 */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    playlistTitle
                  </label>
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
                  <label className="mb-3 block text-sm font-medium text-gray-700">
                    playlistSelect
                  </label>
                  <div className="flex items-center gap-4">
                    <button
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
              </div>

              {/* 하단 버튼 */}
              <div className="flex gap-3 border-t border-gray-200 px-6 py-4">
                <button
                  onClick={() => setActiveTab('save')}
                  className="flex-1 rounded-lg bg-gray-200 px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-300"
                >
                  취소
                </button>
                <button
                  onClick={handleCreatePlaylist}
                  disabled={!playlistTitle.trim()}
                  className="flex-1 rounded-lg bg-black px-6 py-3 font-medium text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-300"
                >
                  생성
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

// 사용 예시 컴포넌트
export function PlaylistModalExample() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="p-8">
      <button
        onClick={() => setIsModalOpen(true)}
        className="rounded-lg bg-black px-6 py-3 text-white transition-colors hover:bg-gray-800"
      >
        플레이리스트 모달 열기
      </button>

      <PlaylistModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
