/** @jsx jsx */
import Link from 'next/link';
import { css, jsx } from '@emotion/core';

const navbarStyles = css`
  align-items: center;
  background-color: tomato;
  box-shadow: 0 0.2rem 0.2rem -0.2rem #4d4a48;
  display: flex;
  font-size: 1.5rem;
  height: 5.5rem;
  justify-content: space-evenly;
  align-items: center;
  position: sticky;
  top: 0;
  width: 100vw;
  z-index: 1;

  a {
    color: #fefdfa;
    text-decoration: none;
  }
`;

export default function Navbar() {
  return (
    <nav css={navbarStyles}>
      <Link href="/recipes">
        <a>Recept</a>
      </Link>
      <Link href="/week-menu">
        <a>Veckomeny</a>
      </Link>
    </nav>
  );
}
