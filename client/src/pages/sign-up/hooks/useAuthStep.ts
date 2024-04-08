import { create } from 'zustand';

export enum AuthSteps {
  SIGNUP = 1,
  CONFIRM_SIGN_IN_WITH_CUSTOM_CHALLENGE = 2,
  CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED = 3,
  CONFIRM_SIGN_IN_WITH_SMS_CODE = 4,
  CONFIRM_SIGN_IN_WITH_TOTP_CODE = 5,
  CONFIRM_SIGN_UP = 6,
  CONTINUE_SIGN_IN_WITH_MFA_SELECTION = 7,
  CONTINUE_SIGN_IN_WITH_TOTP_SETUP = 8,
  RESET_PASSWORD = 9,
  DONE = 10,
}

type StepStore = {
  currentStep: number;
  email: string;
  setCurrentStep: (newCurrentStep: number) => void;
  setEmail: (email: string) => void;
};

export const useAuthStep = create<StepStore>((set) => ({
  currentStep: AuthSteps.SIGNUP,
  email: '',
  setCurrentStep: (newCurrentStep: number) =>
    set({ currentStep: newCurrentStep }),
  setEmail: (email: string) => set({ email }),
}));
