import React from 'react'
import ShortFormCarousel from '@/features/home/ShortFormCarousel/ShortFormCarousel'
import CategoryLectureSection from '@/features/home/lecture/CategoryLectureSection'
import { lectures, playlistGroup } from '@/dummy/data'
import PlaylistSection from '@/features/home/play-list-section/PlaylistSection'

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <ShortFormCarousel />

      <PlaylistSection items={playlistGroup} />

      <CategoryLectureSection lectures={lectures} />
    </div>
  )
}

export default HomePage
