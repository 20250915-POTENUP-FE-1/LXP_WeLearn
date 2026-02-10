'use client'

import { useEffect, useState } from 'react'
import { clientApi } from '@/lib/utils/clientApiUtils'
import { UserInfo } from '@/types/user/user'
import { ApiResponse } from '@/types/api/api'
import ProfileImageSection from './ProfileImageSection'
import ProfileInfoSection from '@/features/mypage/profile/ProfileInfoSection';
import PasswordSection from './PasswordSection'
import DeleteAccountButton from '@/features/mypage/profile/DeleteAccountButton';

export default function ProfileForm() {
  const [user, setUser] = useState<UserInfo | null>(null)

  useEffect(() => {
    const getUserData = async () => {
      try {
        const res: ApiResponse<UserInfo> = await clientApi.get('/api/v1/users/me')
        setUser(res.data)
      } catch (error) { }
    }
    getUserData()
  }, [])

  return (
    <div className="w-full">
      <div className="px-6 py-12">
        <ProfileImageSection initialProfileUrl={user?.profileUrl} />
        <ProfileInfoSection key={`${user?.nickName}-${user?.email}`} user={user}/>
        <PasswordSection />
        <DeleteAccountButton/>
      </div>
    </div>
  )
}