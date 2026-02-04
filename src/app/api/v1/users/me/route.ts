import { NextResponse } from 'next/server'
import { userApi } from '@/services/mypage/user.service'

export async function GET() {
  try {
    const res = await userApi.getMe()
    return NextResponse.json(res)
  } catch (error: any) {
    const status = error?.response?.status ?? 500
    const data = error?.response?.data ?? { message: 'Internal Server Error' }

    return NextResponse.json(data, { status })
  }
}
