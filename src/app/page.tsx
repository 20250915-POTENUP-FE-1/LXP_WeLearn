import React from 'react'
import ShortFormCarousel from '@/features/home/ShortFormCarousel/ShortFormCarousel'
import PlaylistSection from '@/features/home/PlaylistSection'
import CategoryLectureSection from '@/features/home/lecture/CategoryLectureSection'
import { lectures, playlists, shortFormItems } from '@/dummy/data'

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <ShortFormCarousel items={shortFormItems} />

      <PlaylistSection items={playlists} />

      <CategoryLectureSection lectures={lectures} />
    </div>
  )
}

export default HomePage
