export default function MyPageLayout() {
  return (
    <div className="flex size-full shrink grow flex-col items-center justify-start">
      {/* <PageSectionHeader title="마이페이지" subTitle="내 학습 현황과 정보를 관리하세요" /> */}

      <section className="size-full max-w-7xl grow px-4 sm:px-6 lg:px-8">
        <div className="grid h-full grid-cols-1 gap-8 lg:grid-cols-4">
          {/* <MyPageAsideProfileBar /> */}
          {/* <Outlet /> */}
        </div>
      </section>
    </div>
  )
}
