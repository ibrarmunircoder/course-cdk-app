import { Box, BoxProps, styled } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Navigation } from './Navigation';

const AppLayoutWrapper = styled(Box)<BoxProps>(() => ({
  width: '100%',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  '& > main': {
    flexGrow: 1,
  },
}));

export const Layout = () => {
  return (
    <AppLayoutWrapper>
      <Navigation />
      <Outlet />
    </AppLayoutWrapper>
  );
};
