import { useForm } from 'react-hook-form';
import { SignInFormInput, useSignInFormSchema } from './useSignInFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'aws-amplify/auth';
import { useState } from 'react';

export const useSignInForm = () => {
  const [error, setError] = useState('');
  const validationSchema = useSignInFormSchema();
  const {
    control,
    handleSubmit,
    formState: { errors, touchedFields, isSubmitting },
  } = useForm<SignInFormInput>({
    mode: 'onSubmit',
    resolver: zodResolver(validationSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: SignInFormInput) => {
    try {
      await signIn({
        username: values.email,
        password: values.password,
      });
      window.location.href = '/';
    } catch (error: any) {
      setError(error?.message || 'Invalid credentials');
      console.error(error);
    }
  };

  const resetError = () => {
    setError('');
  };

  return {
    control,
    onSubmit: handleSubmit(onSubmit),
    errors,
    touchedFields,
    isSubmitting,
    error,
    resetError,
  };
};
