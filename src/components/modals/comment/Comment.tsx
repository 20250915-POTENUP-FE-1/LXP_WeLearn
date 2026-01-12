import { ChevronDown, Ellipsis, Pencil, Trash2, User } from 'lucide-react'
import { useEffect, useState } from 'react'
import { CommentType } from '@/types/comment'
import ReCommentInput from './ReCommentInput'
import ReComment from './ReComment'
import { timeAgo } from '@/utils/timeAgo'
import { CommentActionState, ReplyActionState } from '@/features/comment/action'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/Button'
import DeleteModal from '@/components/ui/DeleteModal'

interface CommentsProps {
  comments: CommentType[]
  replyPostState: ReplyActionState
  commentPatchState: CommentActionState
  shortsId: string
  replyPostAction: (formData: FormData) => void
  commentPatchAction: (formData: FormData) => void
  handleDeleteMode: () => void
  isDelete: boolean
  setIsDelete: (props: boolean) => void
  commentDeleteAction: (FormData: FormData) => void
}

export default function Comment({
  comments,
  replyPostState,
  replyPostAction,
  shortsId,
  commentPatchAction,
  commentPatchState,
  handleDeleteMode,
  isDelete,
  setIsDelete,
  commentDeleteAction,
}: CommentsProps) {
  const [openReply, setOpenReply] = useState<number | null>(null)
  const [openReplyInput, setOpenReplyInput] = useState<number | null>(null)
  const [isEditMode, setIsEditMode] = useState<number | null>(null)

  useEffect(() => {
    setIsEditMode(null)
  }, [commentPatchState])

  const handleReply = (id: number) => {
    setOpenReply(openReply === id ? null : id)
  }

  const handleReplyInput = (id: number) => {
    setOpenReplyInput(openReplyInput === id ? null : id)
    setOpenReply(id)
  }

  return (
    <>
      {comments?.map((comment) => {
        return (
          <div className="border-b border-gray-200 py-8" key={comment.commentId}>
            <DeleteModal
              isDelete={isDelete}
              setIsDelete={setIsDelete}
              commentId={comment.commentId}
              commentDeleteAction={commentDeleteAction}
            />

            <div className="flex items-start justify-between">
              <div className="flex flex-1 items-start gap-3">
                {/* 프로필 이미지 */}
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-200 text-gray-600">
                  {comment.writer.profileUrl ? (
                    <img
                      src={comment.writer.profileUrl}
                      alt={comment.writer.name}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : (
                    <User strokeWidth={1.5} size={20} className="text-gray-400" />
                  )}
                </div>

                {/* 댓글 내용 */}
                <div className="flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900">
                      {comment.writer.nickname}
                    </span>
                    <span className="text-xs text-gray-400">{timeAgo(comment.createdAt)}</span>
                  </div>
                  {isEditMode === comment.commentId ? (
                    <form className="my-2 flex flex-col gap-2" action={commentPatchAction}>
                      <input type="hidden" name="commentId" value={comment.commentId} />
                      <input type="hidden" name="shortsId" value={shortsId} />
                      <input
                        type="text"
                        name="comment"
                        placeholder="답글을 입력하세요..."
                        autoComplete="off"
                        className="w-full flex-1 rounded-full border border-gray-300 px-3 py-2 text-sm no-underline focus:border-black focus:ring-1 focus:ring-black focus:outline-none"
                        defaultValue={comment.content}
                      />
                      <div className="flex justify-end gap-1">
                        <Button
                          type="button"
                          variant="outline"
                          className="rounded-full"
                          onClick={() => setIsEditMode(null)}
                        >
                          취소
                        </Button>
                        <Button variant="accent" className="rounded-full" type="submit">
                          등록
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <p className="mb-2 text-sm leading-relaxed text-gray-700">{comment.content}</p>
                  )}

                  {/* 답글 토글 & 답글달기 */}
                  <div className="flex items-center gap-4">
                    <button
                      className="flex items-center gap-1 text-xs text-gray-500 transition-colors hover:text-black"
                      onClick={() => {
                        handleReply(comment.commentId)
                      }}
                    >
                      답글 {comment.replyCount}개
                      <ChevronDown size={12} />
                    </button>
                    <button
                      className="text-xs text-gray-500 transition-colors hover:text-black"
                      onClick={() => {
                        handleReplyInput(comment.commentId)
                      }}
                    >
                      답글달기
                    </button>
                  </div>
                </div>
              </div>
              {/* 더보기 버튼 */}
              {comment.isMine === true ? (
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
                          setIsEditMode(comment.commentId)
                        }}
                      >
                        <Pencil />
                        <span>수정</span>
                      </DropdownMenuItem>
                      <hr className="w-full" />
                      <DropdownMenuItem
                        className="w-full cursor-pointer justify-center gap-4 p-1 text-red-600"
                        onClick={() => {
                          handleDeleteMode()
                        }}
                      >
                        <Trash2 color="#fb2c36" />
                        <span className="text-red-600">삭제</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </button>
              ) : (
                ''
              )}
            </div>
            <ReCommentInput
              commentId={comment.commentId}
              openReplyInput={openReplyInput}
              setOpenReplyInput={setOpenReplyInput}
              replyPostAction={replyPostAction}
            />
            {comment.replyCount > 0 && (
              <ReComment
                openReply={openReply}
                commentId={comment.commentId}
                replyPostState={replyPostState}
              />
            )}
          </div>
        )
      })}
    </>
  )
}
