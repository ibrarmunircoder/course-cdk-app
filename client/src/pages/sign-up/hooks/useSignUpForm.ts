import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignupFormInput, useSignupFormSchema } from './useSignUpFormSchema';
import { signUp } from 'aws-amplify/auth';
import { AuthSteps, useAuthStep } from './useAuthStep';
import { useState } from 'react';
import { formatErrorMessage } from '@/shared/utils';

export const useSignUpForm = () => {
  const [error, setError] = useState({
    signUp: '',
  });
  const validationSchema = useSignupFormSchema();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignupFormInput>({
    mode: 'onSubmit',
    resolver: zodResolver(validationSchema),
    defaultValues: {
      confirmPassword: '',
      email: '',
      password: '',
    },
  });
  const { setCurrentStep, setEmail } = useAuthStep();

  const resetError = () => {
    setError({
      signUp: '',
    });
  };

  const onSubmit = async (values: SignupFormInput) => {
    try {
      const { isSignUpComplete, nextStep, userId } = await signUp({
        password: values.password,
        username: values.email,
        options: {
          userAttributes: {
            email: values.email,
          },
          autoSignIn: {
            authFlowType: 'USER_SRP_AUTH',
          },
        },
      });

      if (!isSignUpComplete) {
        // @ts-expect-error: Expect error
        setCurrentStep(AuthSteps[nextStep.signUpStep]);
        setEmail(values.email);
      }
      console.log(isSignUpComplete, nextStep, userId);
    } catch (error) {
      console.log(error);
      setError({
        signUp: formatErrorMessage(error),
      });
    }
  };

  return {
    control,
    isSubmitting,
    onSubmit: handleSubmit(onSubmit),
    error,
    resetError,
  };
};
