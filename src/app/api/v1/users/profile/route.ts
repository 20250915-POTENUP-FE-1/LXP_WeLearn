import { NextResponse } from 'next/server';

export async function GET(){
  const res = await fetch('/api/v1/user/profile')
  return NextResponse.json(res)
}