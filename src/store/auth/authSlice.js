import { createSlice } from '@reduxjs/toolkit';

const KEY = 'auth:user';
const saved = (() => {
  try {
    return JSON.parse(localStorage.getItem(KEY));
  } catch {
    return null;
  }
})();

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: saved, // { id, name, role: 'instructor' | 'user' } | null
  },
  reducers: {
    login(state, action) {
      state.user = action.payload; // {id, name, role}
      localStorage.setItem(KEY, JSON.stringify(action.payload));
    },
    logout(state) {
      state.user = null;
      localStorage.removeItem(KEY);
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

export const selectUser = (state) => state.auth.user;
export const selectIsAuthed = (state) => !!state.auth.user;
export const selectRole = (state) => state.auth.user?.role ?? null;
