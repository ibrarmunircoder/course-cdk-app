import { CircularProgress } from '@mui/material';

export const FullPageCircularSpinner = () => {
  return (
    <CircularProgress
      size={50}
      sx={{
        position: 'fixed',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 2,
      }}
    />
  );
};
