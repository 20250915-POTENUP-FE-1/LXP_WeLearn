/**
 * 비디오 파일에서 duration(초) 추출
 * - <video> + onloadedmetadata 기반
 * - Object URL은 항상 revoke하여 누수 방지
 */
export function extractVideoDuration(file: File): Promise<number> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const video = document.createElement('video')

    const cleanup = () => {
      URL.revokeObjectURL(url)
      video.onloadedmetadata = null
      video.onerror = null
    }

    video.preload = 'metadata'
    video.src = url

    video.onloadedmetadata = () => {
      const duration = Number.isFinite(video.duration) ? Math.round(video.duration) : 0
      cleanup()
      resolve(duration)
    }

    video.onerror = () => {
      cleanup()
      reject(new Error('비디오 메타데이터 호출에 실패했습니다.'))
    }
  })
}
