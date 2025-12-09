'use client'

import React from 'react'
import { toast } from 'react-toastify'

export default function PlaylistButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      className="group cursor-pointer"
      onClick={() =>
        toast.info('현재 개발 진행 중 입니다.', {
          toastId: 'playlist-development-toast',
        })
      }
    >
      {children}
    </button>
  )
}
