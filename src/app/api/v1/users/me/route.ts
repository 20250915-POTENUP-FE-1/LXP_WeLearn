import { NextResponse } from 'next/server'
import { userApi } from '@/services/mypage/user.service'

export async function GET() {
  try {
    const res = await userApi.getMe()
    return NextResponse.json(res)
  } catch {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }
}
