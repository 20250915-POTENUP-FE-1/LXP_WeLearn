import { notFound } from 'next/navigation'
import { getShortsDetailList } from '@/services/shorts/getShortsDetailList'
import ShortsContainer from '@/features/shortform/components/ShortsContainer'

interface ShortDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function ShortformDetailPage({ params }: ShortDetailPageProps) {
  const { id } = await params
  const data = await getShortsDetailList(id)

  if (!data) {
    notFound()
  }

  return (
    <>
      <div className="relative h-dvh w-full md:h-full">
        <section
          aria-labelledby="shortform-content"
          className="flex h-dvh w-full items-stretch md:h-full"
        >
          <ShortsContainer shortsList={data.shortsList} initialIndex={data.initialIndex} />
        </section>
      </div>
    </>
  )
}
