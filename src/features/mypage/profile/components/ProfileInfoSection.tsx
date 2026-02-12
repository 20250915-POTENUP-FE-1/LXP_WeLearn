'use client'

import { useState } from 'react'
import { clientApi } from '@/lib/utils/clientApiUtils'
import { useAuth } from '@/shared/store/auth/auth.store'
import { ApiResponse } from '@/types/api/api'
import { toast } from 'react-toastify'

interface ProfileInfoSectionProps {
  user: {
    nickName: string
    email: string
  } | null
}
type UpdatedProfile = {
  nickName?: string
  email?: string
}
export default function ProfileInfoSection({ user }: ProfileInfoSectionProps) {
  const auth = useAuth((state) => state.auth)
  const setAuthUser = useAuth((state) => state.setUser)
  const [nickName, setNickName] = useState(user?.nickName || '')
  const [email, setEmail] = useState(user?.email || '')

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickName(e.target.value)
  }
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }
  const handleInputClick = async (e?: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const updateData: UpdatedProfile = {}
      if (nickName !== user?.nickName) updateData.nickName = nickName
      if (email !== user?.email) updateData.email = email
      if (Object.entries(updateData).length === 0) {
        return toast.info('변경 사항이 없습니다.')
      }
      const res = await clientApi.patch<ApiResponse>('/api/v1/users/me', updateData)
      if (res.success && res.code === 'Success' && auth) {
        toast.success('변경되었습니다.')
        setAuthUser({
          ...auth,
          nickName: nickName,
          email: email,
        })
      }
    } catch (e) {}
  }

  return (
    <>
      <div className="flex min-h-10 items-center justify-center border-b border-gray-200 py-4">
        <label className="gap w-15 text-sm font-medium text-gray-700">닉네임</label>
        <input
          value={nickName}
          type="text"
          className="h-8 w-full flex-1 rounded-lg px-3 text-sm transition-all md:w-lg"
          onChange={handleNicknameChange}
        />
        <button
          onClick={handleInputClick}
          className="ml-4 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800"
        >
          저장
        </button>
      </div>
      <div className="flex min-h-10 items-center justify-center border-b border-gray-200 py-4">
        <label className="w-15 text-sm font-medium text-gray-700">이메일</label>
        <input
          value={email}
          type="email"
          className="h-8 w-full flex-1 rounded-lg px-3 text-sm transition-all md:w-lg"
          onChange={handleEmailChange}
        />
        <button
          onClick={handleInputClick}
          className="ml-4 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800"
        >
          저장
        </button>
      </div>
    </>
  )
}
