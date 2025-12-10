'use client'
import { CircleUserRound } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { SignupAction } from '../action'
import { useActionState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

export default function SignupForm() {
  const router = useRouter()
  const [state, formAction, isPending] = useActionState(SignupAction, {
    success: false,
    message: '',
    errors: {},
  })

  useEffect(() => {
    if (state.success === true) {
      toast.success('회원가입에 성공하였습니다.🚀')
      router.push('/signin')
    } else if (state.success === false && state.message) {
      toast.error(state.message)
    }
  }, [state])

  return (
    <form className="flex flex-col space-y-5" action={formAction}>
      {/* 이름 입력 */}
      <div>
        <label
          htmlFor="profile-image"
          className="mb-2 box-border flex w-full justify-center overflow-hidden rounded-full"
        >
          <CircleUserRound size={120} strokeWidth={1} />
        </label>
        <input type="file" id="profile-image" name="profile-image" className="hidden" />
      </div>
      {/* 이름 입력 */}
      <Input label="이름" type="text" id="name" name="name" placeholder="홍길동" required />

      {/* 닉네임 입력 */}
      <Input
        label="닉네임"
        type="nickname"
        name="nickname"
        id="nickname"
        placeholder="말괄량이"
        required
      />

      {/* 이메일 입력 */}
      <Input
        label="email"
        id="email"
        name="email"
        placeholder="example@lxp.com"
        required
        type="email"
      />

      {/* 비밀번호 입력 */}
      <Input
        label="비밀번호"
        id="password"
        name="password"
        placeholder="비밀번호 8자 이상 입력하세요."
        type="password"
        required
      />
      {/* 비밀번호 확인 입력 */}
      <Input
        label="비밀번호 확인"
        id="confirm-password"
        name="confirm-password"
        placeholder="비밀번호를 다시 한번 입력해주세요."
        type="password"
        required
      />

      {/* 회원가입 버튼 */}
      <button
        type="submit"
        className="w-full rounded-lg bg-gray-900 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-gray-800 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
      >
        회원가입
      </button>
    </form>
  )
}
