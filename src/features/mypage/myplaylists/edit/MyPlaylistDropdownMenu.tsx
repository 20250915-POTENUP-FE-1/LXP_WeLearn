'use client'

import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { Share2, Trash2 } from 'lucide-react'
import { toast } from 'react-toastify'

export default function MyPlaylistDropdownMenu() {
  const handleShare = () => {
    toast.info('현재 서비스 준비중입니다')
  }

  const handleRemoveFromPlaylist = () => {
    toast.info('현재 서비스 준비중입니다')
  }

  return (
    <DropdownMenuContent className="min-w-40" align="end">
      <DropdownMenuGroup>
        {/* 공유 */}
        <DropdownMenuItem className="cursor-pointer" onSelect={handleShare}>
          <Share2 size={16} />
          공유
        </DropdownMenuItem>
      </DropdownMenuGroup>

      <DropdownMenuSeparator />

      {/* 재생목록에서 삭제 */}
      <DropdownMenuItem
        className="cursor-pointer"
        variant="destructive"
        onSelect={handleRemoveFromPlaylist}
      >
        <Trash2 size={16} />
        재생목록에서 삭제
      </DropdownMenuItem>
    </DropdownMenuContent>
  )
}
