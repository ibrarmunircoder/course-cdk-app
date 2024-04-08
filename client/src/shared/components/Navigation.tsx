import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import {
  useAuthActions,
  useAuthIsAuthenticatedSelector,
  useAuthUserSelector,
} from '@/shared/hooks/useAuthStore';
import { signOut } from 'aws-amplify/auth';

export const Navigation = () => {
  const navigate = useNavigate();
  const user = useAuthUserSelector();
  const isAuthenticated = useAuthIsAuthenticatedSelector();
  const { setUser, setUserSession } = useAuthActions();

  const isLoggedIn = Boolean(user) && isAuthenticated;

  const handleLogout = async () => {
    try {
      await signOut();
      setUser(undefined);
      setUserSession(undefined);
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component={Link}
          to="/"
          sx={{
            mr: 2,
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          LOGO
        </Typography>
        <Box sx={{ marginLeft: 'auto' }}>
          {isLoggedIn ? (
            <Button onClick={handleLogout} color="inherit">
              Logout
            </Button>
          ) : (
            <>
              <Button color="inherit">
                <Link
                  style={{ textDecoration: 'none', color: 'inherit' }}
                  to="/login"
                >
                  Login
                </Link>
              </Button>
              <Button color="inherit">
                <Link
                  style={{ textDecoration: 'none', color: 'inherit' }}
                  to="/register"
                >
                  Register
                </Link>
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
