import Head from 'next/head';
import { AppProps } from 'next/app';
import { MDXProvider } from '@mdx-js/react';
import '../public/styles.css';
import Navbar from '../components/Navbar';
import { H1, H2, H3 } from '../components/style/Heading';
import { UnorderedList } from '../components/style/UnorderedList';
import { Paragraph } from '../components/style/Paragraph';

// TODO: use wrapper with MDXProvider to set default padding...

export default function AWApp(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <MDXProvider
      components={{
        h1: H1,
        h2: H2,
        h3: H3,
        ul: UnorderedList,
        p: Paragraph,
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
