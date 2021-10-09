import Head from 'next/head';
import { AppProps } from 'next/app';
import Navbar from '../features/navigation/components/Navbar';
import { useServiceWorker } from '../utils/hooks/service-worker';
import { useLoadingSkeleton } from '../utils/hooks/route-aware-loading-skeleton';
import '../styles/globals.css';

export default function AWApp(props: AppProps) {
  const { Component, pageProps } = props;

  useServiceWorker();

  const LoadingSkeleton = useLoadingSkeleton();

  return (
    <>
      <Head>
        <link rel="icon" type="image/svg+xml" href="/favicon.png" />
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans|Roboto|Catamaran:wght@300&display=swap"
          rel="stylesheet"
        />
        <link rel="manifest" href="/a2hs.webmanifest" />
      </Head>
      <Navbar />
      {LoadingSkeleton ? <LoadingSkeleton /> : <Component {...pageProps} />}
    </>
  );
}
