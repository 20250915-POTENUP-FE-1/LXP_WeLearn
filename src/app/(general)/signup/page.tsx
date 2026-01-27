import SignupForm from '@/features/auth/components/SignupForm'
import Link from 'next/link'

export default function SignupPage() {
  return (
    <>
      <div className="flex min-w-sm items-center justify-center md:min-w-lg">
        <div className="w-full max-w-md">
          <div className="mb-8 flex w-full flex-col items-center justify-center">
            <h1 className="mb-2 text-2xl font-bold text-gray-900">회원가입</h1>
            <p className="text-sm text-gray-500">ShorTudy와 함께 학습을 시작하세요.</p>
          </div>

          <div className="w-full rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
            <SignupForm />
          </div>

          <div className="mt-6 text-center">
            <p className="flex flex-col items-center text-sm text-gray-500">
              이미 계정이 있으신가요?
              <Link href="/signin" className="font-medium text-gray-900 hover:underline">
                로그인
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
