import { api } from '@/lib/utils/apiUtils'
import { param } from 'framer-motion/client'
import { ParkingMeter } from 'lucide-react'

// Presigned URL 요청 파라미터
export interface PresignedUrlRequest {
  title: string
  description: string
  categoryId: number
  keywords: string[]
  fileName: string
  fileSize: number
  contentType: string
  durationSec: number
}

// Presigned URL 응답 타입
export interface PresignedUrlResponse {
  shortsId: string
  videoPresignedUrl: string
  thumbnailPresignedUrl: string
  uploadId: string
  expiresIn: number
  maxFileSize: number
}

// 업로드 완료 확정 요청
export interface ConfirmUploadRequest {
  uploadId: string
  videoUrl: string
  thumbnailurl: string
}

// 업로드 완료 확정 응답
export interface ConfirmUploadResponse {
  shortsId: string
  uploadId: string
  videoUrl: string
  thumbnailUrl: string
}

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
    console.log('s3업로드', res)

    if (!res.ok) {
      throw new Error('S3 업로드 실패')
    }
  },

  /**
   * 3단계: 업로드 완료 확정
   */
  async confirmUpload(params: ConfirmUploadRequest): Promise<ConfirmUploadResponse> {
    const { uploadId, videoUrl, thumbnailurl } = params

    console.log('파람스', params)
    const response = await api.post<{
      data: ConfirmUploadResponse
    }>(`/api/v1/shorts/${uploadId}/upload-complete`, {
      uploadId,
      videoUrl,
      thumbnailurl,
    })

    return response.data
  },

  /**
   * 전체 업로드 플로우 (서버 전용)
   */
  async uploadShorts(
    params: PresignedUrlRequest,
    videoFile: File,
    thumbnailFile?: File | null, // optional + nullable
  ): Promise<ConfirmUploadResponse> {
    // 1️⃣ Presigned URL 발급
    const presigned = await this.getPresignedUrl(params)

    // 2️⃣ S3 업로드
    await this.uploadToS3(presigned.videoPresignedUrl, videoFile)

    if (thumbnailFile) {
      await this.uploadToS3(presigned.thumbnailPresignedUrl, thumbnailFile)
    }

    // 3️⃣ 업로드 확정
    return this.confirmUpload({
      uploadId: presigned.uploadId,
      videoUrl: presigned.videoPresignedUrl,
      thumbnailurl: presigned.thumbnailPresignedUrl,
    })
  },
}
