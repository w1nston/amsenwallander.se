import Head from 'next/head';
import { AppProps } from 'next/app';
import { MDXProvider } from '@mdx-js/react';
import '../public/styles.css';
import { Paragraph } from '../components/style/Paragraph';
import { Layout } from '../components/style/Layout';
import Navbar from '../components/Navbar';

export default function AWApp(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <MDXProvider
      components={{
        p: Paragraph,
        wrapper: Layout,
      }}
    >
      <Head>
        <link rel="icon" href="/favicon.png" />
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans|Roboto|Catamaran:wght@300&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Navbar />
      <Component {...pageProps} />
    </MDXProvider>
  );
}
