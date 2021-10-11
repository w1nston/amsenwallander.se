import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

function LoadingRecipeSkeleton() {
  return (
    <Box sx={{ padding: '1rem' }}>
      <Skeleton variant="text" animation="wave" sx={{ marginBottom: '1rem' }} />
      <Skeleton variant="rectangular" animation="wave" height={100} />
    </Box>
  );
}

export default LoadingRecipeSkeleton;
