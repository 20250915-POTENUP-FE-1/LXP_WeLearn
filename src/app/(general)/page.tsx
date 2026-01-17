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

  return (
    <div className="min-h-screen bg-white">
      <ShortsCarousel data={shortsList} />

      <PlaylistSection items={playlistGroup} />

      <CategoryShortsSection shorts={shortsList} categories={categories} />
    </div>
  )
}
