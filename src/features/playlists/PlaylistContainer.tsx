'use client'
import { PlaylistInfo, PlaylistItems } from '@/types/playlist/playlist'
import PlaylistCard from './PlaylistCard'
import PlaylistPreview from './PlaylistPreview'
import PlaylistRightHeader from './PlaylistRightHeader'
import { useState } from 'react'

interface PlaylistContainerProps {
  playlistItem: PlaylistInfo
}
export default function PlaylistContainer({ playlistItem }: PlaylistContainerProps) {
  const shortsList = playlistItem.items ?? null

  const [selectedShorts, setSelectedShorts] = useState<PlaylistItems | null>(
    playlistItem.items?.[0] ?? null,
  )
  console.log(selectedShorts)
  const handlePreview = (shorts: PlaylistItems) => {
    setSelectedShorts(shorts)
  }
  return (
    <>
      {/* ==================== Left Section - Fixed Preview (모바일에서 먼저 노출) ==================== */}
      <div className="order-1">
        <div className="flex flex-col gap-6 py-8 md:py-0 lg:sticky lg:top-24">
          {/* Page Header (플레이리스트 제목 + 수정 버튼) */}
          <PlaylistPreview playlistItem={playlistItem} selectedShorts={selectedShorts} />
        </div>
      </div>

      {/* ==================== Right Section - Playlist Shorts List ==================== */}
      <div className="order-2 flex-1 lg:order-2">
        {/* ==================== List Header (총 갯수) ==================== */}
        <div className="mb-4 flex items-center justify-between">
          <PlaylistRightHeader totalCount={playlistItem.shortsCount} />
        </div>

        {/* ==================== Playlist Shorts List (드래그 가능) ==================== */}
        <PlaylistCard
          shortsList={shortsList}
          handlePreview={handlePreview}
          playlistOwner={playlistItem.owner}
        />
      </div>
    </>
  )
}
