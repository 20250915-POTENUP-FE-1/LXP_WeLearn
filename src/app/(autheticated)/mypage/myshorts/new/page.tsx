import { getCategoriesAction } from '@/features/category.action'
import ShortsFormContainer from '@/features/shortsform/components/ShortsFormContainer'
import { Category } from '@/types/category/category'



export default async function ShortsCreatePage() {
  const categoriesResponse = await getCategoriesAction()
  const categories: Category[] =
    categoriesResponse.data?.map((cat) => ({
      id: cat.id,
      name: cat.name,
    })) ?? []

  return (
    <div className="h-full w-full max-w-7xl">
      <div className="px-4 py-6 sm:px-6 sm:py-8">
        <ShortsFormContainer categories={categories} mode="create" />
      </div>
    </div>
  )
}
