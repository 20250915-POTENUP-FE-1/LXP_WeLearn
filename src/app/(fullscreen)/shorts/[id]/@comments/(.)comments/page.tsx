import CommentModal from '@/components/modals/comment/CommentsModal'
import { api } from '@/lib/utils/apiUtils'
import { CommentType } from '@/types/comment'
import { ApiResponse } from '@/types/mypage-shorts'

interface CommentModalPageProps {
  params: Promise<{ id: number }>
}
export default async function CommentsModalPage({ params }: CommentModalPageProps) {
  const { id } = await params
  const response = await api.get<ApiResponse<CommentType[]>>(`/api/v1/shorts/${id}/comments`, {
    cache: 'no-store',
  })
  return <CommentModal comment={response.data} />
}
