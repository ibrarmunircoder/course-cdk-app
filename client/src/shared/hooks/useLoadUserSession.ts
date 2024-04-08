import { fetchAuthSession, getCurrentUser } from 'aws-amplify/auth';
import { useEffect } from 'react';
import {
  useAuthActions,
  useAuthIsAuthenticatingSelector,
} from './useAuthStore';

export const useLoadUserSession = () => {
  const isAuthenticating = useAuthIsAuthenticatingSelector();
  const { setIsAuthenticating, setUser, setUserSession } = useAuthActions();

  useEffect(() => {
    const loadUserSession = async () => {
      try {
        const userSession = await fetchAuthSession();
        const user = await getCurrentUser();
        setUserSession(userSession);
        setUser(user);
      } catch (error) {
        console.log(error);
      } finally {
        setIsAuthenticating(false);
      }
    };

    loadUserSession();
  }, [setIsAuthenticating, setUserSession, setUser]);

  return {
    isAuthenticating,
  };
};
