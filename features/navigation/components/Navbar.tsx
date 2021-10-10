import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '../../../lib/material-ui/adapters/Link';

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ minHeight: '6.875rem' }}>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{ flexGrow: 1 }}
          spacing={2}
        >
          <Grid item zeroMinWidth>
            <Link
              href="/recipes"
              color="#fff"
              sx={{ fontSize: '1.875rem' }}
            >
              Recept
            </Link>
          </Grid>
          <Grid item zeroMinWidth>
            <Link
              href="/preparations"
              color="#fff"
              sx={{ fontSize: '1.875rem' }}
            >
              Förberedelser
            </Link>
          </Grid>
        </Grid>
      </AppBar>
    </Box>
  );
}
