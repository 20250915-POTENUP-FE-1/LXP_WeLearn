import { Archive, Globe, Lock } from 'lucide-react'

export const SHORTS_STATUS_CONFIG = {
  PUBLISHED: {
    icon: Globe,
    label: '공개',
    bgColor: 'bg-green-500',
  },
  DRAFT: {
    icon: Lock,
    label: '비공개',
    bgColor: 'bg-gray-600',
  },
  ARCHIVED: {
    icon: Archive,
    label: '보관됨',
    bgColor: 'bg-gray-700',
  },
} as const
