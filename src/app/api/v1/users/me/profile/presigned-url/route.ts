import { NextRequest, NextResponse } from 'next/server';
import { api } from '@/lib/utils/apiUtils';
import { ApiResponse } from '@/types/api/api';
import { PresignedUrlData } from '@/types/auth/auth';

export async function GET(request:NextRequest){
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const fileName = searchParams.toString().split('=')[1]

  try{
    const res = await api.get<ApiResponse<PresignedUrlData>>(`/api/v1/users/me/profile/presigned-url`,{
      params:{fileName:fileName}
    })
    return NextResponse.json(res)
  }
  catch (e){
    console.error(e)
  }
}