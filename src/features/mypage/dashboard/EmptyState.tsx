'use client'

import Link from 'next/link'
import { Heart, Bookmark, Video } from 'lucide-react'
import { Button } from '@/components/ui/Button'

type EmptyType = 'like' | 'saved' | 'myshorts'

interface EmptyStateProps {
  type: EmptyType
}

const EMPTY_CONFIG: Record<
  EmptyType,
  {
    icon: React.ReactNode
    title: string
    description: string
    buttonText: string
    buttonHref: string
  }
> = {
  like: {
    icon: <Heart className="h-12 w-12 text-gray-300" strokeWidth={1.5} />,
    title: '좋아요한 숏츠가 없습니다',
    description: '마음에 드는 숏츠에 좋아요를 눌러보세요',
    buttonText: '숏츠 보러가기',
    buttonHref: '/shorts',
  },
  saved: {
    icon: <Bookmark className="h-12 w-12 text-gray-300" strokeWidth={1.5} />,
    title: '저장한 플레이리스트가 없습니다',
    description: '숏츠를 저장하여 나만의 플레이리스트를 만들어보세요',
    buttonText: '숏츠 보러가기',
    buttonHref: '/shorts',
  },
  myshorts: {
    icon: <Video className="h-12 w-12 text-gray-300" strokeWidth={1.5} />,
    title: '등록한 숏츠가 없습니다',
    description: '나만의 숏츠를 만들어 공유해보세요',
    buttonText: '숏츠 만들기',
    buttonHref: '/mypage/myshorts/new',
  },
}

export default function EmptyState({ type }: EmptyStateProps) {
  const config = EMPTY_CONFIG[type]

  return (
    <div className="flex flex-col items-center justify-center py-12">
      {config.icon}
      <h3 className="mt-4 text-base font-medium text-gray-900">{config.title}</h3>
      <p className="mt-1 text-sm text-gray-500">{config.description}</p>
      <Link href={config.buttonHref}>
        <Button variant="outline" className="mt-4">
          {config.buttonText}
        </Button>
      </Link>
    </div>
  )
}
