'use client'

import { clientApi } from '@/lib/utils/clientApiUtils';

export default function DeleteAccountButton() {
  const handleDeleteAccount = async (e?: React.MouseEvent<HTMLButtonElement>) => {
    const res = await clientApi.delete('/api/v1/users/me')
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