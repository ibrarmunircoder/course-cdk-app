import {
  Box,
  Button,
  Card,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material';
import { useConfirmSignUp } from '../hooks/useConfirmSignUp';
import { Controller } from 'react-hook-form';

export const ConfirmEmail = () => {
  const { control, handleResendCode, isSubmitting, onSubmit } =
    useConfirmSignUp();
  return (
    <Card
      sx={{
        maxWidth: '672px',
        width: '100%',
      }}
    >
      <Box p={3}>
        <Typography mb={0.6} variant="h5" fontWeight={600} textAlign="left">
          We Emailed You
        </Typography>
        <Typography variant="body2" mb={3}>
          Your code is on the way. To log in, enter the code we sent you. It may
          take a minute to arrive.
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
            name="code"
            render={({ field, fieldState: { error } }) => (
              <TextField
                fullWidth
                label="Code"
                type="text"
                placeholder="Enter your code"
                error={Boolean(error)}
                helperText={error?.message}
                {...field}
              />
            )}
          />
          <Box display="flex" flexDirection="column" gap={1.5}>
            <Button type="submit" variant="contained">
              {isSubmitting ? (
                <CircularProgress size={25} color="inherit" />
              ) : (
                'Confirm'
              )}
            </Button>
            <Button onClick={handleResendCode} type="button" variant="outlined">
              Resend Code
            </Button>
          </Box>
          <Typography variant="body1">
            Be sure to check your spam or junk folder.
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};
