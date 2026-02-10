import { NextRequest, NextResponse } from 'next/server';
import { api } from '@/lib/utils/apiUtils';
import { ApiResponse } from '@/types/api/api';

export async function PATCH(request:NextRequest){
  try {
    const body = await request.json();
    const newImageKey = body.newImageKey
    const res = await api.patch<ApiResponse>(`/api/v1/users/me/profile/image`,{
      newImageKey:newImageKey
    })
    return NextResponse.json(res)
  }catch (e) {
    console.log(e);
  }
}