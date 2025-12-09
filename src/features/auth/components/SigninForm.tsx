'use client'

import { Input } from '@/components/ui/Input'
import { useActionState, useEffect } from 'react'
import { SigninAction } from '../action'
import { useRouter } from 'next/navigation'

export default function SigninForm() {
  const router = useRouter()
  const [state, formAction, isPending] = useActionState(SigninAction, {
    success: false,
    message: '',
    errors: {},
  })

  useEffect(() => {
    if (state.success && state.user) {
      localStorage.setItem('user', JSON.stringify(state.user))
      router.push('/')
    }
  }, [state])

  return (
    <form action={formAction} className="space-y-6">
      {/* 이메일 입력 */}
      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
          이메일 <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="example@welearn.com"
          required
          autoComplete="email"
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm placeholder:text-gray-400 focus:border-transparent focus:ring-2 focus:ring-gray-500 focus:outline-none"
        />
      </div>

      {/* 비밀번호 입력 */}
      <div>
        <div className="relative">
          <Input
            label="비밀번호"
            type="password"
            id="password"
            name="password"
            placeholder="비밀번호를 입력해주세요."
            required
          />
        </div>
      </div>

      {/* 로그인 버튼 */}
      <button
        type="submit"
        className="w-full rounded-lg bg-gray-900 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-gray-800 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
      >
        로그인
      </button>
    </form>
  )
}
