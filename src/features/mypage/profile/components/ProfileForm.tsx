'use client'

import { useEffect, useState } from 'react'
import { clientApi } from '@/lib/utils/clientApiUtils'
import { UserInfo } from '@/types/user/user'
import { ApiResponse } from '@/types/api/api'
import ProfileImageSection from './ProfileImageSection'
import ProfileInfoSection from '@/features/mypage/profile/components/ProfileInfoSection'
import PasswordSection from './PasswordSection'
import DeleteAccountSection from '@/features/mypage/profile/components/DeleteAccountSection'

export default function ProfileForm() {
  const [user, setUser] = useState<UserInfo | null>(null)

  useEffect(() => {
    const getUserData = async () => {
      try {
        const res: ApiResponse<UserInfo> = await clientApi.get('/api/v1/users/me')
        setUser(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getUserData()
  }, [])

  return (
    <div className="w-full max-w-2xl rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
      <div className="py-10">
        <ProfileImageSection initialProfileUrl={user?.profileUrl} />
        <ProfileInfoSection key={`${user?.nickName}-${user?.email}`} user={user} />
        <PasswordSection />
        <DeleteAccountSection />
      </div>
    </div>
  )
}
