import React from 'react'
import { PlaylistItem } from '@/features/home/types/PlayListItem'
import PlaylistButton from '@/features/home/play-list-section/PlaylistButton'

export default async function PlaylistSection({ items }: { items: PlaylistItem[] }) {
  return (
    <section className="mb-12">
      <h2 className="mb-6 text-2xl font-extrabold text-gray-900 uppercase">Knowledge Blocks</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <PlaylistButton key={item.id}>
            <div className="relative mb-3 aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-gray-200 to-gray-300 opacity-100 transition duration-300 group-hover:opacity-80">
              {item.thumbnail ? (
                <img src={item.thumbnail} alt={item.title} className="h-full w-full object-cover" />
              ) : (
                <div className="h-full w-full" />
              )}
              <div className="absolute right-3 bottom-3 flex items-center gap-1 rounded-md bg-black/70 px-2 py-1">
                <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm0 2v12h16V6H4zm5 2l6 4-6 4V8z" />
                </svg>
                <span className="text-xs font-medium text-white">{item.videoCount}개</span>
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-900">{item.title}</h3>
          </PlaylistButton>
        ))}
      </div>
    </section>
  )
}
