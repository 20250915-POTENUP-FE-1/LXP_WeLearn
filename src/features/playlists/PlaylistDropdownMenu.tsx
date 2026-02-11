'use client'

import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { clientApi } from '@/lib/utils/clientApiUtils'
import { useAuth } from '@/shared/store/auth/auth.store'
import { PlaylistItems, PlaylistOwner } from '@/types/playlist/playlist'
import { FolderMinus, FolderPlus, Share2, Siren } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

interface PlaylistDropdownMenu {
  playlistOwner: PlaylistOwner
  items: PlaylistItems[] | null
  playlistId: number
  short: PlaylistItems
  selectedShorts: PlaylistItems | null
  setItems: (value: PlaylistItems[] | ((prev: PlaylistItems[]) => PlaylistItems[])) => void
  setSelectedShorts: (value: PlaylistItems | null) => void
}
export default function PlaylistDropdownMenu({
  playlistOwner,
  playlistId,
  items,
  short,
  selectedShorts,
  setItems,
  setSelectedShorts,
}: PlaylistDropdownMenu) {
  const userData = useAuth((state) => state.auth)
  const router = useRouter()
  const handleShare = () => {
    toast.info('현재 서비스 준비중입니다')
  }

  const handleRemoveFromPlaylist = async () => {
    try {
      await clientApi.delete(`/api/v1/playlists/${playlistId}/items/${short.shorts.shortsId}`)
      setItems((prev) => prev.filter((item) => item.shorts.shortsId !== short.shorts.shortsId))

      toast.success('재생목록에서 삭제되었습니다.')
    } catch (error) {
      toast.error(`${error}`)
    }
  }

  useEffect(() => {
    if (!items?.some((item) => item.shorts.shortsId === selectedShorts?.shorts.shortsId)) {
      setSelectedShorts(items?.[0] ?? null)
    }
  }, [items, selectedShorts])

  return (
    <DropdownMenuContent className="min-w-40" align="end">
      <DropdownMenuGroup>
        {playlistOwner.id !== userData?.userId ? (
          <DropdownMenuItem className="cursor-pointer" onSelect={handleShare}>
            <FolderPlus size={16} />
            재생목록에 추가
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem className="cursor-pointer" onSelect={handleRemoveFromPlaylist}>
            <FolderMinus size={16} />
            재생목록에서 삭제
          </DropdownMenuItem>
        )}

        {/* 공유 */}
        <DropdownMenuItem className="cursor-pointer" onSelect={handleShare}>
          <Share2 size={16} />
          공유
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  )
}
