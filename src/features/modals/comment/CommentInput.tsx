'use client'
import { Button } from '@/components/ui/Button'
import { User } from 'lucide-react'
import { useActionState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { postCommentAction } from './action'
import { useAuth } from '@/shared/store/auth/auth.store'
import Image from 'next/image'
import { DEFAULT_IMAGES } from '@/constants/shortsImages'

interface CommentInputProps {
  shortsId: string
  setIsUpdate: React.Dispatch<React.SetStateAction<number>>
}

export default function CommentInput({ shortsId, setIsUpdate }: CommentInputProps) {
  const user = useAuth((state) => state.auth)
  // 댓글 등록 Action
  const [commentPostState, commentPostAction] = useActionState(postCommentAction, {
    success: false,
    message: '',
    errors: {},
  })

  // 댓글 등록 성공시 토스트 ui
  useEffect(() => {
    if (commentPostState.success && shortsId) {
      toast.success('댓글 등록에 성공하였습니다.🚀')
      setIsUpdate((prev) => prev + 1)
    } else if (commentPostState.success === false && commentPostState.message) {
      toast.error(commentPostState.message)
    }
  }, [commentPostState])

  return (
    <div className="relative border-t border-gray-200 bg-white p-4">
      <div className="flex items-center gap-3">
        {/* 프로필 아이콘 */}
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-200">
          <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-200 text-gray-600">
            {user?.profileUrl ? (
              <Image
                src={`/${user.profileUrl}`}
                alt={user.nickName}
                fill
                unoptimized
                className="h-8 w-8 rounded-full object-cover"
              />
            ) : (
              <Image
                src={DEFAULT_IMAGES.AVATAR}
                alt="user-profile-image"
                fill
                className="rounded-full object-cover"
                unoptimized
              />
            )}
          </div>
        </div>
        {/* 입력 필드 */}
        <form id="comment-form" action={commentPostAction} className="flex flex-1">
          <input name="shortsid" type="hidden" value={shortsId} />
          <input
            name="comment"
            type="text"
            disabled={!user}
            placeholder={!user ? '로그인 후 이용 바랍니다.' : '댓글을 입력해주세요...'}
            autoComplete="off"
            className="flex-1 rounded-full border border-gray-300 px-4 py-3 text-sm focus:border-black focus:ring-1 focus:ring-black focus:outline-none"
          />
        </form>
        <Button
          variant={!user ? 'default' : 'accent'}
          className="rounded-full"
          type="submit"
          form="comment-form"
          disabled={!user}
        >
          등록
        </Button>
      </div>
    </div>
  )
}
