import {
  Alert,
  Box,
  Button,
  Card,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material';
import { Controller } from 'react-hook-form';
import { useSignInForm } from './hooks/useSignInForm';
import { MainContent } from '@/shared/components';

const SignIn = () => {
  const { control, onSubmit, resetError, error, isSubmitting } =
    useSignInForm();
  return (
    <MainContent center>
      <Card
        sx={{
          maxWidth: '672px',
          width: '100%',
        }}
      >
        <Box p={3}>
          <Typography mb={2} variant="h5" fontWeight={600} textAlign="left">
            Login
          </Typography>
          <Box
            onSubmit={onSubmit}
            component="form"
            display="flex"
            flexDirection="column"
            gap="20px"
          >
            <Controller
              control={control}
              name="email"
              render={({ field, fieldState: { error } }) => (
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  placeholder="Enter your email"
                  error={Boolean(error)}
                  helperText={error?.message}
                  {...field}
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({ field, fieldState: { error } }) => (
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                  error={Boolean(error)}
                  helperText={error?.message}
                  {...field}
                />
              )}
            />

            {error && (
              <Alert onClose={resetError} severity="error">
                {error}
              </Alert>
            )}

            <Button type="submit" variant="contained" fullWidth>
              {isSubmitting ? (
                <CircularProgress size={25} color="inherit" />
              ) : (
                'Submit'
              )}
            </Button>
          </Box>
        </Box>
      </Card>
    </MainContent>
  );
};

export default SignIn;
