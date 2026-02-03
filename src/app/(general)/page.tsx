import PlaylistSection from '@/features/home/playlist/PlaylistSection'
import { playlistGroup } from '@/dummy/data'
import { getShortPopular } from '@/services/shorts/getShortPopular'
import { categoryApi } from '@/services/category/category.service'
import CategoryShortsSection from '@/features/home/categories/CategoryShortsSection'
import ShortsCarousel from '@/features/home/ShortsCarousel/ShortsCarousel'
import { ShortsBase } from '@/types/shorts/shorts'

export default async function Page() {
  // api 호출 (초기 로드: 전체 숏츠)
  const [popularShorts, categoryShortsResponse, categoriesResponse] = await Promise.all([
    getShortPopular(),
    categoryApi.getAllShorts(), // 기본값 size=8 사용 (전체 숏츠 목록)
    categoryApi.getAllCategoryId(), // 카테고리 요소 목록
  ])

  // console.log('인기목록:', popularShorts)
  // console.log('카테고리 목록 응답:', categoriesResponse)
  // console.log('카테고리숏츠응답:', categoryShortsResponse)

  // 인기 숏츠 (캐러셀용)
  const shortsList: ShortsBase[] = popularShorts?.data?.content ?? []

  // 카테고리 목록
  const categories = categoriesResponse?.data ?? []

  // 카테고리 탐색 섹션 초기 데이터
  const initialShortsData = categoryShortsResponse?.data ?? {
    content: [],
    totalPages: 0,
    totalElements: 0,
  }

  return (
    <div className="min-h-screen bg-white">
      <ShortsCarousel data={shortsList} />

      <PlaylistSection items={playlistGroup} />

      <CategoryShortsSection initialShortsData={initialShortsData} categories={categories} />
    </div>
  )
}
