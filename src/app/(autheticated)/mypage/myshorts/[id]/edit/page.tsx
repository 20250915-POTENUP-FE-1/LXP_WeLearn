import { notFound } from 'next/navigation'
import { myShortsApi } from '@/services/mypage/myshorts.service'
import { getCategoriesAction } from '@/features/category.action'
import ShortsFormContainer from '@/features/shortsform/components/ShortsFormContainer'
import type { ShortsResponse } from '@/types/mypage-shorts'
import type { ShortsEditInitialData, CategoryOption } from '@/features/shortsform/types/shortsForm'

interface EditShortsPageProps {
  params: Promise<{ id: string }>
}

/**
 * 서버 응답 데이터를 폼 초기 데이터로 변환
 */
function transformToEditInitialData(shortsData: ShortsResponse): ShortsEditInitialData {
  return {
    formData: {
      title: shortsData.title || '',
      description: shortsData.description || '',
      isPublic: shortsData.status === 'PUBLISHED',
      categoryId: shortsData.categoryId || null,
      keywords: shortsData.keywords || [],
      keywordInput: '',
      thumbnail: null,
    },
    videoData: {
      videoFile: null,
      durationSec: shortsData.durationSec || null,
      isDragging: false,
    },
    videoUrl: shortsData.videoUrl || '',
    thumbnailUrl: shortsData.thumbnailUrl || null,
  }
}

export default async function EditShortsPage({ params }: EditShortsPageProps) {
  // id 검증
  const { id } = await params
  const shortsId = Number(id)

  if (isNaN(shortsId) || shortsId <= 0) {
    notFound()
  }

  try {
    const [shortsData, categoriesResponse] = await Promise.all([
      myShortsApi.getShorts(shortsId),
      getCategoriesAction(),
    ])

    const initialData = transformToEditInitialData(shortsData)
    const categories: CategoryOption[] =
      categoriesResponse.data?.map((cat) => ({
        id: cat.id,
        name: cat.name,
      })) ?? []

    return (
      <div className="h-full w-full max-w-7xl">
        <div className="px-4 py-6 sm:px-6 sm:py-8">
          <ShortsFormContainer
            categories={categories}
            mode="edit"
            initialData={initialData}
            shortsId={shortsId}
          />
        </div>
      </div>
    )
  } catch (error) {
    console.error('숏츠 데이터 불러오기 실패:', error)
    notFound()
  }
}
