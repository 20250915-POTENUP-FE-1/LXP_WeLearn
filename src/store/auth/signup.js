import { createAsyncThunk } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../lib/firebase/config';
import { addUserProfile } from '../../services/auth/addUserService.js';
import { getUserProfile } from '../../services/auth/getUserService.js';

/**
 *
 * @typedef {Object} UpsertPayload
 * @property {string} userName
 * @property {string} email
 * @property {string} password
 *
 */
export const signup = createAsyncThunk('auth/signup', async (payload, { rejectWithValue }) => {
  try {
    // - 이메일, 비밀번호로 회원가입 요청 (Firebase Authentication에 저장, 성공시 인증된 사용자 객체 반환)
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      payload.email,
      payload.password,
    );
    const user = userCredential.user;
    // - 사용자 프로필 정보 저장 요청 (Firebase Firestore에 저장)
    await addUserProfile(user.uid, {
      email: payload.email,
      userName: payload.userName || '',
    });
    // - 사용자 프로필 조회 요청 (성공시 사용자 프로필 객체 반환)
    const userProfile = await getUserProfile(user.uid);

    // - userProfile 객체를 상태로 저장시키기 위해 반환 (fulfilled 상태일때 사용될 데이터)
    return {
      user: {
        uid: user.uid,
        email: user.email,
        role: userProfile.role,
        userName: userProfile.userName ?? '',
      },
    };
  } catch (error) {
    let errorMessage = '회원가입 중 오류가 발생했습니다.';
    switch (error.code) {
      case 'auth/invalid-email':
        errorMessage = '올바른 이메일 형식이 아닙니다.';
        break;
      case 'auth/weak-password':
        errorMessage = '비밀번호가 너무 약합니다.';
        break;
      case 'auth/email-already-in-use':
        errorMessage = '이미 사용중인 이메일입니다.';
        break;
    }
    // - 각 상황별 에러 메시지를 rejectWithValue() 함수를 통해 반환 (rejected 상태일때 사용될 데이터)
    return rejectWithValue(errorMessage);
  }
});
