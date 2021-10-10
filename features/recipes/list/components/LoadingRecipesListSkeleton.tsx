import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Paper from '@mui/material/Paper';

function SkeletonItem() {
  return (
    <Paper sx={{ padding: '1rem', margin: '1rem' }}>
      <Skeleton variant="text" animation="wave" />
      <Skeleton variant="text" animation="wave" width={80} />
    </Paper>
  );
}

function LoadingRecipesListSkeleton() {
  return (
    <Box>
      <SkeletonItem />
      <SkeletonItem />
      <SkeletonItem />
    </Box>
  );
}

export default LoadingRecipesListSkeleton;
