'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useParams, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import PlaylistModalHeader from './PlaylistModalHeader'
import Playlist from './Playlist'
import CreatePlaylistBtn from './CreatePlaylistBtn'
import CreatePlaylistForm from './CreatePlaylistForm'
import useIsMobile from '@/hook/useIsMobile'
import { PlaylistBase, PlaylistItem } from '@/types/playlist/playlist'

interface PlaylistModalProps {
  initialPlaylistData: PlaylistBase<PlaylistItem[]>
}

export default function PlaylistModal({ initialPlaylistData }: PlaylistModalProps) {
  const [activeTab, setActiveTab] = useState('save') // 'save' or 'create'
  const pathname = usePathname()
  const params = useParams()
  const isMobile = useIsMobile()
  const [mounted, setMounted] = useState(false)
  const [shortsId, setShortsId] = useState<number>(0)

  useEffect(() => {
    const match = pathname.match(/\/shorts\/([^\/]+)/)
    if (match?.[1]) {
      setShortsId(Number(match[1]))
    }
  }, [pathname])

  useEffect(() => {
    setMounted(true)
  }, [])

  const isOpen = pathname.endsWith('/playlist')

  const handleActiveTab = () => {
    if (activeTab === 'save') {
      setActiveTab('create')
    } else {
      setActiveTab('save')
    }
  }

  return (
    <AnimatePresence mode="wait">
      {isOpen && mounted && (
        <motion.aside
          className={`fixed z-50 flex min-w-lg items-center justify-center ${isMobile ? 'right-0 bottom-0 box-border w-screen' : 'top-27 right-26'}`}
          initial={isMobile ? { y: '100vh' } : { x: '130%' }}
          animate={isMobile ? { y: 0 } : { x: '0%' }}
          exit={isMobile ? { y: '100vh' } : { x: '130%' }}
          transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
        >
          {/* 모달 컨테이너 */}
          <div
            className={`flex flex-col overflow-hidden border bg-white shadow-lg ${
              isMobile
                ? 'absolute right-0 bottom-0 w-screen rounded-t-2xl'
                : 'h-[84vh] max-w-lg min-w-lg rounded-xl'
            } `}
          >
            {/* 저장 리스트 모달 */}
            {activeTab === 'save' && (
              <>
                <PlaylistModalHeader shortsId={shortsId} />
                {/* 플레이리스트 목록 */}
                <Playlist list={initialPlaylistData} shortsId={shortsId} />

                {/* 새 플레이리스트 만들기 버튼 */}
                <CreatePlaylistBtn handleActiveTab={handleActiveTab} />
              </>
            )}

            {/* 플레이리스트 생성 모달 */}
            {activeTab === 'create' && (
              <CreatePlaylistForm handleActiveTab={handleActiveTab} shortsId={shortsId} />
            )}
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
