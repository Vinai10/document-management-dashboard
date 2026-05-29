import { Box, CircularProgress, Typography } from '@mui/material';

export default function LoadingSpinner({ message = 'Loading...' }) {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight={200} gap={2}>
      <CircularProgress size={40} thickness={4} />
      <Typography variant="body2" color="text.secondary">{message}</Typography>
    </Box>
  );
}
