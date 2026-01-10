import ShortsFormContainerRegister from '@/features/register/components/ShortsFormContainerRegister'

export const metadata = {
  title: '숏츠 등록',
  description: '새로운 숏츠를 등록합니다.',
}

export default function ShortsCreatePage() {
  return (
    <div className="h-full w-full max-w-7xl">
      <div className="px-4 py-6 sm:px-6 sm:py-8">
        <ShortsFormContainerRegister />
      </div>
    </div>
  )
}
