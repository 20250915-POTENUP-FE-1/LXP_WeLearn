import { getCategoriesAction } from '@/features/category.action'
import ShortsFormContainerRegister from '@/features/shortsform/register/components/ShortsFormContainerRegister'
import type { CategoryOption } from '@/features/shortsform/types/shortsForm'

export const metadata = {
  title: '숏츠 등록',
  description: '새로운 숏츠를 등록합니다.',
}

export default async function ShortsCreatePage() {
  const categoriesResponse = await getCategoriesAction()
  const categories: CategoryOption[] = categoriesResponse.data?.map((cat) => ({
    id: cat.id,
    name: cat.name,
  })) ?? []

  return (
    <div className="h-full w-full max-w-7xl">
      <div className="px-4 py-6 sm:px-6 sm:py-8">
        <ShortsFormContainerRegister categories={categories} />
      </div>
    </div>
  )
}
