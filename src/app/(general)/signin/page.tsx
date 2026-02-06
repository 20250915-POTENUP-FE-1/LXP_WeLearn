import LoginForm from '@/features/auth/components/LoginForm'
import Link from 'next/link'

export default function SigninPage() {
  return (
    <>
      <div className="flex min-w-sm items-center justify-center px-4 py-8 md:min-w-lg">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-2xl font-bold text-gray-900">로그인</h1>
            <p className="text-sm text-gray-500">학습을 계속하려면 로그인하세요</p>
          </div>

          <div className="shadow-s rounded-xl border border-gray-200 bg-white p-8">
            <LoginForm />
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              계정이 없으신가요?{' '}
              <Link href="/signup" className="font-medium text-gray-900 hover:underline">
                회원가입
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
