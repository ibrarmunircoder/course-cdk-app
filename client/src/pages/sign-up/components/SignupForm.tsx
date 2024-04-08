import {
  Alert,
  Box,
  Button,
  Card,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material';
import { useSignUpForm } from '../hooks/useSignUpForm';
import { Controller } from 'react-hook-form';
export const SignupForm = () => {
  const { control, isSubmitting, onSubmit, error, resetError } =
    useSignUpForm();
  return (
    <Card
      sx={{
        maxWidth: '672px',
        width: '100%',
      }}
    >
      <Box p={3}>
        <Typography mb={2} variant="h5" fontWeight={600} textAlign="left">
          Register
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

          <Controller
            control={control}
            name="confirmPassword"
            render={({ field, fieldState: { error } }) => (
              <TextField
                fullWidth
                label="Confirm Password"
                type="password"
                placeholder="Enter your confirm password"
                error={Boolean(error)}
                helperText={error?.message}
                {...field}
              />
            )}
          />
          {error.signUp && (
            <Alert onClose={resetError} severity="error">
              {error.signUp}
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
  );
};
