import PlaylistSection from '@/features/home/playlist/PlaylistSection'
import { playlistGroup } from '@/dummy/data'
import { getShortPopular } from '@/services/shorts/getShortPopular'
import { categoryApi } from '@/services/category/category.service'
import CategoryShortsSection from '@/features/home/categories/CategoryShortsSection'
import ShortsCarousel from '@/features/home/ShortsCarousel/ShortsCarousel'

const ITEMS_PER_PAGE = 8

type PageProps = {
  searchParams?: {
    category?: string
    page?: string
  }
}

export default async function Page({ searchParams }: PageProps) {
  const rawCategoryId = searchParams?.category
  const rawPage = searchParams?.page
  const parsedCategoryId =
    rawCategoryId && rawCategoryId !== 'all' && Number.isFinite(Number(rawCategoryId))
      ? Number(rawCategoryId)
      : null
  const parsedPage = Number(rawPage)
  const page = Number.isFinite(parsedPage) && parsedPage >= 0 ? parsedPage : 0

  const [popularShorts, categoryShortsResponse, categoriesResponse] = await Promise.all([
    getShortPopular(), // 1. 인기 숏츠 (캐러셀용)
    parsedCategoryId === null
      ? categoryApi.getAllShorts({ page, size: ITEMS_PER_PAGE })
      : categoryApi.getShortsByCategoryId(parsedCategoryId, { page, size: ITEMS_PER_PAGE }),
    categoryApi.getAll(), // 카테고리 목록
  ])

  // 인기 숏츠 (캐러셀용)
  const shortsList = popularShorts?.data?.content ?? []
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

      <CategoryShortsSection initialShorts={initialShortsData} categories={categories} />
    </div>
  )
}
