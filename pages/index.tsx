import Head from 'next/head';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

function Home() {
  return (
    <>
      <Head>
        <title>Amsen-Wallander</title>
      </Head>
      <main>
        <Grid container spacing={2}>
          <Grid item xs={12} zeroMinWidth>
            <Box
              sx={{
                padding: '1rem',
              }}
            >
              <Typography variant="body1">
                Välkommen in till vår stuga. Här samlar vi recept som vi själva
                brukar laga ofta.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </main>
    </>
  );
}

export default Home;
