/** @jsx jsx */
import Head from 'next/head';
import { css, jsx } from '@emotion/core';
import KitchenTimer from '../components/KitchenTimer';

const mainStyles = css`
  padding: 0 1rem;
`;

export default function Now() {
  return (
    <div>
      <Head>
        <title>Amsen-Wallander</title>
      </Head>

      <main css={mainStyles}>
        <p>
          Välkommen in till vår stuga. Här samlar vi recept som vi själva brukar
          laga ofta.
        </p>
        <KitchenTimer />
      </main>
    </div>
  );
}
