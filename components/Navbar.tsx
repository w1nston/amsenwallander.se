/** @jsx jsx */
import Link from 'next/link';
import { css, jsx } from '@emotion/core';

const navbarStyles = css`
  background-color: tomato;
  box-shadow: 0 0.2rem 0.2rem -0.2rem #4d4a48;
  padding: 2rem 0;
  display: flex;
  font-size: 1.5rem;
  justify-content: space-evenly;
  align-items: center;

  a {
    color: #fefdfa;
    text-decoration: none;
  }
`;

const logoStyles = css`
  width: 3rem;
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
/*
<Link href="/">
        <a>
          <img src="/images/jaw_logo.svg" css={logoStyles} />
        </a>
      </Link>
      */
