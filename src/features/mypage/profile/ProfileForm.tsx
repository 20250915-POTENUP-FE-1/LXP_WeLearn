'use client'

import { User } from 'lucide-react'
import { toast } from 'react-toastify'
import { useProfile } from '@/hook/mypage/useProfile'

export default function ProfileForm() {
  const {
    isEditingNickname,
    nickname,
    tempNickname,
    setTempNickname,
    handleNicknameEdit,
    handleNicknameCancel,
    handleNicknameSave,
    isEditingPassword,
    currentPassword,
    newPassword,
    confirmPassword,
    setCurrentPassword,
    setNewPassword,
    setConfirmPassword,
    handlePasswordEdit,
    handlePasswordCancel,
    handlePasswordSave,
  } = useProfile('숏터')

  return (
    <div className="w-full">
      <div className="px-6 py-12">
        {/* 프로필 이미지 영역 */}
        <div className="mb-12 flex flex-col items-center">
          <div className="mb-4 flex h-32 w-32 items-center justify-center rounded-full bg-gray-200">
            <User className="h-16 w-16 text-gray-500" />
          </div>
          <span className="text-sm text-gray-500">프로필 사진 변경</span>
        </div>

        {/* 프로필 정보 폼 */}
        <div className="space-y-6">
          {/* 닉네임 */}
          <div className="flex min-h-[52px] items-center border-b border-gray-200 py-4">
            <label className="w-40 text-sm font-medium text-gray-700">닉네임</label>
            {!isEditingNickname ? (
              <>
                <div className="flex h-9 flex-1 items-center text-sm text-gray-900">{nickname}</div>
                <button
                  onClick={handleNicknameEdit}
                  className="h-9 rounded-lg bg-black px-4 text-sm font-medium text-white transition-colors hover:bg-gray-800"
                >
                  변경
                </button>
              </>
            ) : (
              <>
                <input
                  type="text"
                  value={tempNickname}
                  onChange={(e) => setTempNickname(e.target.value)}
                  placeholder="닉네임을 입력하세요."
                  className="h-9 flex-1 rounded-lg border border-gray-300 px-4 text-sm transition-all focus:ring-2 focus:ring-black focus:outline-none"
                />
                <div className="ml-3 flex gap-2">
                  <button
                    onClick={handleNicknameSave}
                    className="h-9 rounded-lg bg-black px-4 text-sm font-medium text-white transition-colors hover:bg-gray-800"
                  >
                    변경
                  </button>
                  <button
                    onClick={handleNicknameCancel}
                    className="h-9 rounded-lg bg-gray-200 px-4 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-300"
                  >
                    취소
                  </button>
                </div>
              </>
            )}
          </div>

          {/* 이메일 */}
          <div className="flex items-center border-b border-gray-200 py-4">
            <label className="w-40 text-sm font-medium text-gray-700">Email</label>
            <div className="flex-1 text-sm text-gray-500">user@shortudy.com</div>
          </div>

          {/* 비밀번호 */}
          <div className="border-b border-gray-200 py-4">
            {!isEditingPassword ? (
              <div className="flex items-center">
                <label className="w-40 text-sm font-medium text-gray-700">비밀번호</label>
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
                      <label className="mb-2 block text-xs text-gray-600">현재 비밀번호</label>
                      <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="현재 비밀번호를 입력하세요."
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all focus:ring-2 focus:ring-black focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-xs text-gray-600">새 비밀번호</label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="새 비밀번호를 입력하세요."
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all focus:ring-2 focus:ring-black focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-xs text-gray-600">새 비밀번호 확인</label>
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
            <label className="w-40 text-sm font-medium text-gray-700">가입일</label>
            <div className="flex-1 text-sm text-gray-900">2025.12.22</div>
          </div>

          {/* 회원탈퇴 */}
          <div className="pt-8">
            <button
              onClick={() => toast.info('해당 기능은 준비 중입니다.')}
              className="text-sm text-gray-500 underline transition-colors hover:text-gray-700"
            >
              회원탈퇴
            </button>
          </div>

          {/* 하단 버튼 */}
          <div className="flex gap-4 pt-8">
            <button
              onClick={() => toast.info('해당 기능은 준비 중입니다.')}
              className="flex-1 rounded-lg bg-gray-200 px-6 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-300"
            >
              취소
            </button>
            <button
              onClick={() => toast.info('해당 기능은 준비 중입니다.')}
              className="flex-1 rounded-lg bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800"
            >
              저장
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
