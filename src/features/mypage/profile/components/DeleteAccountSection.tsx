'use client'

import { clientApi } from '@/lib/utils/clientApiUtils';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/shared/store/auth/auth.store';

export default function DeleteAccountSection() {
  const setAuthUser = useAuth((state)=> state.logout)
  const router = useRouter()

  const handleDeleteAccount = async (e?: React.MouseEvent<HTMLButtonElement>) => {
    const res = await clientApi.delete('/api/v1/users/me')

    if(res){
      toast.success('계정 탈퇴되었습니다.')
      setAuthUser()
      router.push('/')
    }
  }

  return (
    <div className="pt-8">
      <button
        onClick={handleDeleteAccount}
        className="text-sm text-gray-500 underline transition-colors hover:text-gray-700"
      >
        회원탈퇴
      </button>
    </div>
  )
}