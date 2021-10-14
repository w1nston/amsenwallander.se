import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from '../features/navigation/components/Navbar';
import { useServiceWorker } from '../utils/hooks/service-worker';
import { useLoadingSkeleton } from '../utils/hooks/route-aware-loading-skeleton';
import theme from '../lib/material-ui/theme';

export default function AWApp(props: AppProps) {
  const { Component, pageProps } = props;

  useServiceWorker();

  const LoadingSkeleton = useLoadingSkeleton();

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <Navbar />
        <CssBaseline />
        <Box sx={{ padding: '5rem 1rem 1rem 1rem' }}>
          {LoadingSkeleton ? <LoadingSkeleton /> : <Component {...pageProps} />}
        </Box>
      </ThemeProvider>
    </>
  );
}
