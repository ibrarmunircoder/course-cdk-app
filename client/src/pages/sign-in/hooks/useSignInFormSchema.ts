import { useMemo } from 'react';
import { z } from 'zod';

const signInFormSchema = z.object({
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(1, 'Password is required'),
  email: z
    .string({
      required_error: 'email is required',
    })
    .email(),
});

export type SignInFormInput = z.infer<typeof signInFormSchema>;

export const useSignInFormSchema = () => useMemo(() => signInFormSchema, []);
