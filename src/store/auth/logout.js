import { createAsyncThunk } from '@reduxjs/toolkit';
import { signOut } from 'firebase/auth';
import { auth } from '../../lib/firebase/config.js';

export const logout = createAsyncThunk('auth/logout', async (payload, { rejectWithValue }) => {
  try {
    await signOut(auth);
    return '로그아웃 완료';
  } catch (error) {
    return rejectWithValue(error.message);
  }
});
