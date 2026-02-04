'use client'
import { clientApi } from '@/lib/utils/clientApiUtils'
import { ApiResponse } from '@/types/api/api'
import { PlaylistBase, PlaylistItem } from '@/types/playlist/playlist'
import { Folders, Plus } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'react-toastify'

interface PlaylistProps {
  list: PlaylistBase<PlaylistItem[]>
  shortsId: number | undefined
}

export default function Playlist({ list, shortsId }: PlaylistProps) {
  console.log(shortsId)
  async function addShortsToPlaylist(item: PlaylistItem) {
    try {
      const response: ApiResponse<PlaylistItem> = await clientApi.post(
        `/api/playlists/${shortsId}/items`,
      )
      toast.success(`${item.title}에 숏츠를 저장하였습니다.`)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : '숏츠 저장 실패')
    }
  }
  return (
    <div className="max-h-96 overflow-y-auto px-6 py-4">
      {list.content.map((item) => (
        <button
          key={item.playlistId}
          onClick={() => {
            addShortsToPlaylist(item)
          }}
          className="mb-2 flex max-h-96 w-full items-center justify-between overflow-y-auto rounded-lg px-4 py-4 transition-colors hover:bg-gray-50"
        >
          <span className="text-sm font-medium text-gray-900">{item.title}</span>
          <div className="flex items-center gap-2">
            <Folders size={16} className="text-gray-500" />
            <span className="text-xs text-gray-500">{item.itemCount}개</span>
            <div className="rounded p-1 transition-colors hover:bg-gray-200">
              <Plus className="h-4 w-4 text-gray-600" />
            </div>
          </div>
        </button>
      ))}
    </div>
  )
}
