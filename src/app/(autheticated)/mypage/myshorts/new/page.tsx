import { redirect } from 'next/navigation'

import ShortsFormContainer from '@/features/register/components/ShortsFormContainer'
import { getMeAction } from '@/features/mypage/user.action'

export const metadata = {
  title: '숏츠 등록',
  description: '새로운 숏츠를 등록합니다.',
}

export default async function ShortsCreatePage() {
  // 서버에서 사용자 정보 조회
  const result = await getMeAction()

  // 미인증 시 로그인 페이지로 리다이렉트
  if (!result.success || !result.data?.id) {
    redirect('/signin')
  }

  return (
    <div className="h-full w-full max-w-7xl">
      <div className="px-4 py-6 sm:px-6 sm:py-8">
        <ShortsFormContainer userId={result.data.id} />
      </div>
    </div>
  )
}
