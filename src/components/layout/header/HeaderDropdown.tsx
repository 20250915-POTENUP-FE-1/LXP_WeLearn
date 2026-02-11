'use client'
import { CirclePlay, CircleUser, Heart, ListVideo, LogOut, Settings } from 'lucide-react'
import { LogoutAction } from '@/features/auth/actions/logout.aciton'
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
import Image from 'next/image'
import { DEFAULT_IMAGES } from '@/constants/shortsImages'

export default function HeaderDropdown() {
  const router = useRouter()
  const auth = useAuth((state) => state.auth)
  const isLogin = useAuth((state) => state.isLogin)
  const hasHydrated = useAuth((state) => state.hasHydrated)
  const authLogout = useAuth((state) => state.logout)

  if (!hasHydrated) return null
  const handleLogout = async () => {
    const res = await LogoutAction({
      success: false,
      message: '',
    })

    if (res.success) {
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
              className="flex cursor-pointer items-center justify-center text-gray-600 transition-colors"
              aria-label="프로필"
            >
              <div className="relative h-10 w-10 overflow-hidden rounded-full border border-gray-100 transition-colors">
                <Image
                  src={auth?.profileUrl || DEFAULT_IMAGES.AVATAR}
                  alt="user-profile-image"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="flex flex-col gap-2 pt-5 pr-10 pb-3 pl-8">
            <div className="mb-3 flex items-center gap-4 border-b pb-4">
              <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full bg-gray-200">
                <Image
                  src={auth?.profileUrl || DEFAULT_IMAGES.AVATAR}
                  alt={'user-avatar'}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="flex flex-col justify-center overflow-hidden">
                <div className="truncate text-sm font-bold">{auth.nickName}</div>
                <div className="truncate text-xs text-gray-600">{auth.email}</div>
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

            <Link href="/mypage/myplaylists" className="py-1">
              <DropdownMenuItem className="flex w-full cursor-pointer gap-4 px-0 py-1">
                <ListVideo />
                플레이리스트
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
