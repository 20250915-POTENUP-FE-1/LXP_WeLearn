import ShortsFormContainer from '@/features/register/components/ShortsFormContainer'
import { userApi } from '@/services/mypage/user.service'
import { redirect } from 'next/navigation'

export const metadata = {
  title: '숏츠 등록',
  description: '새로운 숏츠를 등록합니다.',
}

export default async function ShortsCreatePage() {
  // 서버에서 사용자 정보 조회
  const user = await userApi.getMe()

  // 로그인 안 된 경우 리다이렉트
  if (!user?.id) {
    redirect('/login')
  }

  return (
    <div className="h-full w-full max-w-7xl">
      <div className="px-4 py-6 sm:px-6 sm:py-8">
        <ShortsFormContainer userId={user.id} />
      </div>
    </div>
  )
}
