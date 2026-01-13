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
import Link from 'next/link'

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
      toast.success('로그아웃 되었습니다.')
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
              <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gray-200">
                <User strokeWidth={1.5} size={24} />
              </div>
            )}
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="flex flex-col gap-2 px-6 pt-5 pb-3">
          {user?.profileUrl && (
            <div
              className="cursor-pointer rounded-full border-gray-100 transition-colors hover:border-gray-600"
              aria-label="프로필 이미지"
            >
              <img src={user?.profileUrl} alt="user-profile-image" />
            </div>
          )}
          <div className="mb-3 flex items-center gap-4 p-1">
            <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-gray-200">
              <User strokeWidth={1.5} size={20} />
            </div>
            <div className="flex flex-col justify-center">
              {user && (
                <>
                  <div className="pb-1 text-sm font-bold">{user.name}</div>
                  <div className="text-xs text-gray-600">{user.email}</div>
                </>
              )}
            </div>
          </div>
          <hr />

          <DropdownMenuItem className="cursor-pointer">
            <Link href="/mypage/profile" className="flex gap-4 p-1">
              <Settings />내 프로필
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer">
            <Link href="/mypage" className="flex gap-4 p-1">
              <CircleUser />
              마이페이지
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer">
            {/* <button
              onClick={() => {
                toast.info('서비스 준비 중입니다.')
              }}
              className="flex gap-4 p-1"
            >
              <Heart />
              좋아요한 숏츠
            </button> */}
            <Link href="/mypage/likes" className="flex gap-4 p-1">
              <Heart />
              좋아요 숏츠
            </Link>
          </DropdownMenuItem>
          {/* <DropdownMenuItem className="cursor-pointer">
            <Link href="/mypage/saved" className="flex gap-4 p-1">
              <Layers />
              저장한 숏츠
            </Link>
          </DropdownMenuItem> */}
          <DropdownMenuItem className="cursor-pointer">
            <Link href="/mypage/myshorts" className="flex gap-4 p-1">
              <CirclePlay />
              내가 만든 숏츠
            </Link>
          </DropdownMenuItem>
          <hr />
          <DropdownMenuItem className="cursor-pointer">
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
