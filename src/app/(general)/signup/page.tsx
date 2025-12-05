'use client'

import SignupForm from '@/features/auth/components/SignupForm'

export default function SignupPage() {
  return (
    <>
      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-2xl font-bold text-gray-900">회원가입</h1>
            <p className="text-sm text-gray-500">Welearn과 함께 학습을 시작하세요.</p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
            <SignupForm />
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              이미 계정이 있으신가요?{' '}
              <a href="/login" className="font-medium text-gray-900 hover:underline">
                로그인
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
