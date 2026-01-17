import { Button } from '@/components/ui/Button'
import { postReplyAction } from '@/features/comment/action'
import { UserInfo } from '@/types/auth'
import { AnimatePresence, motion } from 'framer-motion'
import { User } from 'lucide-react'
import { useActionState, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

interface ReCommnetInputProps {
  commentId: number
  openReplyInput: number | null
  setOpenReplyInput: (commentId: number | null) => void
  setIsReplyUpdate: React.Dispatch<React.SetStateAction<number>>
  setIsUpdate: React.Dispatch<React.SetStateAction<number>>
}

export default function ReCommentInput({
  commentId,
  openReplyInput,
  setOpenReplyInput,
  setIsReplyUpdate,
  setIsUpdate,
}: ReCommnetInputProps) {
  const [user, setUser] = useState<UserInfo | null>(null)

  // 대댓글 Action
  const [replyPostState, replyPostAction] = useActionState(postReplyAction, {
    success: false,
    message: '',
    errors: {},
  })

  // 대댓글 성공시 토스트 ui
  useEffect(() => {
    if (replyPostState.success) {
      setIsReplyUpdate((prev) => prev + 1)
      setIsUpdate((prev) => prev + 1)
      setOpenReplyInput(null)
      toast.success('답글 등록에 성공하였습니다.🚀')
    } else if (replyPostState.success === false && replyPostState.message) {
      toast.error(replyPostState.message)
    }
  }, [replyPostState])

  useEffect(() => {
    const localUser = localStorage.getItem('user') as string
    const parsedUser = JSON.parse(localUser)
    setUser(parsedUser)
  }, [])

  return (
    <AnimatePresence initial={false}>
      {openReplyInput === commentId ? (
        <motion.div
          key={commentId}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
          <div className="mt-2 rounded-lg pt-3">
            <div className="flex items-center justify-center gap-2 pl-12">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-200 text-gray-600">
                {user?.profileUrl ? (
                  <img
                    src={user.profileUrl}
                    alt={user.nickName}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <User strokeWidth={1.5} size={20} className="text-gray-400" />
                )}
              </div>
              <form className="flex flex-1" action={replyPostAction} id="replycomment-form">
                <input type="hidden" name="commentId" value={commentId} />
                <input
                  type="text"
                  name="replyComment"
                  placeholder="답글을 입력하세요..."
                  autoComplete="off"
                  className="flex-1 rounded-full border border-gray-300 px-3 py-2 text-sm no-underline focus:border-black focus:ring-1 focus:ring-black focus:outline-none"
                />
              </form>
            </div>
            <div className="flex justify-end gap-2 pt-3">
              <Button
                variant="outline"
                className="rounded-full"
                onClick={() => {
                  setOpenReplyInput(null)
                }}
              >
                취소
              </Button>

              <Button
                variant="accent"
                className="rounded-full"
                type="submit"
                form="replycomment-form"
              >
                등록
              </Button>
            </div>
          </div>
        </motion.div>
      ) : (
        ''
      )}
    </AnimatePresence>
  )
}
