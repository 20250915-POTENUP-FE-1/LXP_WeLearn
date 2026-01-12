import { AnimatePresence, motion } from 'framer-motion'
import { Button } from './Button'

interface DeleteModalProps {
  isDelete: boolean
  setIsDelete: (props: boolean) => void
  commentId: number
  commentDeleteAction: (FormData: FormData) => void
}

export default function DeleteModal({
  isDelete,
  setIsDelete,
  commentId,
  commentDeleteAction,
}: DeleteModalProps) {
  console.log(commentId)
  return (
    <AnimatePresence>
      {isDelete && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
        >
          <div className="absolute inset-0 z-60 flex items-center justify-center rounded-xl bg-black/50">
            <div className="w-[280px] rounded-lg bg-white p-6 shadow-xl">
              <p className="mb-6 text-center text-gray-800">댓글을 완전히 삭제할까요?</p>
              <div className="flex justify-center gap-3">
                <Button variant="outline" onClick={() => setIsDelete(false)}>
                  취소
                </Button>
                <form action={commentDeleteAction}>
                  <input type="hidden" name="commentId" value={commentId} />
                  <Button variant="default">삭제</Button>
                </form>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
