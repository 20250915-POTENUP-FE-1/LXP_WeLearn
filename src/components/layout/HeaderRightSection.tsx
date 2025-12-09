'use client'
import Link from 'next/link'
import { LogOut, ShoppingCart, User, UserIcon } from 'lucide-react'
import { startTransition, useActionState, useEffect, useState } from 'react'
import { UserInfo } from '@/types/auth'
import { LogoutAction } from '@/features/auth/action'
import { useRouter } from 'next/navigation'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { toast } from 'react-toastify'

interface HeaderRightSectionProps {
  isLogined: boolean
}

export default function HeaderRightSection({ isLogined }: HeaderRightSectionProps) {
  const [user, setUser] = useState<UserInfo | null>(null)

  const router = useRouter()

  const [state, action, isPending] = useActionState(LogoutAction, {
    success: false,
    message: '',
  })

  useEffect(() => {
    const user = (JSON.parse(localStorage.getItem('user') || 'null') as UserInfo) || null
    if (user) setUser(user)
  }, [])

  useEffect(() => {
    if (state.success) {
      localStorage.removeItem('user')
      router.push('/')
    }
  }, [state, router])

  return (
    <div className="flex items-center gap-3">
      {!isLogined ? (
        <>
          <Link
            href="/signin"
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            로그인
          </Link>
          <Link
            href="/signup"
            className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800"
          >
            회원가입
          </Link>
        </>
      ) : (
        <>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <div
                className="cursor-pointer p-2 text-gray-600 transition-colors hover:text-gray-900"
                aria-label="프로필"
              >
                {/* 유저 프로필 영역 */}
                {user?.profileUrl && (
                  <div
                    className="cursor-pointer rounded-full border-gray-100 transition-colors hover:border-gray-600"
                    aria-label="프로필 이미지"
                  >
                    <img src={user?.profileUrl} />
                  </div>
                )}

                <User strokeWidth={2} />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-30 py-3 pl-2">
              <DropdownMenuItem className="cursor-pointer">
                <button
                  onClick={() => {
                    toast.info('준비중인 서비스입니다.')
                  }}
                  className="flex gap-4 p-1"
                >
                  <UserIcon />
                  프로필
                </button>
              </DropdownMenuItem>
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
      )}
    </div>
  )
}
