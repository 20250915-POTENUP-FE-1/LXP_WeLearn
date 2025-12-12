'use client'
import { Check, CircleUserRound } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { SignupAction } from '../action'
import { useActionState, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

export default function SignupForm() {
  const router = useRouter()
  const [state, formAction, isPending] = useActionState(SignupAction, {
    success: false,
    message: '',
    errors: {},
  })

  // const [userName, setUserName] = useState('')
  // const [userEmail, setUserEmail] = useState('')
  // const [userNickname, setUserNickname] = useState('')
  // const [userPw, setUserPw] = useState('')
  // const [userConfirmPw, setUserConfirmPw] = useState('')

  // const [emailVerify, setEmailVerify] = useState(false)
  // const [pwVerified, setPwVerified] = useState(false)
  // const [confirmPwVerified, setConfirmPwVerified] = useState(false)

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
      <p className="text-sm font-medium text-gray-700">프로필</p>
      {/* 이름 입력 */}
      <label
        htmlFor="profile-image"
        className="mb-2 box-border flex w-full flex-col items-center justify-center overflow-hidden rounded-full"
      >
        <CircleUserRound size={120} strokeWidth={1} />
      </label>
      <input type="file" id="profile-image" name="profile-image" className="hidden" />
      {/* 이름 입력 */}
      <Input
        label="이름"
        type="text"
        id="name"
        name="name"
        placeholder="김코드"
        required
        // value={userName}
        // onChange={(e) => setUserName(e.target.value)}
      />

      {/* 닉네임 입력 */}
      <Input
        label="닉네임"
        type="nickname"
        name="nickname"
        id="nickname"
        placeholder="숏터"
        required
        // value={userNickname}
        // onChange={(e) => setUserNickname(e.target.value)}
      />

      {/* 이메일 입력 */}
      <Input
        label="email"
        id="email"
        name="email"
        placeholder="example@lxp.com"
        required
        type="email"
        // value={userEmail}
        // onChange={(e) => setUserEmail(e.target.value)}
      />
      {/* <p className="flex items-center gap-2 text-sm leading-2 font-semibold text-gray-300">
        <Check strokeWidth={1.5} size={16} />
        올바른 이메일 형식이 아닙니다.
      </p> */}

      {/* 비밀번호 입력 */}
      <Input
        label="비밀번호"
        id="password"
        name="password"
        placeholder="비밀번호 8자 이상 입력하세요."
        type="password"
        minLength={8}
        required
        // value={userPw}
        // onChange={(e) => setUserPw(e.target.value)}
      />
      {/* <p className="flex items-center gap-2 text-sm leading-2 font-semibold text-gray-300">
        <Check strokeWidth={1.5} size={16} />
        비밀번호는 8자 이상이어야 합니다.
      </p> */}
      {/* 비밀번호 확인 입력 */}
      <Input
        label="비밀번호 확인"
        id="confirmPassword"
        name="confirmPassword"
        placeholder="비밀번호를 다시 한번 입력해주세요."
        type="password"
        minLength={8}
        required
        // value={userConfirmPw}
        // onChange={(e) => setUserConfirmPw(e.target.value)}
      />
      {/* <p className="flex items-center gap-2 text-sm leading-2 font-semibold text-gray-300">
        <Check strokeWidth={1.5} size={16} />
        비밀번호가 서로 일치하지 않습니다.
      </p> */}
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
