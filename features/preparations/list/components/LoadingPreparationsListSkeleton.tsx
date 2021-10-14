import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';

function SkeletonItem() {
  return (
    <Paper sx={{ padding: '1rem', margin: '1rem' }}>
      <Skeleton variant="text" animation="wave" />
    </Paper>
  );
}

function LoadingListSkeleton() {
  return (
    <Box>
      <SkeletonItem />
      <SkeletonItem />
      <SkeletonItem />
    </Box>
  );
}

export default LoadingListSkeleton;
