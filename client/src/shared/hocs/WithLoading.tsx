import { CircularProgress } from '@mui/material';
import React, { Suspense } from 'react';

type ReturnType<T> = (props: T) => JSX.Element;

// eslint-disable-next-line @typescript-eslint/ban-types
export const withLoading = <T extends object>(
  Component: React.ComponentType<T>
): ReturnType<T> => {
  return (props: T) => (
    <Suspense fallback={<CircularProgress color="primary" />}>
      <Component {...props} />
    </Suspense>
  );
};
