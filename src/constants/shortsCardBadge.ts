import { Ban, Check, Globe, Loader, Lock, ShieldAlert, SquareX } from 'lucide-react'

export const SHORTS_STATUS_CONFIG = {
  PUBLISHED: {
    icon: Globe,
    label: '공개',
    bgColor: 'bg-green-500',
  },
  PENDING: {
    icon: Loader,
    label: '검토 중',
    bgColor: 'bg-gray-400',
  },
  AI_CHECK: {
    icon: Loader,
    label: '검토 중',
    bgColor: 'bg-gray-500',
  },
  REJECT: {
    icon: Ban,
    label: '반려됨',
    bgColor: 'bg-red-600',
  },
  PUBLIC: {
    icon: Check,
    label: '공개',
    bgColor: 'bg-green-500',
  },
  PRIVATE: {
    icon: Lock,
    label: '비공개',
    bgColor: 'bg-gray-700',
  },
} as const
