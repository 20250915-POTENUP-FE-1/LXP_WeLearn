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
   * ❗ S3는 api util 사용 ❌ (Authorization 붙으면 안 됨)
   */
  async uploadToS3(presignedUrl: string, file: File | Blob): Promise<void> {
    const res = await fetch(presignedUrl, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': file.type,
      },
    })
    if (!res.ok) {
      throw new Error('S3 업로드 실패')
    }
  },

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
