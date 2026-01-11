import { Button } from '@/components/ui/Button'
import { UserInfo } from '@/types/auth'
import { AnimatePresence, motion } from 'framer-motion'
import { User } from 'lucide-react'
import { useEffect, useState } from 'react'

interface ReCommnetInputProps {
  commentId: number
  openReplyInput: number | null
  setOpenReplyInput: (commentId: number | null) => void
  ReplyAction: (formData: FormData) => void
}

export default function ReCommentInput({
  commentId,
  openReplyInput,
  setOpenReplyInput,
  ReplyAction,
}: ReCommnetInputProps) {
  const [user, setUser] = useState<UserInfo | null>(null)

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
                    alt={user.name}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <User strokeWidth={1.5} size={20} className="text-gray-400" />
                )}
              </div>
              <form className="flex flex-1" action={ReplyAction} id="replycomment-form">
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
