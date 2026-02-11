'use client'

import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { FolderPlus, Share2, Siren } from 'lucide-react'
import { toast } from 'react-toastify'

export default function PlaylistDropdownMenu() {
  const handleShare = () => {
    toast.info('현재 서비스 준비중입니다')
  }

  const handleRemoveFromPlaylist = () => {
    toast.info('현재 서비스 준비중입니다')
  }

  return (
    <DropdownMenuContent className="min-w-40" align="end">
      <DropdownMenuGroup>
        <DropdownMenuItem className="cursor-pointer" onSelect={handleShare}>
          <FolderPlus size={16} />
          재생목록에 추가
        </DropdownMenuItem>
        {/* 공유 */}
        <DropdownMenuItem className="cursor-pointer" onSelect={handleShare}>
          <Share2 size={16} />
          공유
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onSelect={handleShare} variant="destructive">
          <Siren size={16} />
          신고
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  )
}
