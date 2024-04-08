import { AuthUser, AuthSession } from 'aws-amplify/auth';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import _pick from 'lodash/pick';

type AuthState = {
  isAuthenticating: boolean;
  isAuthenticated: boolean;
  userSession: AuthSession | undefined;
  user: AuthUser | undefined;
  error: string | undefined;
  setIsAuthenticating: (value: boolean) => void;
  setUser: (user: AuthUser | undefined) => void;
  setUserSession: (user: AuthSession | undefined) => void;
  setError: (error: string | undefined) => void;
};

const useAuthStore = create<AuthState>()(
  devtools(
    (set) => ({
      userSession: undefined,
      isAuthenticated: false,
      error: undefined,
      user: undefined,
      isAuthenticating: true,
      setUser: (user) => {
        set({
          user,
          isAuthenticated: user ? true : false,
        });
      },
      setUserSession: (userSession) => {
        set({
          userSession,
        });
      },
      setError: (error) => {
        set({
          error,
        });
      },
      setIsAuthenticating: (isAuthenticating) => {
        set({
          isAuthenticating,
        });
      },
    }),

    {
      name: 'AuthStore',
      enabled: true,
    }
  )
);

// Selectors
const userSelector = (state: AuthState) => state.user;
const userSessionSelector = (state: AuthState) => state.userSession;
const isAuthenticatingSelector = (state: AuthState) => state.isAuthenticating;
const isAuthenticatedSelector = (state: AuthState) => state.isAuthenticated;
const errorSelector = (state: AuthState) => state.error;
const authActionsSelector = (state: AuthState) =>
  _pick(state, [
    'setError',
    'setUser',
    'setIsAuthenticating',
    'setUserSession',
  ]);

// hooks
export const useAuthUserSelector = () => useAuthStore(userSelector);
export const useAuthUserSessionSelector = () =>
  useAuthStore(userSessionSelector);
export const useAuthIsAuthenticatingSelector = () =>
  useAuthStore(isAuthenticatingSelector);
export const useAuthIsAuthenticatedSelector = () =>
  useAuthStore(isAuthenticatedSelector);
export const useAuthErrorSelector = () => useAuthStore(errorSelector);
export const useAuthActions = () => useAuthStore(authActionsSelector);
