import { Box, Skeleton } from '@mui/material';

const LoadingSkeleton = () => (
  <Box
    sx={{
      height: 'max-content',
      mt: 2,
    }}
  >
    {[...Array(10)].map((_, index) => (
      <Skeleton key={index} variant="text" sx={{ my: 4, mx: 4 }} />
    ))}
  </Box>
);

export default LoadingSkeleton;
