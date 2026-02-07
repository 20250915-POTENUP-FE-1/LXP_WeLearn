'use client'

import { Input } from '@/components/ui/Input'
import { useActionState, useEffect } from 'react';
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { SignupAction } from '@/features/auth/actions/signup.action';
import { ActionState } from '@/types/action/action';


export default function SignupForm() {
  const initialState:ActionState = {
    success: false,
    message: "",
    errors: {},
    inputs: {}
  }
  const router = useRouter()
  const [state, formAction] = useActionState(SignupAction, initialState)

  useEffect(() => {
    if (state.success) {
      toast.success('회원가입에 성공하였습니다.🚀')
      router.push('/signin')
    } else if (!state.success && state.code) {
      toast.error(state.code)
    }
  }, [state])


  return (
    <form className="flex flex-col space-y-5" action={formAction} noValidate>
      <Input
        label="닉네임"
        type="nickname"
        name="nickname"
        id="nickname"
        defaultValue={state.inputs?.nickname || ""}
        placeholder="한글자 이상 입력하세요."
        required
      />
      {state.errors?.nickname && <p className="text-red-500">{state.errors.nickname}</p>}
      <Input
        label="email"
        type="email"
        name="email"
        id="email"
        defaultValue={state.inputs?.email || ""}
        placeholder="example@lxp.com"
        required
      />
      {state.errors?.email && <p className="text-red-500">{state.errors.email}</p>}
      <Input
        label="비밀번호"
        type="password"
        name="password"
        id="password"
        defaultValue={state.inputs?.password || ""}
        placeholder="비밀번호 6자 이상 입력하세요."
        minLength={6}
        required
      />
      {state.errors?.password && <p className="text-red-500">{state.errors.password}</p>}
      <Input
        label="비밀번호 확인"
        type="password"
        name="confirmPassword"
        id="confirmPassword"
        placeholder="비밀번호를 다시 한번 입력해주세요."
        minLength={6}
        required
      />
      {state.errors?.confirmPassword && <p className="text-red-500">{state.errors.confirmPassword}</p>}
      <button
        type="submit"
        className="w-full rounded-lg bg-gray-900 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-gray-800 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
      >
        회원가입
      </button>
    </form>
  )
}
