'use client'

import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { FolderPlus, Trash2 } from 'lucide-react'
import { toast } from 'react-toastify'

interface LikeShortsDropdownMenuProps {
  onLikeDelete?: () => void
}
export default function LikeShortsDropdownMenu({ onLikeDelete }: LikeShortsDropdownMenuProps) {
  const handleSaveToPlaylist = () => {
    toast.info('현재 서비스 준비중입니다')
  }

  return (
    <DropdownMenuContent className="min-w-40" align="end">
      <DropdownMenuGroup>
        <DropdownMenuItem className="cursor-pointer" onSelect={handleSaveToPlaylist}>
          <FolderPlus size={16} />
          재생목록에 저장
        </DropdownMenuItem>
      </DropdownMenuGroup>

      <DropdownMenuSeparator />

      <DropdownMenuItem className="cursor-pointer" variant="destructive" onSelect={onLikeDelete}>
        <Trash2 size={16} />
        좋아요 숏츠에서 삭제
      </DropdownMenuItem>
    </DropdownMenuContent>
  )
}
