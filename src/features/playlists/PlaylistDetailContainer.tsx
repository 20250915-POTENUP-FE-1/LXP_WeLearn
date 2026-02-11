'use client'
import { PlaylistInfo, PlaylistItems } from '@/types/playlist/playlist'
import PlaylistCard from './PlaylistCard'
import PlaylistPreview from './PlaylistPreview'
import PlaylistRightHeader from './PlaylistRightHeader'
import { useState, useEffect } from 'react'
import { Switch } from '@/components/ui/switch'
import { useAuth } from '@/shared/store/auth/auth.store'

interface PlaylistDetailContainerProps {
  playlistItem: PlaylistInfo
}
export default function PlaylistDetailContainer({ playlistItem }: PlaylistDetailContainerProps) {
  // 부모에서 items 상태를 관리
  const [shortsList, setShortsList] = useState<PlaylistItems[]>(playlistItem.items ?? [])
  const [editMode, setEditMode] = useState<boolean>(false)
  const [selectedShorts, setSelectedShorts] = useState<PlaylistItems | null>(
    playlistItem.items?.[0] ?? null,
  )
  const userDate = useAuth((state) => state.auth)

  const handlePreview = (shorts: PlaylistItems) => {
    setSelectedShorts(shorts)
  }

  // playlistItem.items가 바뀌면 shortsList 업데이트
  useEffect(() => {
    setShortsList(playlistItem.items ?? [])
  }, [playlistItem.items])

  return (
    <>
      {/* ==================== Left Section - Fixed Preview (모바일에서 먼저 노출) ==================== */}
      <div className="order-1">
        <div className="flex flex-col gap-6 py-8 md:py-0 lg:sticky lg:top-24">
          <PlaylistPreview playlistItem={playlistItem} selectedShorts={selectedShorts} />
        </div>
      </div>

      {/* ==================== Right Section - Playlist Shorts List ==================== */}
      <div className="order-2 flex-1 lg:order-2">
        <div className="mb-4 flex items-center justify-between">
          <PlaylistRightHeader totalCount={shortsList.length} />
          {userDate?.userId === playlistItem.owner.id && (
            <div className="flex items-center gap-3">
              <div className={`text-sm ${editMode ? 'text-green-500' : 'text-gray-500'}`}>
                순서 변경
              </div>
              <Switch
                checked={editMode}
                onCheckedChange={(checked) => setEditMode(checked)}
                size="sm"
                className="h-9 w-20 data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-300"
              >
                <span
                  className={`absolute top-1 left-1 flex h-7 w-9 items-center justify-center rounded-full bg-white text-xs font-bold transition-transform ${
                    editMode ? 'translate-x-10' : 'translate-x-0'
                  } `}
                >
                  {editMode ? 'ON' : 'OFF'}
                </span>
              </Switch>
            </div>
          )}
        </div>

        {/* PlaylistCard에 state와 setState props 전달 */}
        <PlaylistCard
          playlistId={playlistItem.id}
          editMode={editMode}
          shortsList={shortsList}
          setShortsList={setShortsList}
          handlePreview={handlePreview}
          selectedShorts={selectedShorts}
          setSelectedShorts={setSelectedShorts}
          playlistOwner={playlistItem.owner}
        />
      </div>
    </>
  )
}
