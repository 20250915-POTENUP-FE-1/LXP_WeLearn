'use client'

import { useRouter } from 'next/navigation'
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { Globe, Lock, Pencil, Trash2 } from 'lucide-react'
import { ShortsVisibility } from '@/types/shorts/status'

interface MyShortsDropdownMenuProps {
  shortsId: number // 수정 페이지 이동에 필요
  shortsStatus: ShortsVisibility
  onToggleVisibility?: () => void
  onDelete?: () => void
}

export default function MyShortsDropdownMenu({
  shortsId,
  shortsStatus,
  onToggleVisibility,
  onDelete,
}: MyShortsDropdownMenuProps) {
  const router = useRouter()

  // 공개 상태 여부 확인
  const isPublished = shortsStatus === 'PUBLISHED'

  // 수정 페이지로 이동
  const handleEdit = () => {
    router.push(`/mypage/myshorts/${shortsId}/edit`)
  }

  return (
    <DropdownMenuContent className="min-w-[140px]" align="end">
      <DropdownMenuGroup>
        {/* 공개/비공개 전환 */}
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={() => onToggleVisibility?.()}
        >
          {isPublished ? (
            <>
              <Lock size={10} />
              비공개하기
            </>
          ) : (
            <>
              <Globe size={10} />
              공개하기
            </>
          )}
        </DropdownMenuItem>

        {/* 수정 */}
        <DropdownMenuItem className="cursor-pointer" onSelect={handleEdit}>
          <Pencil size={10} />
          수정
        </DropdownMenuItem>
      </DropdownMenuGroup>

      <DropdownMenuSeparator />

      {/* 삭제 */}
      <DropdownMenuItem className="cursor-pointer" variant="destructive" onSelect={onDelete}>
        <Trash2 size={10} />
        삭제
      </DropdownMenuItem>
    </DropdownMenuContent>
  )
}
