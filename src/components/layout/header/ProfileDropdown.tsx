'use client'

import {
  User,
  Settings,
  Heart,
  Bookmark,
  Video,
  Palette,
  Bell,
  Keyboard,
  Download,
  Gift,
  HelpCircle,
  Trash2,
  LogOut,
  ChevronRight,
  ExternalLink,
} from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

export default function ProfileDropdown({ isOpen, onClose }) {
  const dropdownRef = useRef(null)

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      ref={dropdownRef}
      className="absolute top-full right-0 z-50 mt-2 w-80 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl"
    >
      {/* 사용자 정보 헤더 */}
      <div className="border-b border-gray-200 px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gray-200">
            <User className="h-6 w-6 text-gray-500" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-sm font-semibold text-black">userName</h3>
            <p className="truncate text-xs text-gray-500">userEmail</p>
          </div>
        </div>
      </div>

      {/* 메뉴 섹션 1 - 내 프로필 */}
      <div className="py-2">
        <button className="group flex w-full items-center gap-3 px-6 py-3 transition-colors hover:bg-gray-50">
          <User className="h-5 w-5 text-gray-600" />
          <span className="flex-1 text-left text-sm font-medium text-gray-700">내 프로필</span>
          <span className="text-xs text-gray-400">⌘1</span>
        </button>
      </div>

      <div className="border-t border-gray-200"></div>

      {/* 메뉴 섹션 2 - 마이페이지 메뉴 */}
      <div className="py-2">
        <button className="group flex w-full items-center gap-3 px-6 py-3 transition-colors hover:bg-gray-50">
          <Heart className="h-5 w-5 text-gray-600" />
          <span className="flex-1 text-left text-sm text-gray-700">좋아요한 숏츠</span>
        </button>

        <button className="group flex w-full items-center gap-3 px-6 py-3 transition-colors hover:bg-gray-50">
          <Bookmark className="h-5 w-5 text-gray-600" />
          <span className="flex-1 text-left text-sm text-gray-700">저장한 숏츠</span>
        </button>

        <button className="group flex w-full items-center gap-3 px-6 py-3 transition-colors hover:bg-gray-50">
          <Video className="h-5 w-5 text-gray-600" />
          <span className="flex-1 text-left text-sm text-gray-700">내가 만든 숏츠</span>
        </button>
      </div>

      <div className="border-t border-gray-200"></div>

      {/* 메뉴 섹션 3 - 설정 */}
      <div className="py-2">
        <button className="group flex w-full items-center gap-3 px-6 py-3 transition-colors hover:bg-gray-50">
          <Palette className="h-5 w-5 text-gray-600" />
          <span className="flex-1 text-left text-sm text-gray-700">Themes</span>
          <span className="text-xs text-gray-400">⌘1</span>
        </button>

        <button className="group flex w-full items-center gap-3 px-6 py-3 transition-colors hover:bg-gray-50">
          <Settings className="h-5 w-5 text-gray-600" />
          <span className="flex-1 text-left text-sm text-gray-700">Settings</span>
          <span className="text-xs text-gray-400">⌘2</span>
        </button>

        <button className="group flex w-full items-center gap-3 px-6 py-3 transition-colors hover:bg-gray-50">
          <Bell className="h-5 w-5 text-gray-600" />
          <span className="flex-1 text-left text-sm text-gray-700">Notification</span>
          <span className="text-xs text-gray-400">⌘3</span>
        </button>

        <button className="group flex w-full items-center gap-3 px-6 py-3 transition-colors hover:bg-gray-50">
          <Keyboard className="h-5 w-5 text-gray-600" />
          <span className="flex-1 text-left text-sm text-gray-700">Hotkeys</span>
          <ChevronRight className="h-4 w-4 text-gray-400" />
        </button>

        <button className="group flex w-full items-center gap-3 px-6 py-3 transition-colors hover:bg-gray-50">
          <Download className="h-5 w-5 text-gray-600" />
          <span className="flex-1 text-left text-sm text-gray-700">Download apps</span>
          <ChevronRight className="h-4 w-4 text-gray-400" />
        </button>

        <button className="group flex w-full items-center gap-3 px-6 py-3 transition-colors hover:bg-gray-50">
          <Gift className="h-5 w-5 text-gray-600" />
          <span className="flex-1 text-left text-sm text-gray-700">Referrals</span>
          <span className="rounded bg-purple-50 px-2 py-0.5 text-xs font-semibold text-purple-600">
            New
          </span>
        </button>

        <button className="group flex w-full items-center gap-3 px-6 py-3 transition-colors hover:bg-gray-50">
          <HelpCircle className="h-5 w-5 text-gray-600" />
          <span className="flex-1 text-left text-sm text-gray-700">Help</span>
          <ExternalLink className="h-4 w-4 text-gray-400" />
        </button>
      </div>

      <div className="border-t border-gray-200"></div>

      {/* 메뉴 섹션 4 - 로그아웃 */}
      <div className="py-2">
        <button className="group flex w-full items-center gap-3 px-6 py-3 transition-colors hover:bg-gray-50">
          <Trash2 className="h-5 w-5 text-gray-600" />
          <span className="flex-1 text-left text-sm text-gray-700">Trash</span>
        </button>

        <button className="group flex w-full items-center gap-3 px-6 py-3 transition-colors hover:bg-red-50">
          <LogOut className="h-5 w-5 text-red-500" />
          <span className="flex-1 text-left text-sm font-medium text-red-500">Log out</span>
        </button>
      </div>
    </div>
  )
}

// 사용 예시를 위한 헤더 컴포넌트
export function HeaderWithDropdown() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  return (
    <header className="border-b border-gray-200 px-6 py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <h1 className="text-2xl font-bold text-black">ShorTudy</h1>

        <div className="mx-8 max-w-2xl flex-1">
          <input
            type="text"
            placeholder="searchBar"
            className="w-full rounded-full bg-gray-100 px-4 py-2 transition-all focus:ring-2 focus:ring-black focus:outline-none"
          />
        </div>

        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 transition-colors hover:bg-gray-300"
          >
            <User className="h-5 w-5 text-gray-600" />
          </button>

          <ProfileDropdown isOpen={isDropdownOpen} onClose={() => setIsDropdownOpen(false)} />
        </div>
      </div>
    </header>
  )
}
