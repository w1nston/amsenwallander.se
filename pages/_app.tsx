import Head from 'next/head';
import { AppProps } from 'next/app';
import { MDXProvider } from '@mdx-js/react';
import { useEffect } from 'react';
import '../public/styles.css';
import { Paragraph } from '../components/style/Paragraph';
import { Layout } from '../components/style/Layout';
import Navbar from '../components/Navbar';

export default function AWApp(props: AppProps) {
  const { Component, pageProps } = props;

  useEffect(() => {
    async function initializeServiceWorker() {
      if ('serviceWorker' in navigator) {
        try {
          const status = await navigator.serviceWorker.register(
            '/serviceWorker.js'
          );
          if (status.installing) {
            console.log('Installing service worker...');
          } else if (status.waiting) {
            console.log('waiting for service worker...');
          } else if (status.active) {
            console.log('Service worker active!');
          }
        } catch (error) {
          console.error('Error initializing service worker!', error);
        }
      }
    }

    initializeServiceWorker();
  }, []);

  return (
    <MDXProvider
      components={{
        p: Paragraph,
        wrapper: Layout,
      }}
    >
      <Head>
        <link rel="icon" type="image/svg+xml" href="/favicon.png" />
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans|Roboto|Catamaran:wght@300&display=swap"
          rel="stylesheet"
        />
        <link rel="manifest" href="/a2hs.webmanifest" />
      </Head>
      <Navbar />
      <Component {...pageProps} />
    </MDXProvider>
  );
}
