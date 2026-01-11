import { Button } from '@/components/ui/Button'
import { UserInfo } from '@/types/comment'
import { User } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

interface CommentInputProps {
  CommentAction: (formData: FormData) => void
  shortsId: string
}

export default function CommentInput({ CommentAction, shortsId }: CommentInputProps) {
  const [user, setUser] = useState<UserInfo>()

  useEffect(() => {
    const localUser = localStorage.getItem('user') as string
    const parsedUser = JSON.parse(localUser)
    setUser(parsedUser)
  }, [])

  return (
    <div className="border-t border-gray-200 bg-white p-4">
      <div className="flex items-center gap-3">
        {/* 프로필 아이콘 */}
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-200">
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
        </div>
        {/* 입력 필드 */}
        <form id="comment-form" action={CommentAction} className="flex flex-1">
          <input name="shortsid" type="hidden" value={shortsId} />
          <input
            name="comment"
            type="text"
            placeholder="댓글을 입력하세요..."
            autoComplete="off"
            className="flex-1 rounded-full border border-gray-300 px-4 py-3 text-sm focus:border-black focus:ring-1 focus:ring-black focus:outline-none"
          />
        </form>
      </div>
      {/* 버튼 영역 */}
      <div className="mt-3 flex justify-end gap-2">
        <Button variant="outline" className="rounded-full">
          취소
        </Button>
        <Button variant="accent" className="rounded-full" type="submit" form="comment-form">
          등록
        </Button>
      </div>
    </div>
  )
}
