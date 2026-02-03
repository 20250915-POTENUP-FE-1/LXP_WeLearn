import { NextResponse } from 'next/server'
import { userApi } from '@/services/mypage/user.service'

export async function GET() {
  try {
    console.log('------route')
    const res = await userApi.getMe()
    console.log(res)
    return NextResponse.json(res)
  } catch {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }
}
