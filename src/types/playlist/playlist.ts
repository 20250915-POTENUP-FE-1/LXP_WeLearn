export type Visibility = 'PUBLIC' | 'PRIVATE'

/* 플레이 리스트 생성 / 수정 요청시 Request
 * /api/v1/playlists // /api/v1/playlists/{playlistId}
 */

export interface PlaylistRequest {
  title: string
  description: string
  thumbnailUrl: string
  visibility: Visibility
}
