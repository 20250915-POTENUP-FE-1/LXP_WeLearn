'use client'

import { useState } from 'react'
import { PasswordUpdateRequest } from '@/types/user/user';
import { toast } from 'react-toastify';
import { clientApi } from '@/lib/utils/clientApiUtils';
import { ApiResponse } from '@/types/api/api';
import { useRouter } from 'next/navigation';
import { validatePasswordChange } from '@/features/mypage/profile/schemas/password.schema';

export default function PasswordSection() {
  const [isEditingPassword, setIsEditingPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [passwords, setPasswords] = useState<PasswordUpdateRequest>({
    currentPassword: '',
    newPassword: '',
    newPasswordConfirm: ''
  })
  const router = useRouter()

  const handlePasswordEdit = () => setIsEditingPassword(true)
  const handlePasswordCancel = () => {
    setIsEditingPassword(false)
    setPasswords({
      currentPassword:'',
      newPassword:'',
      newPasswordConfirm:'',
    })
  }
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswords((prev) => ({ ...prev, [name]: value }))
  }
  const handlePasswordReset = async () => {
    const { isValid, errors } = validatePasswordChange(passwords);
    if(!isValid) return toast.error(Object.values(errors)[0]);

    try {
      setIsLoading(true)
      const { newPasswordConfirm, ...updatedPassword } = passwords
      const res = await clientApi.patch<ApiResponse>('/api/v1/users/me/password',updatedPassword)
      if (res.success && res.code === "Success") {
        toast.success('비밀번호가 성공적으로 변경되었습니다.')
        handlePasswordCancel()
      }
    } catch (error:any) {
      console.log(error)

      switch (error.code) {
        case 'USER_401':
          toast.error(error.message || '비밀번호를 확인해주세요.')
          break;
        case 'USER_400':
          toast.error('로그인 세션이 만료되었습니다. 다시 로그인해주세요.')
          router.push('/login')
          break;
        case 'COMMON_400':
          toast.error(error.message || '입력값이 올바르지 않습니다.')
          break;
        default:
          toast.error(error.message || '비밀번호 변경에 실패했습니다.')
          break;
      }
    } finally {
      setIsLoading(false)
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
              <div>
                <label className="mb-2 block text-xs text-gray-600">새 비밀번호 확인</label>
                <input
                  name="newPasswordConfirm"
                  value={passwords.newPasswordConfirm}
                  onChange={handleInputChange}
                  type="password"
                  placeholder="한번 더 입력하세요."
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all focus:ring-2 focus:ring-black focus:outline-none"
                />
                {passwords.newPasswordConfirm && passwords.newPassword !== passwords.newPasswordConfirm && (
                  <p className="mt-1 text-xs text-red-500">비밀번호가 일치하지 않습니다.</p>
                )}
                {passwords.newPasswordConfirm && passwords.newPassword === passwords.newPasswordConfirm && (
                  <p className="mt-1 text-xs text-green-600">비밀번호가 일치합니다.</p>
                )}
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handlePasswordCancel}
                className="rounded-lg bg-gray-200 px-6 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-300"
              >
                취소
              </button>
              {isLoading ?
                <button disabled className="rounded-lg bg-gray-200 px-6 py-2 text-sm font-medium text-gray-700">저장 중</button> :
                <button
                onClick={handlePasswordReset}
                className="rounded-lg bg-black px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-300">
                저장
              </button> }
            </div>
          </div>
        </div>
      )}
    </div>
  )
}