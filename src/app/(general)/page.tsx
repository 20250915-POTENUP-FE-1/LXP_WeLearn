import PlaylistSection from '@/features/home/playlist/PlaylistSection'
import { playlistGroup } from '@/dummy/data'
import { getShortPopular } from '@/services/shorts/getShortPopular'
import { categoryApi } from '@/services/category/category.service'
import CategoryShortsSection from '@/features/home/categories/CategoryShortsSection'
import ShortsCarousel from '@/features/home/ShortsCarousel/ShortsCarousel'
import { ShortsBase } from '@/types/shorts/shorts'

type PageProps = {
  searchParams: Promise<{
    category?: string
    page?: string
  }>
}

export default async function Page({ searchParams }: PageProps) {
  // URL의 쿼리 값 추출(?category=...&page=... )
  const { category: rawCategoryId, page: rawPage } = await searchParams
  const categoryId = parseCategoryId(rawCategoryId)
  const page = parsePageNumber(rawPage)

  // api 호출 (파싱한 카테고리 Id가 null이면 전체 조회)
  const [popularShorts, categoryShortsResponse, categoriesResponse] = await Promise.all([
    getShortPopular(), // 1. 인기 숏츠 (캐러셀용)
    categoryId === null
      ? categoryApi.getAllShorts({ page, size: ITEMS_PER_PAGE })
      : categoryApi.getShortsByCategoryId(categoryId, { page, size: ITEMS_PER_PAGE }),
    categoryApi.getAll(), // 카테고리 목록
  ])

  // 인기 숏츠 (캐러셀용)
  const shortsList: ShortsBase[] = popularShorts?.data?.content ?? []

  // 카테고리 목록
  const categories = categoriesResponse?.data ?? []

  // 카테고리 탐색 섹션 데이터
  const shortsData = categoryShortsResponse?.data ?? {
    content: [],
    totalPages: 0,
    totalElements: 0,
  }

  return (
    <div className="min-h-screen bg-white">
      <ShortsCarousel data={shortsList} />

      <PlaylistSection items={playlistGroup} />

      <CategoryShortsSection
        shortsData={shortsData}
        categories={categories}
        selectedCategoryId={categoryId}
        currentPage={page}
      />
    </div>
  )
}
