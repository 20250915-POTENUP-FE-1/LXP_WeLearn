'use client'

import { useState } from 'react'
import { PasswordUpdateRequest } from '@/types/user/user';
import { toast } from 'react-toastify';
import { userApi } from '@/services/mypage/user.service';
import { clientApi } from '@/lib/utils/clientApiUtils';
import { ApiResponse } from '@/types/api/api';

export default function PasswordSection() {
  const [isEditingPassword, setIsEditingPassword] = useState(false)
  const [passwords, setPasswords] = useState<PasswordUpdateRequest>({
    currentPassword: '',
    newPassword: '',
  })

  const handlePasswordEdit = () => setIsEditingPassword(true)
  const handlePasswordCancel = () => {
    setIsEditingPassword(false)
    setPasswords({
      currentPassword:'',
      newPassword:''
    })
  }
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswords((prev) => ({ ...prev, [name]: value }))
  }
  const handlePasswordReset = async () => {
    const { currentPassword, newPassword } = passwords

    if (!currentPassword || !newPassword) {
      return toast.warn('비밀번호를 모두 입력해주세요.')
    }
    if (currentPassword === newPassword) {
      return toast.warn('현재 비밀번호와 새 비밀번호가 동일합니다.')
    }

    try {
      const res = await clientApi.patch<ApiResponse>('/api/v1/users/me/password',{ currentPassword, newPassword })

      if (res.success && res.code === "Success") {
        toast.success('비밀번호가 성공적으로 변경되었습니다.')
        handlePasswordCancel()
      } else {
        toast.error(res.message || '비밀번호 변경에 실패했습니다.')
      }
    } catch (error) {
      console.error(error)
      toast.error('오류가 발생했습니다. 현재 비밀번호를 다시 확인해주세요.')
    }
  }
  return (
    <div className="border-b border-gray-200 py-4">
      {!isEditingPassword ? (
        <div className="flex items-center">
          <label className="w-40 text-sm font-medium text-gray-700">비밀번호</label>
          <div className="flex-1 text-sm text-gray-900"></div>
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
                  name="currentPassword"
                  value={passwords.currentPassword}
                  onChange={handleInputChange}
                  type="password"
                  placeholder="현재 비밀번호를 입력하세요."
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all focus:ring-2 focus:ring-black focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-2 block text-xs text-gray-600">새 비밀번호</label>
                <input
                  name="newPassword"
                  value={passwords.newPassword}
                  onChange={handleInputChange}
                  type="password"
                  placeholder="새 비밀번호를 입력하세요."
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all focus:ring-2 focus:ring-black focus:outline-none"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handlePasswordCancel}
                className="rounded-lg bg-gray-200 px-6 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-300"
              >
                취소
              </button>
              <button
                onClick={handlePasswordReset}
                className="rounded-lg bg-black px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-300">
                저장
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}