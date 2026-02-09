'use client'
import { clientApi } from '@/lib/utils/clientApiUtils'
import { PlaylistBase, PlaylistInfo } from '@/types/playlist/playlist'
import { Folders, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

interface PlaylistProps {
  list: PlaylistBase<PlaylistInfo[]>
  shortsId: number | undefined
  handleActiveTab: () => void
}

export default function Playlist({ list, shortsId, handleActiveTab }: PlaylistProps) {
  const router = useRouter()
  async function addShortsToPlaylist(item: PlaylistInfo) {
    try {
      await clientApi.post(`/api/v1/playlists/${item.id}/items`, {
        shortsId: shortsId,
        playlistId: item.id,
      })
      toast.success(`${item.title}에 숏츠를 저장하였습니다.`)
      router.refresh()
    } catch (error: any) {
      toast.error(error.message || '숏츠 저장 실패')
    }
  }
  return (
    <div className="h-full overflow-y-auto px-6 py-4">
      {list.content.length > 0 ? (
        list.content.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              addShortsToPlaylist(item)
            }}
            className="mb-2 flex max-h-96 w-full items-center justify-between overflow-y-auto rounded-lg px-4 py-4 transition-colors hover:bg-gray-50"
          >
            <span className="text-sm font-medium text-gray-900">{item.title}</span>
            <div className="flex items-center gap-2">
              <Folders size={16} className="text-gray-500" />
              <span className="text-xs text-gray-500">{item.shortsCount}개</span>
              <div className="rounded p-1 transition-colors hover:bg-gray-200">
                <Plus className="h-4 w-4 text-gray-600" />
              </div>
            </div>
          </button>
        ))
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-lg text-gray-500">
          플레이리스트를 생성하여 숏츠를 저장해보세요.
          <div
            className="cursor-pointer text-sm text-gray-500 underline hover:text-gray-700"
            onClick={handleActiveTab}
          >
            플레이리스트 만들기
          </div>
        </div>
      )}
    </div>
  )
}
