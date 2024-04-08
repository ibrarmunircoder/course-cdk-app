import { Box, SxProps } from '@mui/material';
import React from 'react';

export const MainContent = ({
  center = false,
  children,
}: {
  center?: boolean;
  children: React.ReactNode;
}) => {
  const styles: SxProps = { mt: '65px' };

  if (center) {
    styles.display = 'flex';
    styles.justifyContent = 'center';
    styles.alignItems = 'center';
  }

  return (
    <Box component="main" sx={styles}>
      {children}
    </Box>
  );
};
