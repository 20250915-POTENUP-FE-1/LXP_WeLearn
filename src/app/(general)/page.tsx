import React from 'react'

import PlaylistSection from '@/features/home/playlist/PlaylistSection'
import { categoryShortsList, playlistGroup } from '@/dummy/data'
import { getShortPopular } from '@/services/shorts/getShortPopular'
import CategoryShortsSection from '@/features/home/categories/CategoryShortsSection'
import ShortsCarousel from '@/features/home/ShortsCarousel/ShortsCarousel'

export default async function Page() {
  const popularShorts = await getShortPopular()
  return (
    <div className="min-h-screen bg-white">
      <ShortsCarousel data={popularShorts?.data?.content} />

      <PlaylistSection items={playlistGroup} />

      <CategoryShortsSection shorts={categoryShortsList} />
    </div>
  )
}
