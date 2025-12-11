'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import type { components } from '@/types/api-schema'

type ShortsItem = components['schemas']['ShortsResponse']

const PREVIEW_DURATION = 2500 // ms, 2.5초 정도만 재생

export default function ShortPreviewCard({ item }: { item: ShortsItem }) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const timeoutRef = useRef<number | null>(null)

  const handleMouseEnter = () => {
    const video = videoRef.current
    if (!video || !item.videoUrl) return

    // 항상 처음부터 짧게 재생
    video.currentTime = 0
    video.muted = true

    const playPromise = video.play()
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // 자동재생 막힌 경우 무시
      })
    }

    // 이전 타이머 정리
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current)
    }

    // PREVIEW_DURATION 이후 자동 정지
    timeoutRef.current = window.setTimeout(() => {
      video.pause()
    }, PREVIEW_DURATION)
  }

  const handleMouseLeave = () => {
    const video = videoRef.current
    if (!video) return

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }

    video.pause()
    video.currentTime = 0
  }

  // 비디오 로드 시 첫 장면이 썸네일처럼 보이도록
  const handleLoadedData = () => {
    const video = videoRef.current
    if (!video) return

    // 재생 안 한 상태에서 첫 프레임 강제 렌더
    if (video.currentTime === 0) {
      try {
        video.currentTime = 0.01
        video.pause()
      } catch {
        // 일부 브라우저에서 시킹 실패할 수 있어서 그냥 무시
      }
    }
  }

  // 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <Link
      href={`/shorts/${item.shortsId}`}
      className="group block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <article className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white/90 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg">
        <div className="relative aspect-[9/16] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-gray-200 to-gray-300">
          {/* 비디오가 썸네일 + 프리뷰를 둘 다 담당 */}
          {item.videoUrl ? (
            <video
              ref={videoRef}
              src={item.videoUrl}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              playsInline
              muted
              preload="metadata"
              poster={item.thumbnailUrl ?? undefined} // 로딩 전에 보일 썸네일
              onLoadedData={handleLoadedData}
            />
          ) : item.thumbnailUrl ? (
            // 비디오 없을 때만 이미지Fallback
            <img
              src={item.thumbnailUrl}
              alt={item.title}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 h-full w-full bg-gradient-to-br from-gray-200 to-gray-300" />
          )}

          {/* 상단 배지 */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex justify-between p-2">
            {item.category?.name && (
              <span className="rounded-full bg-black/55 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur">
                {item.category.name}
              </span>
            )}
            <span className="rounded-full bg-black/45 px-2 py-0.5 text-[10px] text-gray-100 backdrop-blur">
              숏강의
            </span>
          </div>

          {/* 하단 그라데이션 + 텍스트 */}
          <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/85 via-black/50 to-transparent p-3">
            <p className="mb-1 line-clamp-2 text-xs font-semibold text-white">{item.title}</p>
            <p className="mb-2 line-clamp-2 text-[11px] text-gray-200">{item.description}</p>
            <div className="flex items-center justify-between text-[11px] text-gray-300">
              <span className="font-medium">{item.uploader?.nickname ?? '익명'}</span>
              <span className="rounded-full border border-white/25 px-2 py-0.5 text-[10px] text-gray-100">
                #{item.category?.name ?? '스터디'}
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
