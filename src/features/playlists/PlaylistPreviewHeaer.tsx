import { Button } from '@/components/ui/Button'
import { SquarePen } from 'lucide-react'

export default function PlaylistPreviewHeader() {
  return (
    <div className="flex items-center gap-3 pt-8 md:pt-0 lg:p-0">
      <h1 className="text-center text-2xl font-black text-gray-900 uppercase lg:text-left">
        Spring Boot 시작하기
      </h1>
      {/* 플레이리스트 타이틀 수정 버튼 */}
      <Button variant="ghost">
        <SquarePen />
      </Button>
    </div>
  )
}
