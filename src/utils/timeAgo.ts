import { KOREAN_DATE_FORMAT } from '@/constants/date.constant'
import { TIME } from '@/constants/time.consants'

export function timeAgo(date: string) {
  const now = new Date()
  const targetDate = new Date(date.replaceAll('T', ' ').substring(0, 18))

  const diffSeconds = Math.trunc((now.getTime() - targetDate.getTime()) / 1000)

  if (diffSeconds < TIME.SECOND) {
    return '방금 전'
  }

  if (diffSeconds < TIME.MINUTE) {
    return `${diffSeconds}초 전`
  }

  if (diffSeconds < TIME.HOUR) {
    return `${Math.trunc(diffSeconds / TIME.MINUTE)}분 전`
  }

  if (diffSeconds < TIME.DAY) {
    return `${Math.trunc(diffSeconds / TIME.HOUR)}시간 전`
  }

  if (diffSeconds < TIME.DAY * TIME.MAX_RELATIVE_DAY) {
    return `${Math.trunc(diffSeconds / TIME.DAY)}일 전`
  }

  return targetDate
    .toLocaleDateString('ko-KR', KOREAN_DATE_FORMAT)
    .replace(/\//g, '.')
    .replace(/\.$/, '')
}
