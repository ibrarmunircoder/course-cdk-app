import { MainContent } from '@/shared/components';
import { SignupForm } from './components/SignupForm';
import { ConfirmEmail } from './components/ConfirmEmail';
import { AuthSteps, useAuthStep } from './hooks/useAuthStep';

const SignUp = () => {
  const { currentStep } = useAuthStep();

  let currentForm = <SignupForm />;

  if (currentStep === AuthSteps.CONFIRM_SIGN_UP) {
    currentForm = <ConfirmEmail />;
  }
  return <MainContent center>{currentForm}</MainContent>;
};

export default SignUp;
