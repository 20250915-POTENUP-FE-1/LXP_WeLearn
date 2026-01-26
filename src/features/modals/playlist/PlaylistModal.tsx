'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useParams, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import PlaylistModalHeader from './PlaylistModalHeader'
import Playlist from './Playlist'
import CreatePlaylistBtn from './CreatePlaylistBtn'
import CreatePlaylistForm from './CreatePlaylistForm'
import useIsMobile from '@/hook/useIsMobile'

export default function PlaylistModal() {
  const [activeTab, setActiveTab] = useState('save') // 'save' or 'create'
  const pathname = usePathname()
  const params = useParams()
  const isMobile = useIsMobile()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])
  const id = params.id as string

  const isOpen = pathname.endsWith('/playlist')

  // 샘플 플레이리스트 데이터
  const existingPlaylists = [
    { id: 1, title: 'welcome JavaScript', count: 5 },
    { id: 2, title: 'python으로 주식 투자 자동화 모음', count: 5 },
  ]

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
                <PlaylistModalHeader id={id} />
                {/* 플레이리스트 목록 */}
                <Playlist list={existingPlaylists} />

                {/* 새 플레이리스트 만들기 버튼 */}
                <CreatePlaylistBtn handleActiveTab={handleActiveTab} />
              </>
            )}

            {/* 플레이리스트 생성 모달 */}
            {activeTab === 'create' && (
              <CreatePlaylistForm handleActiveTab={handleActiveTab} id={id} />
            )}
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
