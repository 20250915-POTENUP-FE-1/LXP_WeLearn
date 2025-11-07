import React, { useMemo } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

export function RequireAuth({ children }) {
  const { initializing, user } = useSelector((s) => s.auth);
  const loc = useLocation();
  if (initializing) return null; // 또는 스피너
  return user ? children : <Navigate to="/login" replace state={{ from: loc }} />;
}

export function RequireUnAuth({ children }) {
  const { initializing, user } = useSelector((s) => s.auth);
  const loc = useLocation();
  if (initializing) return null; // 또는 스피너
  return !user ? children : <Navigate to="/" replace state={{ from: loc }} />;
}

export function RequireRole({ children, allow = [], adminIsSuper = true }) {
  const { initializing, user } = useSelector((s) => s.auth);
  const rawRole = useSelector((s) => s.auth.user?.role ?? null);
  const loc = useLocation();

  const norm = (v) => (v ? String(v).trim().toUpperCase() : '');
  const role = norm(rawRole);
  const allowSet = useMemo(() => new Set(allow.map(norm)), [allow]);

  if (initializing) return null;
  if (!user) return <Navigate to="/login" replace state={{ from: loc }} />;

  const isAllowed = (adminIsSuper && role === 'ADMIN') || allowSet.has(role);
  return isAllowed ? children : <Navigate to="/error" replace />;
}
