import { Ellipsis, Pencil, Trash2 } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './dropdown-menu'
import { DeleteTarget } from '@/features/modals/comment/CommentsModalContainer'
import { EditTarget } from '@/features/modals/comment/CommentList'

interface CommentDropdownMenuProps {
  id: number
  mode: 'comment' | 'reply'
  parentId: number | null
  deleteTarget: DeleteTarget
  setEditTarget: React.Dispatch<React.SetStateAction<EditTarget>>
  setIsUpdate: React.Dispatch<React.SetStateAction<number>>
  setIsReplyUpdate?: React.Dispatch<React.SetStateAction<number>>
  setDeleteTarget: React.Dispatch<React.SetStateAction<DeleteTarget>>
}

export default function CommentDropDownMenu({
  id,
  mode,
  deleteTarget,
  parentId,
  setEditTarget,
  setIsUpdate,
  setIsReplyUpdate,
  setDeleteTarget,
}: CommentDropdownMenuProps) {
  return (
    <>
      <button className="rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Ellipsis size={18} />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="flex min-w-25 flex-col items-center justify-center gap-1"
          >
            <DropdownMenuItem
              className="w-full cursor-pointer justify-center gap-4 p-1"
              onClick={() => {
                setEditTarget({ mode, id })
              }}
            >
              <Pencil />
              <span>수정</span>
            </DropdownMenuItem>
            <hr className="w-full" />
            <DropdownMenuItem
              className="w-full cursor-pointer justify-center gap-4 p-1 text-red-600"
              onClick={() => setDeleteTarget({ mode, id, parentId })}
            >
              <Trash2 color="#fb2c36" />
              <span className="text-red-600">삭제</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </button>
    </>
  )
}
