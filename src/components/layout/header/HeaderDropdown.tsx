import { CirclePlay, CircleUser, Heart, Layers, LogOut, Settings, User } from 'lucide-react'
import { startTransition, useActionState, useEffect } from 'react'
import { LogoutAction } from '@/features/auth/action'
import { useRouter } from 'next/navigation'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { UserInfo } from '@/types/auth'
import { toast } from 'react-toastify'

interface UserDropdownProps {
  user: UserInfo | null
}
export default function HeaderDropdown({ user }: UserDropdownProps) {
  const [state, action, isPending] = useActionState(LogoutAction, {
    success: false,
    message: '',
  })

  const router = useRouter()

  useEffect(() => {
    if (state.success) {
      localStorage.removeItem('user')
      toast.success('로그아웃 되셨습니다.')
      router.push('/')
    } else if (state.success === false && state.message) {
      toast.error(state.message)
    }
  }, [state])

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <div
            className="cursor-pointer p-2 text-gray-600 transition-colors hover:text-gray-900"
            aria-label="프로필"
          >
            {/* 유저 프로필 영역 */}
            {user?.profileUrl ? (
              <div
                className="cursor-pointer rounded-full border-gray-100 transition-colors hover:border-gray-600"
                aria-label="프로필 이미지"
              >
                <img src={user?.profileUrl} alt="user-profile-image" />
              </div>
            ) : (
              <User strokeWidth={2} />
            )}
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="flex flex-col gap-2 px-3 py-3">
          {user?.profileUrl && (
            <div
              className="cursor-pointer rounded-full border-gray-100 transition-colors hover:border-gray-600"
              aria-label="프로필 이미지"
            >
              <img src={user?.profileUrl} alt="user-profile-image" />
            </div>
          )}
          <div className="mb-3 flex items-center gap-4 p-1">
            <CircleUser strokeWidth={2} size={48} />
            <div className="flex flex-col justify-center">
              {user && (
                <>
                  <div>{user.name}</div>
                  <div>{user.email}</div>
                </>
              )}
            </div>
          </div>
          <hr />

          <DropdownMenuItem className="cursor-pointer">
            <button
              onClick={() => {
                toast.info('서비스 준비 중입니다.')
              }}
              className="flex gap-4 p-1"
            >
              <Settings />내 프로필
            </button>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <button
              onClick={() => {
                toast.info('서비스 준비 중입니다.')
              }}
              className="flex gap-4 p-1"
            >
              <Heart />
              좋아요한 숏츠
            </button>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <button
              onClick={() => {
                toast.info('서비스 준비 중입니다.')
              }}
              className="flex gap-4 p-1"
            >
              <Layers />
              저장한 숏츠
            </button>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <button
              onClick={() => {
                toast.info('서비스 준비 중입니다.')
              }}
              className="flex gap-4 p-1"
            >
              <CirclePlay />
              내가 만든 숏츠
            </button>
          </DropdownMenuItem>
          <hr />
          <DropdownMenuItem className="mt-2 cursor-pointer">
            <button
              onClick={() => {
                startTransition(() => {
                  action()
                })
              }}
              className="flex gap-4 p-1"
            >
              <LogOut />
              로그아웃
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
