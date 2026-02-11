import { Globe, Loader, Lock, ShieldAlert } from 'lucide-react'

export const SHORTS_STATUS_CONFIG = {
  PUBLISHED: {
    icon: Globe,
    label: '공개',
    bgColor: 'bg-green-500',
  },
  PENDING: {
    icon: Lock,
    label: '비공개',
    bgColor: 'bg-gray-700',
  },
  AI_CHECK: {
    icon: Loader,
    label: '검토중',
    bgColor: 'bg-yellow-700',
  },
  REJECT: {
    icon: ShieldAlert,
    label: '거부됨',
    bgColor: 'bg-red-600',
  },
} as const
