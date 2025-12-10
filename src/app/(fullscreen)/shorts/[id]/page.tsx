import { notFound } from 'next/navigation'
import { getShortsList } from '@/services/getShortsListService'
import ShortsContainer from '@/features/shortform/components/ShortsContainer'

interface ShortDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function ShortformDetailPage({ params }: ShortDetailPageProps) {
  const { id } = await params
  const data = await getShortsList(id)

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
