import { notFound } from 'next/navigation'
import ShortsContainer from '@/features/shorts/components/ShortsContainer'
import { getShortsDetailList } from '@/services/shorts/getShortsDetailList'

interface ShortDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function ShortformDetailPage({ params }: ShortDetailPageProps) {
  const { id } = await params
  const data = await getShortsDetailList(id)

  console.log(data)
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
