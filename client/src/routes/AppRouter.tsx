import { FullPageCircularSpinner, Layout } from '@/shared/components';
import { useLoadUserSession } from '@/shared/hooks/useLoadUserSession';
import { lazy } from 'react';
import { BrowserRouter, Routes as Router, Route } from 'react-router-dom';
import { withLoading } from 'shared/hocs/WithLoading';

const HomePage = lazy(() => import('@pages/home'));
const SignUpPage = lazy(() => import('@pages/sign-up'));
const SignInPage = lazy(() => import('@pages/sign-in'));

const Home = withLoading(HomePage);
const SignUp = withLoading(SignUpPage);
const SignIn = withLoading(SignInPage);

export const AppRouter = () => {
  const { isAuthenticating } = useLoadUserSession();
  console.log(isAuthenticating);

  if (isAuthenticating) {
    return <FullPageCircularSpinner />;
  }

  return (
    <BrowserRouter>
      <Router>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<SignIn />} />
        </Route>
      </Router>
    </BrowserRouter>
  );
};
