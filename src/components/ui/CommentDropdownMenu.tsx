'use client'

import { Ellipsis, Pencil, ShieldAlert, Trash2 } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './dropdown-menu'
import { DeleteTarget } from '@/features/modals/comment/CommentsModalContainer'
import { EditTarget } from '@/features/modals/comment/CommentList'
import { CommentsResponse } from '@/types/comments/comments'
import { ReplyCommentsResponse } from '@/types/replies/replies'

interface CommentDropdownMenuProps {
  id: number
  mode: 'comment' | 'reply'
  parentId: number | null
  comment?: CommentsResponse
  reply?: ReplyCommentsResponse
  setEditTarget: React.Dispatch<React.SetStateAction<EditTarget>>
  setDeleteTarget: React.Dispatch<React.SetStateAction<DeleteTarget>>
}

/**
 * 댓글/답글의 드롭다운 메뉴 컴포넌트
 * - 작성자 본인: 수정 / 삭제
 * - 작성자 아님: 신고
 */
export default function CommentDropDownMenu({
  id,
  mode,
  parentId,
  comment,
  reply,
  setEditTarget,
  setDeleteTarget,
}: CommentDropdownMenuProps) {
  // 작성자 본인인지 여부
  const isMine = mode === 'reply' ? reply?.isMine : comment?.isMine
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button className="rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100">
          <Ellipsis size={18} />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="flex min-w-25 flex-col items-center justify-center gap-1"
      >
        {isMine ? (
          <>
            {/* 수정 */}
            <DropdownMenuItem
              className="w-full cursor-pointer justify-center gap-4 p-1"
              onClick={() => setEditTarget({ mode, id })}
            >
              <Pencil />
              <span>수정</span>
            </DropdownMenuItem>

            <hr className="w-full" />

            {/* 삭제 */}
            <DropdownMenuItem
              className="w-full cursor-pointer justify-center gap-4 p-1 text-red-600"
              onClick={() => setDeleteTarget({ mode, id, parentId })}
            >
              <Trash2 color="#fb2c36" />
              <span className="text-red-600">삭제</span>
            </DropdownMenuItem>
          </>
        ) : (
          // 신고
          <DropdownMenuItem className="w-full cursor-pointer items-center" variant="destructive">
            <ShieldAlert size={16} />
            신고
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
