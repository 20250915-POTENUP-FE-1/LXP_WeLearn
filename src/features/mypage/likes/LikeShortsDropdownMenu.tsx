'use client'

import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { FolderPlus, Share2, Trash2 } from 'lucide-react'
import { toast } from 'react-toastify'

export default function LikeShortsDropdownMenu() {
  const handleSaveToPlaylist = () => {
    toast.info('현재 서비스 준비중입니다')
  }

  const handleShare = () => {
    toast.info('현재 서비스 준비중입니다')
  }

  const handleRemoveLike = () => {
    toast.info('현재 서비스 준비중입니다')
  }

  return (
    <DropdownMenuContent className="min-w-40" align="end">
      <DropdownMenuGroup>
        {/* 재생목록에 저장 */}
        <DropdownMenuItem className="cursor-pointer" onSelect={handleSaveToPlaylist}>
          <FolderPlus size={16} />
          재생목록에 저장
        </DropdownMenuItem>

        {/* 공유 */}
        <DropdownMenuItem className="cursor-pointer" onSelect={handleShare}>
          <Share2 size={16} />
          공유
        </DropdownMenuItem>
      </DropdownMenuGroup>

      <DropdownMenuSeparator />

      {/* 좋아요 삭제 */}
      <DropdownMenuItem
        className="cursor-pointer"
        variant="destructive"
        onSelect={handleRemoveLike}
      >
        <Trash2 size={16} />
        좋아요 숏츠에서 삭제
      </DropdownMenuItem>
    </DropdownMenuContent>
  )
}
