/** @jsx jsx */
import Head from 'next/head';
import { css, jsx } from '@emotion/core';

const containerStyles = css`
  /* padding: 1.5rem; */
`;

export default function Now() {
  return (
    <div css={containerStyles}>
      <Head>
        <title>Amsen-Wallander</title>
      </Head>

      <main>Well now...</main>
    </div>
  );
}

