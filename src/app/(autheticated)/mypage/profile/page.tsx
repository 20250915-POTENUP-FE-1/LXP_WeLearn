'use client'

import { User } from 'lucide-react'
import { useState } from 'react'

export default function MyPageProfile() {
  const [isEditingNickname, setIsEditingNickname] = useState(false)
  const [isEditingPassword, setIsEditingPassword] = useState(false)
  const [nickname, setNickname] = useState('프론트엔젤')
  const [tempNickname, setTempNickname] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleNicknameEdit = () => {
    setTempNickname(nickname)
    setIsEditingNickname(true)
  }

  const handleNicknameCancel = () => {
    setTempNickname('')
    setIsEditingNickname(false)
  }

  const handleNicknameSave = () => {
    if (tempNickname.trim()) {
      setNickname(tempNickname)
    }
    setIsEditingNickname(false)
  }

  const handlePasswordEdit = () => {
    setIsEditingPassword(true)
  }

  const handlePasswordCancel = () => {
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
    setIsEditingPassword(false)
  }

  const handlePasswordSave = () => {
    // 비밀번호 저장 로직
    setIsEditingPassword(false)
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
  }

  return (
    // <div className="relative right-1/2 left-1/2 mr-[-50vw] ml-[-50vw] min-h-screen w-screen">
    <div className="w-full">
      {/* 여기부터는 진짜 화면 전체 기준 레이아웃 */}
      <div className="px-6 py-12">
        {/* 프로필 이미지 영역 */}
        <div className="mb-12 flex flex-col items-center">
          <div className="mb-4 flex h-32 w-32 items-center justify-center rounded-full bg-gray-200">
            <User className="h-16 w-16 text-gray-500" />
          </div>
          <span className="text-sm text-gray-500">profileUrl</span>
        </div>

        {/* 프로필 정보 폼 */}
        <div className="space-y-6">
          {/* 사용자 이름 */}
          <div className="flex items-center border-b border-gray-200 py-4">
            <label className="w-40 text-sm font-medium text-gray-700">userName</label>
            <div className="flex-1 text-sm text-gray-900">김코딩</div>
          </div>

          {/* 닉네임 */}
          <div className="border-b border-gray-200 py-4">
            {!isEditingNickname ? (
              <div className="flex items-center">
                <label className="w-40 text-sm font-medium text-gray-700">nickName</label>
                <div className="flex-1 text-sm text-gray-900">{nickname}</div>
                <button
                  onClick={handleNicknameEdit}
                  className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800"
                >
                  변경
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="rounded-lg bg-gray-50 p-6">
                  <label className="mb-3 block text-sm font-medium text-gray-700">nickName</label>

                  <div className="mb-4">
                    <label className="mb-2 block text-xs text-gray-600">input</label>
                    <input
                      type="text"
                      value={tempNickname}
                      onChange={(e) => setTempNickname(e.target.value)}
                      placeholder="닉네임을 입력하세요."
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all focus:ring-2 focus:ring-black focus:outline-none"
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={handleNicknameSave}
                      className="rounded-lg bg-black px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800"
                    >
                      변경
                    </button>
                    <button
                      onClick={handleNicknameCancel}
                      className="rounded-lg bg-gray-200 px-6 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-300"
                    >
                      취소
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 이메일 */}
          <div className="flex items-center border-b border-gray-200 py-4">
            <label className="w-40 text-sm font-medium text-gray-700">userEmail</label>
            <div className="flex-1 text-sm text-gray-500">user@shortudy.com</div>
          </div>

          {/* 비밀번호 */}
          <div className="border-b border-gray-200 py-4">
            {!isEditingPassword ? (
              <div className="flex items-center">
                <label className="w-40 text-sm font-medium text-gray-700">passWord</label>
                <div className="flex-1 text-sm text-gray-900">***********</div>
                <button
                  onClick={handlePasswordEdit}
                  className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800"
                >
                  변경
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="rounded-lg bg-gray-50 p-6">
                  <label className="mb-3 block text-sm font-medium text-gray-700">비밀번호</label>

                  <div className="mb-4 space-y-4">
                    <div>
                      <label className="mb-2 block text-xs text-gray-600">input</label>
                      <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="현재 비밀번호를 입력하세요."
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all focus:ring-2 focus:ring-black focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-xs text-gray-600">input</label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="새 비밀번호를 입력하세요."
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all focus:ring-2 focus:ring-black focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-xs text-gray-600">input</label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="새 비밀번호를 한 번 더 입력하세요."
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all focus:ring-2 focus:ring-black focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={handlePasswordSave}
                      className="rounded-lg bg-black px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800"
                    >
                      변경
                    </button>
                    <button
                      onClick={handlePasswordCancel}
                      className="rounded-lg bg-gray-200 px-6 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-300"
                    >
                      취소
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 계정 생성일 */}
          <div className="flex items-center border-b border-gray-200 py-4">
            <label className="w-40 text-sm font-medium text-gray-700">AccountCreated</label>
            <div className="flex-1 text-sm text-gray-900">2025.12.22</div>
          </div>

          {/* 회원탈퇴 */}
          <div className="pt-8">
            <button className="text-sm text-gray-500 underline transition-colors hover:text-gray-700">
              회원탈퇴
            </button>
          </div>

          {/* 하단 버튼 */}
          <div className="flex gap-4 pt-8">
            <button className="flex-1 rounded-lg bg-gray-200 px-6 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-300">
              취소
            </button>
            <button className="flex-1 rounded-lg bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800">
              저장
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
