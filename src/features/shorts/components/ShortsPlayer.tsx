interface ShortsPlayerProps {
  videoUrl: string
  thumbnailUrl?: string
}

function ShortsPlayer({ videoUrl, thumbnailUrl }: ShortsPlayerProps) {
  return (
    <video
      aria-label="shorts video player"
      className="h-full w-full object-cover"
      controls
      poster={thumbnailUrl}
      src={videoUrl}
    />
  )
}

export default ShortsPlayer
