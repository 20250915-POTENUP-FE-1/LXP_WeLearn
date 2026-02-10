import { NextRequest, NextResponse } from 'next/server';
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

export async function PATCH(req: NextRequest){
  const body = await req.json()
  const nickName = body.nickName
  const email = body.email
  try {
    const res = await userApi.updateMe({
        "nickName": nickName,
        "email": email
    })
    return NextResponse.json(res)
  }catch (error) {
    console.log(error)
  }
}

// 코드 수정 필요
export async function DELETE(){
  try{
    const res = await userApi.deleteMe()
    return NextResponse.json(res)
  }catch(error){
    console.log(error)
  }
}