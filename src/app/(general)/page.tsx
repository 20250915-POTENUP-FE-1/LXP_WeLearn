import React from 'react'
import ShortFormCarousel from '@/features/home/ShortFormCarousel/ShortFormCarousel'
import PlaylistSection from '@/features/home/play-list-section/PlaylistSection'
import CategoryLectureSection from '@/features/home/lecture/CategoryLectureSection'
import { lectures, playlistGroup } from '@/dummy/data'
import { getShortPopular } from '@/services/getShortPopular'

export default async function Page() {
  const popularShorts = await getShortPopular()
  console.log(popularShorts)
  return (
    <div className="min-h-screen bg-white">
      <ShortFormCarousel data={popularShorts?.data?.content} />

      <PlaylistSection items={playlistGroup} />

      <CategoryLectureSection lectures={lectures} />
    </div>
  )
}
