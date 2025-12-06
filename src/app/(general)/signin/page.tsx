import SigninForm from '@/features/auth/components/SigninForm'
import Link from 'next/link'

// ============================================
// Page: 로그인 페이지
// Route: /login
// Access: 공개 (비로그인 사용자)
// Description: 이메일과 비밀번호로 로그인하는 페이지
// Tailwind: flex로 중앙 정렬, min-h-screen으로 전체 높이
// ============================================

// ============================================
// LoginPage Component
// Description: 로그인 페이지 메인 컴포넌트
// ============================================

export default function SigninPage() {
  return (
    <>
      <div className="flex min-w-lg items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-2xl font-bold text-gray-900">로그인</h1>
            <p className="text-sm text-gray-500">학습을 계속하려면 로그인하세요</p>
          </div>

          <div className="shadow-s rounded-xl border border-gray-200 bg-white p-8">
            <SigninForm />
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
