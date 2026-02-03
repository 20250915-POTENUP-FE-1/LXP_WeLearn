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
import { toast } from 'react-toastify'
import Link from 'next/link'
import { useAuth } from '@/shared/store/auth/auth.store'

export default function HeaderDropdown() {
  const router = useRouter()
  const auth = useAuth((state) => state.auth)
  const isLogin = useAuth((state) => state.isLogin)
  const hasHydrated = useAuth((state) => state.hasHydrated)
  const authLogout = useAuth((state) => state.logout)

  if (!hasHydrated) return null

  const handleLogout = async () => {
    // 1. 서버 액션 직접 실행
    const res = await LogoutAction({
      success: false,
      message: '',
    })

    // 2. 결과가 true면 즉시 처리
    if (res.success === true) {
      authLogout()
      toast.success('로그아웃 되었습니다.')
      router.push('/')
    } else {
      toast.error(res.message)
    }
  }

  return (
    <>
      {auth && isLogin ? (
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <div
              className="flex cursor-pointer items-center justify-center text-gray-600 transition-colors hover:text-gray-900"
              aria-label="프로필"
            >
              {/* 유저 프로필 영역 */}
              {auth?.profileUrl ? (
                <div
                  className="cursor-pointer rounded-full border-gray-100 transition-colors hover:border-gray-600"
                  aria-label="프로필 이미지"
                >
                  <img src={auth?.profileUrl} alt="user-profile-image" />
                </div>
              ) : (
                <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gray-200">
                  <User strokeWidth={1.5} size={24} />
                </div>
              )}
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="flex flex-col gap-2 pt-5 pr-10 pb-3 pl-8">
            {auth?.profileUrl && (
              <div
                className="cursor-pointer rounded-full border-gray-100 transition-colors hover:border-gray-600"
                aria-label="프로필 이미지"
              >
                <img src={auth?.profileUrl} alt="user-profile-image" />
              </div>
            )}

            <div className="mb-3 flex items-center gap-4">
              <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-gray-200">
                <User strokeWidth={1.5} size={20} />
              </div>
              <div className="flex flex-col justify-center">
                {auth && (
                  <>
                    <div className="pb-1 text-sm font-bold">{auth.nickName}</div>
                    <div className="text-xs text-gray-600">{auth.email}</div>
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
      ) : (
        ''
      )}
    </>
  )
}
