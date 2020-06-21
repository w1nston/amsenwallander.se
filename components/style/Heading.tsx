/** @jsx jsx */
import { css, jsx } from '@emotion/core';

type Props = {
  children: React.ReactNode;
};

const h1Styles = css`
  padding: 0 1rem;
`;

const h2Styles = css`
  padding: 0 1rem;
`;

const h3Styles = css`
  padding: 0 1rem;
  margin-bottom: 0;
`;

export function H1({ children }: Props) {
  return <h1 css={h1Styles}>{children}</h1>;
}

export function H2({ children }: Props) {
  return <h2 css={h2Styles}>{children}</h2>;
}

export function H3({ children }: Props) {
  return <h3 css={h3Styles}>{children}</h3>;
}
