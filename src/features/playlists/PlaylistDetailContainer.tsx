'use client'
import { PlaylistInfo, PlaylistItems } from '@/types/playlist/playlist'
import PlaylistCard from './PlaylistCard'
import PlaylistPreview from './PlaylistPreview'
import PlaylistRightHeader from './PlaylistRightHeader'
import { useState } from 'react'
import { Switch } from '@/components/ui/switch'
import { useAuth } from '@/shared/store/auth/auth.store'

interface PlaylistDetailContainerProps {
  playlistItem: PlaylistInfo
}
export default function PlaylistDetailContainer({ playlistItem }: PlaylistDetailContainerProps) {
  const shortsList = playlistItem.items ?? null
  const [editMode, setEditMode] = useState<boolean>(false)
  const [selectedShorts, setSelectedShorts] = useState<PlaylistItems | null>(
    playlistItem.items?.[0] ?? null,
  )
  const userDate = useAuth((state) => state.auth)
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
          {userDate?.userId === playlistItem.owner.id && (
            <div className="flex items-center gap-3">
              <div className={`text-sm ${editMode ? 'text-green-500' : 'text-gray-500'}`}>
                순서 변경
              </div>
              <Switch
                checked={editMode}
                onCheckedChange={(checked) => {
                  setEditMode(checked)
                }}
                size="sm"
                className="h-9 w-20 data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-300"
              >
                <span
                  className={`absolute top-1 left-1 flex h-7 w-9 items-center justify-center rounded-full bg-white text-xs font-bold transition-transform ${editMode ? 'translate-x-10' : 'translate-x-0'} `}
                >
                  {editMode ? 'ON' : 'OFF'}
                </span>
              </Switch>
            </div>
          )}
        </div>

        {/* ==================== Playlist Shorts List (드래그 가능) ==================== */}
        <PlaylistCard
          playlistId={playlistItem.id}
          editMode={editMode}
          shortsList={shortsList}
          handlePreview={handlePreview}
          selectedShorts={selectedShorts}
          playlistOwner={playlistItem.owner}
          setSelectedShorts={setSelectedShorts}
        />
      </div>
    </>
  )
}
