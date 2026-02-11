import { NextRequest, NextResponse } from 'next/server'
import { categoryApi } from '@/services/category/category.service'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl
    const categoryId = searchParams.get('categoryId')
    const page = Number(searchParams.get('page') ?? 0)
    const size = Number(searchParams.get('size') ?? 8)
    const sort = searchParams.get('sort') ?? 'createdAt,desc'

    const response = categoryId
      ? await categoryApi.getShortsByCategoryId(Number(categoryId), { page, size, sort })
      : await categoryApi.getAllShorts({ page, size, sort }) 

    return NextResponse.json(response)
  } catch {
    return NextResponse.json({ message: '숏츠 조회 실패' }, { status: 500 })
  }
}
