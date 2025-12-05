import React from 'react'

function ShortsPlayer() {
  return (
    <video
      aria-label="숏폼 학습 영상"
      className="h-full w-full object-cover"
      controls
      src="/videos/sample.mp4"
    />
  )
}

export default ShortsPlayer
