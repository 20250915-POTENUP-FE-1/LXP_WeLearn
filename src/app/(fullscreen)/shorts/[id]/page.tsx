import { notFound } from 'next/navigation'
import { getShortsDetailList } from '@/services/shorts/getShortsDetailList'
import ShortsContainer from '@/features/shortform/components/ShortsContainer'

interface ShortDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function ShortformDetailPage({ params }: ShortDetailPageProps) {
  const { id } = await params
  const data = await getShortsDetailList(id)
  // console.log('데이터 불러오기:', data)
  console.log(data)
  if (!data) {
    notFound()
  }

  return (
    <div className="relative h-full w-full md:h-auto">
      <section aria-labelledby="shortform-content" className="flex h-full w-full items-stretch">
        <ShortsContainer shortsList={data.shortsList} initialIndex={data.initialIndex} />
      </section>
    </div>
  )
}
