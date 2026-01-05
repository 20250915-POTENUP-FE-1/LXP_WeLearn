import { redirect } from 'next/navigation'
import MyShortsContainer from '@/features/mypage/myshorts/MyShortsContainer'
import { getMyShortsAction } from '@/features/mypage/myshorts/myshorts.action'

export default async function MyShortsPage() {
  const result = await getMyShortsAction(0, 20)

  // 실패 시 로그인 페이지로 리다이렉트
  if (!result.success) {
    redirect('/signin')
  }

  const shorts = result.data?.content ?? []
  const totalCount = result.data?.totalElements ?? 0

  return <MyShortsContainer initialShorts={shorts} totalCount={totalCount} />
}
