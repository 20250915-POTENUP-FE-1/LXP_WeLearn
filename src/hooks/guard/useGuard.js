import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { onIdTokenChanged } from 'firebase/auth';
import { auth } from '../../lib/firebase/config';
import { getUserProfile } from '../../services/auth/getUserService';
import { setInitializing, setUserProfile } from '../../store/auth/authSlice';

export function useGuard() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setInitializing(true));
    const unsub = onIdTokenChanged(auth, async (fbUser) => {
      try {
        if (!fbUser) {
          dispatch(setUserProfile(null));
          return;
        }
        const profile = await getUserProfile(fbUser.uid);
        dispatch(
          setUserProfile({
            uid: fbUser.uid,
            email: fbUser.email,
            role: profile.role,
            name: profile.name ?? '',
          }),
        );
      } finally {
        dispatch(setInitializing(false));
      }
    });
    return () => unsub();
  }, [dispatch]);
}
