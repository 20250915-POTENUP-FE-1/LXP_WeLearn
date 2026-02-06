import { NextResponse } from 'next/server';
import { getShortPopular } from '@/services/shorts/getShortPopular';

export async function GET(){
  try{
   const res = await getShortPopular()
    return NextResponse.json(res)
  }catch (e) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }
}