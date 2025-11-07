import { createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from '../../lib/firebase/config.js';
import { getUserProfile } from '../../services/auth/getUserService.js';
import { signInWithEmailAndPassword } from 'firebase/auth';

export const login = createAsyncThunk('auth/login', async (payload, { rejectWithValue }) => {
  try {
    // - 이메일, 비밀번호로 로그인 요청 (성공시 인증된 사용자 객체 반환)
    const userCredential = await signInWithEmailAndPassword(auth, payload.email, payload.password);
    const user = userCredential.user;

    // - 사용자 프로필 조회 요청 (성공시 사용자 프로필 객체 반환)
    const userProfile = await getUserProfile(user.uid);

    // - userProfile 객체를 상태로 저장시키기 위해 반환 (fulfilled 상태일때 사용될 데이터)
    return {
      user: {
        uid: user.uid,
        email: user.email,
        role: userProfile.role,
        name: userProfile.name ?? '',
      },
    };
  } catch (error) {
    let errorMessage = '로그인 중 오류가 발생했습니다.';
    switch (error.code) {
      case 'auth/invalid-email':
        errorMessage = '올바른 이메일 형식이 아닙니다.';
        break;
      case 'auth/invalid-credential':
        errorMessage = '등록된 계정이 아닙니다.';
        break;
      case 'auth/too-many-requests':
        errorMessage = '너무 많은 로그인 시도가 있었습니다. 잠시 후 다시 시도해주세요.';
        break;
    }
    // - 각 상황별 에러 메시지를 rejectWithValue() 함수를 통해 반환 (rejected 상태일때 사용될 데이터)
    return rejectWithValue(errorMessage);
  }
});
