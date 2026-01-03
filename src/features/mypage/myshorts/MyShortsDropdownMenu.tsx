'use client'

import { ShortsVisibility } from '@/types/myshorts'
import { Globe, Lock, Pencil, Trash2 } from 'lucide-react'

interface MyShortsDropdownMenuProps {
  visibility: ShortsVisibility
  onToggleVisibility?: () => void
  onEdit?: () => void
  onDelete?: () => void
}

export default function MyShortsDropdownMenu({
  visibility,
  onToggleVisibility,
  onEdit,
  onDelete,
}: MyShortsDropdownMenuProps) {
  return (
    <div className="absolute z-30 min-w-[140px] rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
      {/* 공개/비공개 전환 */}
      <button
        onClick={onToggleVisibility}
        className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
      >
        {visibility === 'public' ? (
          <>
            <Lock size={16} />
            비공개하기
          </>
        ) : (
          <>
            <Globe size={16} />
            공개하기
          </>
        )}
      </button>

      {/* 수정 */}
      <button
        onClick={onEdit}
        className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
      >
        <Pencil size={16} />
        수정
      </button>

      {/* 삭제 */}
      <button
        onClick={onDelete}
        className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
      >
        <Trash2 size={16} />
        삭제
      </button>
    </div>
  )
}
