import React from 'react'
import ShortFormCarousel from '@/features/home/ShortFormCarousel/ShortFormCarousel'
import PlaylistSection from '@/features/home/PlaylistSection'
import CategoryLectureSection from '@/features/home/lecture/CategoryLectureSection'
import { lectures, playlistGroup } from '@/dummy/data'

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
