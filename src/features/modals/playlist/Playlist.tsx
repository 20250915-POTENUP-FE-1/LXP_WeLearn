'use client'
import { clientApi } from '@/lib/utils/clientApiUtils'
import { PlaylistBase, PlaylistInfo } from '@/types/playlist/playlist'
import { Folders, ImageIcon, Plus } from 'lucide-react'
import Image from 'next/image'
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
      // toast.success(`${item.title}에 숏츠를 저장하였습니다.`)
      toast.success('숏츠를 저장하였습니다.')
      router.refresh()
    } catch (error: any) {
      toast.error(error.message || '숏츠 저장 실패')
    }
  }
  return (
    <div className="h-full overflow-y-auto px-6 py-4">
      {list.content.length > 0 ? (
        list.content.map((item) => (
          <div className="border-b border-gray-100 py-3 last:border-b-0" key={item.id}>
            <button
              onClick={() => {
                addShortsToPlaylist(item)
              }}
              className="flex w-full items-center gap-3 rounded-lg px-0 py-3 transition-colors hover:bg-gray-50 md:px-4"
            >
              <div className="rounded p-1 transition-colors hover:bg-gray-200">
                <Plus className="h-6 w-6 text-gray-600" />
              </div>
              <div className="relative h-20 w-18 shrink-0 overflow-hidden rounded-md bg-gray-100">
                {item.items?.[0]?.shorts?.thumbnailUrl ? (
                  <Image
                    src={item.items[0].shorts.thumbnailUrl}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <ImageIcon className="h-5 w-5 text-gray-400" />
                  </div>
                )}
              </div>
              <div className="ml-1 flex flex-1 flex-col items-start gap-2 md:flex-row md:justify-between">
                <span className="text-sm font-medium text-gray-900">{item.title}</span>
                <div className="flex items-center gap-2">
                  <Folders size={16} className="text-gray-500" />
                  <span className="text-sm text-gray-500">{item.shortsCount}개</span>
                </div>
              </div>
            </button>
          </div>
        ))
      ) : (
        <div className="text-md flex h-full w-full flex-col items-center justify-center gap-3 text-center text-gray-500">
          플레이리스트를 생성하여 <br /> 숏츠를 저장해보세요.
          {/* <div
            className="cursor-pointer text-sm text-gray-500 underline hover:text-gray-700"
            onClick={handleActiveTab}
          >
            플레이리스트 만들기
          </div> */}
        </div>
      )}
    </div>
  )
}
