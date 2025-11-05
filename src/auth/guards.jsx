import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthed, selectRole } from '../store/auth/authSlice.js';

export function RequireAuth({ children }) {
  const isAuthed = useSelector(selectIsAuthed);
  const loc = useLocation();
  if (!isAuthed) return <Navigate to="/auth/login" replace state={{ from: loc }} />;
  return children;
}

export function RequireRole({ children, allow = [] }) {
  const role = useSelector(selectRole);
  if (!role) return null; // 일반적으로 상위에 RequireAuth가 있음
  if (!allow.includes(role)) return <Navigate to="/error" replace />;
  return children;
}
