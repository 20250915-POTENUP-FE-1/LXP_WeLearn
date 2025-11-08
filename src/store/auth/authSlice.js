import { createSlice } from '@reduxjs/toolkit';
import { signup } from './signup.js';
import { logout } from './logout.js';
import { login } from './login.js';
import { USERS_COLLECTION_NAME } from '../../lib/firebase/table/ddl.js';

const saved = (() => {
  try {
    return JSON.parse(localStorage.getItem(USERS_COLLECTION_NAME));
  } catch {
    return null;
  }
})();

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: saved, // { id, name, role: 'instructor' | 'user' } | null
    loading: false,
    error: '',
  },
  reducers: {
    // 에러 메시지 초기화 액션 : 인증 상태 변경 중 발생한 에러 메시지를 초기화 시키기 위한 액션
    clearError: (state) => {
      state.error = '';
    },
    // 인증 상태 감지하여 사용자 프로필 초기상태로 설정하는 액션
    setUserProfile: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //  - 로그인 요청 시작 (pending 상태)
      .addCase(login?.pending, (state) => {
        state.loading = true; // 로딩중 상태 활성화
        state.error = ''; // 이전 에러 메시지 초기화
      })
      //   - 로그인 요청 성공 (fulfilled 상태) : action.payload에는 createAsyncThunk() 함수에서 반환된 데이터가 담겨있음
      .addCase(login?.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      //   - 로그인 요청 실패 (rejected 상태) : action.payload에는 rejectWithValue() 함수로 전달된 메세지가 담겨있음
      .addCase(login?.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // 2) logout 비동기 액션 처리  (fulfilled 만 진행)
    builder
      //  - 로그아웃 요청 성공 (fulfilled 상태)
      .addCase(logout?.fulfilled, (state) => {
        state.user = null;
        state.error = ''; // 로그아웃 시 에러도 초기화
      });

    // 3) signup 비동기 액션 처리  (pending, fulfilled, rejected)
    builder
      //  - 회원가입 요청 시작 (pending 상태)
      .addCase(signup?.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      //  - 회원가입 요청 성공 (fulfilled 상태)
      .addCase(signup?.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      //  - 회원가입 요청 실패 (rejected 상태)
      .addCase(signup?.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, setUserProfile } = authSlice.actions;
export default authSlice.reducer;

export const selectIsAuthed = (state) => !!state.auth.user;
export const selectRole = (state) => state.auth.user?.role ?? null;
