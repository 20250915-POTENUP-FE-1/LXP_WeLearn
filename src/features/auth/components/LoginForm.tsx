'use client'

import { Input } from '@/components/ui/Input'
import { useActionState, useEffect } from 'react'
import { LoginAction } from '@/features/auth/actions/login.action'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { useAuth } from '@/shared/store/auth/auth.store'
import { ActionState } from '@/types/action/action'
import { UserInfo } from '@/types/user/user'
import { Loader2 } from 'lucide-react'

const initialState: ActionState<UserInfo> = {
  success: false,
  message: '',
  errors: {},
  inputs: {},
  data: undefined,
}

export default function LoginForm() {
  const router = useRouter()
  const saveAuth = useAuth((state) => state.login)
  const [state, formAction, isPending] = useActionState(LoginAction, initialState)

  useEffect(() => {
    if (state.success && state.data) {
      toast.success(`${state.data.nickName}님 환영합니다.🎉`)
      saveAuth(state.data)
      router.push('/')
    } else if (!state.success && state.message) {
      toast.error(state.message)
    }
  }, [state, router, saveAuth])

  return (
    <>
      <form action={formAction} className="space-y-6">
        <div>
          <Input
            label="이메일"
            type="email"
            id="email"
            name="email"
            placeholder="이메일을 입력해주세요."
            defaultValue={state.inputs?.email ?? ''}
            required
          />
          {!state.success && state.errors?.email && (
            <p className="mt-1 text-sm text-red-500">{state.errors.email}</p>
          )}
        </div>

        <div>
          <Input
            label="비밀번호"
            type="password"
            id="password"
            name="password"
            placeholder="비밀번호를 입력해주세요."
            defaultValue={state.inputs?.password ?? ''}
            required
          />
          {!state.success && state.errors?.password && (
            <p className="mt-1 text-sm text-red-500">{state.errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-lg bg-gray-900 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-gray-800 disabled:opacity-70"
        >
          로그인
        </button>
      </form>

      {isPending && (
        <div className="bg-gray/80 fixed inset-0 z-50 flex flex-col items-center justify-center gap-3 backdrop-blur-sm">
          <Loader2 className="h-10 w-10 animate-spin text-green-500" />
          <p className="text-sm font-medium">로그인 중입니다...</p>
        </div>
      )}
    </>
  )
}
