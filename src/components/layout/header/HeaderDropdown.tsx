'use client'
import { CirclePlay, CircleUser, Heart, LogOut, Settings, User } from 'lucide-react'
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
  const router = useRouter()

  const handleLogout = async () => {
    // 1. 서버 액션 직접 실행
    const res = await LogoutAction({
      success: false,
      message: '',
    })

    // 2. 결과가 true면 즉시 처리
    if (res.success === true) {
      localStorage.removeItem('user')
      toast.success('로그아웃 되었습니다.')
      router.push('/')
    } else {
      toast.error(res.message)
    }
  }

  return (
    <>
      {user && (
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <div
              className="flex w-30 cursor-pointer justify-center p-2 text-gray-600 transition-colors hover:text-gray-900"
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

          <DropdownMenuContent align="end" className="flex flex-col gap-2 pt-5 pr-10 pb-3 pl-8">
            {user?.profileUrl && (
              <div
                className="cursor-pointer rounded-full border-gray-100 transition-colors hover:border-gray-600"
                aria-label="프로필 이미지"
              >
                <img src={user?.profileUrl} alt="user-profile-image" />
              </div>
            )}
            <div className="mb-3 flex items-center gap-4">
              <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-gray-200">
                <User strokeWidth={1.5} size={20} />
              </div>
              <div className="flex flex-col justify-center">
                {user && (
                  <>
                    <div className="pb-1 text-sm font-bold">{user.nickName}</div>
                    <div className="text-xs text-gray-600">{user.email}</div>
                  </>
                )}
              </div>
            </div>

            <Link href="/mypage/profile" className="py-1">
              <DropdownMenuItem className="flex w-full cursor-pointer gap-4 px-0 py-1">
                <Settings />내 프로필
              </DropdownMenuItem>
            </Link>

            <Link href="/mypage" className="py-1">
              <DropdownMenuItem className="flex w-full cursor-pointer gap-4 px-0 py-1">
                <CircleUser />
                마이페이지
              </DropdownMenuItem>
            </Link>

            <Link href="/mypage/likes" className="py-1">
              <DropdownMenuItem className="flex w-full cursor-pointer gap-4 px-0 py-1">
                <Heart />
                좋아요 숏츠
              </DropdownMenuItem>
            </Link>

            <Link href="/mypage/myshorts" className="py-1">
              <DropdownMenuItem className="flex w-full cursor-pointer gap-4 px-0 py-1">
                <CirclePlay />
                내가 만든 숏츠
              </DropdownMenuItem>
            </Link>
            <hr className="w-full" />
            <button type="button" onClick={() => handleLogout()} className="py-1">
              <DropdownMenuItem className="flex w-full cursor-pointer gap-4 px-0 py-1">
                <LogOut />
                로그아웃
              </DropdownMenuItem>
            </button>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  )
}
