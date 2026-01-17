import PlaylistSection from '@/features/home/playlist/PlaylistSection'
import { playlistGroup } from '@/dummy/data'
import { getShortPopular } from '@/services/shorts/getShortPopular'
import { categoryApi } from '@/services/category/category.service'
import CategoryShortsSection from '@/features/home/categories/CategoryShortsSection'
import ShortsCarousel from '@/features/home/ShortsCarousel/ShortsCarousel'

export default async function Page() {
  const [popularShorts, categoriesResponse] = await Promise.all([
    getShortPopular(),
    categoryApi.getAll(),
  ])

  const shortsList = popularShorts?.data?.content ?? []
  const categories = categoriesResponse?.data ?? []

  // 초기 페이지네이션 데이터
  const initialShortsData = popularShorts?.data ?? {
    content: [],
    totalPages: 0,
    totalElements: 0,
  }

  return (
    <div className="min-h-screen bg-white">
      <ShortsCarousel data={shortsList} />

      <PlaylistSection items={playlistGroup} />

      <CategoryShortsSection initialShorts={initialShortsData} categories={categories} />
    </div>
  )
}
