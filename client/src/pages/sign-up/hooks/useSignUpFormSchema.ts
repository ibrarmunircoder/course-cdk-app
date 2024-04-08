import { useMemo } from 'react';
import { z } from 'zod';

const signupFormSchema = z
  .object({
    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(8, 'Password must be between 8 and 20 characters')
      .max(20, 'Password must be between 8 and 20 characters'),
    confirmPassword: z
      .string({
        required_error: 'Confirm Password is required',
      })
      .min(1, 'Confirm Password is required'),

    email: z
      .string({
        required_error: 'email is required',
      })
      .email(),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'Passwords must be matched',
    path: ['confirmPassword'],
  });

export type SignupFormInput = z.infer<typeof signupFormSchema>;

export const useSignupFormSchema = () => useMemo(() => signupFormSchema, []);
