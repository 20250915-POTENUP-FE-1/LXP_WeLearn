import { NextRequest, NextResponse } from 'next/server';
import { api } from '@/lib/utils/apiUtils';
import { userApi } from '@/services/mypage/user.service';

export async function PATCH(req:NextRequest){
  const body = await req.json()
  const currentPassword = body.currentPassword
  const newPassword = body.newPassword
  const passwords = {
    "currentPassword": currentPassword,
    "newPassword": newPassword
  }
  try{
    const res = await userApi.updatePassword(passwords)
    return NextResponse.json(res)
  }catch (e) {
    console.log(e)
  }
}