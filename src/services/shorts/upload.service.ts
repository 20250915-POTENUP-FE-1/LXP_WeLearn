import { api } from '@/lib/utils/apiUtils'
import {
  ConfirmUploadRequest,
  ConfirmUploadResponse,
  PresignedUrlRequest,
  PresignedUrlResponse,
} from '@/types/shorts/shorts'

// Presigned URL 응답 타입

export const shortsUploadApi = {
  /**
   * 1단계: Presigned URL 발급
   */
  async getPresignedUrl(params: PresignedUrlRequest): Promise<PresignedUrlResponse> {
    const payload = { body: params }
    const response = await api.post<{
      data: PresignedUrlResponse
    }>('/api/v1/shorts/upload', payload)
    return response.data
  },

  /**
   * 2단계: S3 업로드 (Presigned URL)
   * 클라이언트에서 직접 S3로 업로드 처리
   */

  /**
   * 3단계: 업로드 완료 확정
   */
  async confirmUpload(params: ConfirmUploadRequest): Promise<ConfirmUploadResponse> {
    // const { uploadId, videoUrl, thumbnailUrl, shortId } = params
    const { shortId, uploadId, videoUrl, thumbnailUrl } = params
    const payload = {
      uploadId,
      videoUrl,
      thumbnailUrl,
    }

    const response = await api.post<{
      data: ConfirmUploadResponse
    }>(`/api/v1/shorts/${shortId}/upload-complete`, payload)

    return response
  },
}
