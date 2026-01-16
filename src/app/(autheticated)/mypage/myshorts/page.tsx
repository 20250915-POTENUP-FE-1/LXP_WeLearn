import MyShortsContainer from '@/features/mypage/myshorts/MyShortsContainer'
import { myShortsApi } from '@/services/mypage/myshorts.service'

export default async function MyShortsPage() {
  const data = await myShortsApi.getMyShorts({ page: 0, size: 20 })

  return (
    <MyShortsContainer initialShorts={data.content ?? []} totalCount={data.totalElements ?? 0} />
  )
}
