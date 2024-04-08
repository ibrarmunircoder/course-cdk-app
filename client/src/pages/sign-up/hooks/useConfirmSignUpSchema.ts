import { useMemo } from 'react';
import { z } from 'zod';

const confirmSignUpFormSchema = z.object({
  code: z
    .string({
      required_error: 'code is required',
    })
    .min(1, 'code is required'),
});

export type ConfirmSignupFormType = z.infer<typeof confirmSignUpFormSchema>;

export const useConfirmSignUpFormSchema = () =>
  useMemo(() => confirmSignUpFormSchema, []);
