'use client'

import { useState, useCallback } from 'react'

export function useProfile(initialNickname: string = '') {
  // 닉네임 관련 상태
  const [isEditingNickname, setIsEditingNickname] = useState(false)
  const [nickname, setNickname] = useState(initialNickname)
  const [tempNickname, setTempNickname] = useState('')

  // 비밀번호 관련 상태
  const [isEditingPassword, setIsEditingPassword] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  // 닉네임 핸들러
  const handleNicknameEdit = useCallback(() => {
    setTempNickname(nickname)
    setIsEditingNickname(true)
  }, [nickname])

  const handleNicknameCancel = useCallback(() => {
    setTempNickname('')
    setIsEditingNickname(false)
  }, [])

  const handleNicknameSave = useCallback(() => {
    if (tempNickname.trim()) {
      setNickname(tempNickname)
    }
    setIsEditingNickname(false)
  }, [tempNickname])

  // 비밀번호 핸들러
  const handlePasswordEdit = useCallback(() => {
    setIsEditingPassword(true)
  }, [])

  const handlePasswordCancel = useCallback(() => {
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
    setIsEditingPassword(false)
  }, [])

  const handlePasswordSave = useCallback(() => {
    // 비밀번호 저장 로직
    setIsEditingPassword(false)
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
  }, [])

  return {
    // 닉네임
    isEditingNickname,
    nickname,
    tempNickname,
    setTempNickname,
    handleNicknameEdit,
    handleNicknameCancel,
    handleNicknameSave,

    // 비밀번호
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
  }
}
